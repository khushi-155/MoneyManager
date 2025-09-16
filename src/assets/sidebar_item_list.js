import { Home, Grid, ArrowUpCircle, ArrowDownCircle, SlidersHorizontal } from "lucide-react";

export const SIDEBAR_ITEMS = [
  { key: "dashboard", label: "Dashboard", route: "/dashboard", icon: Home },
  { key: "category", label: "Category", route: "/category", icon: Grid },
  { key: "income", label: "Income", route: "/income", icon: ArrowUpCircle },
  { key: "expense", label: "Expense", route: "/expense", icon: ArrowDownCircle },
  { key: "filter", label: "Filter", route: "/filter", icon: SlidersHorizontal },
];
