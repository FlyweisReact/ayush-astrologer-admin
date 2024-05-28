import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import HOC from "../../layout/HOC";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";

import { Modal, Button } from "react-bootstrap";

const UserKundli = () => {
  const [id, setID] = useState("");
  const [popup, setPopup] = useState(false);
  const [edit, setEdit] = useState([]);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const [editKun, setK] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://astrologer-panel.herokuapp.com/kundli/get-user-kundli",
        {
          headers: {
            Authorizaion: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [axios, token]);

  const [Image, setI] = useState("");
  const [userName, setU] = useState("");
  const [action, setA] = useState("");

  const addKundli = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://astrologer-panel.herokuapp.com/kundli/add-user-kundli",
        { Image, userName, action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Kundli Added SuccessFully");
      setPopup(!popup);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const editKundli = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://astrologer-panel.herokuapp.com/kundli/update-user-kundli/${id}`,
        { Image, userName, action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("kundli Edited SuccessFully");
      setPopup(!popup);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            User Kundli
          </span>
          <button
            onClick={() => {
              setK(false);
              setPopup(!popup);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[rgb(241,146,46)] text-white tracking-wider"
          >
            Add Kundli
          </button>
        </div>
        {/* Add Form */}
        <section
          className={
            popup
              ? "fixed top-0 left-0 wcomp bg-[rgb(0,0,0,0.5)] transition-all duration-150 w-full flex justify-center items-center overflow-y-auto  h-screen "
              : "hidden"
          }
        >
          <div className="bg-slate-100 overflow-y-auto  lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg">
            <div className="flex sticky top-0 py-3 px-5 bg-slate-100 justify-between">
              <span className=" font-semibold text-[rgb(241,146,46)] ">
                {editKun ? "Edit Kundli" : "Add Kundli"}
              </span>
              <div className="text-[rgb(241,146,46)] py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
                <IoMdClose
                  onClick={() => {
                    setK(false);
                    setPopup(false);
                  }}
                />{" "}
              </div>
            </div>

            <form
              className="grid  grid-cols-1 gap-x-7 gap-y-4 p-4"
              onSubmit={editKun ? editKundli : addKundli}
            >
              {/* Name */}
              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  Name
                </label>
                <input
                  required
                  type="text"
                  onChange={(e) => setU(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              {/* Action */}
              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  Action
                </label>
                <input
                  required
                  type="text"
                  onChange={(e) => setA(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              {/* Image */}
              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  Image
                </label>
                <input
                  required
                  type="file"
                  onChange={(e) => setI(e.target.value)}
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>

              <button
                type="submit"
                className="bg-[rgb(241,146,46)] flex items-center justify-center cursor-pointer w-40 hover:bg-[rgb(241,146,46)] py-1 rounded-full"
              >
                {editKun ? "Edit Kundli" : "Add"}
              </button>
            </form>
          </div>
        </section>

        <div className=" wcomp overflow-y-auto">
          <table className="table-auto  w-full text-left whitespace-no-wrap">
            <thead>
              <tr className=" border-b bg-green-300 shadow-xl text-gray-900">
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Image
                </th>

                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  User Name
                </th>
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Status
                </th>
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody style={{ color: "black" }}>
              {data?.data?.map((i) => (
                <tr className="tracking-wider text-gray-900 ">
                  <td className=" py-3 w-36 md:text-base text-sm ">
                    <img
                      src={
                        "https://cdn.pixabay.com/photo/2022/09/15/09/59/water-7456116_960_720.jpg"
                      }
                      alt=""
                      className="xl:w-36 shadow-xl rounded-lg lg:w-32 md:w-28 w-24"
                    />
                  </td>
                  <td className=" py-3 w-36 md:text-base text-sm ">
                    {" "}
                    {i.userName}{" "}
                  </td>
                  <td className=" py-3 w-36 md:text-base text-sm ">
                    {" "}
                    {i.action}{" "}
                  </td>
                  <td className=" py-3 w-36 md:text-base text-sm ">
                    <AiOutlineEdit
                      className="text-lg md:text-2xl"
                      cursor={"pointer"}
                      onClick={() => {
                        setPopup(!popup);
                        setK(true);
                        setID(i._id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default HOC(UserKundli);
