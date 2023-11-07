import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles/app.module.css";
import Login from "./components/Login";
import Input from "./components/Input";
import { useState } from "react";

export default function App() {
  const [modalShow, setModalShow] = useState(true);

  function handleUser() {}

  function handleSendMessage() {}

  return (
    <>
      <div className={styles.app}>
        <div className={styles.appContent}>
          <Login show={modalShow} onHide={() => setModalShow(false)} onSendUser={handleUser} />
          <Input onSendMessage={handleSendMessage} />
        </div>
      </div>
      <div className={styles.footer}>
        Made with <img src="./src/assets/svg/srce.svg" alt="" width="15px" /> by Goran Brbot
      </div>
    </>
  );
}
