
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import Swal from "sweetalert2";
import PosterFallback from "../../assets/no-poster.png";
import useAuth from "../../hooks/useAuth";
import CircleRating from "../CircleRating/CircleRating";
import Genres from "../Genres/Genres";
import Img from "../LazyLoadImg/Img";
import "./style.scss";

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.tmdb);
    const navigate = useNavigate();
    const {user} = useAuth()


    const handleNavigate = (item) => {
        if(user && user?.email){
            navigate(`/${data.media_type || mediaType}/${data.id}`)
        }else {
          Swal.fire({
            title: "Please Login to watch movie",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sign In",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        }
      }



    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;
    return (
        <div
            className="movieCard"
            onClick={handleNavigate}
        >
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {moment(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;
