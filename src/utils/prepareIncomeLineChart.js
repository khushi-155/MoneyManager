export const prepareIncomeLineChartData = (transactions) => {
  if (!transactions || transactions.length === 0) return [];

  const incomeByDate = {};

  transactions.forEach((t) => {
    const d = new Date(t.date);
    const dateString = d.toISOString().split("T")[0];

    if (!incomeByDate[dateString]) {
      incomeByDate[dateString] = { amount: 0, names: [] };
    }

    incomeByDate[dateString].amount += t.amount;
    incomeByDate[dateString].names.push(t.name); // ya t.categoryName agar category chahiye
  });

  return Object.entries(incomeByDate)
    .map(([date, data]) => ({
      date,
      amount: data.amount,
      name: data.names.join(", "),
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};
