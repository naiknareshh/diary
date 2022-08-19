import Checkbox from "../../CustomComponents/Checkbox/Checkbox";
import styles from "./ChecklistLayout.module.css";
import { useState, useRef, useEffect } from "react";
import React from "react";

import { Pages } from "../../Constants";

import AddButton from "../../CustomComponents/AddButtom/AddButton";
import InputModal from "../../CustomComponents/InputModal/InputModal";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Header from "../../CustomComponents/Header/Header";

function ChecklistLayout(props) {
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [toastText, setToastText] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemToggle, setNewItemToggle] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [items, setItems] = useState(props.items);
  const tItems = useRef(JSON.parse(JSON.stringify(items)));
  const updatedList = useRef([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const date = new Date();

  useEffect(() => {
    setItems(props.items);
    tItems.current = JSON.parse(JSON.stringify(props.items));
  }, [props.items]);

  async function handleSubmit() {
    setLoading(true);
    let itemId = items.length + 1;
    let res = await props.createItemCallback(
      newItem,
      newItemDescription,
      false,
      `${date.getDate()}/${date.getMonth() + 1}`,
      String(itemId),
      newItemToggle
    );
    setItems(JSON.parse(JSON.stringify(tItems.current)));
    handleClose();
    setLoading(false);
    setShowToast(true);
    setToastText(res.message);
    props.refreshList();
  }

  function onChange(e) {
    setNewItem(e.target.value);
  }

  function onChangeDescription(e) {
    setNewItemDescription(e.target.value);
  }

  function onChangeToggle(val){
    setNewItemToggle(val);
  }

  async function saveChanges() {
    setLoading(true);
    if (deleteMode) {
      let res = await props.deleteItemCallback(updatedList.current);
      setItems(tItems.current);
      setToastText(res.message);
    } else {
      let res = await props.updateItemCallback(updatedList.current);
      setItems(tItems.current);
      setToastText(res.message);
    }
    updatedList.current = [];
    setLoading(false);
    setShowToast(true);
    setShowSaveBtn(false);
    setDeleteMode(false);
    props.refreshList();
  }

  function handleDeleteItem(e, item) {
    e.target.classList.add("text-danger");
    setShowSaveBtn(true);
    updatedList.current.push(item);
    let newList = tItems.current.filter((t) => {
      return t[props.idKey] !== item[props.idKey];
    });
    tItems.current = newList;
  }

  return (
    <>
      <Header
        navigateTo={props.navigateTo}
        setDeleteMode={(deleteModeFlag) => {
          if (deleteModeFlag) {
            tItems.current = props.items;
            setShowSaveBtn(false);
          }
          setDeleteMode(deleteModeFlag);
        }}
      />
      <div className={styles.itemsContainer}>
        {items?.map((item, index) => {
          if (item && item[props.idKey]) {
            return (
              <div
                className={`d-flex ${styles.item} ${
                  item.isComplete && styles.taskComplete
                }`}
                key={item[props.idKey]}
              >
                <Checkbox
                  disabled={loading}
                  items={tItems.current}
                  index={index}
                  isComplete={item.isComplete}
                  name={item[props.valKey]}
                  subtitle={item.description}
                  callback={() => {
                    let isEqual = true;
                    updatedList.current = [];
                    items.forEach((item) => {
                      tItems.current.forEach((tItem) => {
                        if (
                          item[props.idKey] === tItem[props.idKey] &&
                          item.isComplete !== tItem.isComplete
                        ) {
                          isEqual = false;
                          updatedList.current.push(tItem);
                          setShowSaveBtn(true);
                        }
                      });
                    });
                    if (isEqual) {
                      setShowSaveBtn(false);
                    }
                  }}
                />
                {deleteMode ? (
                  <Button
                    variant="btn btn-outline-info"
                    className={styles.trashBtn}
                    onClick={(e) => {
                      handleDeleteItem(e, item);
                    }}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </Button>
                ) : (
                  <span className={styles.date}>{item.date}</span>
                )}
              </div>
            );
          } else {
            return null;
          }
        })}

        <ToastContainer className="p-3" position="bottom-center">
          <Toast
            onClose={() => setShowToast(false)}
            delay={3000}
            show={showToast}
            autohide
          >
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Item</strong>
            </Toast.Header>
            <Toast.Body>{toastText}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
      <InputModal
        show={show}
        title="Create Item"
        label="Item"
        onChange={onChange}
        onChangeDescription={onChangeDescription}
        onChangeToggle={onChangeToggle}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        loading={loading}
        inputType={props.inputType}
        layoutType={props.layoutType}
      />
      {showSaveBtn && (
        <Button
          variant="primary"
          className={`centered ${styles.saveBtn} btn-lg`}
          disabled={loading}
          onClick={saveChanges}
        >
          {loading && (
            <Spinner
              className="me-2"
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          Save
        </Button>
      )}
      {!deleteMode && <AddButton invokeFunction={handleShow} />}
    </>
  );
}

export default ChecklistLayout;
