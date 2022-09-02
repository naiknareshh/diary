import styles from "./ListLayout.module.css";
import Button from "react-bootstrap/Button";
import { Pages } from "../../Constants";
import ListGroup from "react-bootstrap/ListGroup";

import { useEffect, useState, useRef } from "react";

import InputModal from "../../CustomComponents/InputModal/InputModal";

function ListLayout(props) {
  const [show, setShow] = useState(false);
  const [newItem, setNewItem] = useState("");
  const handleClose = () => setShow(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [items, setItems] = useState([]);
  const [newItemDescription, setNewItemDescription] = useState("");

  const date = new Date();

  function onChange(e) {
    setNewItem(e.target.value);
  }

  function onChangeDescription(e){
    setNewItemDescription(e.target.value);
  }

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  async function handleSubmit() {
    setLoading(true);
    let itemId = items.length + 1;
    await props.createItemCallback(newItem, newItemDescription,  getAdjustedDate(), String(itemId));
    setItems([...items, { [props.valKey]: newItem, description: newItemDescription, date: getAdjustedDate(), [props.idKey]: itemId } ]);
    handleClose();
    setLoading(false);
    setShowToast(true);
    setNewItemDescription("");
    setToastText("Saved successfully");
    props.refreshList();
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

      <ListGroup className={`flex-column-reverse ${styles.listgroup}`}>
        {items.map((item) => {
          return (
            <ListGroup.Item key={item.item_id}>
              <div className="d-flex align-items-center">
                <span className={`${styles.date} text-muted`}>{item.date}</span>
                <span>{item[props.valKey]} <span style={{ fontStyle: 'italic', display: item.description ? "block" : "none" }} class="text-muted">- {item.description}</span></span>
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
        label="Item"
        onChange={onChange}
        onChangeDescription={onChangeDescription}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={loading}
        inputType={props.inputType}
      />
    </>
  );
}

export default ListLayout;
