import { useEffect, useState } from "react";
import { getAccounts, getBalance } from "../services/accountService";
import useAuth from "../hooks/useAuth";
import BalanceCard from "../components/BalanceCard";
import Navbar from "../components/Navbar";
import StatusCard from "../components/StatusCard";
import AccountInfoCard from "../components/AccountInfoCard";

const Dashboard = () => {
  const { user } = useAuth();

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const accountRes = await getAccounts();

      const account = accountRes.accounts?.[0];

      if (!account) return;

      setAccount(account);

      const balanceRes = await getBalance(account._id);

      setBalance(balanceRes.balance);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome Back, {user?.name}</h1>
        {account && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BalanceCard balance={balance} />
            <StatusCard status={account.status} />
            <AccountInfoCard account={account} />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
