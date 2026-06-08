const transactionModel = require("../models/transaction.model");
const ledgerModel = require("../models/ledger.model");
const accountModel = require("../models/account.model");
const emailService = require("../services/email.service");
const mongoose = require("mongoose");

/**
 * - Create a new transaction
 * THE 10-STEP TRANSFER FLOW:
 
 * 1. Validate request
 * 2. Validate idempotency key
 * 3. Check account status
 * 4. Derive sender currentBalance from Ledger
 * 5. Create transaction (PENDING)
 * 6. Create DEBIT ledger entry
 * 7. Create CREDIT ledger entry
 * 8. Mark transaction COMPLETED
 * 9. Commit MongoDB session
 * 10. Send email notification
 */

async function createTransaction(req, res) {
  /**
   *  1. Validate request
   */
  const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

  if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
    return res.status(400).json({
      message:
        "FormAccount , toAccount , amount and idempotencyKey are required!!",
    });
  }

  const fromUserAccount = await accountModel.findById(fromAccount);

  const toUserAccount = await accountModel.findById(toAccount);
  console.log("From Account:", fromUserAccount);
  console.log("To Account:", toUserAccount);

  console.log("From Status:", fromUserAccount.status);
  console.log("To Status:", toUserAccount.status);

  if (
    fromUserAccount.status !== "ACTIVE" ||
    toUserAccount.status !== "ACTIVE"
  ) {
    return res.status(400).json({
      message:
        "Both fromAccount and toUserAccount must be ACTIVE to process the transaction!!",
    });
  }

  console.log("PASSED ACTIVE CHECK");

  /**
   * 2. Validate idempotency key
   */

  const isTransactionAlreadyExists = await transactionModel.findOne({
    idempotencyKey: idempotencyKey,
  });

  if (isTransactionAlreadyExists) {
    if (isTransactionAlreadyExists.status == "COMPLETED") {
      return res.status(200).json({
        message: "Transaction is already processed!!",
        transaction: isTransactionAlreadyExists,
      });
    }
    if (isTransactionAlreadyExists.status == "PENDING") {
      return res.status(200).json({
        message: "Transaction is still processing!!",
      });
    }
    if (isTransactionAlreadyExists.status == "FAILED") {
      return res.status(500).json({
        message: "Transaction is Failed ! Please try again later!!",
      });
    }
    if (isTransactionAlreadyExists.status == "REVERSED") {
      return res.status(500).json({
        message: "Transaction is reversed!! Retry Again!!",
      });
    }
  }

  /**
   * 3. Check account status
   */
  if (
    fromUserAccount.status !== "ACTIVE" ||
    toUserAccount.status !== "ACTIVE"
  ) {
    return res.status(400).json({
      message:
        "Both fromAccount and toUserAccount must be ACTIVE to process the transaction!!",
    });
  }

  /**
   * 4. Derive sender currentBalance from Ledger
   */

  const currentBalance = await fromUserAccount.getBalance();

  if (currentBalance < amount) {
    res.status(400).json({
      message: `Insufficient currentBalance. Current Balance is ${currentBalance}.Requested amount is ${amount}`,
    });
  }

  let transaction;
  try {
    /**
     * 5. Create transaction (PENDING)
     */

    const session = await mongoose.startSession();
    session.startTransaction();
    transaction = await transactionModel.create(
      [
        {
          fromAccount,
          toAccount,
          amount,
          idempotencyKey,
          status: "PENDING",
        },
      ],
      { session },
    );

    await transaction.save({ session });
    /**
     * 6. Create DEBIT ledger entry
     */
    const debitLedgerEntry = await ledgerModel.create(
      [
        {
          account: fromAccount,
          amount: amount,
          transaction: transaction._id,
          type: "DEBIT",
        },
      ],
      { session },
    );

    await (() => {
      return new Promise((resolve) => setTimeout(resolve, 100 * 1000));
    })();

    /**
     * 7. Create CREDIT ledger entry
     */
    const creditLedgerEntry = await ledgerModel.create(
      [
        {
          account: toAccount,
          amount: amount,
          transaction: transaction._id,
          type: "CREDIT",
        },
      ],
      { session },
    );

    await transactionModel.findOneAndUpdate(
      { _id: transaction._id },
      { status: "COMPLETED" },
      { session },
    );
    /**
     * 8. Mark transaction COMPLETED
     */
    transaction.status = "COMPLETED";
    await transaction.save({ session });
  } catch (error) {
    return res.status(400).json({
      message:
        "Transaction is Pending due to some issue . Please try again after same time!!",
    });
  }
  /**
   * 9. Commit MongoDB session
   */
  await session.commitTransaction();
  session.endSession();

  /**
   * 10. Send email notification
   */

  await emailService.sendTransactionEmail(
    req.user.email,
    req.user.name,
    amount,
    "DEBIT",
    transaction._id,
    currentBalance,
  );

  return res.status(201).json({
    message: "Transaction Completed Successfully",
    transaction: transaction,
  });
}

async function createInitIalFundsTransaction(req, res) {
  const { toAccount, amount, idempotencyKey } = req.body;
  const user = req.user;

  if (!toAccount || !amount || !idempotencyKey) {
    return res.status(400).json({
      message: "toAccount ,amount and idempotency key is required!! ",
    });
  }

  const toUserAccount = await accountModel.findOne({
    _id: toAccount,
  });

  if (!toUserAccount) {
    return res.status(400).json({
      message: "Invalid toAccount",
    });
  }

  const fromUserAccount = await accountModel.findOne({
    user: user._id,
  });

  if (!fromUserAccount) {
    return res.status(400).json({
      message: "System user account not found!!",
    });
  }

  console.log("SYSTEM USER ID:", user._id.toString());
  console.log("SYSTEM ACCOUNT:", fromUserAccount._id.toString());
  console.log("TARGET ACCOUNT:", toUserAccount._id.toString());

  const session = await mongoose.startSession();
  session.startTransaction();

  const transaction = new transactionModel({
    fromAccount: fromUserAccount._id,
    toAccount,
    amount,
    idempotencyKey,
    status: "PENDING",
  });

  const debitLedgerEntry = await ledgerModel.create(
    [
      {
        account: fromUserAccount._id,
        amount: amount,
        transaction: transaction._id,
        type: "DEBIT",
      },
    ],
    { session },
  );

  const creditLedgerEntry = await ledgerModel.create(
    [
      {
        account: toUserAccount._id,
        amount: amount,
        transaction: transaction._id,
        type: "CREDIT",
      },
    ],
    { session },
  );

  transaction.status = "COMPLETED";
  await transaction.save({ session });

  await session.commitTransaction();
  session.endSession();

  return res.status(201).json({
    message: "Initial funds transaction completed successfully!!",
    transaction: transaction,
  });
}
module.exports = { createTransaction, createInitIalFundsTransaction };
