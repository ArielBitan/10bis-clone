const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant.model");
const Location = require("../models/location.model");
const MenuItem = require("../models/menu-item.model");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const url = "https://www.10bis.co.il/next/restaurants/search/";

async function scrapeData() {
  const browser = await puppeteer.launch({
    headless: true, // Set headless to false to see what's happening
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  // Step 1: Wait for and close the Intercom widget (if it appears)
  await page
    .waitForSelector(".intercom-page-close", { timeout: 15000 })
    .catch(() => {}); // Ignore error if not found

  // Step 2: Press ESC
  await page.keyboard.press("Escape");

  // Step 3: Type the address into the input field
  const address = "שדרות הנרקיסים, Sderat HaNarkisim 11, Ramat Gan, ישראל";
  await page.type("#homePage_SelectAddress", address);

  // Step 4: Wait for the `ul` dropdown to appear
  await page.waitForSelector("ul", { visible: true });

  // Step 5: Wait for the second child of the `ul` to appear and select it
  await page.evaluate(() => {
    const ul = document.querySelector("ul");
    if (ul && ul.children.length >= 2) {
      const secondChild = ul.children[1]; // Get the second `li` element
      secondChild.click(); // Click the second `li`
    }
  });

  // Step 6: Press Enter to confirm the selection
  await page.keyboard.press("Enter");

  // Step 7: Wait for the new page to load
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });

  await page.setViewport({ width: 1920, height: 1080 });

  // Step 10: Get the page content (HTML)
  const pageContent = await page.content();

  // Step 11: Use Cheerio to parse the HTML and extract the restaurant links and other details
  const $ = cheerio.load(pageContent);

  const restaurantLinks = [];

  for (const element of $(".RestaurantLink-dEnonl")) {
    const link = `https://www.10bis.co.il` + $(element).attr("href");

    // Step 12: Extract background image of a div
    const backgroundImage = await page.evaluate(() => {
      const div = document.querySelector(".Root-jGilGP"); // Select the div with the class
      const background = div
        ? window.getComputedStyle(div).backgroundImage
        : null;
      // Use regex to extract the URL from the backgroundImage string
      const match = background
        ? background.match(/url\(["']?(.*?)["']?\)/)
        : null;
      return match ? match[1] : null; // Return the URL if found
    });

    restaurantLinks.push({ link, backgroundImage });
  }

  // Step 12: Visit each restaurant page to extract more details
  for (const restaurant of restaurantLinks) {
    try {
      const restaurantPage = await browser.newPage({ headless: false });
      await restaurantPage.goto(restaurant.link, {
        waitUntil: "domcontentloaded",
      });
      await restaurantPage.setViewport({ width: 1920, height: 1080 });

      // Step 13: Get the page content for the restaurant page
      await restaurantPage.waitForSelector(".RestaurantName-kBvLtc", {
        visible: true,
      });

      await sleep(10000); // Wait for the page to load
      const restaurantPageContent = await restaurantPage.content();

      // Step 14: Use Cheerio to parse the restaurant page content
      const $$ = cheerio.load(restaurantPageContent);

      const deliveryTime = await page.evaluate(() => {
        const elements = document.querySelectorAll(
          ".Root-grcBJY .Text-nYRmS.eIARSp"
        );
        return elements[1] ? elements[1].textContent.trim() : null; // Access the second element's text
      });

      // Extract additional details
      const details = {
        name: $$(".RestaurantName-kBvLtc").first().text().trim(),

        // Extract delivery fee
        deliveryFee: $(`[data-test-id="delivery-fee"]`)
          .first()
          .text()
          .match(/\d+/g)
          ?.join(""),
        // Extract delivery time range (first element)
        deliveryTime,

        // Extract minimum order (last element)
        minOrder: $$(".Root-grcBJY .Text-nYRmS.eIARSp")
          .last() // Get the last element for the minimum order
          .text()
          .match(/\d+/g)
          ?.join(""),

        // Extract cuisine types
        cuisineTypes: $$("div.CuisineTypes-zsyvG.gHhRwG")
          .text()
          .trim()
          .split(",")
          .map((type) => type.trim()),

        menuItems: [], // Assuming you will populate this later

        // Get the background image URL
        backgroundImage: restaurant.backgroundImage,
      };

      const existingRestaurant = await Restaurant.findOne({
        name: details.name,
      });

      if (existingRestaurant) {
        console.log(
          `A restaurant with the name "${details.name}" already exists.`
        );
        continue;
      }

      $$('[data-test-id="restaurantBodyDishList"] section').each((i, item) => {
        const category = $$(item)
          .find(".CategoryName-fDhjRP.StyledCategoryName-itXoUn.cVUVYo.exAMne")
          .text()
          .trim();
        const dishes = [];

        $$(item)
          .find(".DishList-haLbbX .Item-bYTUyw")
          .each((i, item) => {
            dishes.push({
              name: $$(item).find(".DishName-kfLGuh").text().trim(),
              price: $$(item).find(".DishPrice-hIsCzL").text().trim(),
              description: $$(item)
                .find(".DishDescription-LeCra div span")
                .text()
                .trim(),
              image: $$(item).find(".BaseDishImage-dMMZj").attr("src"),
            });
          });

        if (dishes.length > 0) {
          details.menuItems.push({
            category: category,
            dishes: dishes,
          });
        }
      });

      const modalSelector = ".ModalRoot-cSLLri";

      // Check if the modal exists
      const modalExists = await restaurantPage.$(modalSelector);

      if (modalExists) {
        console.log("Modal exists. Pressing Escape...");
        // Simulate pressing the Escape key
        await page.keyboard.press("Escape");
      } else {
        console.log("Modal does not exist.");
      }

      await restaurantPage.evaluate(() => {
        const aboutRestaurantLink = Array.from(
          document.querySelectorAll("a.A-fxuoFu.hfVkml.LinkText-trQLy.jnmbpl")
        ).find((el) => el.textContent.trim() === "אודות המסעדה");

        if (aboutRestaurantLink) {
          aboutRestaurantLink.click();
        }
      });

      await sleep(5000);

      const modalContent = await restaurantPage.content();
      const modal$$ = cheerio.load(modalContent);

      details.image = modal$$(
        ".Img-kxQvMA.hfwzY.RestaurantImage-kWsMJV.MtlUq"
      ).attr("src"); // This works as expected.

      details.address = modal$$(".RestaurantDetailsLine-eboJdu.rAFIf")
        .first() // Ensures we only get the first address line.
        .text()
        .trim();

      details.phone = modal$$(".RestaurantDetailsLine-eboJdu.rAFIf")
        .eq(1) // Index 1 to get the second element (0-based index)
        .text()
        .trim();

      details.description = modal$$(".SectionContent-dCztPD.dDCEVL p")
        .map((i, el) => modal$$(el).text().trim()) // Map through all paragraphs inside description.
        .get()
        .join(" "); // Combine into a single string.

      details.weekly_hours = modal$$(".DayWrapper-jERQww")
        .map((i, el) => ({
          day: modal$$(el).find(".Day-dnMran").text().trim(), // Scrape day names.
          time_ranges: modal$$(el).find(".TimeRanges-kNerZm").text().trim(), // Scrape time ranges.
        }))
        .get();

      // Create the location object from coordinates and address
      const location = {
        type: "Point",
        coordinates: [0, 0],
        address: details.address,
      };

      // Save the restaurant to the database
      const newRestaurant = {
        name: details.name,
        description: details.description,
        cuisine_types: details.cuisineTypes,
        image: details.image,
        background_image: details.backgroundImage,
        address: details.address,
        location: location, // Location will be saved as a subdocument
        min_order: details.minOrder,
        delivery_fee: details.deliveryFee,
        delivery_time: details.deliveryTime,
        phone: details.phone || " ", // Add phone number if available
        is_kosher: false, // Set kosher value if available
        weekly_hours: details.weekly_hours,
      };

      const savedRestaurant = await Restaurant.create(newRestaurant);

      console.log("Restaurant saved successfully:");

      // Now save the menu items
      for (const category of details.menuItems) {
        for (const dish of category.dishes) {
          const newMenuItem = {
            restaurant_id: savedRestaurant._id,
            name: dish.name,
            description: dish.description,
            image: dish.image,
            price: parseFloat(dish.price.replace(/[^\d.-]/g, "")),
            category: category.category,
          };

          await MenuItem.create(newMenuItem);
        }
      }
      console.log("Menu items saved successfully:");

      // Close the restaurant page
      await restaurantPage.close();
    } catch (error) {
      console.log("Error scraping restaurant:", error);
    }
  }

  // Close the main browser
  await browser.close();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { scrapeData };
