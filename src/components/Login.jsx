import styles from "../styles/login.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import PropTypes from "prop-types";

export default function Login({ show, onHide, onSendUser }) {
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");

  function onNameChange(e) {
    setUsername(e.target.value);
  }

  function onAvatarChange(e) {
    setSelectedAvatar(e.target.id);
  }

  function onSubmit(e) {
    e.preventDefault();
    let loginStay = false;
    if (selectedAvatar === "") {
      alert("Please select an 'Avatar'");
      loginStay = true;
    } else if (username === "") {
      alert("Please enter a 'User Name'");
      loginStay = true;
    } else {
      onSendUser(username, selectedAvatar);
      loginStay ? null : onHide();
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      className={styles.modal}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation="true"
      keyboard="false"
      onEscapeKeyDown
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Sign in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.userNameLogin}>
          <Form noValidate onSubmit={onSubmit}>
            <Col>
              <Row>
                <small> - CHOOSE AVATAR - </small>
                <Form.Group className={styles.avatarsGroup}>
                  <Form.Label className={styles.avatars}>
                    <input type="radio" id="avatar1" name="avatar" checked={selectedAvatar === "avatar1"} onChange={onAvatarChange} />
                    <img src="/svg/male1.svg" alt="" />
                  </Form.Label>
                  <Form.Label className={styles.avatars}>
                    <input type="radio" id="avatar2" name="avatar" checked={selectedAvatar === "avatar2"} onChange={onAvatarChange} />
                    <img src="/svg/girl1.svg" alt="" />
                  </Form.Label>
                  <Form.Label className={styles.avatars}>
                    <input type="radio" id="avatar3" name="avatar" checked={selectedAvatar === "avatar3"} onChange={onAvatarChange} />
                    <img src="/svg/male2.svg" alt="" />
                  </Form.Label>
                  <Form.Label className={styles.avatars}>
                    <input type="radio" id="avatar4" name="avatar" checked={selectedAvatar === "avatar4"} onChange={onAvatarChange} />
                    <img src="/svg/girl2.svg" alt="" />
                  </Form.Label>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="pb-3">
                  <Form.Label></Form.Label>
                  <Form.Control size="lg" required type="text" placeholder="Create user name .." value={username} onChange={onNameChange} />
                  <div className="d-grid gap-2">
                    <Button size="lg" type="submit" className={styles.loginBtn}>
                      Login
                    </Button>
                  </div>
                </Form.Group>
              </Row>
            </Col>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

Login.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onSendUser: PropTypes.func,
};
