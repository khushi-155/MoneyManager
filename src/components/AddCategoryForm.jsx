import React, { useState, useContext,useEffect } from 'react';
import Input from "../components/Input";
import EmojiPickerPopup from './EmojiPickerPopup';
export const AddCategoryForm = ({onClose, onAddCategory, initialData}) => {

    const [formData, setFormData] = useState({
        categoryName: '',
        categoryType:"",
        categoryIcon:''
    });

      useEffect(() => {
        if (initialData) {
            setFormData({
                categoryName: initialData.name || '',
                categoryType: initialData.type || '',
                categoryIcon: initialData.icon || ''
            });
        }
    }, [initialData]);

     const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

       
    const handleSubmit = (e)=>{
          debugger
           e.preventDefault();
          onAddCategory(formData)
    }

    const categoryTypeOptions = [
        {value:"income",label:"Income"},
        {value:"expense",label:"Expense"},
    ]
    return (
        <div className= "p-4">
            <form onSubmit={handleSubmit}>
                <EmojiPickerPopup  icon={formData.categoryIcon}
                     onSelect={(emojiUrl) =>
                    setFormData({ ...formData, categoryIcon: emojiUrl })
                }
                />

                <Input
                type="text"
                    value={formData.categoryName}
                    name="categoryName"
                    onChange={handleChange}
                    placeholder="e.g., Freelance, Salary, Groceries"
                    label= "Category Name"
                />
                <Input
                  type="text"
                  isSelect={true}
                  options={categoryTypeOptions}
                  placeholder="e.g., Income, Exxpense"
                  label= "Category Type"
                  value = {formData.categoryType}
                  onChange={handleChange}
                  name = "categoryType"
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
                        className={`px-4 py-2 rounded text-white 
                        ${formData.categoryName === ""
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"}`}
                        disabled={formData.categoryName === ""}
                    >
                        Save
                    </button>

                </div>
            </form>
        </div>
    )
}