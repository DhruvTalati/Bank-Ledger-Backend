import { createTransaction } from "../services/transactionService";
import { getAccounts } from "../services/accountService";
import toast from "react-hot-toast";
import Navbar from "../Components/Navbar";
import { useState, useEffect } from "react";

const Transfer = () => {
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    try {
      const data = await getAccounts();

      if (data.accounts?.length > 0) {
        setFromAccount(data.accounts[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTransfer = async () => {
    try {
      setLoading(true);

      const payload = {
        fromAccount,
        toAccount,
        amount: Number(amount),
        idempotencyKey: crypto.randomUUID(),
      };

      await createTransaction(payload);

      toast.success("Transfer completed successfully!");

      setToAccount("");
      setAmount("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="max-w-lg mx-auto bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Transfer Money</h1>

          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sender Account
            </p>

            <p className="font-mono bg-slate-100 p-3 rounded-lg mt-1">
              {fromAccount}
            </p>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Recipient Account ID"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <button
              onClick={handleTransfer}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? "Processing..." : "Transfer"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transfer;
