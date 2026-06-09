const StatusCard = ({ status }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-gray-500 text-sm">Account Status</h3>

      <span className="inline-block mt-3 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
        {status}
      </span>
    </div>
  );
};

export default StatusCard;
