import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/esm/Spinner";

function InputModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="newTask">
            <Form.Label>{props.label}</Form.Label>
            {props.inputType === "text" ? (
              <Form.Control type="text" autoFocus onChange={props.onChange} />
            ) : (
              <Form.Control
                as="textarea"
                autoFocus
                onChange={props.onChange}
                rows={10}
              />
            )}
          </Form.Group>
        </Form>
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
