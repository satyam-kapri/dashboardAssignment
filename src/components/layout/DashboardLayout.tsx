import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { NotificationPanel } from "./NotificationPanel";
import { useDashboardStore } from "@/store/dashboardStore";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarCollapsed, notificationPanelOpen, toggleSidebar } =
    useDashboardStore();

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider
        open={!sidebarCollapsed}
        onOpenChange={() => toggleSidebar()}
      >
        {" "}
        <div className="flex min-h-screen w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <main className="flex-1 flex">
              <div className="flex-1 p-6 overflow-auto">{children}</div>
            </main>
          </div>
          {notificationPanelOpen && <NotificationPanel />}
        </div>
      </SidebarProvider>
    </div>
  );
}
