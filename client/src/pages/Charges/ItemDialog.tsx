import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableDemo } from "../OrderPage/ItemTable";
import { IOrderItem } from "@/types/orderTypes";

interface TableDemoProps {
  items: IOrderItem[];
}

export const ItemDialog: React.FC<TableDemoProps> = ({ items }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{items.length}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>מוצרים</DialogTitle>
        </DialogHeader>
        <TableDemo items={items} />
      </DialogContent>
    </Dialog>
  );
};
