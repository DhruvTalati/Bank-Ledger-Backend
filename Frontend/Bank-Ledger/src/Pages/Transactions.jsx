import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { getAccounts } from "../services/accountService";
import { getTransactions } from "../services/transactionService";
import { motion } from "framer-motion";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [accountId, setAccountId] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const accountRes = await getAccounts();
      const account = accountRes.accounts?.[0];
      if (!account) return;
      setAccountId(account._id);
      const transactionRes = await getTransactions(account._id);
      setTransactions(transactionRes.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const totalCredits = transactions
    .filter((transaction) => transaction.toAccount._id === accountId)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalDebits = transactions
    .filter((transaction) => transaction.fromAccount._id === accountId)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const filteredTransactions = transactions.filter((transaction) => {
    const isDebit = transaction.fromAccount._id === accountId;

    const matchesSearch =
      transaction.status.toLowerCase().includes(search.toLowerCase()) ||
      transaction.amount.toString().includes(search) ||
      transaction._id.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "ALL" ||
      (filter === "DEBIT" && isDebit) ||
      (filter === "CREDIT" && !isDebit);

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">
            Transaction History
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg">
              <p>Total Credits</p>
              <h2 className="text-3xl font-bold">
                ₹ {totalCredits.toLocaleString()}
              </h2>
            </div>

            <div className="bg-red-600 text-white p-6 rounded-2xl shadow-lg">
              <p>Total Debits</p>
              <h2 className="text-3xl font-bold">
                ₹ {totalDebits.toLocaleString()}
              </h2>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
              <p>Total Transactions</p>
              <h2 className="text-3xl font-bold">{transactions.length}</h2>
            </div>
          </div>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by ID, Amount or Status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 p-4 rounded-xl shadow-lg border"
            />
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setFilter("ALL")}
              className={`px-4 py-2 rounded-lg ${
                filter === "ALL"
                  ? "bg-slate-900 text-white"
                  : "bg-white dark:bg-slate-900"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("CREDIT")}
              className={`px-4 py-2 rounded-lg ${
                filter === "CREDIT"
                  ? "bg-green-600 text-white"
                  : "bg-white dark:bg-slate-900"
              }`}
            >
              Credit
            </button>

            <button
              onClick={() => setFilter("DEBIT")}
              className={`px-4 py-2 rounded-lg ${
                filter === "DEBIT"
                  ? "bg-red-600 text-white"
                  : "bg-white dark:bg-slate-900"
              }`}
            >
              Debit
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 text-left">Type</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map((transaction) => {
                  const isDebit = transaction.fromAccount._id === accountId;

                  return (
                    <motion.tr
                      key={transaction._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="border-b"
                    >
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            isDebit
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {isDebit ? "DEBIT" : "CREDIT"}
                        </span>
                      </td>

                      <td className="p-4 font-medium">
                        ₹{transaction.amount.toLocaleString()}
                      </td>

                      <td className="p-4">{transaction.status}</td>

                      <td className="p-4">
                        {new Date(transaction.createdAt).toLocaleDateString(
                          "en-IN",
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>

            {transactions.length === 0 && (
              <div className="p-10 text-center text-gray-500 dark:text-gray-400">
                No transactions found
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
