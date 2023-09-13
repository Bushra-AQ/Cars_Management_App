import React from "react";
import { Spinner } from "react-bootstrap";
const Loader = () => {
  return (
    <div>
      <Spinner animation="border" variant="primary" className="spinner" />
    </div>
  );
};

export default Loader;
