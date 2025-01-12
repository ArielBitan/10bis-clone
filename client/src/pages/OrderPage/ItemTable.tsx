import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMenuItem } from "@/types/restaurantTypes";

interface TableDemoProps {
  items: IMenuItem[];
}

export const TableDemo: React.FC<TableDemoProps> = ({ items }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>הפריטים שהזמנת</TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-16 h-16"
                />
              </TableCell>
              <TableCell className="text-right">₪{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>מחיר סופי</TableCell>
            <TableCell className="text-right">
              ₪{items.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
