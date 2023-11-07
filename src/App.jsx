import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles/app.module.css";
import Login from "./components/Login";
import Input from "./components/Input";
import Messages from "./components/Messages";
import { useState, useRef } from "react";

let drone = null;
const droneChannelId = import.meta.env.VITE_DRONE_CHANNEL_ID;
console.log(droneChannelId);

export default function App() {
  // praćenje STANJA usera, članova, poruka i logina
  const [modalShow, setModalShow] = useState(true);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({
    id: null,
    username: "",
    avatar: "",
    color: rndColor(),
  });

  function rndColor() {
    let myColors = ["#344966", "#B57BA6", "#D64550", "#B279A7", "#4F517D", "#5E6973", "#619B8A"];
    let rnd = myColors[Math.trunc(Math.random() * myColors.length)];
    return rnd;
  }

  // REFERENCE na trenutne vrijednosti stanja kako bi se osiguralo da se uvijek koristi najnovija verzija podataka bez rendera
  const messagesRef = useRef();
  messagesRef.current = messages;

  const userRef = useRef();
  userRef.current = user;

  function connectToScaledrone() {
    // funkc sa argumentima (token i trenutni korisnik)
    drone = new window.Scaledrone(droneChannelId, { data: userRef.current });

    // povezivanje sa serverom, izvršava se callback funkcija ..
    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      // clientId se dodjeljuje ref. objektu i ažurira stanje
      userRef.current.id = drone.clientId;
      setUser(userRef.current);
      console.log(userRef.current); // test
      console.log("Successfully connected to Scaledrone");
    });

    // pretplata na "observable-room", u kojoj će se razmjenjivati poruke
    const room = drone.subscribe("observable-room");
    room.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      console.log("Successfully joined room");
    });

    // obrađuje dolazne poruke
    room.on("message", (message) => {
      setMessages([...messagesRef.current, message]);
      console.log(message); // test
    });
  }

  // slanje poruke u "observable-room"
  function handleSendMessage(message) {
    drone.publish({
      room: "observable-room",
      message,
    });
  }

  function handleUser(u, a) {
    userRef.current = { ...user, username: u, avatar: a };
    setUser(userRef.current);
    console.log(userRef.current);

    if (drone === null && userRef.current.username != "" && userRef.current.avatar != "") {
      connectToScaledrone();
    }
  }

  return (
    <>
      <div className={styles.app}>
        <div className={styles.appContent}>
          <Login show={modalShow} onHide={() => setModalShow(false)} onSendUser={handleUser} />
          <Messages messages={messages} user={user} />
          <Input onSendMessage={handleSendMessage} />
        </div>
      </div>
      <div className={styles.footer}>
        Made with <img src="./src/assets/svg/srce.svg" alt="" width="15px" /> by Goran Brbot
      </div>
    </>
  );
}
