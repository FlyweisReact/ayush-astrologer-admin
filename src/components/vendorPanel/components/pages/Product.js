/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import HOC from "../layout/HOC";

const Product = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        "https://astro-new-beta.vercel.app/product/getProduct"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  function EditModal(props) {
    const [image, setI] = useState("");
    const [price, setP] = useState("");
    const [desc, setD] = useState("");
    const [url, setUrl] = useState("");

    const postDetails = (e) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const postDetail = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "https://astro-new-beta.vercel.app/product/addProduct",
          {
            link: url,
            desc,
            price,
          }
        );
        console.log(data);
        toast.success("Product added");
        setOpen(false);
        fetchHandler();
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postDetail}>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setI(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setD(e.target.value)}
                onClick={() => postDetails()}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price </Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setP(e.target.value)}
              />
            </Form.Group>
            <button
              style={{
                backgroundColor: "#4099ff",
                borderRadius: "0",
                color: "white",
                padding: "5px",
                fontSize: "1.4rem",
                width: "200px",
                marginTop: "10px",
              }}
            >
              Submit
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deletePro = async (id) => {
    try {
      const data = await axios.delete(
        `https://astro-new-beta.vercel.app/product/deleteProduct/${id}`
      );
      toast.success("Product Deleted Successfully");
      fetchHandler();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <EditModal show={open} onHide={() => setOpen(false)} />

      <div
        style={{
          color: "black",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: "1.6rem" }}>Product</p>
        <Button variant="outline-success" onClick={() => setOpen(true)}>
          Add Product
        </Button>
      </div>

      <div style={{ overflowX: "auto", marginTop: "2%" }}>
        <Table striped bordered hover>
          <thead>
            <th>Image</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </thead>
          <tbody>
            {data?.data?.map((i, index) => (
              <tr key={index}>
                <td>
                  <img src={i.link} alt="" style={{ width: "100px" }} />
                </td>
                <td>{i.price}</td>
                <td>{i.desc}</td>
                <td>
                  <AiFillDelete
                    color="red"
                    cursor={"pointer"}
                    onClick={() => deletePro(i._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default HOC(Product);
