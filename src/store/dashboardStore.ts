import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "online" | "offline" | "away";
}

export interface DashboardStats {
  customers: {
    value: number;
    change: number;
    trend: "up" | "down";
  };
  orders: {
    value: number;
    change: number;
    trend: "up" | "down";
  };
  revenue: {
    value: number;
    change: number;
    trend: "up" | "down";
  };
  growth: {
    value: number;
    change: number;
    trend: "up" | "down";
  };
}

export interface ChartData {
  name: string;
  projected: number;
  actual: number;
}

export interface RevenueData {
  name: string;
  current: number;
  previous: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  amount: number;
}

export interface Notification {
  id: string;
  type: "bug" | "user" | "activity";
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar?: string;
}

export interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  time: string;
  type: "bug" | "release" | "data" | "page";
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
}

export interface Order {
  id: string;
  orderId: string;
  user: {
    name: string;
    avatar: string;
  };
  project: string;
  address: string;
  date: string;
  status: "in-progress" | "complete" | "pending" | "approved" | "rejected";
}

interface DashboardState {
  sidebarCollapsed: boolean;
  notificationPanelOpen: boolean; // New state for right sidebar
  theme: "light" | "dark";
  currentUser: User;
  stats: DashboardStats;
  chartData: ChartData[];
  revenueData: RevenueData[];
  products: Product[];
  orders: Order[];
  notifications: Notification[];
  activities: Activity[];
  contacts: Contact[];

  // Actions
  toggleSidebar: () => void;
  toggleNotificationPanel: () => void; // New action for right sidebar
  toggleTheme: () => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  sidebarCollapsed: false,
  notificationPanelOpen: true, // Default to open
  theme: "light",
  currentUser: {
    id: "1",
    name: "John Doe",
    email: "john@byewind.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    status: "online",
  },

  stats: {
    customers: { value: 3781, change: 11.01, trend: "up" },
    orders: { value: 1219, change: -0.03, trend: "down" },
    revenue: { value: 695, change: 15.03, trend: "up" },
    growth: { value: 30.1, change: 6.08, trend: "up" },
  },

  chartData: [
    { name: "Jan", projected: 15000, actual: 12000 },
    { name: "Feb", projected: 18000, actual: 16000 },
    { name: "Mar", projected: 20000, actual: 18500 },
    { name: "Apr", projected: 22000, actual: 21000 },
    { name: "May", projected: 25000, actual: 23000 },
    { name: "Jun", projected: 27000, actual: 26000 },
  ],

  revenueData: [
    { name: "Jan", current: 10000, previous: 8000 },
    { name: "Feb", current: 15000, previous: 12000 },
    { name: "Mar", current: 12000, previous: 14000 },
    { name: "Apr", current: 18000, previous: 15000 },
    { name: "May", current: 20000, previous: 18000 },
    { name: "Jun", current: 22000, previous: 19000 },
  ],

  products: [
    {
      id: "1",
      name: "ASOS Ridley High Waist",
      price: 79.49,
      quantity: 82,
      amount: 6518.18,
    },
    {
      id: "2",
      name: "Marco Lightweight Shirt",
      price: 128.5,
      quantity: 37,
      amount: 4754.5,
    },
    {
      id: "3",
      name: "Half Sleeve Shirt",
      price: 39.99,
      quantity: 64,
      amount: 2559.36,
    },
    {
      id: "4",
      name: "Lightweight Jacket",
      price: 20.0,
      quantity: 184,
      amount: 3680.0,
    },
    {
      id: "5",
      name: "Marco Shoes",
      price: 79.49,
      quantity: 64,
      amount: 1965.81,
    },
  ],

  notifications: [
    {
      id: "1",
      type: "bug",
      title: "You have a bug that needs fixing",
      description: "Check the console for details",
      time: "Now",
      read: false,
    },
    {
      id: "2",
      type: "user",
      title: "New user registered",
      description: "57 minutes ago",
      time: "57 minutes ago",
      read: false,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612400e?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: "3",
      type: "bug",
      title: "You have a bug that needs fixing",
      description: "12 hours ago",
      time: "12 hours ago",
      read: false,
    },
    {
      id: "4",
      type: "activity",
      title: "Andi Lane subscribed to you",
      description: "Today, 11:59 AM",
      time: "Today, 11:59 AM",
      read: false,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
  ],

  activities: [
    {
      id: "1",
      user: {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
      action: "have a bug that needs fixing",
      time: "Just now",
      type: "bug",
    },
    {
      id: "2",
      user: {
        name: "Released",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612400e?w=40&h=40&fit=crop&crop=face",
      },
      action: "a new version",
      time: "57 minutes ago",
      type: "release",
    },
    {
      id: "3",
      user: {
        name: "Submitted",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      action: "a bug",
      time: "12 hours ago",
      type: "bug",
    },
    {
      id: "4",
      user: {
        name: "Modified",
        avatar:
          "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=40&h=40&fit=crop&crop=face",
      },
      action: "a data in Page X",
      time: "Today, 11:59 AM",
      type: "data",
    },
    {
      id: "5",
      user: {
        name: "Deleted",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      },
      action: "a page in Project X",
      time: "Feb 2, 2024",
      type: "page",
    },
  ],

  orders: [
    {
      id: "1",
      orderId: "#CM9801",
      user: {
        name: "Natali Craig",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612400e?w=40&h=40&fit=crop&crop=face",
      },
      project: "Landing Page",
      address: "Meadow Lane Oakland",
      date: "Just now",
      status: "in-progress",
    },
    {
      id: "2",
      orderId: "#CM9802",
      user: {
        name: "Kate Morrison",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
      project: "CRM Admin pages",
      address: "Larry San Francisco",
      date: "A minute ago",
      status: "complete",
    },
    {
      id: "3",
      orderId: "#CM9803",
      user: {
        name: "Drew Cano",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      project: "Client Project",
      address: "Bagwell Avenue Ocala",
      date: "1 hour ago",
      status: "pending",
    },
    {
      id: "4",
      orderId: "#CM9804",
      user: {
        name: "Orlando Diggs",
        avatar:
          "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=40&h=40&fit=crop&crop=face",
      },
      project: "Admin Dashboard",
      address: "Washburn Baton Rouge",
      date: "Yesterday",
      status: "approved",
    },
    {
      id: "5",
      orderId: "#CM9805",
      user: {
        name: "Andi Lane",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      },
      project: "App Landing Page",
      address: "Nest Lane Olivette",
      date: "Feb 2, 2023",
      status: "rejected",
    },
    {
      id: "6",
      orderId: "#CM9801",
      user: {
        name: "Natali Craig",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612400e?w=40&h=40&fit=crop&crop=face",
      },
      project: "Landing Page",
      address: "Meadow Lane Oakland",
      date: "Just now",
      status: "in-progress",
    },
    {
      id: "7",
      orderId: "#CM9802",
      user: {
        name: "Kate Morrison",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
      project: "CRM Admin pages",
      address: "Larry San Francisco",
      date: "A minute ago",
      status: "complete",
    },
    {
      id: "8",
      orderId: "#CM9803",
      user: {
        name: "Drew Cano",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      project: "Client Project",
      address: "Bagwell Avenue Ocala",
      date: "1 hour ago",
      status: "pending",
    },
    {
      id: "9",
      orderId: "#CM9804",
      user: {
        name: "Orlando Diggs",
        avatar:
          "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=40&h=40&fit=crop&crop=face",
      },
      project: "Admin Dashboard",
      address: "Washburn Baton Rouge",
      date: "Yesterday",
      status: "approved",
    },
    {
      id: "10",
      orderId: "#CM9805",
      user: {
        name: "Andi Lane",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      },
      project: "App Landing Page",
      address: "Nest Lane Olivette",
      date: "Feb 2, 2023",
      status: "rejected",
    },
  ],

  contacts: [
    {
      id: "1",
      name: "Natali Craig",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612400e?w=40&h=40&fit=crop&crop=face",
      status: "online",
    },
    {
      id: "2",
      name: "Drew Cano",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      status: "offline",
    },
    {
      id: "3",
      name: "Orlando Diggs",
      avatar:
        "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=40&h=40&fit=crop&crop=face",
      status: "away",
    },
    {
      id: "4",
      name: "Andi Lane",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      status: "online",
    },
    {
      id: "5",
      name: "Kate Morrison",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      status: "offline",
    },
    {
      id: "6",
      name: "Koray Okumus",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      status: "online",
    },
  ],

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleNotificationPanel: () =>
    set((state) => ({ notificationPanelOpen: !state.notificationPanelOpen })), // New action

  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),

  markNotificationAsRead: (id: string) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      ),
    })),

  markAllNotificationsAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    })),
}));
