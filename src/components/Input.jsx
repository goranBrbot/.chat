import styles from "../styles/input.module.css";
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function Input({ onSendMessage }) {
  const [inputValue, setInputValue] = useState("");
  const [emoji, setEmoji] = useState(false);

  const audioRef = useRef();
  const inputFocusRef = useRef(null);

  function onChange(e) {
    setInputValue(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    setInputValue("");
    onSendMessage(inputValue);
    audioRef.current.play();
  }

  function handleEmoji(emoji) {
    setInputValue(inputValue + emoji.native);
    inputFocusRef.current.focus();
    setEmoji(!emoji);
  }

  return (
    <>
      <div className={styles.emojiPicker}>{emoji && <Picker data={data} onEmojiSelect={handleEmoji} previewEmoji={"slightly_smiling_face"} />}</div>
      <div className={styles.input}>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} ref={inputFocusRef} value={inputValue} type="text" placeholder="Message .." autoFocus />
          <img src="/src/assets/svg/emoji.svg" alt="" className={styles.emoji} onClick={() => setEmoji(!emoji)} />
          <button>Send</button>
        </form>
        <audio ref={audioRef} hidden>
          <source src="src/assets/audio/notification.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </>
  );
}

Input.propTypes = {
  onSendMessage: PropTypes.func,
};
