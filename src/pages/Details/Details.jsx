import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Cast from './Cast/Cast';
import DetailsBanner from './DetailsBanner/DetailsBanner';
import Recommendations from './Recommendations/Recommendations';
import Similar from './Similar/Similar';
import VideosSection from './VideoSection/VideoSection';

const Details = () => {
    const {mediaType, id} = useParams();
    const  {data, loading} = useFetch(`/${mediaType}/${id}/videos`);
    const  {data: credits, loading:creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);
console.log(credits?.cast);

    return (
        <div>
           <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
           <Cast data={credits?.cast} loading={creditsLoading} />
           <VideosSection data={data} loading={loading} />
           <Similar mediaType={mediaType} id={id} />
           <Recommendations mediaType={mediaType} id={id} />
        </div>
    );
};

export default Details;