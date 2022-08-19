import styles from "./Journal.module.css";
import Button from "react-bootstrap/Button";
import { Pages } from "../../Constants";
import ListGroup from "react-bootstrap/ListGroup";

import { useEffect, useState, useRef } from "react";

import InputModal from "../../CustomComponents/InputModal/InputModal";

import { createJournal, getAllJournals } from "../../Services/WebService";

function Journal(props) {
  const [show, setShow] = useState(false);
  const [newJournal, setNewJournal] = useState("");
  const handleClose = () => setShow(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [journals, setJournals] = useState([]);

  const date = new Date();

  function onChange(e) {
    setNewJournal(e.target.value);
  }

  useEffect(() => {
    async function getJournals() {
      await getAllJournals();
    }

    getJournals();
  }, []);

  async function handleSubmit() {
    setLoading(true);
    let journalId = journals.length + 1;
    await createJournal(newJournal,  getAdjustedDate(), String(journalId));
    setJournals([...journals, { journal: newJournal, date: getAdjustedDate(), journal_id: journalId } ]);
    handleClose();
    setLoading(false);
    setShowToast(true);
    setToastText("Saved successfully");
  }

  function getAdjustedDate(){
    const localDate = date.toLocaleString('en-US', {hour12: false});
    const hours = new Date(localDate).getHours();
    if(hours < 4){
      let previousDay = new Date();
      previousDay.setDate(previousDay.getDate() - 1);
      return `${previousDay.getDate()}/${previousDay.getMonth()}`;
    }else{
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }
  }

  return (
    <>
      <div
        className="d-flex position-sticky p-3 top-0 bg-light"
        style={{ zIndex: 99 }}
      >
        <Button
          onClick={() => props.navigateTo(Pages.HOME)}
          variant="btn btn-outline-primary bg-white"
        >
          <i className="fa fa-angle-left"></i>Back
        </Button>
      </div>

      <ListGroup className="flex-column-reverse">
        {journals.map((journal) => {
          return (
            <ListGroup.Item key={journal.journal_id}>
              <div className="d-flex align-items-center">
                <span className={`${styles.date} text-muted`}>{journal.date}</span>
                <span>{journal.journal}</span>
              </div>
            </ListGroup.Item>
          );
        })}
        <ListGroup.Item
          action
          onClick={() => {
            setShow(true);
          }}
          className={`text-center ${styles.addBtn} position-fixed bottom-0`}
        >
          <i className="fa fa-plus" aria-hidden="true"></i>
        </ListGroup.Item>
      </ListGroup>

      <InputModal
        show={show}
        title="Create"
        label="Journal"
        onChange={onChange}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={loading}
        inputType="textarea"
      />
    </>
  );
}

export default Journal;
