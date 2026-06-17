// src/components/StatsCard.jsx

const StatsCard = ({ label, value, delta, deltaType, icon: Icon, iconColor }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">

      {/* Label + icon */}
      <div className="flex items-center gap-2 mb-3">
        {Icon && (
          <Icon size={15} className={iconColor || "text-gray-400"} />
        )}
        <p className="text-xs text-gray-500">{label}</p>
      </div>

      {/* Value */}
      <p className="text-2xl font-semibold text-gray-900">{value}</p>

      {/* Delta */}
      {delta && (
        <p
          className={`text-xs mt-1.5 ${
            deltaType === "up"
              ? "text-green-600"
              : deltaType === "down"
              ? "text-red-500"
              : "text-gray-400"
          }`}
        >
          {delta}
        </p>
      )}

    </div>
  );
};

export default StatsCard;