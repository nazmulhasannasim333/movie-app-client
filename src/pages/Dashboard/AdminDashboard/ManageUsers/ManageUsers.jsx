import axios from "axios";
import moment from "moment";
import React from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useUsers from "../../../../hooks/useUsers";

const ManageUsers = () => {

 const [users, refetch] = useUsers()


 const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to update role for ${user.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`http://localhost:5000/users/admin/${user._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire("Admin!", "User role has been updated.", "success");
            }
          });
      }
    });
  };


  const handleDeleteUser = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/user/${user._id}`)
        .then(res => {
          if (res.data.deletedCount > 0) {
            refetch()
            Swal.fire("Deleted!", "User has been deleted.", "success");
          }
        })
      }
    })

  }


  return (
    <div className="w-full">
      <div className="container  mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold text-white leading-tight">
              Manage Users
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead className="">
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-5 py-5 border-b border-gray-500 bg-gray-900 text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={
                                user?.photo
                                  ? user?.photo
                                  : "https://cdn5.vectorstock.com/i/1000x1000/37/29/male-user-circle-icon-black-avatar-icon-user-vector-22753729.jpg"
                              }
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-white whitespace-no-wrap">
                              {user?.name ? user?.name : "Not Show"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-500 bg-gray-900 text-sm">
                        <p className=" whitespace-no-wrap text-white">
                          {user?.date
                            ? moment(user?.date).format("DD MMMM, YYYY")
                            : moment(new Date()).format("DD MMMM, YYYY")}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-500 bg-gray-900 text-sm">
                        <p className="text-white  whitespace-no-wrap">
                            {}
                          {user?.role === 'admin' ? "Admin" : "User"}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-500 bg-gray-900 text-sm">
                        {user?.role === 'admin' ? <button disabled={user?.role === 'admin'} onClick={() => handleMakeAdmin(user)} className="text-slate-400 bg-slate-200 rounded-lg p-1">
                          Make Admin
                        </button> : <button onClick={() => handleMakeAdmin(user)} className="text-white bg-green-500 rounded-lg p-1">
                          Make Admin
                        </button>}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-500 bg-gray-900 text-sm">
                        <button onClick={() => handleDeleteUser(user)} className="text-white text-xl bg-red-600 rounded-lg p-1">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
