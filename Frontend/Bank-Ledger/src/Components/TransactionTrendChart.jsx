import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const TransactionTrendChart = ({ transactions, accountId }) => {
  const chartData = transactions
    .slice(0, 7)
    .reverse()
    .map((transaction) => {
      const isDebit = transaction.fromAccount._id === accountId;

      return {
        name: new Date(transaction.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        }),
        amount: transaction.amount,
        type: isDebit ? "Debit" : "Credit",
      };
    });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-xl font-semibold dark:text-white mb-4">
        Transaction Trend
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionTrendChart;
