import { useState } from "react";

const AnimatedCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="px-4 py-2 z-30 text-white bg-blue-500 rounded hover:bg-blue-600 hover:cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        פתח מודאל
      </button>

      {/* מודאל */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)} // סגירה בלחיצה על הרקע
          ></div>
          <div
            className="fixed left-1/2 top-1/4 w-[90%] max-w-lg bg-white p-6 rounded-lg shadow-lg 
          transform opacity-0 scale-95 transition-all duration-500 ease-in-out motion-scale-in-[0.5] motion-translate-x-in-[-1%] motion-translate-y-in-[-70%] motion-opacity-in-[0%] motion-blur-in-[5px] motion-duration-[0.35s] motion-duration-[0.53s]/scale motion-duration-[0.53s]/translate"
            style={{
              transform: "translate(-50%, -50%)",
              opacity: 1,
              scale: 1,
            }}
          >
            <h2 className="text-xl font-bold">מודאל</h2>
            <p className="mt-2 text-gray-600">זהו המודאל שלך שיורד מלמעלה!</p>
            {/* כפתור סגירה */}
            <button
              className="absolute text-black top-2 left-2"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AnimatedCard;
