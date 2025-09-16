import {TransactionInfoCard} from "./TransactionInfoCard";

const AddExpenseList = ({ expenseData, onDelete }) => {
  if (!expenseData || expenseData.length === 0) {
    return <p className="text-gray-500">No income records found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {expenseData.map((expense) => (
        <TransactionInfoCard
          key={expense.id}
          id={expense.id}
          icon={expense.icon}
          title={expense.name}
          date={expense.date}
          amount={expense.amount}
          type="expense"
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AddExpenseList;
