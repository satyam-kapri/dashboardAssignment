import {
  Search,
  Bell,
  Sun,
  Moon,
  PanelLeft,
  PanelRight,
  Star,
  Clock,
} from "lucide-react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "@/components/ThemeProvider";
import { useDashboardStore } from "@/store/dashboardStore";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { notifications, toggleSidebar, toggleNotificationPanel } =
    useDashboardStore();
  const location = useLocation(); // Get current location

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Function to get the display name for the current route
  const getRouteDisplayName = (pathname: string) => {
    switch (pathname) {
      case "/":
        return "Order List";
      case "/dashboard":
        return "Dashboard";
      case "/orders":
        return "Order List";
      case "/ecommerce":
        return "E-commerce";
      default:
        return "Default";
    }
  };

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section: Sidebar Toggle and Star Icon */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-9 w-9"
          >
            <PanelLeft className="h-4 w-4" />
            <span className="sr-only">Toggle Left Sidebar</span>
          </Button>

          {/* Star Icon */}
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Star className="h-4 w-4" />
          </Button>
        </div>

        {/* Center Section: Dynamic Route Name */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mx-auto">
          <span>Dashboards</span>
          <span>/</span>
          <span className="text-foreground font-semibold">
            {getRouteDisplayName(location.pathname)}
          </span>
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search..." className="pl-10 w-64 bg-muted/50" />
            <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              ⌘/
            </kbd>
          </div>

          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Timer Icon */}
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Clock className="h-4 w-4" />
          </Button>

          {/* Notification Button */}
          <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <Bell className="h-4 w-4" />
          </Button>

          {/* Panel Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleNotificationPanel}
            className="h-9 w-9"
          >
            <PanelRight className="h-4 w-4" />
            <span className="sr-only">Toggle Right Sidebar</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
