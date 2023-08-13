import React from "react";
import { FaUser } from "react-icons/fa";
import mobile from '../../../assets/mobile.png';
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import Img from "../../../components/LazyLoadImg/Img";


const HeroBanner = () => {
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <div className="lg:flex justify-between items-center py-10 px-5 lg:px-20 bg-gray-900 text-white">
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-semibold my-5">Download Your Movies and TV Shows Watch Offline. Enjoy On Your Mobile.</h1>
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta similique ad eos praesentium eius provident dicta porro illo autem! Dolores, et. Explicabo, id facere? Molestias ratione expedita facere iste minus ex quaerat fugit facilis quisquam.</p>
            <div className="mt-5 flex">
                <button className="bg-black py-3 px-5 text-red-600 font-semibold">HD 4K</button>
                <div className="flex ms-4 bg-black py-3 px-5 text-red-600 font-semibold">
                <FaUser />
                <button className="ms-3"> 2K</button>
                </div>
                
            </div>
          </div>
          <div className="lg:w-1/2 lg:py-0 py-10">
            <Img src={mobile} className="w-full" />
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
