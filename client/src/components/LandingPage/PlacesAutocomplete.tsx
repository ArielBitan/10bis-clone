import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { useRef } from "react";

const PlacesAutocomplete = () => {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries: ["places"],
    language: "iw",
    region: "il",
  });

  const handleOnPlacesChange = () => {
    if (!inputRef.current) return;
    const places = inputRef.current.getPlaces();
    if (places && places.length > 0) {
      const address = places[0].formatted_address;
      console.log(address);
    }
  };

  return (
    <div className="w-full bg-white flex items-center  py-1.5 px-3 border border-gray-300">
      {isLoaded && (
        <>
          <img
            src="https://www.10bis.co.il/Areas/G12/Content/Images/HomePage/geo_grey.png"
            alt="geo icon"
          />
          <div className="w-full">
            <StandaloneSearchBox
              onLoad={(ref) => (inputRef.current = ref)}
              onPlacesChanged={handleOnPlacesChange}
            >
              <input
                type="text"
                placeholder="לאן לשלוח את האוכל?"
                className="w-full outline-none placeholder-gray-500 pl-2 pr-4 py-1 "
              />
            </StandaloneSearchBox>
          </div>
        </>
      )}
    </div>
  );
};

export default PlacesAutocomplete;
