import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import { SingleValue } from "react-select";

interface PlacesAutocompleteProps {
  onSelect?: () => void;
}

interface Option {
  value: {
    description: string;
  };
  label: string;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  onSelect,
}) => {
  const navigate = useNavigate();

  const handleSelect = (newValue: SingleValue<Option>) => {
    try {
      // Check if we have a valid selection
      if (!newValue?.value?.description) {
        throw new Error("Invalid address selection");
      }

      const address = newValue.value.description;

      // Store address
      localStorage.setItem("userAddress", address);

      // Verify storage was successful
      const storedAddress = localStorage.getItem("userAddress");
      if (!storedAddress) {
        throw new Error("Failed to store address");
      }

      // Call optional callback
      if (onSelect) {
        onSelect();
      }

      // Only navigate if we have a valid address stored
      navigate("/home");
    } catch (error) {
      console.error("Address selection error:", error);
      // Here you could add user feedback like toast/alert
      // toast.error('Please select a valid address');
    }
  };

  return (
    <div className="w-full bg-white flex items-center rounded-lg shadow-md">
      <FaSearch className="text-xl mr-4 text-gray-500" />
      <div className="w-full">
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_MAPS_API_KEY}
          selectProps={{
            onChange: handleSelect,
            placeholder: "לאן לשלוח את האוכל ?",
            styles: {
              input: (provided) => ({
                ...provided,
                color: "blue",
                width: "100%",
              }),
              option: (provided) => ({
                ...provided,
                color: "blue",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "blue",
              }),
              control: (provided) => ({
                ...provided,
                border: "none",
                boxShadow: "none",
                backgroundColor: "transparent",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                display: "none",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
            },
            options: [
              {
                label: "Pick my address",
                value: { description: "Pick my address" },
              },
            ],
          }}
          apiOptions={{ language: "he", region: "il" }}
        />
      </div>
      <Button
        className="bg-blue-500 p-6"
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
