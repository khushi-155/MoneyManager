import {TransactionInfoCard} from "./TransactionInfoCard";

const AddIncomeList = ({ incomeData, onDelete }) => {
  if (!incomeData || incomeData.length === 0) {
    return <p className="text-gray-500">No income records found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {incomeData.map((income) => (
        <TransactionInfoCard
          key={income.id}
          id={income.id}
          icon={income.icon}
          title={income.name}
          date={income.date}
          amount={income.amount}
          type="income"
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AddIncomeList;
