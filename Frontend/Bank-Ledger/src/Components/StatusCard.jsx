const StatusCard = ({ status }) => {
  const isActive = status === "ACTIVE";

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg">
      <p className="text-gray-500 dark:text-gray-400 text-sm">Account Status</p>

      <div className="mt-5">
        <span
          className={`px-4 py-2 rounded-full font-semibold ${
            isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="mt-5 text-sm text-gray-500">
        {isActive
          ? "Account is active and operational."
          : "Account currently restricted."}
      </p>
    </div>
  );
};

export default StatusCard;
