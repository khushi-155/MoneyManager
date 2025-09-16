// CustomTooltip.jsx
export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="text-sm text-gray-500">{data.date}</p>   {/* ✅ date added */}
        <p className="text-sm font-semibold">{data.name || "Income"}</p>
        <p className="text-sm">Amount: ₹{data.amount.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};
