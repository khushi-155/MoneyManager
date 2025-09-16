import { Sidebar } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../../customHook/useUser";
import axiosInstance from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { useEffect, useState } from "react";
import InfoCard from "../components/InforCard";
import { ArrowUpCircle, ArrowDownCircle, Wallet, Loader2 } from "lucide-react";
import TransactionOverview from "../components/TransactionOverview";
// import YourChartComponent from "../components/YourChartComponent";
import RecentTransactions from "../components/RecentTransaction";
const Home = () => {
    useUser();
    const [dashboardData, setDashboardData] = useState({});
    const [loading, setLoading] = useState(false);
    const fetchDashboardData = async () => {
        setLoading(true)
        try {
            debugger
            const response = await axiosInstance.get(API_ENDPOINTS.DASHBOARD_DATA);
            setDashboardData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log("Failed to fetch Dashboard data", error);
        } finally {
            setLoading(false); // loader stop after data arrives
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);


  return (
    <div>
        <Dashboard>
            {loading ? (
                <div className="flex flex-col items-center justify-center h-96">
                        <Loader2 className="animate-spin text-green-600" size={40} />
                    <p className="text-gray-500">Loading dashboard data...</p>
                </div>
            ) : (
                <>
                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                        <InfoCard
                            title="Total Balance"
                            value={dashboardData.totalBalance}
                            Icon={Wallet}
                            bgColor="bg-purple-600"
                        />
                        <InfoCard
                            title="Total Income"
                            value={dashboardData.totalIncome}
                            Icon={ArrowUpCircle}
                            bgColor="bg-green-600"
                        />
                        <InfoCard
                            title="Total Expense"
                            value={dashboardData.totalExpense}
                            Icon={ArrowDownCircle}
                            bgColor="bg-red-600"
                        />
                    </div>

                    {/* Recent Transactions & Chart */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                        <div className="md:col-span-2">
                            <div className="bg-white shadow-md rounded-2xl p-4">
                                <h2 className="text-lg font-semibold mb-2">Recent Transaction</h2>
                                <RecentTransactions transactions={dashboardData.recentTransactions} />
                            </div>
                        </div>

                        <div className="bg-white shadow-md rounded-xl p-5">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                Overview Chart
                            </h2>
                            <div className="h-64 flex items-center justify-center">
                                <TransactionOverview transactions={dashboardData} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Dashboard>
    </div>
);

};

export default Home;
