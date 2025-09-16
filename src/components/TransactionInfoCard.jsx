import { Trash2, TrendingUp, TrendingDown, Image } from "lucide-react";

export const TransactionInfoCard = ({ id, icon, title, date, amount, type, onDelete }) => {
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const day = d.getDate();
    const month = d.toLocaleString("default", { month: "short" });
    const year = d.getFullYear();
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  };

  return (
    <div
      className="max-w-sm w-full bg-white rounded-xl p-4 
                 hover:bg-gray-50 transition-colors duration-200"
    >
      <div className="flex items-center justify-between">

        {/* Left: Icon + Title + Date */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
            {icon ? (
              <img src={icon} alt="icon" className="w-6 h-6 object-contain" />
            ) : (
              <div className="text-purple-600 text-lg"><Image /></div>
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            <p className="text-xs text-gray-500">{formatDate(date)}</p>
          </div>
        </div>

        {/* Right: Amount Badge + (optional) Trash */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold
              ${type === "income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
            `}
          >
            {type === "income"
              ? `+₹${amount ? amount.toLocaleString() : 0}`
              : `-₹${amount ? amount.toLocaleString() : 0}`}
            {type === "income" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          </div>

          {/* Show delete button only if onDelete is passed */}
          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
