import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Pages } from "../../Constants";

export default function Header(props) {
    const [deleteMode, setDeleteMode] = useState(false);
  return (
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
      {/* <h2>Name</h2> */}
      <Button
        type="button"
        variant="btn btn-btn btn-danger ms-auto"
        onClick={() => {
            props.setDeleteMode(!deleteMode)
            setDeleteMode(!deleteMode);
          }}
      >
        {deleteMode ? (
          "Cancel"
        ) : (
          <i className="fa fa-trash color-white" aria-hidden="true"></i>
        )}
      </Button>
    </div>
  );
}
