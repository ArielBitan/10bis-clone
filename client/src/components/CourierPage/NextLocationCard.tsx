import { Navigation, Phone } from "lucide-react";
import React from "react";

interface NextLocationCard {
  name: string;
  address: string | undefined;
  phone: string | undefined;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const NextLocationCard: React.FC<NextLocationCard> = ({
  name,
  address,
  phone,
  icon: Icon,
}) => {
  const openInWaze = () => {
    const destination = encodeURIComponent(address || "");
    window.open(
      `https://www.waze.com/ul?q=${destination}&navigate=yes`,
      "_blank"
    );
  };

  return (
    <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-gray-500" />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">{address}</p>
        </div>
      </div>
      {phone && (
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-2 text-blue-500"
        >
          <Phone className="h-4 w-4" />
          <span className="text-sm">{phone}</span>
        </a>
      )}
      <button
        onClick={openInWaze}
        className="flex items-center w-full justify-center gap-2 flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-semibold transition-colors"
      >
        <Navigation size={16} />
        Waze
      </button>
    </div>
  );
};

export default NextLocationCard;
