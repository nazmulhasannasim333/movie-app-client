/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import useAuth from "../../hooks/useAuth";
import './style.scss';

const Subscription = () => {
  const {user} = useAuth()
  const navigate = useNavigate()

const handlePayment = () => {
  if(user){
    "user"
  }else{
    navigate("/login")
  }
}


  return (
    <div className="subscriptionPage">
     <ContentWrapper>
     <div className="container px-5 py-24 mx-auto">
  <div className="flex flex-col text-center w-full mb-20">
    <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Subscription</h1>
    <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-200">Get the best plan and watch unlimited movie and TV shows.</p>
    <div className="flex mx-auto border-2  rounded overflow-hidden mt-6">
      <button className="py-1 px-4 bg-red-500 text-white font-semibold focus:outline-none">Monthly</button>
      <button className="py-1 px-4 text-black bg-white focus:outline-none">Annually</button>
    </div>
  </div>
  <div className="flex flex-wrap -m-4">
    <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
      <div className="h-full p-6 rounded-lg border-2 border-red-500 flex flex-col relative overflow-hidden">
        <h2 className="text-sm tracking-widest title-font mb-1 text-white font-medium">FREE</h2>
        <h1 className="text-5xl text-white leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
          <span>$00</span>
          <span className="text-lg ml-1 font-normal text-gray-500">/mo</span>
        </h1>
        
        <p className="flex items-center text-white mb-4 mt-2">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
           <FaCheck />
          </span>Free First Month
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
          <FaCheck />
          </span>Unsubscribe Anytime
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-red-600 text-white rounded-full flex-shrink-0">
          ✖
          </span>Unlimited Movies
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-red-600 text-white rounded-full flex-shrink-0">
          ✖
          </span>Unlimited Tv Shows
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-red-600 text-white rounded-full flex-shrink-0">
          ✖
          </span>Available FHD
        </p>
        <p className="flex items-center text-white mb-6">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-red-600 text-white rounded-full flex-shrink-0">
          ✖
          </span>Available 4K
        </p>
        <button disabled className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none rounded">GET STARTED
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <p className="text-xs text-gray-400 mt-3">After get a subscription, Please let's know our terms & conditions.</p>
      </div>
    </div>
    <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
      <div className="h-full p-6 rounded-lg border-2 border-red-500 flex flex-col relative overflow-hidden">
        <h2 className="text-sm tracking-widest title-font mb-1 text-white font-medium">STANDARD</h2>
        <h1 className="text-5xl text-white leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
          <span>$38</span>
          <span className="text-lg ml-1 font-normal text-gray-500">/mo</span>
        </h1>
        <p className="flex items-center text-white mb-4 mt-2">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
           <FaCheck />
          </span>Free First Month
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
          <FaCheck />
          </span>Unsubscribe Anytime
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
          <FaCheck />
          </span>Unlimited Movies
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
          <FaCheck />
          </span>Unlimited Tv Shows
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
          <FaCheck />
          </span>Available FHD
        </p>
        <p className="flex items-center text-white mb-6">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-red-600 text-white rounded-full flex-shrink-0">
          ✖
          </span>Available 4K
        </p>
        <button disabled onClick={handlePayment} className="flex items-center mt-auto text-white bg-gradient-to-r from-red-600 to-red-950 hover:from-green-500 hover:to-yellow-800 border-0 py-2 px-4 w-full focus:outline-none rounded">GET STARED
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <p className="text-xs text-gray-400 mt-3">After get a subscription, Please let's know our terms & conditions.</p>
      </div>
    </div>
    <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
      <div className="h-full p-6 rounded-lg border-2 border-red-500 flex flex-col relative overflow-hidden">
      <span className="bg-red-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">Recommended</span>
        <h2 className="text-sm tracking-widest title-font mb-1 text-white font-medium">PRO</h2>
        <h1 className="text-5xl text-white leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
          <span>$56</span>
          <span className="text-lg ml-1 font-normal text-gray-500">/mo</span>
        </h1>
        <p className="flex items-center text-white mb-4 mt-2">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
           <FaCheck />
          </span>Free First Month
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
          <FaCheck />
          </span>Unsubscribe Anytime
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
          <FaCheck />
          </span>Unlimited Movies
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
          <FaCheck />
          </span>Unlimited Tv Shows
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
          <FaCheck />
          </span>Available FHD
        </p>
        <p className="flex items-center text-white mb-6">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
          <FaCheck />
          </span>Available 4K
        </p>
        <button  className="flex items-center mt-auto text-white bg-gradient-to-r from-red-600 to-red-950 hover:from-green-500 hover:to-yellow-800 border-0 py-2 px-4 w-full focus:outline-none rounded">GET STARED
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <p className="text-xs text-gray-400 mt-3">After get a subscription, Please let's know our terms & conditions.</p>
      </div>
    </div>
    <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
      <div className="h-full p-6 rounded-lg border-2 border-red-500 flex flex-col relative overflow-hidden">
        <h2 className="text-sm tracking-widest title-font mb-1 text-white font-medium">PREMIUM</h2>
        <h1 className="text-5xl text-white leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
          <span>$72</span>
          <span className="text-lg ml-1 font-normal text-gray-500">/mo</span>
        </h1>
        <p className="flex items-center text-white mb-4 mt-2">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
           <FaCheck />
          </span>Free First Month
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
          <FaCheck />
          </span>Unsubscribe Anytime
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
          <FaCheck />
          </span>Unlimited Movies
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
          <FaCheck />
          </span>Unlimited Tv Shows
        </p>
        <p className="flex items-center text-white mb-4">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
          <FaCheck />
          </span>Available FHD
        </p>
        <p className="flex items-center text-white mb-6">
          <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0">
          <FaCheck />
          </span>Available 4K
        </p>
        <button className="flex items-center mt-auto text-white bg-gradient-to-r from-red-600 to-red-950 hover:from-green-500 hover:to-yellow-800 border-0 py-2 px-4 w-full focus:outline-none rounded">GET STARED
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <p className="text-xs text-gray-400 mt-3">After get a subscription, Please let's know our terms & conditions.</p>
      </div>
    </div>
  </div>
</div>

     </ContentWrapper>
    </div>
  );
};

export default Subscription;
