export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // don’t render if modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Title */}
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        {/* Content (form, text, anything) */}
        <div>{children}</div>
      </div>
    </div>
  );
};
