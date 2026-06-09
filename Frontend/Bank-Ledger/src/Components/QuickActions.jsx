import { useNavigate } from "react-router-dom";

const QuickActions = ({ onRefresh }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/transfer")}
          className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Transfer Money
        </button>

        <button
          onClick={() => navigate("/transactions")}
          className="bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
        >
          Transactions
        </button>

        <button
          onClick={onRefresh}
          className="bg-slate-700 text-white py-3 rounded-xl hover:bg-slate-800 transition"
        >
          Refresh Balance
        </button>

        <button
          onClick={() => navigate("/analytics")}
          className="bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition"
        >
          Analytics
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
