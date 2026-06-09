const AccountInfoCard = ({ account }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-5">Account Information</h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Currency</p>
          <p className="font-semibold text-lg">{account.currency}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Account ID</p>

          <p className="font-mono text-sm bg-slate-100 p-2 rounded-lg mt-1">
            {account._id.slice(0, 8)}...
            {account._id.slice(-6)}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Created On</p>

          <p className="font-medium">
            {new Date(account.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoCard;
