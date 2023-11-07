import styles from "../styles/messages.module.css";
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function Messages({ messages, user }) {
  const lastRef = useRef(null);
  useEffect(() => {
    if (lastRef && lastRef.current) {
      lastRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const msgList = messages.map((msg) => Message(msg, user));

  return (
    <ul className={styles.messagesList}>
      {msgList}
      <div ref={lastRef}></div>
    </ul>
  );
}

function Message({ member, data, id, timestamp }, user) {
  const { username, color, avatar } = member.clientData;

  const currentAvatar = () => {
    const avatars = {
      avatar1: `url('src/assets/svg/male1.svg')`,
      avatar2: `url('src/assets/svg/girl1.svg')`,
      avatar3: `url('src/assets/svg/male2.svg')`,
      avatar4: `url('src/assets/svg/girl2.svg')`,
    };

    for (const key in avatars) {
      if (key === avatar) {
        return avatars[key];
      }
    }
  };

  const convertTimestamptoLocalTime = () => {
    let dateObj = new Date(timestamp * 1000);
    let utcString = dateObj.toLocaleString("hr") + "h";
    let time = utcString.slice(-10, -4);
    return time;
  };

  function msgFromCurrentMember() {
    if (member.id === user.id) {
      return `${styles.messagesMessage} ${styles.currentMember}`;
    } else return `${styles.messagesMessage}`;
  }

  return (
    <li key={id} className={msgFromCurrentMember()}>
      <span className={styles.avatar} style={{ backgroundImage: currentAvatar() }} />
      <div className={styles.messageContent}>
        <div className={styles.username}>{username}</div>
        <div className={styles.text} style={{ backgroundColor: color }}>
          {data}
          <div className={styles.time}>{convertTimestamptoLocalTime()}</div>
        </div>
      </div>
    </li>
  );
}

Messages.propTypes = {
  messages: PropTypes.array,
  user: PropTypes.object,
};

Message.propTypes = {
  member: PropTypes.string,
  data: PropTypes.string,
  id: PropTypes.number,
  timestamp: PropTypes.number,
};
