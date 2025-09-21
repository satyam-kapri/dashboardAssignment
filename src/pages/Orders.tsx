import { useState } from "react";
import {
  Plus,
  Filter,
  ArrowUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { useDashboardStore } from "@/store/dashboardStore";
import { cn } from "@/lib/utils";

const statusConfig = {
  "in-progress": {
    label: "In Progress",
    dotColor: "bg-blue-500",
    textColor: "text-blue-700",
  },
  complete: {
    label: "Complete",
    dotColor: "bg-green-500",
    textColor: "text-green-700",
  },
  pending: {
    label: "Pending",
    dotColor: "bg-orange-500",
    textColor: "text-orange-700",
  },
  approved: {
    label: "Approved",
    dotColor: "bg-purple-500",
    textColor: "text-purple-700",
  },
  rejected: {
    label: "Rejected",
    dotColor: "bg-gray-500",
    textColor: "text-gray-700",
  },
};

export default function Orders() {
  const { orders } = useDashboardStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredOrders = orders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleAllOrders = () => {
    setSelectedOrders(
      selectedOrders.length === currentOrders.length
        ? []
        : currentOrders.map((order) => order.id)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Order List</h1>
      </div>

      <div className="chart-container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button size="sm" className="h-8">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-8"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedOrders.length === currentOrders.length &&
                    currentOrders.length > 0
                  }
                  onCheckedChange={toggleAllOrders}
                />
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Order ID
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                User
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Project
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Address
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Date
              </TableHead>
              <TableHead className="text-muted-foreground font-medium">
                Status
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => toggleOrderSelection(order.id)}
                  />
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {order.orderId}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={order.user.avatar}
                        alt={order.user.name}
                      />
                      <AvatarFallback>
                        {order.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-foreground">{order.user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-foreground">
                  {order.project}
                </TableCell>
                <TableCell className="text-foreground">
                  {order.address}
                </TableCell>
                <TableCell className="text-muted-foreground flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {order.date}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        statusConfig[order.status].dotColor
                      )}
                    ></span>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        statusConfig[order.status].textColor
                      )}
                    >
                      {statusConfig[order.status].label}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="h-8 w-8 p-0"
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
