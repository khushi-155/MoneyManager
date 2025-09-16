import { useEffect, useState } from "react";
import { useUser } from "../../customHook/useUser";
import Dashboard from "../components/Dashboard";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import axiosInstance from "../utils/axiosConfig";
import { Plus, Loader2 } from "lucide-react";
import { Modal } from "../components/Modal";
import AddIncomeForm from "../components/AddIncomeForm";
import { TransactionInfoCard } from "../components/TransactionInfoCard";
import AddIncomeList from "../components/AddIncomeList";
import { toast } from 'react-toastify';
import { IncomeOverview } from "../components/IncomeOverview";
const Income = () => {
    useUser();
    const [openIncomeModal, setOpenIncomeModal] = useState(false);
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);


    const fetchIncomeDetails = async () => {
        debugger
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_ENDPOINTS.FETCH_ALL_INCOME);
            if (response.status === 200) {
                setIncomeData(response.data);
            }
        } catch (error) {
            console.error("something went wrong, please try again", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategoryByIncome = async () => {
        debugger
        try {
            const response = await axiosInstance.get(API_ENDPOINTS.FETCH_CATEGORY_BY_Income);
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
        try {
            const response = await axiosInstance.delete(
                `${API_ENDPOINTS.DELETE_INCOME}/${id}`
            );
            if (response.status === 200) {
                toast.success("Incoome Deleted Successfully");
                fetchIncomeDetails();
            }
            debbuger
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete Income");
        }
    }
    const handleAddIncome = async (formData) => {
        debugger
        try {
            const response = await axiosInstance.post(API_ENDPOINTS.ADD_INCOME, {
                categoryId: formData.categoryId,
                icon: formData.incomeIcon,
                name: formData.incomeName,
                amount: formData.incomeAmount,
                date: formData.incomeDate,
            })
            debugger
            if (response.status === 201) {
                toast.success("Income added successfully");
                debugger
                fetchIncomeDetails();
                setOpenIncomeModal(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add Income");
        }
    }

    useEffect(() => {
        fetchIncomeDetails();
        fetchCategoryByIncome();
    }, []);

    return (
        <Dashboard>
            {/* Header row with Add Income button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Incomes</h2>

                {/* Button with Lucide Plus icon */}
                <button
                    onClick={() => setOpenIncomeModal(true)}
                    className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    <Plus size={18} />
                    Add Income
                </button>
            </div>
            <Modal
                isOpen={openIncomeModal}
                onClose={() => setOpenIncomeModal(false)}
                title="Add New Income"
            >
                <AddIncomeForm onClose={() => setOpenIncomeModal(false)} onAddIncome={handleAddIncome} categories={categories}></AddIncomeForm>
            </Modal>

            <IncomeOverview transactions={incomeData}/>
            {/* Income List Section */}

            <div className="bg-white shadow-md rounded-xl p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4  pb-2">
                    Income Source
                </h2>

                {loading ? (
                    <div className="flex items-center justify-center py-4">
                        <Loader2 className="animate-spin text-green-600" size={40} />
                        <span className="ml-2 text-gray-500">Loading...</span>
                    </div>
                ) : incomeData.length === 0 ? (
                    <p className="text-gray-500">No income records found.</p>
                ) : (
                    <AddIncomeList incomeData={incomeData} onDelete={onDelete} />
                )}
            </div>

        </Dashboard>
    );
};

export default Income;
