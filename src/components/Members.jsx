import styles from "../styles/members.module.css";
import PropTypes from "prop-types";

export default function Members({ members, user }) {
  function Member({ id, clientData }) {
    const { username, color } = clientData;

    return (
      <div key={id} className={styles.member}>
        <div className={styles.username} style={{ color: color }}>
          {username}
        </div>
      </div>
    );
  }

  const loggedUsers = members.map((m) => Member(m, m.id === user.id));

  return (
    <div className={styles.members}>
      <h1>.chat</h1>
      <div className={styles.membersList}>{loggedUsers}</div>
    </div>
  );
}

Members.propTypes = {
  members: PropTypes.array,
  user: PropTypes.object,
  id: PropTypes.number,
  clientData: PropTypes.string,
};
