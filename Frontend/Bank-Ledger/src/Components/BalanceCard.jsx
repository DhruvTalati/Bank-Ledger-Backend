const BalanceCard = ({ balance }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-gray-500 text-sm">Current Balance</h3>

      <h1 className="text-4xl font-bold text-blue-600 mt-2">
        ₹ {balance.toLocaleString()}
      </h1>
    </div>
  );
};

export default BalanceCard;
