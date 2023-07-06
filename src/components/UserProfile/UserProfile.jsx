import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/userprofile/${user?.email}`)
        .then((res) => {
          console.log(res.data);
          setUserProfile(res.data);
        });
    }
  }, [user]);
  console.log(userProfile);

  const [isAdmin] = useAdmin();

  return (
    <div className="h-screen flex-1 p-7">
      <div className="w-full  bg-slate-900 text-white my-10 ">
        <div className="shadow-lg">
          <div
            className="w-full bg-cover bg-no-repeat bg-center"
            style={{
              height: "200px",
              backgroundImage:
                "url(https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
            }}
          >
            <img
              className="opacity-0 w-full h-full"
              src="https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200"
              alt=""
            />
          </div>
          <div className="p-4">
            <div className="relative flex w-full">
              {/* Avatar */}
              <div className="flex flex-1">
                <div style={{ marginTop: "-6rem" }}>
                  <div
                    style={{ height: "9rem", width: "9rem" }}
                    className="md rounded-full relative avatar"
                  >
                    <Zoom>
                    <img
                      style={{ height: "9rem", width: "9rem" }}
                      className="md rounded-full relative border-4 border-gray-900"
                      src={
                        userProfile?.photo
                          ? userProfile?.photo
                          : "https://cdn5.vectorstock.com/i/1000x1000/37/29/male-user-circle-icon-black-avatar-icon-user-vector-22753729.jpg"
                      }
                      alt=""
                    />
                    </Zoom>
                  
                    <div className="absolute" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-right">
                <Link to={`/dashboard/updateprofile/${userProfile._id}`}>
                  {" "}
                  <button className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring   max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800   items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto">
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
            <div className="space-y-1 justify-center w-full mt-3 ml-3">
              {/* User basic*/}
              <div>
                <h2 className="text-xl relative leading-6 font-bold ">
                  {userProfile && userProfile?.name}{" "}
                  {isAdmin ? (
                    <div className="absolute top-0 left-44 text-xs bg-green-600 py-0 px-1 rounded-md">
                      Admin
                    </div>
                  ) : (
                    <div className="absolute top-0 left-44 text-xs bg-blue-700 py-0 px-1 rounded-md">
                     {userProfile.photo ? "Verified" : "New User"}
                    </div>
                  )}
                </h2>
                <p className="text-sm leading-5 font-medium  mb-1">
                  {userProfile && userProfile?.email}
                </p>
                <p className="text-sm leading-5 font-medium  mb-3">
                  Phone:{" "}
                  {userProfile && userProfile.phone
                    ? userProfile.phone
                    : "Not Show"}
                </p>
              </div>
              {/* Description and others */}
              <div className="mt-4">
                <p className="leading-tight mb-2">
                  Gender:{" "}
                  {userProfile && userProfile.gender
                    ? userProfile.gender
                    : "Not Show"}
                </p>
                <div>
                  <span>
                    Address:{" "}
                    {userProfile && userProfile.address
                      ? userProfile.address
                      : "Not Show"}
                  </span>
                </div>
                <div className=" my-4">
                  <span className="flex mr-2">
                    <FaCalendarAlt />
                    <span className="leading-5 ml-1">
                      Joined{" "}
                      {userProfile && userProfile.date
                        ? moment(userProfile.date).format("DD MMMM, YYYY")
                        : moment(new Date()).format("DD MMMM, YYYY")}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
