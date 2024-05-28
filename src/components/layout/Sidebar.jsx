/** @format */

import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdOutlineHighQuality  ,MdCircleNotifications} from "react-icons/md";
import { BiTable } from "react-icons/bi";
import { BiLogOutCircle } from "react-icons/bi";
import { FaUserClock } from "react-icons/fa";
import { TbDiscount } from "react-icons/tb";
import { FcFeedback } from "react-icons/fc";
import {IoIosTime ,IoMdImages} from 'react-icons/io'
import {GrDocumentPdf} from 'react-icons/gr'

import { MdDashboardCustomize } from "react-icons/md";
import { toast } from "react-toastify";

const Sidebar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();

  const nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3" />,
      link: "/dashboard",
      name: "Dashboard",
    },
    {
      icon: <FcFeedback className="text-xl mr-3" />,
      link: "/feedback",
      name: "Reviews",
    },
    {
      icon: <FaUserClock className="text-xl mr-3" />,
      link: "/userkundli",
      name: "User Kundli",
    },
    {
      icon: <IoIosTime className="text-xl mr-3" />,
      link: "/time",
      name: "Time Slots",
    },
    {
      icon: <GrDocumentPdf className="text-xl mr-3" />,
      link: "/document",
      name: "Uploads Documents",
    },
    {
      icon: <IoMdImages className="text-xl mr-3" />,
      link: "/ban",
      name: "Banners",
    },
    {
      icon: <TbDiscount className="text-xl mr-3" />,
      link: "/discount",
      name: "Discount",
    },
    {
      icon: <BsFillChatDotsFill className="text-xl mr-3" />,
      link: "/chat",
      name: "Chat",
    },
    {
      icon: <BiTable className="text-xl mr-3" />,
      link: "/horoscope",
      name: "Horoscope",
    },
    {
      icon: <MdCircleNotifications className="text-xl mr-3" />,
      link: "/not",
      name: "Notification",
    },
    {
      icon: <MdOutlineHighQuality className="text-xl mr-3" />,
      link: "/specification",
      name: "Specification",
    },
  ];

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("AdminId");
    navigate("/");
    toast.success("Log -Out Successfull");
  };
  return (
    <>
      <aside className="p-4 bg-green-200">
        {/* Top */}
        <div className="w-full md:hidden relative  p-2 mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[rgb(241,146,46)] cursor-pointer"
          />
        </div>
        {/* Logo */}
        <figure className="flex  flex-col items-center">
          <span className="font-bold text-[rgb(241,146,46)] text-2xl">
            Astrologers Panel
            {/* <img src={image} className="h-24" /> */}
          </span>
        </figure>
        {/* Nav-menu */}
        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <Link to={nav.link} key={nav.name} className="">
                <span className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm">
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}
          <span
            className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
            onClick={() => logOut()}
          >
            <BiLogOutCircle className="text-xl mr-3" /> Log-Out
          </span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
