import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { prepareTransactionPieChart } from "../utils/prepareTransactionPieChart";

const TransactionOverview = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    debugger
    if (transactions) {
      debugger
      const result = prepareTransactionPieChart(transactions);
      setChartData(result);
    }
  }, [transactions]);

  return (
    <div className="h-64 flex items-center justify-center">
      <PieChart width={300} height={300}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default TransactionOverview;
