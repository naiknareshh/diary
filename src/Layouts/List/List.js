import styles from "./Item.module.css";
import Button from "react-bootstrap/Button";
import { Pages } from "../../Constants";
import ListGroup from "react-bootstrap/ListGroup";

import { useEffect, useState, useRef } from "react";

import InputModal from "../../CustomComponents/InputModal/InputModal";

import { createItem, getAllItems } from "../../Services/WebService";

function Item(props) {
  const [show, setShow] = useState(false);
  const [newItem, setNewItem] = useState("");
  const handleClose = () => setShow(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [items, setItems] = useState([]);

  const date = new Date();

  function onChange(e) {
    setNewItem(e.target.value);
  }

  useEffect(() => {
    async function getItems() {
      let res = await getAllItems();
      setItems(res);
    }

    getItems();
  }, []);

  async function handleSubmit() {
    setLoading(true);
    let itemId = items.length + 1;
    await createItem(newItem,  getAdjustedDate(), String(itemId));
    setItems([...items, { item: newItem, date: getAdjustedDate(), item_id: itemId } ]);
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
        {items.map((item) => {
          return (
            <ListGroup.Item key={item.item_id}>
              <div className="d-flex align-items-center">
                <span className={`${styles.date} text-muted`}>{item.date}</span>
                <span>{item.item}</span>
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
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={loading}
        inputType="textarea"
      />
    </>
  );
}

export default Item;
