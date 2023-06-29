import React from 'react';
import Banner from '../Banner/Banner';
import Popular from '../Popular/Popular';
import TopRated from '../TopRated/TopRated';
import Trending from '../Trending/Trending';

const Home = () => {
    return (
        <div>
            <Banner />
            <Trending />
            <Popular />
            <TopRated />
        </div>
    );
};

export default Home;