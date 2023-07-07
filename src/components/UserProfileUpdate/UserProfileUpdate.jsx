import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
const image_upload_token = import.meta.env.VITE_image_upload_token;

const UserProfileUpdate = () => {
    const navigate = useNavigate()
    const loadUser = useLoaderData()
    // console.log(loadUser);
    const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("image", data.photo[0]);
        fetch(image_upload_url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((profileResponse) => {
            if(profileResponse.success){
                const profileURL = profileResponse.data.display_url;
                const {
                    address,
                    email,
                    gender,
                    name,
                    phone,
                    photo
                  } = data;

                  axios.put(`https://movie-app-server-nazmulhasannasim333.vercel.app/updateprofile/${loadUser._id}`, {
                    address,
                    email,
                    gender,
                    name,
                    phone,
                    photo: profileURL
                  })
                  .then(res => {
                    console.log("profile updated", res.data);
                    if (res.data.modifiedCount > 0) {
                        reset();
                        navigate('/dashboard/userprofile')
                        toast.success("profile updated")
                      }
                  })

            }

          })



      }

    return (
        <div className="max-w-7xl my-10 mx-auto">
        <h3 className="text-center text-4xl text-white font-semibold mb-1 mt-0">
          Update Profile
        </h3>
        <div className=" pb-20  ">
          <div className="max-w-3xl lg:mx-auto mx-4 mt-14">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="pt-3">
                  <label className="text-white" htmlFor="text">
                    Your Name
                  </label>
                  <input
                      defaultValue={loadUser && loadUser?.name}
                    className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-slate-500"
                    {...register("name")}
                  />
                </div>
                <div className="pt-3">
                  <label className="text-white" htmlFor="text">
                    Your Email
                  </label>
                  <input
                      defaultValue={loadUser && loadUser?.email}
                    readOnly
                    className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-slate-500"
                    {...register("email")}
                  />
                </div>
                <div className="pt-3">
                  <label className="text-white" htmlFor="text">
                    Phone Number
                  </label>
                  <input
                  defaultValue={loadUser && loadUser?.phone}
                    type="number"
                    className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-slate-500"
                    {...register("phone")}
                  />
                </div>
                <div className="pt-3">
              <label className="text-white" htmlFor="text">
                Gender
              </label>
              <select
                className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-slate-500"
                {...register("gender")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
              </div>
              <div className="pt-3">
                  <label className="text-white" htmlFor="text">
                    Address
                  </label>
                  <textarea
                  defaultValue={loadUser && loadUser?.address}
                    className=" w-full  p-2 lg:p-3 rounded-md focus:outline-none my-2 border border-slate-500"
                    {...register("address")}
                  />
                </div>
              <div className="pt-3">
                  <label className="text-white" htmlFor="text">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    className=" w-full  p-2 lg:p-3 rounded-md text-white focus:outline-none my-2 border border-slate-500"
                    {...register("photo")}
                  />
                </div>
              <button
                type="submit"
                className="group my-6 relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default UserProfileUpdate;