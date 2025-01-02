import LogInModal from "./modals/LoginModal";

const SecondContent = () => {
  return (
    <div>
      <div className="flex flex-col w-full xl:flex-row-reverse">
        <img
          src="https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_Phones.png"
          alt="תמונה של האפליקציה"
          className="flex-1 object-cover w-full h-full"
        />
        <div className="flex flex-col items-center flex-1 pb-24 text-white bg-orangePrimary">
          <h1 className="my-6 text-4xl ">האפליקצייה שלנו</h1>
          <p className="w-[90%] text-xl">
            תן ביס זה המקום אליו כולם באים כשהם רעבים - לא משנה אם זה צהריים
            במשרד, ארוחת ערב בבית או אפילו בוקר בחוף הים, פשוט נכנסים לתן ביס
            ומזמינים את מה שבא לכם מתוך מאגר עצום של מסעדות בכל רחבי הארץ. המטרה
            שלנו היא שיהיה לכם נעים בבטן ובכיס!
          </p>
          <div className="flex gap-6 mt-10">
            <img
              src="https://www.10bis.co.il/Areas/G12/Content/Images/Shared/AppStore.png"
              alt=""
              className="h-12"
            />
            <img
              src="https://www.10bis.co.il/Areas/G12/Content/Images/Shared/GooglePlay.png"
              alt=""
              className="h-12"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse items-center justify-center w-full h-full pb-2 xl:flex-row">
        <div className="flex flex-col items-center justify-center flex-1 px-4 text-center xl:flex-none xl:w-3/5">
          <h1 className="mb-4 text-4xl text-orangePrimary md:text-5xl lg:text-6xl ">
            פעם ראשונה בתן ביס?
          </h1>
          <p className="mb-2 text-lg text-black md:text-xl lg:text-2xl">
            בתכל'ס, כל מה שאתם רוצים זה לאכול אוכל טעים, העיקר שיגיע מהר ובכל
            זמן שבא לכם!
          </p>
          <p className="mb-4 text-lg text-black md:text-xl lg:text-2xl">
            אז בקליק אחד תוכלו לראות את כל המסעדות הקרובות אליכם מתוך 5,000
            המסעדות שעובדות אתנו, ליהנות ממליון מבצעים ולשלם באופן מאובטח ופשוט.
          </p>
          <LogInModal rolee="signup" />
        </div>

        <div className="flex items-center justify-center flex-1 w-full xl:w-2/5">
          <img
            src="https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_Sushi_s.jpg"
            alt="Sushi"
            className="max-h-[400px] w-full object-cover xl:max-h-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SecondContent;
