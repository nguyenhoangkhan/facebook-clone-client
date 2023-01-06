import { useRef, useState, useEffect } from "react";
import Picker from "emoji-picker-react";

import postBackgrounds from "../../../../assets/data/postBackgrounds";
import { useClickOutside } from "../../../../Hooks";

const EmojiPicker = ({
  text,
  user,
  type2,
  setText,
  background,
  setBackground,
  showPrev,
}) => {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [isShowBackgrounds, setShowBackgrounds] = useState(false);
  const textRef = useRef(null);
  const backgroundRef = useRef(null);
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const pickerRef = useRef(null);

  useClickOutside(pickerRef, () => {
    setPicker(false);
  });

  useEffect(() => {
    if (!showPrev) {
      textRef.current.focus();
    }
  }, [showPrev]);

  const backgroundHandler = (bg) => {
    setBackground(bg);
    backgroundRef.current.style.backgroundImage = `url(${bg})`;
    backgroundRef.current.classList.add("bgHandler");
  };

  const removeBackground = () => {
    setBackground("");
    backgroundRef.current.style.backgroundImage = "";
    backgroundRef.current.classList.remove("bgHandler");
  };

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
    <div className={type2 ? "images_input" : "background_input"}>
      <div className={!type2 ? "flex_center" : ""} ref={backgroundRef}>
        <textarea
          ref={textRef}
          maxLength="180"
          value={text}
          placeholder={`${user?.first_name} ơi, bạn đang nghĩ gì thế?`}
          className={`post_input ${type2 && "input2"}`}
          onChange={(e) => setText(e.target.value)}
          style={{
            paddingTop: `${
              background
                ? Math.abs(textRef.current.value.length * 0.09 - 30)
                : "0"
            }%`,
          }}
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
        {!type2 && (
          <img
            src="../../../icons/colorful.png"
            alt=""
            onClick={() => setShowBackgrounds((prev) => !prev)}
          />
        )}

        {isShowBackgrounds && !type2 && (
          <div className="post_backgrounds">
            <div className="no_bg" onClick={() => removeBackground()}></div>
            {postBackgrounds.map((bg, idx) => (
              <img
                src={bg}
                key={idx}
                alt=""
                onClick={() => backgroundHandler(bg)}
              />
            ))}
          </div>
        )}

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
