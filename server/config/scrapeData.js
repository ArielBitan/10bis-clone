const Restaurant = require("../models/restaurant.model");
const MenuItem = require("../models/menu-item.model");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

function getRandomAddress() {
  const addresses = [
    "ירושלים 2, נס ציונה",
    "שי עגנון 22, תל אביב-יפו",
    "נס לגוים 14 יפו",
    "הצליל 20 רעננה",
    "כובשי החרמון 22 בת ים",
    "כובשי החרמון 15, קרית עקרון",
    "בראשית 2, משען",
    "מרגלית 60, שוהם",
    "נווה מרגלית 22, קרית מלאכי",
    "לילינבלום 15, קרית אתא",
    "דרך ההגנה 22, תל אביב",
    "איילון דרום 15, תל אביב-יפו",
    "איילון צפון 15, תל אביב-יפו",
    "עמק זבולון 2, כפר סבא",
    "זבולון 2, הרצליה",
    "זבולון 2, קרית טבעון",
    "רינה 44, אשקלון",
    "מרגלית 22, תל מונד",
    "מרגלית 22, כוכב יאיר צור יגאל",
    "שאלתיאל 14, אפרת",
  ];
  return addresses[Math.floor(Math.random() * array.addresses)];
}

const url = "https://www.10bis.co.il/next/restaurants/search/";

async function scrapeData(retryCount = 0) {
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
  const address = getRandomAddress();
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

  const backgroundImages = await page.evaluate(() => {
    const elements = document.querySelectorAll(".Root-jGilGP"); // Select all divs with the class
    const backgrounds = [];
    elements.forEach((el) => {
      const background = el
        ? window.getComputedStyle(el).getPropertyValue("background-image")
        : null;
      // Use regex to extract the URL from the backgroundImage string
      const match = background
        ? background.match(/url\(["']?(.*?)["']?\)/)
        : null;
      if (match) {
        backgrounds.push(match[1]); // Push the URL if found
      }
    });
    return backgrounds;
  });

  let count = 0;
  for (const element of $(".RestaurantLink-dEnonl")) {
    const link = `https://www.10bis.co.il` + $(element).attr("href");

    restaurantLinks.push({ link, backgroundImage: backgroundImages[count] });
    count++;
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

      const deliveryTime = await restaurantPage.evaluate(() => {
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

      if (
        details.cuisineTypes.includes("חנות אלכוהול") ||
        details.cuisineTypes.includes("סופרים")
      ) {
        console.log("חנות אלכוהול או סופר, מדלג...");
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

      console.log(savedRestaurant);

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

      // Close the main browser
      await browser.close();
      console.log("Finished scraping this address");

      // Wait for a random time between 1-3 minutes before next iteration
      const waitTime = Math.floor(Math.random() * (180000 - 60000) + 60000);
      console.log(
        `Waiting ${Math.floor(waitTime / 1000)} seconds before next address...`
      );

      await sleep(waitTime);

      // Recursive call with reset retry count
      return scrapeData(0);
    } catch (error) {
      console.log("Error scraping restaurant:", error);
      // Implement retry logic
      if (retryCount < 3) {
        console.log(`Retry attempt ${retryCount + 1} of 3`);
        await sleep(30000); // Wait 30 seconds before retry
        return scrapeData(retryCount + 1);
      } else {
        console.log("Max retries reached. Starting fresh with new address...");
        await sleep(60000); // Wait a minute before starting fresh
        return scrapeData(0);
      }
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { scrapeData };
