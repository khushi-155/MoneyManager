export const prepareTransactionPieChart = (dashboardData) => {
  if (!dashboardData) return [];
  debugger
  return [
    { name: "Income", value: dashboardData.totalIncome, fill: "#22c55e" }, // green
    { name: "Expense", value: dashboardData.totalExpense, fill: "#ef4444" }, // red
    { name: "Balance", value: dashboardData.totalBalance, fill: "#3b82f6" }, // blue
  ];
};
