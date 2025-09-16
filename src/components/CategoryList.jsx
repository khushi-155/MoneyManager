import { Image, Edit } from "lucide-react";

const Categorylist = ({ categories, onEditCategory }) => {
    if (!categories || categories.length === 0) {
        return (
            <div className="text-center text-gray-500 py-4">
                No categories found
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-lg font-semibold mb-4">Category Sources</h3>

            <div className="flex flex-wrap gap-8">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="group flex items-center gap-3 min-w-[180px] p-3 rounded-lg hover:bg-gray-50 transition-colors relative"
                    >
                        {/* Icon/Emoji */}
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-xl overflow-hidden">
                            {cat.icon ? (
                                <img
                                    src={cat.icon}
                                    alt="category icon"
                                    className="w-6 h-6 object-contain"
                                />
                            ) : (
                                <Image size={18} />
                            )}
                        </div>

                        {/* Name & type */}
                        <div>
                            <div className="font-medium">{cat.name}</div>
                            <div className="text-sm text-gray-500">{cat.type || "General"}</div>
                        </div>

                        {/* Actions (hidden until hover) */}
                        <div className="ml-auto flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onEditCategory(cat)}
                                className="p-1 rounded hover:bg-blue-100 text-blue-400"
                            >
                                <Edit size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categorylist;
