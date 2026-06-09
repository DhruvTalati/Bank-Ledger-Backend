
const RecentTransactions = ({ transactions, accountId }) => {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-xl font-semibold dark:text-white mb-4">
        Recent Transactions
      </h2>

      <div className="space-y-3">
        {recentTransactions.map((transaction) => {
          const isDebit = transaction.fromAccount._id === accountId;

          return (
            <div
              key={transaction._id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <p
                  className={`font-semibold ${
                    isDebit ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {isDebit ? "↓ DEBIT" : "↑ CREDIT"}
                </p>

                <p className="text-xs text-gray-500">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </p>
              </div>

              <p className="font-bold dark:text-white">
                ₹ {transaction.amount.toLocaleString()}
              </p>
            </div>
          );
        })}

        {recentTransactions.length === 0 && (
          <p className="text-gray-500">No transactions found</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
