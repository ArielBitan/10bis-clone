const Review = require("../models/review.model");
const { User } = require("../models/user.model");
const Restaurant = require("../models/restaurant.model");

const commentByRating = {
  1: [
    "לא מצדיק את המחיר, התאכזבנו מאוד.",
    "חוויה לא מוצלחת, האוכל הגיע קר וחסר טעם.",
    "הזמנתי משלוח, לקח יותר משעה והאוכל הגיע קר.",
    "מנות קטנות מדי, אבל מאוד טעימות.",
    "מוזיקה רועשת מדי, היה קשה לנהל שיחה.",
  ],
  2: [
    "הציפייה הייתה גבוהה, אבל הביצוע היה בינוני.",
    "האוכל היה סביר, אבל השירות היה איטי מאוד.",
    "מסעדה ממוצעת, לא משהו מיוחד.",
    "האוכל טעים, אבל לא הייתי חוזר שוב.",
    "מחירים יקרים ביחס לגודל המנות, אבל הטעמים טובים.",
  ],
  3: [
    "המקום נחמד, האוכל טוב, אבל לא יוצא דופן.",
    "שירות אדיב, אבל זמן ההמתנה ארוך מדי.",
    "מנות טעימות, אבל המקום היה עמוס ורועש.",
    "חוויה חביבה, לא יותר מזה.",
    "אוכל טרי ושירות בסדר, אבל לא מרגש.",
  ],
  4: [
    "אוכל טרי, מנות מושקעות ושירות נהדר.",
    "המנות היו טעימות והשירות מקצועי.",
    "מקום נחמד עם אווירה טובה ואוכל טעים.",
    "ההמבורגר היה מצוין, אבל הצ'יפס קצת רך.",
    "צוות אדיב ומקצועי, נהנינו מכל רגע.",
  ],
  5: [
    "חוויה מדהימה! בהחלט אחזור שוב.",
    "אוכל מעולה ושירות נהדר! ממליץ בחום.",
    "הקינוחים פשוט מדהימים! שווה כל שקל.",
    "מקום קסום עם אוכל מיוחד ושירות אישי.",
    "השירות היה יוצא מן הכלל, האוכל טעים בטירוף!",
  ],
};

async function generateReviews() {
  try {
    const restaurants = await Restaurant.find({}, "_id");
    const users = await User.find({}, "_id").limit(50); // Get more users to avoid duplicates

    if (!restaurants.length || !users.length) {
      console.log("No restaurants or users found.");
      return;
    }

    let allReviews = [];

    restaurants.forEach((restaurant) => {
      const numReviews = Math.floor(Math.random() * 5) + 1; // 1 to 5 reviews per restaurant

      for (let i = 0; i < numReviews; i++) {
        const rating = Math.floor(Math.random() * 5) + 1;
        const commentOptions = commentByRating[rating];
        const comment =
          commentOptions[Math.floor(Math.random() * commentOptions.length)];
        const user = users[Math.floor(Math.random() * users.length)]._id;

        allReviews.push({
          user_id: user,
          restaurant_id: restaurant._id,
          rating,
          comment,
        });
      }
    });

    await Review.insertMany(allReviews);
    console.log(`${allReviews.length} reviews added successfully!`);
  } catch (error) {
    console.error("Error generating reviews:", error);
  }
}

module.exports = generateReviews;
