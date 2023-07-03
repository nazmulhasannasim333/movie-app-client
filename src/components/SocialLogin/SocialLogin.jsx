import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';
import { FaGithub } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import google from "../../assets/google.png";
import useAuth from '../../hooks/useAuth';

const SocialLogin = () => {
    const { googleLogin } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
  
    const from = location.state?.from?.pathname || "/";


    const handleGoogleLogin = () => {
        googleLogin()
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);

            axios.post(`http://localhost:5000/users`, {
                name: loggedUser.displayName,
                email: loggedUser.email,
                photo: "",
                date: new Date()
              })
              .then(res => {
                console.log(res.data);
                if(res.data.insertedId){
                  toast.success('Welcome to FlixFilm')
                }
              })
              .catch(err => {
                console.log(err);
              })
            navigate(from, {replace: true})
            toast.success('Successfully Login')
        })
        .catch(err => {
            console.log(err);
        })
    }



    return (
        <>
          <div className="flex justify-center mb-8">
          <button onClick={handleGoogleLogin} className="flex items-center bg-[black3] shadow-md border border-gray-600 rounded px-4 py-2 mr-2">
            <img src={google} className="h-5 w-5 me-2" alt="" />
            <div className="text-white">Google</div>
          </button>
          <button className="flex items-center bg-[black3] shadow-md border border-gray-600 rounded px-4 py-2 mr-2">
            <FaGithub className="text-xl text-gray-500 me-3" />
            <div className="text-white">GitHub</div>
          </button>
        </div>  
        </>
    );
};

export default SocialLogin;