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
        <TableHeader>הפריטים שהזמנת</TableHeader>
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
              <TableCell className="text-right">₪{item._id.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>מחיר סופי</TableCell>
            <TableCell className="text-right">
              ₪{items.reduce((acc, item) => acc + item._id.price, 0).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
