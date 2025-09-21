import {
  BookOpen,
  Briefcase,
  Bug,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Heart,
  LayoutDashboard,
  ShoppingBag,
  User,
  Clock,
  Star,
  FileText,
  Users,
  Shield,
  MessageSquare,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
const navigationItems = [
  {
    title: "Favorites",
    items: [
      { title: "Order List", url: "/orders", icon: FileText },
      { title: "Projects", url: "/projects", icon: Briefcase },
    ],
  },
  {
    title: "Recently",
    items: [
      { title: "Order List", url: "/orders", icon: FileText },
      { title: "Projects", url: "/projects", icon: Briefcase },
    ],
  },
];

const dashboardItems = [
  {
    title: "eCommerce",
    url: "/ecommerce/",
    icon: ShoppingBag,
    isActive: true,
  },
  {
    title: "Order List",
    url: "/orders",
    icon: FileText,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Briefcase,
  },
  {
    title: "Online Courses",
    url: "/courses",
    icon: BookOpen,
  },
];

const pageItems = [
  {
    title: "User Profile",
    icon: User,
    subItems: [
      { title: "Overview", url: "/profile" },
      { title: "Projects", url: "/profile/projects" },
      { title: "Campaigns", url: "/profile/campaigns" },
      { title: "Documents", url: "/profile/documents" },
      { title: "Followers", url: "/profile/followers" },
    ],
  },
  {
    title: "Account",
    url: "/account",
    icon: Shield,
  },
  {
    title: "Corporate",
    url: "/corporate",
    icon: Briefcase,
  },
  {
    title: "Blog",
    url: "/blog",
    icon: FileText,
  },
  {
    title: "Social",
    url: "/social",
    icon: Share2,
  },
];

interface CollapsibleMenuProps {
  item: {
    title: string;
    icon: any;
    subItems?: { title: string; url: string }[];
    url?: string;
  };
}

function CollapsibleMenu({ item }: CollapsibleMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { open } = useSidebar();

  const hasActiveSubItem = item.subItems?.some(
    (subItem) => location.pathname === subItem.url
  );

  if (item.subItems) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full justify-between",
            hasActiveSubItem && "bg-accent text-accent-foreground"
          )}
        >
          <div className="flex items-center gap-2">
            <item.icon className="h-4 w-4" />
            {open && <span>{item.title}</span>}
          </div>
          {open &&
            (isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            ))}
        </SidebarMenuButton>
        {isOpen && open && (
          <SidebarMenuSub>
            {item.subItems.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <NavLink
                    to={subItem.url}
                    className={({ isActive }) =>
                      cn(
                        "w-full text-sm",
                        isActive &&
                          "bg-accent text-accent-foreground font-medium"
                      )
                    }
                  >
                    {subItem.title}
                  </NavLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        )}
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink
          to={item.url!}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2",
              isActive && "bg-accent text-accent-foreground font-medium"
            )
          }
        >
          <item.icon className="h-4 w-4" />
          {open && <span>{item.title}</span>}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function Sidebar() {
  const { open } = useSidebar();

  return (
    <SidebarComponent className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <User className="h-8 w-8" />
          {open && <span className="text-lg font-semibold">ByeWind</span>}
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4">
        {/* Favorites and Recently sections */}
        {navigationItems.map((section) => (
          <SidebarGroup key={section.title}>
            {open && (
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3 py-2">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2 text-sm",
                            isActive &&
                              "bg-accent text-accent-foreground font-medium"
                          )
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {open && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Dashboards section */}
        <SidebarGroup>
          {open && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3 py-2">
              Dashboards
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url!}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 text-sm",
                          isActive &&
                            "bg-accent text-accent-foreground font-medium"
                        )
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Pages section */}
        <SidebarGroup>
          {open && (
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-3 py-2">
              Pages
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {pageItems.map((item) => (
                <CollapsibleMenu key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
}
