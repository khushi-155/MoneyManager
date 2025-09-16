import { useUser } from "../../customHook/useUser";
import Dashboard from "../components/Dashboard";
import { useState } from "react";
import { Search, Loader2, TrendingUp, TrendingDown } from "lucide-react";
import axiosInstance from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { TransactionInfoCard } from "../components/TransactionInfoCard";

const Filter = () => {
    useUser();

    const [formData, setFormData] = useState({
        type: "income",
        startDate: "",
        endDate: "",
        sortField: "amount",
        sortOrder: "asc",
        category: "",
    });
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let response;
            if (formData.type === "income") {
                response = await axiosInstance.post(API_ENDPOINTS.FILTER_INCOME, {
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    type: formData.type,
                    sortBy: formData.sortField,
                    sortOrder: formData.sortOrder,
                    name: formData.category,
                });
            } else if (formData.type === "expense") {
                response = await axiosInstance.post(API_ENDPOINTS.FILTER_EXPENSES, {
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    type: formData.type,
                    sortBy: formData.sortField,
                    sortOrder: formData.sortOrder,
                    name: formData.category,
                });
            }

            if (response && response.status === 200) {
                setFilteredData(response.data);
            }
        } catch (error) {
            console.log("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dashboard>
            <div className="max-w-full mx-auto p-6">
                {/* ---------- Filter Form Card ---------- */}
                <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Filter Transactions</h2>

                    <form className="flex flex-wrap items-end gap-4" onSubmit={handleSubmit}>
                        {/* Type Dropdown */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="border rounded-md p-2 w-40"
                            >
                                <option value="">Select Type</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        {/* Start Date */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="border rounded-md p-2 w-40"
                            />
                        </div>

                        {/* End Date */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="border rounded-md p-2 w-40"
                            />
                        </div>

                        {/* Sort Field */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Sort By</label>
                            <select
                                name="sortField"
                                value={formData.sortField}
                                onChange={handleChange}
                                className="border rounded-md p-2 w-40"
                            >
                                <option value="">Select Field</option>
                                <option value="amount">Amount</option>
                                <option value="date">Date</option>
                                <option value="category">Category</option>
                            </select>
                        </div>

                        {/* Sort Order */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Sort Order</label>
                            <select
                                name="sortOrder"
                                value={formData.sortOrder}
                                onChange={handleChange}
                                className="border rounded-md p-2 w-40"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>

                        {/* Category Search */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Name</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="e.g Burger, Pizza, Manali etc"
                                    className="border rounded-l-md p-2 w-48"
                                />
                                <button
                                    type="submit"
                                    className="bg-green-600 p-2 rounded-r-md text-white hover:bg-green-700"
                                >
                                    <Search />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* ---------- Filtered Data Card ---------- */}
                <div className="bg-white shadow-md rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold mb-4">Filtered Results</h2>

                    {loading && (
                        <div className="flex items-center justify-center h-24">
                            <Loader2 className="animate-spin text-green-600" size={40} />
                        </div>
                    )}

                    {!loading && filteredData && filteredData.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredData.map((item) => (
                                <TransactionInfoCard
                                    key={item.id}
                                    id={item.id}
                                    icon={item.icon}
                                    title={item.name}
                                    date={item.date}
                                    amount={item.amount}
                                    type={formData.type}
                                />
                            ))}
                        </div>
                    )}

                    {!loading && filteredData && filteredData.length === 0 && (
                        <p className="text-gray-500 mt-4">No data found.</p>
                    )}
                </div>

            </div>
        </Dashboard>
    );
};

export default Filter;
