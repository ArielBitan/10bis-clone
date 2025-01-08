import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Order = () => {
  const order = {
    _id: "64d1f5b6a80b5f0012345678",
    user_id: "64d1f5b6a80b5f0012345679",
    restaurant_id: "64d1f5b6a80b5f0012345680",
    courier_id: "64d1f5b6a80b5f0012345681",
    order_items: ["64d1f5b6a80b5f0012345682", "64d1f5b6a80b5f0012345683"],
    status: "Picked Up",
    delivered_at: "2024-01-06T14:30:00.000Z",
    special_instructions: ["No onions", "Extra cheese", "Well-done cooking"],
    payment_details: {
      method: "Credit Card",
      last4: "1234",
      provider: "Visa",
      transaction_id: "trxn_123456789",
    },
    total_amount: 95.5,
    createdAt: "2024-01-06T12:00:00.000Z",
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <div className="flex">
        <div>id:#{order._id}</div>
        <div></div>
        
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>בקשות מיוחדות</AccordionTrigger>
          <AccordionContent>
            <div>{order.special_instructions.join(", ")}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default Order;
