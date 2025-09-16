import { useRef, useState, useEffect } from "react";
import { User, Upload, Trash2 } from "lucide-react";

export const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewURL, setPreviewURL] = useState(null);

    useEffect(() => {
        if (image) {
            const preview = URL.createObjectURL(image);
            setPreviewURL(preview);

            return () => URL.revokeObjectURL(preview);
        } else {
            setPreviewURL(null);
        }
    }, [image]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewURL(null);
        inputRef.current.value = "";
    }

    const onChooseFile = () => {
        inputRef.current?.click();
    }

    return (
        <div className="flex justify-center mb-6">
            <input type="file" accept="image/"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />
            {!image ? (
                <div className="w-20 h-20 bg-green-100 rounded-full flex flex-col items-center justify-center relative -translate-y-1">
                    <User className="text-green-700" size={25} />
                    <button
                        type = "button"
                        onClick={onChooseFile}
                        className="p-1  rounded-full mt-1"
                        aria-label="Upload"
                        style={{ position: 'absolute', bottom: 4, right: 4 }}
                    >
                        <Upload size={14} className="text-green-600  hover:text-green-800" />
                    </button>
                </div>
            ) : (
                <div className="w-20 h-20 bg-gray-100 rounded-full flex flex-col items-center justify-center relative">
                    <img
                        src={previewURL}
                        alt="Profile"
                        className="rounded-full w-20 h-20 object-cover"
                    />
                    <button
                        type = "button"
                        onClick={() => handleRemoveImage()}
                        className="rounded-full"
                        aria-label="Delete"
                        style={{ position: 'absolute', bottom: 4, right: 4 }}
                    >
                        <Trash2 className="text-red-400 rounded-full hover:text-red-600" size={14} />
                    </button>
                </div>
            )}


        </div>
    )
}
