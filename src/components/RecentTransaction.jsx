import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Wallet } from "lucide-react";

const RecentTransaction = ({ transactions = [] }) => {
    debugger
    if (!transactions.length) {
        return (
            <p className="text-gray-400 text-sm">No recent transactions found</p>
        );
    }

    return (
        <div>
       {transactions.map((transaction) => {
    const isIncome = transaction.type === "income";

    return (
        <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm mb-2">
            <div className="flex items-center gap-3">
                {transaction?.icon ? (
                    <img src={transaction.icon} alt="icon" className="w-5 h-5 rounded-full" />
                ) : (
                    <Wallet className="text-green-500 w-4 h-4" />
                )}

                <div>
                    <p className="font-medium text-gray-800">{transaction?.name || "No Name"}</p>
                    <p className="text-sm text-gray-600">{transaction?.type || "No Category"}</p>
                    <p className="text-xs text-gray-500">{transaction?.date || "No Date"}</p>
                </div>
            </div>

            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold text-sm ${isIncome ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                <span>
                    {isIncome ? "+" : "-"}₹{transaction?.amount ? transaction.amount.toLocaleString() : 0}
                </span>
                {isIncome ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            </div>
        </div>
    );
})}

        </div>
    );
};

export default RecentTransaction;
