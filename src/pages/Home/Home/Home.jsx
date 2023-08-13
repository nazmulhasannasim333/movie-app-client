import React from 'react';
import Banner from '../Banner/Banner';
import HeroBanner from '../HeroBanner/HeroBanner';
import Popular from '../Popular/Popular';
import TopRated from '../TopRated/TopRated';
import Trending from '../Trending/Trending';

const Home = () => {
    return (
        <div>
            <Banner />
            <Trending />
            <Popular />
            <HeroBanner />
            <TopRated />
        </div>
    );
};

export default Home;