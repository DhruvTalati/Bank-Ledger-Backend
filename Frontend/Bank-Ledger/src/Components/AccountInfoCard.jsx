const AccountInfoCard = ({ account }) => {
  return (
    <div className="card">
      <h3>Account Information</h3>

      <p>
        <strong>Currency:</strong> {account.currency}
      </p>

      <p>
        <strong>Account ID:</strong> {account._id}
      </p>

      <p>
        <strong>Created:</strong>{" "}
        {new Date(account.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default AccountInfoCard;
