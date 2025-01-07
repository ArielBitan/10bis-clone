import { useLocation, Link } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <footer className="bg-footerBG h-[160px]">
      <Link
        to={`/edit-restaurant`}
        state={{ backgroundLocation: location }}
        className="text-white underline"
      >
        <div>wedfwefwefwe</div>
      </Link>
    </footer>
  );
};
export default Footer;
