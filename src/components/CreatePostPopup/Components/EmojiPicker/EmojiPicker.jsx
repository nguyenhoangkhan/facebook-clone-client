import { useRef, useState } from "react";
import Picker from "emoji-picker-react";

import { useClickOutside } from "../../../../Hooks";

const EmojiPicker = (props) => {
  const [picker, setPicker] = useState(false);

  const pickerRef = useRef(null);

  useClickOutside(pickerRef, () => {
    setPicker(false);
  });

  const handleEmoji = (e, { emoji }) => {
    const ref = props.textRef.current;
    ref.focus();
    const start = props.text.substring(0, ref.selectionStart);
    const end = props.text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    props.setText(newText);
    props.setCursorPosition(start.length + emoji.length);
  };
  return (
    <div className="post_emojis_wrap" ref={pickerRef}>
      {picker && (
        <div className="comment_emoji_picker remove">
          <Picker onEmojiClick={handleEmoji} />
        </div>
      )}
      <img src="../../../icons/colorful.png" alt="" />
      <i
        className="emoji_icon_large"
        onClick={() => {
          setPicker((prev) => !prev);
        }}
      ></i>
    </div>
  );
};

export default EmojiPicker;
