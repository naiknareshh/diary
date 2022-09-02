import "./App.css";
import React from "react";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Tasks from "./Pages/Tasks/Tasks";
import Buy from "./Pages/Buy/Buy";
import { useState } from "react";
import { Pages } from "./Constants";
import { useEffect, useRef } from "react";
import { getAllTasks, setApiKey } from "./Services/WebService";
import "font-awesome/css/font-awesome.min.css";
import Journal from "./Pages/Journal/Journal";

import { getApiKey } from "./Services/WebService";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Goals from "./Pages/Goals/Goals";
import Wish from "./Pages/Wish/Wish";

const App = () => {
  const [currentPage, setCurrentPage] = useState(Pages.HOME);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  let apiKeyRef = useRef("");

  useEffect(() => {
    let apiKey = localStorage.getItem("api-key");

    if(apiKey){
      setApiKey(apiKey);
      getAllTasks().then((res) => {
        setTasks(res);
      }).catch(error => {
        localStorage.setItem("api-key", "");
        setShowModal(true);
        setModalText(String(error));
      });
    }else{
      setModalText("Enter API Key");
      setShowModal(true);
    }
  }, []);

  function navigateTo(page) {
    setCurrentPage(page);
  }

  return (
    <div className="App">
      <Modal centered show={showModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton={false}>
          <Modal.Title>Security</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalText}
          <Form.Control
            type="text"
            autoFocus
            onChange={(e) => {
              apiKeyRef.current = e.target.value;
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              localStorage.setItem("api-key", apiKeyRef.current);
              setShowModal(false);
              window.location.reload();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {
        {
          [Pages.HOME]: <Dashboard navigateTo={navigateTo} tasks={tasks} />,
          [Pages.TASKS]: <Tasks navigateTo={navigateTo} tasks={tasks} />,
          [Pages.JOURNAL]: <Journal navigateTo={navigateTo} />,
          [Pages.BUY]: <Buy navigateTo={navigateTo} />,
          [Pages.GOALS]: <Goals navigateTo={navigateTo} />,
          [Pages.WISH]: <Wish navigateTo={navigateTo}/>
        }[currentPage]
      }
    </div>
  );
};

export default App;
