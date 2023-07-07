import React, { useState } from "react";
import { useParams } from "react-router-dom";

import PosterFallback from "../../../assets/no-poster.png";
import "./style.scss";

import axios from "axios";
import moment from "moment";
import { toast } from "react-hot-toast";
import { BiListPlus } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import CircleRating from "../../../components/CircleRating/CircleRating";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import Genres from "../../../components/Genres/Genres";
import Img from "../../../components/LazyLoadImg/Img";
import VideoPopup from "../../../components/VideoPopup/VideoPopup";
import useAuth from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import { PlayIcon } from "../Playbtn";

const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.tmdb);
  const {user} = useAuth()
  console.log(data);

  const handleFavorite = (favorite) => {
    const {
      adult,
      title,
      name,
    backdrop_path,
    first_air_date,
    id,
    poster_path,
    vote_average
    } = favorite;
   
    axios.post(`https://movie-app-server-nazmulhasannasim333.vercel.app/favorite`, {
      email: user?.email,
      adult,
      title,
      name,
      backdrop_path: backdrop_path,
      first_air_date,
      id,
      poster_path: poster_path,
      vote_average
    })
    .then(res => {
      console.log(res.data);
      if(res.data.insertedId){
        toast.success("added to favorite")
      }
      else{
        toast.error("This movie already added to your favorite collection")
      }
    })
  }

  
  const handleSave = (saveMovie) => {
    const {
      adult,
      title,
      name,
    backdrop_path,
    first_air_date,
    id,
    poster_path,
    vote_average
    } = saveMovie;
   
    axios.post(`https://movie-app-server-nazmulhasannasim333.vercel.app/save`, {
      email: user?.email,
      adult,
      title,
      name,
      backdrop_path: backdrop_path,
      first_air_date,
      id,
      poster_path: poster_path,
      vote_average
    })
    .then(res => {
      console.log(res.data);
      if(res.data.insertedId){
        toast.success("added to watch later")
      }
      else{
        toast.error("This movie already added to your watch later collection")
      }
    })
  }

const _genres = data?.genres?.map((g) => g.id);

const director = crew?.filter((f) => f.job === "Director");
const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data?.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data?.name || data?.title} (${moment(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>

                    <Genres data={_genres} />

                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                      <button onClick={() => handleFavorite(data)} title="favorite">
                      <FaHeart className="text-2xl text-red-800" />
                      </button>
                      <button onClick={() => handleSave(data)} title="Save"><BiListPlus className="text-3xl text-purple-600 bg-slate-200 rounded-sm" /></button>
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                     <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {moment(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {data?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.created_by.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )} 
                  </div>
                </div>
                <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
