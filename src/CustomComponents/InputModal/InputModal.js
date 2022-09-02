import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useState } from "react";

function InputModal(props) {
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "Short Term", value: "1" },
    { name: "Long Term", value: "2" },
  ];

  const renderInputFields = () => {
    if (props.inputType === "text") {
      return <Form.Control type="text" autoFocus onChange={props.onChange} />;
    } else if (props.inputType === "text-2") {
      return (
        <>
          <Form.Control type="text" autoFocus onChange={props.onChange} />
          <Form.Control
            type="text"
            className="mt-4"
            onChange={props.onChangeDescription}
            placeholder="Description"
          />
        </>
      );
    } else if (props.inputType === "textarea-text") {
      return (
        <>
          <Form.Control
            as="textarea"
            autoFocus
            onChange={props.onChange}
            rows={5}
          />
          <Form.Control
            type="text"
            className="mt-4"
            onChange={props.onChangeDescription}
            placeholder="Description"
          />
        </>
      );
    } else {
      return (
        <Form.Control
          as="textarea"
          autoFocus
          onChange={props.onChange}
          rows={10}
        />
      );
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="newTask">
            <Form.Label>{props.label}</Form.Label>
            {renderInputFields()}
          </Form.Group>
        </Form>
        {props.layoutType === "goals" && (
          <ButtonGroup className="d-flex" hidden={props.layoutType !== "goals"}>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? "outline-success" : "outline-primary"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => {
                  props.onChangeToggle(e.currentTarget.value);
                  setRadioValue(e.currentTarget.value);
                }}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={props.handleSubmit}
          disabled={props.loading}
        >
          {props.loading && (
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
      </Modal.Footer>
    </Modal>
  );
}

export default InputModal;
