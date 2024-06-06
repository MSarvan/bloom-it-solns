import React, { useEffect, useState } from "react";
import "../styles/HomePage.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomePage = () => {
  const API_KEY = "693677a4";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://www.omdbapi.com/?s=${
            query?.length > 0 ? query : "movie"
          }&type=movie&page=${page}&t=batman&apikey=${API_KEY}`
        );
        setMovieData(res?.data?.Search);
        // console.log(res?.data?.Search, "movies data");
        const totalResults = res?.data?.totalResults;
        setTotalPages(Math.ceil(totalResults / 10));
        setIsLoading(false);
      } catch (error) {
        console.log(error, "Error while fetching movies");
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [page, search]);

  const handleClick = () => {
    setSearch(!search);
    if (search && query?.length > 0) {
      setQuery("");
    }
  };

  return (
    <div className="homepage-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Movie name.."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button onClick={handleClick}>{!search ? "Search" : "Clear"}</button>{" "}
      </div>
      <div className="movies-container">
        {isLoading
          ? Array(10)
              .fill("")
              .map((e, i) => {
                return (
                  <div className="movie-card" key={i}>
                    <div className="movie-image">
                      <Skeleton width={"100%"} height={"100%"} />
                    </div>
                    <Skeleton width={225} height={40} />
                    <Skeleton width={200} height={30} />
                  </div>
                );
              })
          : movieData?.map((e, i) => {
              return (
                <div
                  className="movie-card"
                  key={e?.imdbID}
                  onClick={() => {
                    navigate(`/${e?.imdbID}`);
                  }}
                >
                  <div className="movie-image">
                    <img src={e?.Poster} alt="" />
                  </div>
                  <h3>{e?.Title}</h3>
                  <div>Released year: {e?.Year}</div>
                </div>
              );
            })}
      </div>
      <div className="pagination-caontainer">
        <button
          disabled={page === 1}
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
        >
          Previous
        </button>
        <div>
          Page {page} of {totalPages}
        </div>
        <button
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
