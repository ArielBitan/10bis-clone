import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";

interface PlacesAutocompleteProps {
  onSelect?: () => void;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  onSelect,
}) => {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries: ["places"],
    language: "iw",
    region: "il",
  });

  const saveUserAddress = () => {
    if (!inputRef.current) {
      console.error("SearchBox not loaded yet.");
      return;
    }
    const places = inputRef.current.getPlaces();
    if (places && places.length > 0) {
      const address = places[0].formatted_address;
      if (address) {
        localStorage.setItem("userAddress", address);
        if (onSelect) {
          onSelect();
        }
        navigate("/home");
      } else {
        console.error("No address found in selected place.");
      }
    } else {
      console.error("No places found.");
    }
  };

  return (
    <div className="w-full bg-white flex items-center">
      {isLoaded && (
        <>
          <FaSearch className="text-xl mr-4" />
          <div className="w-full">
            <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)}>
              <input
                type="text"
                placeholder="לאן לשלוח את האוכל?"
                className="w-full outline-none placeholder-gray-700 pl-2 pr-4 py-1"
              />
            </StandaloneSearchBox>
          </div>
          <Button className="bg-gray-300 p-6" onClick={saveUserAddress}>
            <img
              src="https://cdn.10bis.co.il/10bis-spa-static-prod/assets/white-left-arrow-hp-f55b92.svg"
              alt="arrow-image"
              className="w-5"
            />
          </Button>
        </>
      )}
    </div>
  );
};

export default PlacesAutocomplete;
