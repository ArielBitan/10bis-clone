import {
  AlertCircle,
  CheckCircle,
  MapPin,
  Navigation,
  Package,
  Phone,
  User,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { IOrder } from "@/types/orderTypes";

interface IActiveOrderProps {
  activeOrder?: IOrder;
}

const ActiveOrder: React.FC<IActiveOrderProps> = ({ activeOrder }) => {
  return (
    <div className="p-4 space-y-4">
      {activeOrder ? (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Order Status */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">
                  הזמנה נוכחית #{activeOrder._id}
                </h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {activeOrder.status === "pickup" ? "Pickup" : "Delivery"}
                </span>
              </div>

              {/* Timeline */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex flex-col items-center">
                  <Package className="h-6 w-6 text-green-500" />
                  <span>פיק-אפ</span>
                </div>
                <div className="h-1 flex-1 bg-gray-200 mx-2">
                  <div className="h-full bg-green-500 w-1/3"></div>
                </div>
                <div className="flex flex-col items-center">
                  <Navigation className="h-6 w-6 text-gray-400" />
                  <span>משלוח</span>
                </div>
              </div>

              {/* Restaurant Details */}
              <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{activeOrder.restaurant_id}</p>
                    <p className="text-sm text-gray-500">
                      {activeOrder.restaurant_id}
                    </p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-blue-500">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{activeOrder.restaurant_id}</span>
                </button>
              </div>

              {/* Customer Details */}
              <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{activeOrder.user_id._id}</p>
                    <p className="text-sm text-gray-500">
                      {activeOrder.user_id.first_name}
                    </p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-blue-500">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{activeOrder.user_id.phone}</span>
                </button>
              </div>

              {/* Order Items */}
              <div className="space-y-2">
                <h3 className="font-medium">פריטי הזמנה:</h3>
                <ul className="text-sm text-gray-600">
                  {activeOrder.order_items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button className="w-full py-3 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  {activeOrder.status === "pickup" ? "אשר איסוף" : "אשר משלוח"}
                </button>
                <button className="w-full py-3 border border-red-500 text-red-500 rounded-lg flex items-center justify-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  דיווח על תקלה
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>אין הזמנה נוכחית </div>
      )}
    </div>
  );
};

export default ActiveOrder;
