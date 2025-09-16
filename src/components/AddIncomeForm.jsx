import EmojiPickerPopup from './EmojiPickerPopup';
import { useState } from 'react';
import Input from "../components/Input";

const AddIncomeForm = ({ onClose, onAddIncome, categories }) => {
    debugger
    const [formData, setFormData] = useState({
        categoryId: "",
        incomeIcon: "",
        incomeName: "",
        incomeAmount: "",
        incomeDate: "",
    });
    const categoryOptions = categories?.map((cat) => ({
        value: cat.id,
        label: cat.name,
    }));
    const handleSubmit = (e)=>{
        debugger
         e.preventDefault();
        onAddIncome(formData);
    }
    
    const handleChange = (e)=>{ 
         setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <EmojiPickerPopup icon={formData.incomeIcon}
                    onSelect={(emojiUrl) =>
                        setFormData({ ...formData, incomeIcon: emojiUrl })
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
                    value={formData.incomeName}
                    name="incomeName"
                    onChange={handleChange}
                    placeholder="e.g., Freelance, Salary"
                    label="Income Name"
                />
                <Input
                    type="number"
                    value={formData.incomeAmount}
                    name="incomeAmount"
                    onChange={handleChange}
                    placeholder="e.g., 5000"
                    label="Amount"
                />
                <Input
                    type="date"
                    value={formData.incomeDate}
                    name="incomeDate"
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
                        className={`px-4 py-2 rounded text-white ${formData.incomeName === "" || formData.incomeAmount === ""
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                        disabled={formData.incomeName === "" || formData.incomeAmount === ""}
                    >
                        Add Income
                    </button>

                </div>
            </form>
        </div>
    )

}
export default AddIncomeForm;