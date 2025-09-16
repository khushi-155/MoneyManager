import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [showPicker, setShowPicker] = useState(false);

  
   const handleEmojiClick = (emojiData) => {
    setShowPicker(false);
    if (onSelect) {
      debugger
      onSelect(emojiData.imageUrl); // parent me value set hogi
    }
  };

 return (
    <div className="p-4 relative">
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="px-3 py-2 bg-blue-500 text-white rounded-lg shadow flex items-center space-x-2"
      >
        {icon ? (
          <img src={icon} alt="emoji" className="w-6 h-6 inline-block" />
        ) : (
          "😊 Pick Emoji"
        )}
      </button>

      {showPicker && (
        <div className="absolute mt-2 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;