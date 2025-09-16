import { useEffect, useState } from "react";
import { prepareExpensePieChartData } from "../utils/prepareExpensePieChart.js";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CustomTooltip } from "../components/CustomTooltip.jsx";
export const ExpenseOverview = ({ transactions }) => {
    const [charData, setChartData] = useState([]);

    useEffect(() => {
        debugger
        const result = prepareExpensePieChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className="card mb-5 p-4 bg-white rounded-xl shadow">
            <div className="flex flex-col">
                <div>
                    <h5 className="text-lg font-semibold">Expense Overview</h5>
                    <p className="text-xs text-gray-400 mt-1">
                        Track your expenses over time and analyze your expense trends.
                    </p>
                </div>

                <div className="mt-6 w-full" style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={charData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis
                                domain={[0, 'auto']}
                                tickFormatter={(value) =>
                                    value >= 10000000 ? (value / 10000000).toFixed(1) + " Cr" :
                                        value >= 100000 ? (value / 100000).toFixed(1) + " L" :
                                            value.toLocaleString()
                                }
                            />

                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="amount" stroke="#57ac17ff" strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};
