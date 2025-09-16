import EmojiPickerPopup from './EmojiPickerPopup';
import { useState } from 'react';
import Input from "../components/Input";

const AddExpenseForm = ({ onClose, onAddExpense, categories }) => {
    debugger
    const [formData, setFormData] = useState({
        categoryId: "",
        expenseIcon: "",
        expenseName: "",
        expenseAmount: "",
        expenseDate: "",
    });
    const categoryOptions = categories?.map((cat) => ({
        value: cat.id,
        label: cat.name,
    }));
    const handleSubmit = (e)=>{
        debugger
         e.preventDefault();
        onAddExpense(formData);
    }
    
    const handleChange = (e)=>{ 
         setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <EmojiPickerPopup icon={formData.expenseIcon}
                    onSelect={(emojiUrl) =>
                        setFormData({ ...formData, expenseIcon: emojiUrl })
                    }
                />
                <Input
                    type="text"
                    isSelect={true}
                    options={categoryOptions}
                    placeholder="Select Category"
                    label="Category"
                    value={formData.categoryId}
                    onChange={handleChange}
                    name="categoryId"
                />
                <Input
                    type="text"
                    value={formData.expenseName}
                    name="expenseName"
                    onChange={handleChange}
                    placeholder="e.g., Freelance, Salary"
                    label="Expense Name"
                />
                <Input
                    type="number"
                    value={formData.expenseAmount}
                    name="expenseAmount"
                    onChange={handleChange}
                    placeholder="e.g., 5000"
                    label="Amount"
                />
                <Input
                    type="date"
                    value={formData.expenseDate}
                    name="expenseDate"
                    onChange={handleChange}
                    label="Date"
                />

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 rounded text-white ${formData.expenseName === "" || formData.expenseAmount === ""
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                        disabled={formData.expenseName === "" || formData.expenseAmount === ""}
                    >
                        Add Expense
                    </button>

                </div>
            </form>
        </div>
    )

}
export default AddExpenseForm;