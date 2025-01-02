import { Button } from "../ui/button";
import Details from "./Details";

const ThirdContent = () => {
  const data = [
    {
      title: "הזמנת משלוחים",
      img: "https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_Delivery_Tenbis.png",
      content:
        "הזמנת משלוחים ופיק אפ למשרד באמצעות אתר אינטרנט ואפליקציית מובייל, מהמתקדמים בעולם, המאפשרים הזמנות של כל עובד לבד או הזמנות מרוכזות של מספר עובדים, הזמנה חוזרת (מהירה), הטבות אוטומטיות (בלי צורך להקליק קופון) ועוד...",
    },
    {
      title: "התממשקות לתוכנות שכר צד שלישי",
      img: "https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_System_Tenbis.png",
      content:
        "יש לנו נסיון גדול בהתממשקות לתוכנות שכר ותוכנות יעודייות לניהול משאבי אנוש. אנו מייעלים תהליכים בכל הקשור להתחשבנות כספית בין חברה לעובד.",
    },
    {
      title: "הטבות לעובדים",
      img: "https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_discount_Tenbis.png",
      content:
        "מגוון רחב של הטבות ייחודיות גם למשלוחים וגם בחיוב בכרטיס תן ביס המהווה כח הקנייה הכי גדול בישראל בתחום המסעדות.",
    },
    {
      title: "שליטה מוחלטת על הוצאות האוכל של החברה",
      img: "https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_ControlNew_Tenbis.png",
      content:
        "באמצעות מערכת חיוב מתקדמת המאפשרת מעקב מתמיד עם התאמה מלאה לתנאים ומדיניות החברה.",
    },
    {
      title: "שירות לקוחות",
      img: "https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_CallCenter_Tenbis.png",
      content: "אנו פועלים 7 ימים בשבוע עד חצות.",
    },
    {
      title: "אתר כשר",
      img: "https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_Portals_Tenbis.png",
      content: "מציג מסעדות כשרות בלבד ומידע מפורט ועדכני על כשרויות המסעדות.",
    },
    {
      title: "Paypo - מערכת ניהול וסליקה בחדרי אוכל",
      img: "https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_PayPo_Tenbis.png",
      content: "לתן ביס מערכת ייחודית לניהול הסליקה והמידע בחדר האוכל בחברה.",
    },
  ];

  return (
    <div className="pb-20">
      <div className="grid grid-cols-4 grid-rows-2 pb-10 pt-4 gap-0 mb-10 border-b-[0.5px] border-gray-300">
        <div className="relative flex justify-center col-start-1 row-start-1">
          <img
            src="https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_EBayLogo.png"
            alt="eBay Logo"
            className="w-[80%] mx-auto"
          />
        </div>

        <div className="relative flex justify-center col-start-2 row-start-2">
          <img
            src="https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_AmdocsLogo.png"
            alt="Amdocs Logo"
            className="w-[80%] mx-auto"
          />
        </div>

        <div className="relative flex justify-center col-start-3 row-start-1">
          <img
            src="https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_MobileyeLogo.png"
            alt="Mobileye Logo"
            className="w-[80%] mx-auto"
          />
        </div>

        <div className="relative flex justify-center col-start-4 row-start-2">
          <img
            src="https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_KeshetLogo.png"
            alt="Keshet Logo"
            className="w-[80%] mx-auto"
          />
        </div>
      </div>
      <div className="mb-10 mr-10 text-lg">
        בתן ביס אנו שמים את העובד במרכז ומשקיעים הרבה משאבים על מנת לאפשר את
        הדרך היעילה ביותר להזמין משלוח למשרד וגם לשלם באמצעות כרטיס תן ביס במעל
        ל5,000 מסעדות בפריסה ארצית.
      </div>

      {data.map((object) => (
        <Details obj={object} key={object.title} />
      ))}
      <div className="flex flex-col gap-24 mt-20 md:flex-row md:justify-center">
        <div className="relative max-w-md p-4 mr-10 bg-gray-200 border border-gray-300 rounded-lg shadow-sm">
          <div className="absolute top-[-16px] right-[10px] text-[80px] font-bold text-red-600">
            "
          </div>
          <img
            src="https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/GigyaLogo150.png"
            alt="Gigya Logo"
            className="h-20"
          />
          <div className="text-left">
            <p className="mb-4 leading-relaxed text-gray-700">
              "תן ביס הינה חלק מהתרבות של גיגיה. רוב העובדים מזמינים יחד ממגוון
              עצום של מסעדות, תמיד יש הנחות ותהליך ההזמנה מאוד יעיל."
            </p>
            <div className="font-bold text-gray-900">חלי אלישרוב</div>
            <div className="text-sm text-gray-500">נשיא ומייסד שותף, גיגיה</div>
          </div>
          <div className="absolute bottom-0 w-0 h-0 transform translate-y-full border-t-8 border-l-8 border-r-8 left-12 border-l-transparent border-r-transparent border-t-gray-300"></div>
        </div>
        <div className="relative max-w-md p-4 mr-10 bg-gray-200 border border-gray-300 rounded-lg shadow-sm">
          <div className="absolute top-[-16px] right-[10px] text-[80px] font-bold text-red-600">
            "
          </div>
          <img
            src="https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/EBayLogo150.png"
            alt="eBay Logo"
            className="h-20"
          />
          <div className="text-left">
            <p className="mb-4 leading-relaxed text-gray-700">
              "נראה שברוטשילד לכולם יש את הכרטיס האדום, ההנאה מהאוכל זה חלק ממה
              שהופך את האיזור ל'שדרת הסיליקון' של תל אביב ומושך את כולנו. כל
              הכבוד לצוות בתן ביס שלא מפסיק לשים לב לפרטים הקטנים ולמגוון
              המסעדות והמבצעים."
            </p>
            <div className="font-bold text-gray-900">רון גורה</div>
            <div className="text-sm text-gray-500">
              מנהל מרכז החדשנות של eBay
            </div>
          </div>
          <div className="absolute bottom-0 w-0 h-0 transform translate-y-full border-t-8 border-l-8 border-r-8 left-12 border-l-transparent border-r-transparent border-t-gray-300"></div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="w-[70%] max-w-[700px] text-3xl my-10 p-7 md:text-3xl lg:text-4xl">
          לפרטים נוספים
        </Button>
      </div>
    </div>
  );
};

export default ThirdContent;
