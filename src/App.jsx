import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles/app.module.css";
import Login from "./components/Login";
import { useState } from "react";

export default function App() {
  const [modalShow, setModalShow] = useState(true);

  function handleUser() {
  }

  return (
    <>
      <div className={styles.app}>
        <div className={styles.appContent}>
          <Login show={modalShow} onHide={() => setModalShow(false)} onSendUser={handleUser} />
        </div>
      </div>
      <div className={styles.footer}>
        Made with <img src="./src/assets/svg/srce.svg" alt="" width="15px" /> by Goran Brbot
      </div>
    </>
  );
}
