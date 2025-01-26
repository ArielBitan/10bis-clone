import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";

interface PlacesAutocompleteProps {
  onSelect?: () => void;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  onSelect,
}) => {
  const navigate = useNavigate();

  const handleSelect = (place: any) => {
    if (place && place.value) {
      const address = place.value.description;
      localStorage.setItem("userAddress", address);
      if (onSelect) {
        onSelect();
      }
      navigate("/home");
    } else {
      console.error("No address selected.");
    }
  };

  return (
    <div className="w-full bg-white flex items-center p-2 rounded-lg shadow-md">
      <FaSearch className="text-xl mr-4 text-gray-500" />
      <div className="w-full">
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_MAPS_API_KEY}
          selectProps={{
            placeholder: "Enter an address...",
            onChange: handleSelect,
            styles: {
              input: (provided) => ({ ...provided, width: "100%" }),
            },
          }}
          apiOptions={{ language: "he", region: "il" }}
        />
      </div>
      <Button
        className="bg-gray-300 p-3 ml-2"
        onClick={() => console.log("Confirm address")}
      >
        <img
          src="https://cdn.10bis.co.il/10bis-spa-static-prod/assets/white-left-arrow-hp-f55b92.svg"
          alt="arrow-image"
          className="w-5"
        />
      </Button>
    </div>
  );
};

export default PlacesAutocomplete;
