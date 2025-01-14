import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrderItem } from "@/types/orderTypes";

interface TableDemoProps {
  items: IOrderItem[];
}

export const TableDemo: React.FC<TableDemoProps> = ({ items }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              הפריטים שהזמנת
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>שם</TableCell>
            <TableCell>תיאור</TableCell>
            <TableCell className="text-center">תמונה</TableCell>
            <TableCell className="text-right">מחיר × כמות</TableCell>
            <TableCell className="text-right">סה״כ</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id.name}>
              <TableCell className="font-medium">{item._id.name}</TableCell>
              <TableCell>{item._id.description}</TableCell>
              <TableCell className="text-center">
                <img
                  src={item._id.image}
                  alt={item._id.name}
                  className="object-cover w-16 h-16"
                />
              </TableCell>
              <TableCell className="text-right">
                ₪{item._id.price.toFixed(2)} × {item.quantity}
              </TableCell>
              <TableCell className="text-right">
                ₪{(item._id.price * item.quantity).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>מחיר סופי</TableCell>
            <TableCell className="text-right">
              ₪
              {items
                .reduce((acc, item) => acc + item._id.price * item.quantity, 0)
                .toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
