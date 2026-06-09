import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAccounts } from "../services/accountService";
import { getTransactions } from "../services/transactionService";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Analytics = () => {
  const [transactions, setTransactions] = useState([]);
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
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
    .filter((t) => t.toAccount._id === accountId)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebits = transactions
    .filter((t) => t.fromAccount._id === accountId)
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = [
    {
      name: "Credits",
      value: totalCredits,
    },
    {
      name: "Debits",
      value: totalDebits,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 dark:text-white">
            Analytics Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <p>Net Flow</p>
              <h2 className="text-3xl font-bold">
                ₹ {(totalCredits - totalDebits).toLocaleString()}
              </h2>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Credit vs Debit Analysis
            </h2>

            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} dataKey="value" outerRadius={130} label>
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
