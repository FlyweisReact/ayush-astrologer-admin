/** @format */

import React, { useCallback, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import HOC from "../../layout/HOC";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { Container, Table, Modal, Form, Button } from "react-bootstrap";

const Kundli = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [editA, setP] = useState(false);
  const [data, setData] = useState([]);
  const [id, setID] = useState("");

  // Admin Token
  const token = localStorage.getItem("AdminToken");

  // fetch All Kundli's
  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://astro-new-beta.vercel.app/kundli",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (err) {
      console.log(" Fetch All Kundli's err => ", err);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Delete Kundli by ID
  const deleteKundli = async (id) => {
    try {
      const data = await axios.delete(
        `https://astro-new-beta.vercel.app/kundli/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      toast.success("Kundli Deleted SuccessFully");
      fetchData();
    } catch (err) {
      fetchData();
      console.log("Delete Kudli err => ", err);
    }
  };

  // Modal ---
  function MyVerticallyCenteredModal(props) {
    // -----------------------------------------
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [time, setTime] = useState("");
    const [place, setPlace] = useState("");
    const [DOB, setDOB] = useState("");

    // Add Kundli
    const addKundli = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "https://astro-new-beta.vercel.app/kundli",
          {
            name,
            gender,
            time,
            place,
            DOB,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        toast.success("Kundli Added SuccessFully");
        setModalShow(false);
        fetchData();
      } catch (err) {
        console.log("add Kundli err => ", err);
      }
    };

    // Edit Astrologer
    const editAstro = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.put(
          `https://astro-new-beta.vercel.app/kundli/${id}`,
          {
            name,
            gender,
            time,
            place,
            DOB,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        fetchData();
        setModalShow(false);
        toast.success("kundli Edited Successfully");
      } catch (err) {
        console.log("Edit Kundli Err =>", err);
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
            {editA ? "Edit Astrolger" : " Add Astrologer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editA ? editAstro : addKundli}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                required
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                required
                onChange={(e) => setDOB(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Place</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setPlace(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Open this select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
            <br />
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Kundli (Total : {data?.details?.length})
          </span>
          <button
            onClick={() => {
              setP(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[rgb(241,146,46)] text-white tracking-wider"
          >
            Add Kundli
          </button>
        </div>

        <Container
          className="wcomp overflow-x-auto"
          style={{ marginTop: "2%" }}
        >
          <Table style={{ color: "black" }} striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Time</th>
                <th>DOB</th>
                <th>Place</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody style={{ color: "black" }}>
              {data?.details?.map((i, index) => (
                <tr key={index}>
                  <td>{i.name}</td>
                  <td>{i.gender}</td>
                  <td>{i.time}</td>
                  <td>{i.DOB} </td>
                  <td> {i.place} </td>
                  <td>
                    <span style={{ display: "flex", gap: "20px" }}>
                      {" "}
                      <AiFillEdit
                        cursor="pointer"
                        color="blue"
                        onClick={() => {
                          setID(i._id);
                          setP(true);
                          setModalShow(true);
                        }}
                      />{" "}
                      <AiFillDelete
                        cursor="pointer"
                        color="red"
                        onClick={() => deleteKundli(i._id)}
                      />{" "}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </section>
    </>
  );
};

export default HOC(Kundli);
