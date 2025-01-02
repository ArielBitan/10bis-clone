import { Button } from "../ui/button";

const Fourth = () => {
  return (
    <div className="mt-10">
      <h1 className="text-3xl text-orangePrimary mr-[10%]">
        כל הסיבות לצרף את המסעדה לתן ביס:
      </h1>
      <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-[60px]">
        <div>
          <div className="flex mt-10 text-lg">
            <img
              src="https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_Customers_Tenbis.png"
              alt=""
            />{" "}
            <p>מאגר של מאות אלפי לקוחות פוטנצאיליים בכל רחבי הארץ</p>
          </div>
          <div className="flex mt-10 text-lg">
            <img
              src="https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_Web_mobile_Tenbis.png"
              alt=""
            />{" "}
            <p>מאגר של מאות אלפי לקוחות פוטנצאיליים בכל רחבי הארץ</p>
          </div>
        </div>
        <div>
          <div className="flex mt-10 text-lg">
            <img
              src="https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_Interface_Tenbis.png"
              alt=""
            />{" "}
            <p>מאגר של מאות אלפי לקוחות פוטנצאיליים בכל רחבי הארץ</p>
          </div>
          <div className="flex mt-10 text-lg">
            <img
              src="https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/HomePage_Newsletter_Tenbis.png"
              alt=""
            />{" "}
            <p>מאגר של מאות אלפי לקוחות פוטנצאיליים בכל רחבי הארץ</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="w-[95%] max-w-[700px] text-3xl my-10 p-7 md:text-3xl lg:text-4xl">
          לפרטים נוספים{" "}
        </Button>
      </div>
    </div>
  );
};

export default Fourth;
