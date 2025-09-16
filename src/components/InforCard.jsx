const InfoCard = ({ title, value, color, bgColor, Icon }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4">
      {/* Icon Circle */}
      <div className={`w-12 h-12 flex items-center justify-center rounded-full ${bgColor}`}>
        {Icon && <Icon className="w-6 h-6 text-white" />}
      </div>

      {/* Text */}
      <div>
        <h2 className="text-sm font-medium text-gray-500">{title}</h2>
        <p className={`text-xl font-bold text-gray-800`}>
          ₹{(value || 0).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
