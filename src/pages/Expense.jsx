import { useEffect, useState } from "react";
import { useUser } from "../../customHook/useUser";
import Dashboard from "../components/Dashboard";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import axiosInstance from "../utils/axiosConfig";
import { Plus, Loader2 } from "lucide-react";
import { Modal } from "../components/Modal";
import AddExpenseList from "../components/AddExpenseList";
import { toast } from 'react-toastify';
import AddExpenseForm from "../components/AddExpenseForm";
import { ExpenseOverview } from "../components/ExpenseOverview";
const Expense = () => {
    useUser();
    const [openExpenseModal, setOpenExpenseModal] = useState(false);
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);


    const fetchExpenseDetails = async () => {
        debugger
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_ENDPOINTS.FETCH_ALL_EXPENSE);
            console.log(response)
            if (response.status === 200) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.error("something went wrong, please try again", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategoryByExpense = async () => {
        debugger
        try {
            const response = await axiosInstance.get(API_ENDPOINTS.FETCH_CATEGORY_BY_EXPENSE);
            debugger
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("something went wrong, please try again", error);
        }
    }
    const onDelete = async (id) => {
        console.log("delete")
             debugger
        try {
            const response = await axiosInstance.delete(
                `${API_ENDPOINTS.DELETE_EXPENSE}/${id}`
            );
            if (response.status === 200) {
                toast.success("Expense Deleted Successfully");
                fetchExpenseDetails();
            }
            debugger
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete Expense");
        }
    }
    const handleAddExpense = async (formData) => {
        debugger
        try {
            const response = await axiosInstance.post(API_ENDPOINTS.ADD_EXPENSE, {
                categoryId: formData.categoryId,
                icon: formData.expenseIcon,
                name: formData.expenseName,
                amount: formData.expenseAmount,
                date: formData.expenseDate,
            })
            debugger
            if (response.status === 201) {
                toast.success("Expense added successfully");
                debugger
                fetchExpenseDetails();
                setOpenExpenseModal(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add Expense");
        }
    }

    useEffect(() => {
        fetchExpenseDetails();
        fetchCategoryByExpense();
    }, []);

    return (
        <Dashboard>
            {/* Header row with Add Income button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Expense</h2>

                {/* Button with Lucide Plus icon */}
                <button
                    onClick={() => setOpenExpenseModal(true)}
                    className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    <Plus size={18} />
                    Add Expense
                </button>
            </div>
            <Modal
                isOpen={openExpenseModal}
                onClose={() => setOpenExpenseModal(false)}
                title="Add New Expense"
            >
                <AddExpenseForm onClose={() => setOpenExpenseModal(false)} onAddExpense={handleAddExpense} categories={categories}/>
            </Modal>

            <ExpenseOverview transactions={expenseData}/>
            {/* Income List Section */}

            <div className="bg-white shadow-md rounded-xl p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4  pb-2">
                    Expense Source
                </h2>

                {loading ? (
                    <div className="flex items-center justify-center py-4">
                        <Loader2 className="animate-spin text-green-600" size={40} />
                        <span className="ml-2 text-gray-500">Loading...</span>
                    </div>
                ) : expenseData.length === 0 ? (
                    <p className="text-gray-500">No expense records found.</p>
                ) : (
                    <AddExpenseList expenseData={expenseData} onDelete={onDelete} />
                )}
            </div>

        </Dashboard>
    );
};

export default Expense;
