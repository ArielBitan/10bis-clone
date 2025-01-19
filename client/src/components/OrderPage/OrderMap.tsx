import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useSocket } from "../context/socketContext";

interface OrderMapProps {
  userLocation: string;
  restaurantLocation: number[];
}

const OrderMap: React.FC<OrderMapProps> = ({
  userLocation,
  restaurantLocation,
}) => {
  const { courierLocation } = useSocket();
  const API_KEY = import.meta.env.VITE_MAPS_API_KEY;
  const [userCoords, setUserCoords] = useState<{
    lng: number;
    lat: number;
  } | null>(null);
  const [restaurantIcon, setRestaurantIcon] = useState<google.maps.Icon | null>(
    null
  );
  const [userIcon, setUserIcon] = useState<google.maps.Icon | null>(null);
  const [courierIcon, setCourierIcon] = useState<google.maps.Icon | null>(null);
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
        setRestaurantIcon({
          url: "/restaurant (1).png",
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 40),
        });

        setUserIcon({
          url: "/home.png",
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 40),
        });
        setCourierIcon({
          url: "/shipping-location.png",
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 40),
        });
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    loadGeocode();
  }, [userLocation, API_KEY]);

  if (!API_KEY) {
    return <div>API key not found</div>;
  }
  const mapWidth = screenWidth < 660 ? "85vw" : "40vw";
  const mapHeight = screenWidth < 660 ? "40vh" : "80vh";
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: mapWidth, height: mapHeight }}
        defaultCenter={{ lat, lng }}
        defaultZoom={16}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        colorScheme="DARK"
        clickableIcons={false}
        mapId={import.meta.env.VITE_CUSTOM_MAP_ID}
      >
        {/* Restaurant marker */}
        <Marker icon={restaurantIcon} position={{ lat, lng }} />

        {/* User location marker */}
        {userCoords && <Marker icon={userIcon} position={userCoords} />}

        {/* Courier location marker */}
        {courierLocation && (
          <Marker icon={courierIcon} position={courierLocation} />
        )}
      </Map>
    </APIProvider>
  );
};

export default OrderMap;
