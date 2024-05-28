/** @format */

import React, { useCallback, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import HOC from "../../layout/HOC";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { Container, Table, Modal, Form, Button } from "react-bootstrap";

const AdminHoro = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [editA, setP] = useState(false);
  const [data, setData] = useState([]);
  const [id, setID] = useState("");

  // Admin Token
  const token = localStorage.getItem("AdminToken");

  // fetch All hroscopes
  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://ayush-astro-backend.vercel.app/horoscope",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (err) {
      console.log(" Fetch All Horoscope err => ", err);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Delete Horoscope by ID
  const deleteKundli = async (id) => {
    try {
      const data = await axios.delete(
        `https://ayush-astro-backend.vercel.app/horoscope/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      toast.success("Horoscope Deleted SuccessFully");
      fetchData();
    } catch (err) {
      fetchData();
      console.log("Delete Horoscope err => ", err);
    }
  };

  // Modal ---
  function MyVerticallyCenteredModal(props) {
    const [date, setDate] = useState("");
    const [horoScope, setHoroscope] = useState("");
    const [profession, setProfession] = useState("");
    const [emotions, setEmotion] = useState("");
    const [health, setHealth] = useState("");
    const [travel, setTravel] = useState("");
    const [love, setLove] = useState("");
    const [luck, setLuck] = useState(" ");

    // Add Horoscope
    const addHoroscope = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "https://ayush-astro-backend.vercel.app/horoscope",
          {
            date,
            horoScope,
            profession,
            emotions,
            health,
            travel,
            love,
            luck,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        toast.success("Horoscope Added SuccessFully");
        setModalShow(false);
        fetchData();
      } catch (err) {
        console.log("add Horoscope err => ", err);
      }
    };

    // Edit Horoscope
    const editHoroscope = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.put(
          `https://ayush-astro-backend.vercel.app/horoscope/${id}`,
          {   date,
            horoScope,
            profession,
            emotions,
            health,
            travel,
            love,
            luck,},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        fetchData();
        setModalShow(false);
        toast.success("Horoscope Edited Successfully");
      } catch (err) {
        console.log("Edit Horoscope Err =>", err);
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
            {editA ? "Edit Astrolger" : " Add Horoscope"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editA ? editHoroscope : addHoroscope}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                required
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Horoscope</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setHoroscope(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Profession</Form.Label>
              <Form.Control
                type="date"
                required
                onChange={(e) => setProfession(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Emotion</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setEmotion(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Health</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setHealth(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Travel</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setTravel(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Love</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setLove(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Luck</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setLuck(e.target.value)}
              />
            </Form.Group>

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
            ALl Horoscopes (Total : {data?.details?.length})
          </span>
          <button
            onClick={() => {
              setP(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[rgb(241,146,46)] text-white tracking-wider"
          >
            Add Horoscropes
          </button>
        </div>

        <Container
          className="wcomp overflow-x-auto"
          style={{ marginTop: "2%" }}
        >
          <Table style={{ color: "black" }} striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Horoscope</th>
                <th>Profession</th>
                <th>Emotions</th>
                <th>Health</th>
                <th>Travel</th>
                <th>Luck</th>
             
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{ color: "black" }}>
              {data?.details?.map((i, index) => (
                <tr key={index}>
                  <td>{i.date}</td>
                  <td>{i.horoScope}</td>
                  <td>{i.PROFESSION}</td>
                  <td>{i.EMOTIONS} </td>
                  <td> {i.HEALTH} </td>
                  <td> {i.TRAVEL} </td>
                  <td> {i.LUCK} </td>
                
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

export default HOC(AdminHoro);
