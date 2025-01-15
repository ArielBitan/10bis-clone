import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface OrderMapProps {
  userLocation: string;
  restaurantLocation: number[];
}

const OrderMap: React.FC<OrderMapProps> = ({
  userLocation,
  restaurantLocation,
}) => {
  const API_KEY = import.meta.env.VITE_MAPS_API_KEY;
  const [userCoords, setUserCoords] = useState<{
    lng: number;
    lat: number;
  } | null>(null);

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  // Dynamically adjust the screen size based on window width
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [lng, lat] = restaurantLocation;
  useEffect(() => {
    const loadGeocode = async () => {
      const loader = new Loader({
        apiKey: API_KEY,
        version: "weekly",
        libraries: ["places", "geocoding"],
      });

      try {
        await loader.importLibrary("places");
        await loader.importLibrary("geocoding");

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: userLocation }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const location = results[0].geometry.location;
            setUserCoords({
              lng: location.lng(),
              lat: location.lat(),
            });
          }
        });
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    loadGeocode();
  }, [userLocation, API_KEY]);

  if (typeof google === "undefined") {
    return <div>Loading Google Maps...</div>;
  }

  const restaurantIcon = {
    url: "../../../data/restaurant (1).png",
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 40),
  };

  const userIcon = {
    url: "../../../data/home.png",
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 40),
  };

  if (!API_KEY) {
    return <div>API key not found</div>;
  }

  const mapWidth = screenWidth < 1360 ? "85vw" : "40vw";

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: mapWidth, height: "40vh" }}
        defaultCenter={{ lat, lng }}
        defaultZoom={16}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        colorScheme="DARK"
        clickableIcons={false}
      >
        {/* Restaurant marker */}
        <Marker icon={restaurantIcon} position={{ lat, lng }} />

        {/* User location marker */}
        {userCoords && <Marker icon={userIcon} position={userCoords} />}
      </Map>
    </APIProvider>
  );
};

export default OrderMap;
