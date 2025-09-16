export const prepareExpensePieChartData = (transactions) => {
  if (!transactions || transactions.length === 0) return [];

  const expenseByDate = {};

transactions.forEach((t) => {
    const d = t.date ? new Date(t.date) : new Date(); // null-safe date
    const dateString = d.toISOString().split("T")[0];

    if (!expenseByDate[dateString]) {
      expenseByDate[dateString] = { amount: 0, names: [] };
    }

    expenseByDate[dateString].amount += t.amount ?? 0; // null-safe amount
    expenseByDate[dateString].names.push(t.name ?? "Unknown"); // null-safe name
});

  return Object.entries(expenseByDate)
    .map(([date, data]) => ({
      date,
      amount: data.amount,
      name: data.names.join(", "),
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};
