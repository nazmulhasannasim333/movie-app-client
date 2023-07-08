import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaFunnelDollar, FaPlay, FaRegFolderOpen, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import PosterFallback from "../../../../assets/no-poster.png";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUsers from "../../../../hooks/useUsers";
import { fetchDataFromApi } from "../../../../utils/api";

const AdminHome = () => {
  const [tvshows, setTvShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const { url } = useSelector((state) => state.tmdb);
  const [users, refetch] = useUsers()
  const {user, loading} = useAuth()
  const [axiosSecure] = useAxiosSecure()
  // console.log(movies);
  // console.log(url);

  const { data: allpayments=[]  } = useQuery({
      queryKey: ['allpayment'],
      enabled: !loading,
      queryFn: async () => {
          const response = await axiosSecure(`/allpayment`)
          // console.log(response.data);
          return response.data;
        },
    })
    

    const totalReveneu = allpayments?.reduce((acc, payment) => { 
      return acc + payment.price
    }, 0)
    // console.log(totalReveneu);
    


  useEffect(() => {
    fetchDataFromApi(`/discover/tv`).then((res) => {
      setTvShows(res.results);
    });
  }, []);
  useEffect(() => {
    fetchDataFromApi(`/discover/movie`).then((res) => {
      setMovies(res.results);
    });
  }, []);

  const movieAndTvShows = tvshows?.concat(movies)
  // console.log(movieAndTvShows);
  

  return (
    <div className="h-screen flex-1 mx-12">
      <div className="my-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-yellow-500 to-purple-800 text-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FaFunnelDollar className="font-bold text-3xl" />
              <span className="text-2xl sm:text-3xl leading-none font-bold ">
                ${totalReveneu}
              </span>
              <h3 className="text-base font-normal ">
                Total Sale value this week
              </h3>
            </div>
            <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
              14.6%
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-blue-800 text-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FaRegFolderOpen className="font-bold text-2xl" />
              <span className="text-2xl sm:text-3xl leading-none font-bold ">
                {movieAndTvShows?.length}
              </span>
              <h3 className="text-base font-normal ">
                Total released Movie & Tv Shows in this week
              </h3>
            </div>
            <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
              32.9%
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-indigo-800 text-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FaUsers className="font-bold text-3xl" />
              <span className="text-2xl sm:text-3xl leading-none font-bold ">
                {" "}
                {users?.length}
              </span>

              <h3 className="text-base font-normal ">User signups this week</h3>
            </div>
            <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
              -2.7%
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
      <div className="container  mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold text-white leading-tight">
              New Movies and TV Shows
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
                  {movieAndTvShows.map((item) => {
                    const posterUrl = item.poster_path
                    ? url.poster + item.poster_path
                    : PosterFallback;
                    return (
                        <tr key={item.id}>
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
                              {item?.name ? item?.name : "Not Show"}
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
                value={item.vote_average.toFixed(1)}
                maxValue={10}
                text={item.vote_average}
                styles={buildStyles({
                    pathColor:
                    item.vote_average < 5 ? "red" : item.vote_average < 7 ? "orange" : "green",
                })}
            />
                      </td>
                      <td className="px-5 py-5 border-b border-gray-500 bg-gray-900 text-sm">
                        <button className="text-white text-xl bg-red-600 rounded-full p-2">
                          <FaPlay />
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

export default AdminHome;
