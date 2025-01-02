import SecondContent from "@/components/LandingPage/SecondContent";
import FirstContent from "../../components/LandingPage/FirstContent";
import ThirdContent from "@/components/LandingPage/ThirdContent";
import Fourth from "@/components/LandingPage/Fourth";
import LogInModal from "@/components/LandingPage/modals/LoginModal.tsx";
// import AnimatedCard from "./LogInAnim";

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden">
      {/* 1stimg */}
      <div
        className="relative min-h-screen bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url(https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_MainImage.jpg)",
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute transform -translate-x-10 -translate-y-10 top-20 right-[10%]">
            <img
              src="https://www.10bis.co.il/Areas/G12/Content/Images/Layout/Logo_Orange.svg"
              alt=""
            />
          </div>

          <div className="absolute transform z-30 -translate-x-10 -translate-y-10 top-20 left-[10%]">
            <LogInModal />
            {/* <AnimatedCard /> */}
            {/* </div> */}
          </div>

          <div className="relative z-10 flex items-center justify-center min-h-screen">
            <div className="w-full">
              <FirstContent />
            </div>
          </div>
        </div>
      </div>
      <SecondContent />
      {/* 2ndimg  */}
      <div
        className="relative bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url(https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_Pizza_s.jpg)",
          height: "66vh",
        }}
      >
        <div className="absolute inset-0 ">
          <div className="relative z-10 p-8 mt-20 text-white">
            <div className="text-5xl ">פתרונות לארגונים וחברות</div>
            <p className="p-0 m-0 mt-4 text-lg">
              תן ביס הינה החברה הגדולה והמובילה בארץ בפתרונות הסעדה ובין
              לקוחותיה מעל ל-3,500 חברות. יותר מ 80% מחברות ההיי טק בישראל נמנות
              בין לקוחות תן ביס
              <br />
              תן ביס הינה מובילה טכנולוגית בתחום ומציעה את מערכת ההזמנות והסליקה
              המתקדמת ביותר עם ההטבות והמבצעים המשתלמים ביותר גם לעובד וגם
              לחברה.
            </p>
          </div>
        </div>
      </div>
      <ThirdContent />
      {/* img3 */}
      <div
        className="relative bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url(https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_RestaurantOwners.jpg)",
          height: "70vh",
        }}
      >
        <div className="absolute inset-0 ">
          <div className="relative z-10 p-8 mt-20 text-3xl text-white ">
            <h1 className="text-4xl mb-[50px]">פתרונות למסעדנים</h1>
            <p className="max-w-[560px]">
              רוצים להגדיל את המכירות? יש לנו את כל הפתרונות והשירותים להבאת
              לקוחות חדשים וחוזרים!
            </p>
          </div>
        </div>
      </div>
      <Fourth />
      <footer className="bg-footerBG h-[160px]"></footer>
    </div>
  );
};

export default LandingPage;
