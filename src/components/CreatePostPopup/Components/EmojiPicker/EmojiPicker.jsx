import { useRef, useState, useEffect } from "react";
import Picker from "emoji-picker-react";

import { useClickOutside } from "../../../../Hooks";

const EmojiPicker = ({ text, user, type2, setText }) => {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const pickerRef = useRef(null);

  useClickOutside(pickerRef, () => {
    setPicker(false);
  });

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  return (
    <div className={type2 ? "images_input" : ""}>
      <div className={!type2 ? "flex_center" : ""}>
        <textarea
          ref={textRef}
          maxLength="100"
          value={text}
          placeholder={`${user?.first_name} ơi, bạn đang nghĩ gì thế?`}
          className={`post_input ${type2 && "input2"}`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className={!type2 ? "post_emojis_wrap" : ""} ref={pickerRef}>
        {picker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? "movepicker2" : "remove"
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && <img src="../../../icons/colorful.png" alt="" />}
        <i
          className={`emoji_icon_large ${type2 && "moveleft"}`}
          onClick={() => {
            setPicker((prev) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
};

export default EmojiPicker;
