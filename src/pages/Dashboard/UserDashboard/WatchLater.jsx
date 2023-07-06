import axios from "axios";
import moment from "moment";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import PosterFallback from "../../../assets/no-poster.png";
import useSave from "../../../hooks/useSave";

const WatchLater = () => {
  const { url } = useSelector((state) => state.tmdb);
  const [saves, refetch] = useSave()

  const handleDeleteWatchLater = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/save/${item._id}`)
        .then(res => {
          if (res.data.deletedCount > 0) {
            refetch()
            Swal.fire("Deleted!", "Movie has been deleted.", "success");
          }
        })
      }
    })
  }


  return (
    <div className="h-screen flex-1 mx-12">
       <div className="w-full">
      <div className="container  mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold text-white leading-tight">
              Saved Movies and TV Shows
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead className="">
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                      Poster
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                      Released Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                     Rating
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-800 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {saves.map((item) => {
                    const posterUrl = item.poster_path
                    ? url.poster + item.poster_path
                    : PosterFallback;
                    return (
                        <tr key={item._id}>
                        <td className="px-5 py-5 border-b border-gray-500 bg-gray-900 text-sm">
                        <div className="flex-shrink-0 w-28 h-20">
                            <img
                              className="w-full h-full"
                              src={posterUrl}
                              alt=""
                            />
                          </div>
                        </td>
                      <td className="px-5 py-5 border-b border-gray-500 bg-gray-900 text-sm">
                          
                          <div className="ml-3">
                            <p className="text-white whitespace-no-wrap text-xl">
                              {item?.name ? item?.name : item?.title ? item?.title : "Not Show"}
                            </p>
                          </div>
                         
                      </td>
                      <td className="px-5 py-5 border-b border-gray-500 bg-gray-900 text-sm">
                        <p className=" whitespace-no-wrap text-white">
                          {item?.first_air_date
                            ? moment(item?.first_air_date).format("DD MMMM, YYYY")
                            :
                            moment(item?.release_date).format("DD MMMM, YYYY")
                          }
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-500 bg-gray-900 text-sm">
                     <CircularProgressbar
                     className="h-20 w-20"
                value={item.vote_average}
                maxValue={10}
                text={item.vote_average.toFixed(1)}
                styles={buildStyles({
                    pathColor:
                    item.vote_average < 5 ? "red" : item.vote_average < 7 ? "orange" : "green",
                })}
            />
                      </td>
                      <td className="px-5 py-5 border-b border-gray-500 bg-gray-900 text-sm">
                        <button onClick={() => handleDeleteWatchLater(item)} className="text-white text-xl bg-red-600 rounded-full p-2">
                         <FaTrash />
                        </button>
                      </td>
                    </tr>
                    )
                  }
                  
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WatchLater;
