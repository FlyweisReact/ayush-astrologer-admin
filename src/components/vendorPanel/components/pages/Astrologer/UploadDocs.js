/** @format */

import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";

const UploadDocs = () => {
  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Upload Documents
          </span>
        </div>

        <Container style={{ width: "800px", color: "black", marginTop: "5%" }}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Upload Documents</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Button
              variant="outline-primary"
              onClick={() => toast.success("Document Uploaded Successfully")}
            >
              Submit
            </Button>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default HOC(UploadDocs);
