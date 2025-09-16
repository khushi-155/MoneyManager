import { Loader2, Plus } from "lucide-react"; // spinner icon from lucide-react
import { useUser } from "../../customHook/useUser";
import Categorylist from "../components/CategoryList";
import Dashboard from "../components/Dashboard";
import axiosInstance from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { AddCategoryForm } from "../components/AddCategoryForm";
import { toast } from "react-toastify";

const Category = () => {
    useUser();
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setOpenEditCategoryModal(true);
    };

    const handleDeleteCategory = async (category) => {
        debugger
        console.log("delete category")
        //  const response  = axiosInstance.delete()


    }
    const onUpdateCategory = async (formData) => {
        try {
            const response = await axiosInstance.put(
                `${API_ENDPOINTS.UPDATE_CATEGORY}/${selectedCategory.id}`,
                {
                    icon: formData.categoryIcon,
                    type: formData.categoryType,
                    name: formData.categoryName.trim().toLowerCase()
                }
            );

            if (response.status === 200) {
                toast.success("Category updated successfully");
                fetchCategoryDetails();
                setOpenEditCategoryModal(false);
                setSelectedCategory(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update category");
        }
    };

    const fetchCategoryDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_ENDPOINTS.Fetch_ALL_CATEGORY);
            debugger
            if (response.status === 200) {
                setCategoryData(response.data);
            }
        } catch (error) {
            console.error("something went wrong, please try again", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryDetails()
    }, [])

    const onAddCategory = async (formData) => {
        debugger
        const newName = formData.categoryName.trim().toLowerCase();

        if (!newName) {
            toast.error("Category name is required");
            return;
        }

        // Check for duplicate
        const alreadyExists = categoryData.some(
            (cat) => cat.name.toLowerCase() === newName
        );

        if (alreadyExists) {
            alert("Category already exists!");
            return;
        }

        try {
            const response = await axiosInstance.post(API_ENDPOINTS.ADD_CATEGORY, {
                icon: formData.categoryIcon,
                type: formData.categoryType,
                name: newName
            });

            if (response.status === 200) {
                toast.success("Category added successfully");
                fetchCategoryDetails(); // refresh list
                setOpenAddCategoryModal(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add category");
        }
    };



    return (
        <Dashboard>
            <div className="my-5 mx-auto">
                {/* add button to add category */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">All Category</h2>
                    <div>
                        <button
                            onClick={() => setOpenAddCategoryModal(true)}
                            className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            <Plus size={18} />
                            Add Category
                        </button>
                    </div>
                </div>
                <Modal
                    isOpen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                    title="Add New Category"
                >
                    <AddCategoryForm onClose={() => setOpenAddCategoryModal(false)} onAddCategory={onAddCategory} />
                </Modal>

                <Modal
                    isOpen={openEditCategoryModal}
                    onClose={() => setOpenEditCategoryModal(false)}
                    title="Edit Category"
                >
                    <AddCategoryForm
                        onClose={() => setOpenEditCategoryModal(false)}
                        onAddCategory={onUpdateCategory}
                        initialData={selectedCategory}  // default values
                    />
                </Modal>

                {/* if loading show spinner else show list */}
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <Loader2 className="animate-spin text-green-600" size={40} />
                        <span className="ml-2 text-gray-600">Loading categories...</span>
                    </div>
                ) : (
                    <Categorylist
                        categories={categoryData}
                        onEditCategory={handleEditCategory}
                        onDeleteCategory={handleDeleteCategory}
                    />
                )}

                {/* adding category modal */}

                {/* updating category modal */}
            </div>
        </Dashboard>
    )
}

export default Category;
