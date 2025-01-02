import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const clickHandle = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center text-xl">
      <img
        src="https://cdn.10bis.co.il/10bis-spa-static-prod/assets/400_500_visual-a1072b.svg"
        alt="spaceship"
      />
      <div className="tracking-[0.1em] mt-1 mb-5  font-bold  text-bold">
        <h1>הדף שחיפשת נחטף על ידי חייזרים</h1>
        <h1>ברצונך לחזור לדף הבית שלנו?</h1>
      </div>
      <button
        onClick={clickHandle}
        className="py-1 text-white bg-blue-500 px-14 hover:bg-blue-800"
      >
        בחזרה אל עמוד הבית
      </button>
    </div>
  );
};

export default NotFound;
