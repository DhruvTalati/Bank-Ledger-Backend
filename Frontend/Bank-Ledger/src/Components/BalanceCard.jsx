const BalanceCard = ({ balance }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg">
      <p className="text-sm opacity-80">Current Balance</p>

      <h2 className="text-4xl font-bold mt-3">₹ {balance.toLocaleString()}</h2>

      <div className="mt-6 flex justify-between text-sm opacity-80">
        <span>Available Balance</span>
        <span>INR</span>
      </div>
    </div>
  );
};

export default BalanceCard;
