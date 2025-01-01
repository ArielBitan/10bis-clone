const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const url = "https://www.10bis.co.il/next/restaurants/search/";

async function automateSearch() {
  const browser = await puppeteer.launch({
    headless: false, // Set headless to false to see what's happening
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

  // Step 6: Press the Down Arrow twice to navigate the list (optional if needed)
  await page.keyboard.press("ArrowDown"); // First down arrow
  await page.keyboard.press("ArrowDown"); // Second down arrow

  // Step 7: Press Enter to confirm the selection
  await page.keyboard.press("Enter");

  // Step 8: Wait for the new page to load
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });

  await page.setViewport({ width: 1920, height: 1080 });

  // Step 9: You can now check if the page has loaded and verify if everything works.
  console.log("Page has loaded after address selection.");

  // Step 10: Get the page content (HTML)
  const pageContent = await page.content();

  // Step 11: Use Cheerio to parse the HTML and extract the restaurant links and other details
  const $ = cheerio.load(pageContent);

  const restaurantLinks = [];

  // Example: Extract all restaurant links and details from the restaurant cards
  $(".RestaurantLink-dEnonl").each((index, element) => {
    const link = `https://www.10bis.co.il` + $(element).attr("href");
    restaurantLinks.push({ link });
  });

  // Step 12: Visit each restaurant page to extract more details
  const restaurantDetails = [];
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

      // Extract additional details
      const details = {
        name: $$(".RestaurantName-kBvLtc").text().trim(),
        deliveryFee: $$(
          ".Root-grcBJY .Text-nYRmS.DiscountFeeText-bCLXPd.eIARSp.drRMks"
        )
          .text()
          .match(/\d+/g)
          ?.join(""),
        deliveryTime: $$(".Root-grcBJY .Text-nYRmS.eIARSp")
          .text()
          .match(/\d+/g)
          ?.join(""),
        minOrder: $$(".Root-grcBJY .Text-nYRmS.eIARSp")
          .last() // Get the last element, assuming it's the minimum order
          .text()
          .match(/\d+/g)
          ?.join(""),
        cuisineTypes: $$("div.CuisineTypes-zsyvG.gHhRwG")
          .text()
          .trim()
          .split(",")
          .map((type) => type.trim()),
        menuItems: [],
      };

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
      details.image = $$(".Img-kxQvMA").attr("src"); // This works as expected.

      details.address = $$(".RestaurantDetailsLine-eboJdu.rAFIf")
        .first() // Ensures we only get the first address line.
        .text()
        .trim();

      details.description = $$(".SectionContent-dCztPD p")
        .map((i, el) => $$(el).text().trim()) // Map through all paragraphs inside description.
        .get()
        .join(" "); // Combine into a single string.

      details.weekly_hours = $$(".DayWrapper-jERQww")
        .map((i, el) => ({
          day: $$(el).find(".Day-dnMran").text().trim(), // Scrape day names.
          time_ranges: $$(el).find(".TimeRanges-kNerZm").text().trim(), // Scrape time ranges.
        }))
        .get();

      $$("section div").each((i, item) => {
        const category = $$(item).find(".CategoryName-fDhjRP").text().trim();
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

      console.log(JSON.stringify(details, null, 2)); // Pretty print with indentation

      // Push the details to the array
      restaurantDetails.push(details);

      // Close the restaurant page
      await restaurantPage.close();
    } catch (error) {
      console.log("Error scraping restaurant:", error);
    }
  }

  // Close the main browser
  await browser.close();

  return restaurantDetails; // Return the extracted data
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const waitForElementToLoad = (selector, retries = 5, delay = 1000) => {
  return new Promise((resolve, reject) => {
    const checkElement = (attempts) => {
      const element = $$(selector);
      if (!element.hasClass("Skeleton-loUWeW") || attempts >= retries) {
        resolve();
      } else {
        setTimeout(() => checkElement(attempts + 1), delay);
      }
    };
    checkElement(0);
  });
};
module.exports = { automateSearch };
