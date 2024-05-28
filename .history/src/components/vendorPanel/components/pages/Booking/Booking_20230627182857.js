/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Container, Table } from "react-bootstrap";
import axios from "axios";

const Booking = () => {

  const [data , setData] = useState([])

  const fetchData = async () => {
    try{
      const {data} = await axios.get('https://ayush-astro-backend.vercel.app/order')
      setData(data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  },[])


  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Booking's (Total : {data?.details?.length})
          </span>
        </div>

        <Container
          className="wcomp overflow-x-auto"
          style={{ marginTop: "2%" }}
        >
          <Table style={{ color: "black" }} striped bordered hover>
            <thead>
              <tr>
                <th>User</th>
                <th>Astrologer</th>
                <th>Time</th>
        
                <th>About</th>
                <th>Language</th>
                <th>Rashi</th>
              </tr>
            </thead>
            <tbody style={{ color: "black" }}>
             {data?.details?.map((i,index) => (
              <tr key={index} >
                <td> {i.name} </td>
                <td> {i.astroName ? i.astroName : 'Astrologer'} </td>
                <td> {i.time} </td>
                <td> {i.problem} </td>
                <td> {i.language?.map((a  ,index) => (
                  <p key={index}> {a} </p>
                ))} </td>
                <td> {i.rashi} </td>
              </tr>
             ))}
            </tbody>
          </Table>
        </Container>
      </section>
    </>
  );
};

export default HOC(Booking);
