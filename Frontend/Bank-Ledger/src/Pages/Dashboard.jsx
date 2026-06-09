import { useEffect, useState } from "react";
import {
  getAccounts,
  getBalance,
  createAccount,
} from "../services/accountService";
import useAuth from "../hooks/useAuth";
import BalanceCard from "../components/BalanceCard";
import Navbar from "../components/Navbar";
import StatusCard from "../components/StatusCard";
import toast from "react-hot-toast";
import QuickActions from "../components/QuickActions";
import AccountInfoCard from "../components/AccountInfoCard";
import { motion } from "framer-motion";
import { getTransactions } from "../services/transactionService";
import RecentTransactions from "../components/RecentTransactions";
import TransactionTrendChart from "../components/TransactionTrendChart";

const Dashboard = () => {
  const { user } = useAuth();

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const accountRes = await getAccounts();
      const account = accountRes.accounts?.[0];

      if (!account) {
        setLoading(false);
        return;
      }

      setAccount(account);

      const balanceRes = await getBalance(account._id);
      setBalance(balanceRes.balance);
      const transactionRes = await getTransactions(account._id);
      setTransactions(transactionRes.transactions);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    try {
      await createAccount();
      toast.success("Account created successfully!");
      fetchDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create account");
    }
  };
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-semibold">Loading Dashboard...</h2>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold dark:text-white">
              Welcome Back, {user?.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Account Status
                </p>
                <h3 className="text-xl font-bold dark:text-white">
                  {account?.status || "N/A"}
                </h3>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Currency
                </p>
                <h3 className="text-xl font-bold dark:text-white">
                  {account?.currency || "INR"}
                </h3>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Account Type
                </p>
                <h3 className="text-xl font-bold dark:text-white">
                  Ledger Account
                </h3>
              </div>
            </div>

            {!account && (
              <button
                onClick={handleCreateAccount}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Create Account
              </button>
            )}
          </div>
          {account && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <BalanceCard balance={balance} />
                <StatusCard status={account.status} />
                <AccountInfoCard account={account} />
              </motion.div>
              <QuickActions onRefresh={fetchDashboard} />
              <RecentTransactions
                transactions={transactions}
                accountId={account._id}
              />
              <TransactionTrendChart
                transactions={transactions}
                accountId={account._id}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
