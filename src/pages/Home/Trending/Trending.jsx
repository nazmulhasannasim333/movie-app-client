import React, { useState } from "react";
import "../Home/style.scss";

import Carousel from "../../../components/Carousel/Carousel";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import SwitchTab from "../../../components/SwitchTab/SwitchTab";
import useFetch from "../../../hooks/useFetch";

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day")

    const {data, loading} = useFetch(`/trending/all/${endpoint}`)

    const onTabChange = (tab) => {
        setEndpoint(tab === 'Day' ? 'day' : 'week')
    }
  
    return (
        <div className="carouselSection">
            <ContentWrapper>
                {
                    endpoint === 'day' ? <span className="carouselTitle">Trending of the Day</span>
                    : <span className="carouselTitle">Trending of the Week</span>
                }
                
                <SwitchTab data={['Day', 'Week']} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    );
};

export default Trending;