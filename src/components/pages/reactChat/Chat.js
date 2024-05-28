import React, { useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import HOC from "../../layout/HOC";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const chatMember = [
  {
    id: "1",
    name: "Qadir Ali",
    Age: "18",
    image: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
  },
  {
    id: "2",
    name: "Sahil",
    Age: "30",
    image:
      "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png",
  },
  {
    id: "3",
    name: "Sumit",
    Age: "90",
    image: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp",
  },
];

const Chat = () => {
  const [id, setId] = useState("");
  const token = localStorage.getItem("token");
  const [chatID, setChatId] = useState([]);
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://astrologer-panel.herokuapp.com/admin/search-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.messsage);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [axios, token]);

  const createChat = (id) => {
    let AdminId = localStorage.getItem("AdminId");
    try {

    } catch (err) {
      console.log(err);
    }
  };

  // console.log('Chat Id')
  // console.log(chatID)

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <MDBRow>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
          <h5
            className="font-weight-bold mb-3 text-center text-lg-start"
            style={{ color: "black" }}
          >
            Members
          </h5>

          <MDBCard>
            <MDBCardBody>
              <MDBTypography listUnStyled className="mb-0">
                {data?.map((i) => (
                  <li
                    className="p-2 border-bottom"
                    style={{ backgroundColor: "#eee" }}
                  >
                    <a
                      href={`#${i._id}`}
                      onClick={() => {
                        // setUserId(i._id);
                        // setTimeout(() => {
                        //   createChat();
                        // }, 1000);
                        createChat(i._id);
                      }}
                      className="d-flex justify-content-between"
                    >
                      <div className="d-flex flex-row">
                        <img
                          src={
                            "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                          }
                          alt="avatar"
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          width="60"
                        />
                        <div className="pt-1">
                          <p
                            className="fw-bold mb-0"
                            // onClick={() => {

                            //   createChat();
                            // }}
                          >
                            {" "}
                            {i.mobile_Number}{" "}
                          </p>
                          <p className="small text-muted">
                            Email : {i.email_ID}
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="6" lg="7" xl="8">
          <MDBTypography listUnStyled style={{ color: "black" }}>
            <li className="d-flex justify-content-between mb-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="40"
              />
              <MDBCard>
                <MDBCardHeader className="p-3">
                  <p className="fw-bold mb-0">UserName</p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </MDBCardBody>
              </MDBCard>
            </li>
            <li class="d-flex justify-content-between mb-4">
              <MDBCard className="w-100">
                <MDBCardHeader className=" p-3">
                  <p class="fw-bold mb-0">UserName</p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium.
                  </p>
                </MDBCardBody>
              </MDBCard>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                width="60"
              />
            </li>

            <li className="bg-white mb-3">
              <MDBTextArea label="Message" id="textAreaExample" rows={4} />
            </li>
            <Button variant="outline-info" style={{ float: "right" }}>
              Send
            </Button>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default HOC(Chat);

// <li
// className="p-2 border-bottom"
// style={{ backgroundColor: "#eee" }}
// >
// <a href="#!" className="d-flex justify-content-between">
//   <div className="d-flex flex-row">
//     <img
//       src=""
//       alt="avatar"
//       className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//       width="60"
//     />
//     <div className="pt-1">
//       <p className="fw-bold mb-0">John Doe</p>
//       <p className="small text-muted">
//         Hello, Are you there?
//       </p>
//     </div>
//   </div>
//   <div className="pt-1">
//     <p className="small text-muted mb-1">Just now</p>
//     <span className="badge bg-danger float-end">1</span>
//   </div>
// </a>
// </li>

{
  /*> */
}
