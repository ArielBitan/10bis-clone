import { useEffect, useState } from "react";
import PlacesAutocomplete from "./PlacesAutocomplete";
import { useNavigate } from "react-router-dom";

const FirstContent = () => {
  const [selectedOption, setSelectedOption] = useState<"delivery" | "pickup">(
    "delivery"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const existingAddress = localStorage.getItem("userAddress");
    if (existingAddress) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-[90%] mx-auto bg-black/60 rounded-lg py-16 relative max-w-[1170px]">
      <div>
        <h1 className="mb-6 text-5xl text-white">תן ביס במה שבא לך...</h1>

        <div className="flex items-center justify-center gap-8 mb-6 font-bold">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setSelectedOption("delivery")}
          >
            <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
              <div
                className={`w-5 h-5 rounded-full ${
                  selectedOption === "delivery"
                    ? "bg-orangePrimary"
                    : "bg-white"
                }`}
              />
            </div>
            <span className="ml-2 text-xl text-white">משלוח</span>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setSelectedOption("pickup")}
          >
            <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
              <div
                className={`w-5 h-5 rounded-full ${
                  selectedOption === "pickup" ? "bg-orangePrimary" : "bg-white"
                }`}
              />
            </div>
            <span className="ml-2 text-xl text-white">פיקאפ</span>
          </div>
        </div>

        <div className="relative flex justify-center w-full mb-6">
          <PlacesAutocomplete />
        </div>
      </div>

      <div className="absolute flex justify-center w-full gap-4 mt-8 -bottom-12">
        {[
          "https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/tenbis.png",
          "https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/visa.png",
          "https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/mastercard.png",
          "https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/express.png",
          "https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/diners.png",
        ].map((src, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-12 h-8 "
          >
            <img src={src} alt={`icon-${index}`} className="w-auto h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirstContent;
