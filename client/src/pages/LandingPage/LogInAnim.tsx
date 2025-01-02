import { useState } from "react";
// fsdvvs

const AnimatedCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={() => setIsOpen(true)}
      >
        פתח מודאל
      </button>

      {/* רקע כהה כשמודאל פתוח */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setIsOpen(false)} // סגירה בלחיצה על הרקע
        ></div>
      )}

      {/* מודאל */}
      <div
        className={`fixed left-1/2 top-1/4 w-[90%] max-w-lg bg-white p-6 rounded-lg shadow-lg 
          transition-all 
          ${
            isOpen
              ? "motion-scale-in-[1] motion-translate-y-in-[0%] motion-opacity-in-[100%]"
              : "motion-scale-in-[0.9] motion-translate-y-in-[-100%] motion-opacity-in-[0%]"
          }`}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* כפתור סגירה */}
        <button
          className="absolute text-black top-2 left-2"
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>

        {/* תוכן המודאל */}
        <h2 className="text-xl font-bold">מודאל</h2>
        <p className="mt-2 text-gray-600">זהו המודאל שלך שיורד מלמעלה!</p>
      </div>
    </div>
  );
};

export default AnimatedCard;
