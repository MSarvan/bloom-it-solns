import React, { useEffect, useState } from "react";
import "../styles/HomePage.scss";
import axios from "axios";

const HomePage = () => {
  const API_KEY = "693677a4";
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?s=${
            query?.length > 0 ? query : "movie"
          }&type=movie&page=${page}&t=batman&apikey=${API_KEY}`
        );
        setMovieData(res?.data?.Search);
        // console.log(res?.data?.Search, "movies data");
        const totalResults = res?.data?.totalResults;
        setTotalPages(Math.ceil(totalResults / 10));
      } catch (error) {
        console.log(error, "Error while fetching movies");
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
        {movieData?.map((e, i) => {
          return (
            <div className="movie-card" key={e?.imdbID}>
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
          onClick={() => {
            setPage(page > 1 ? page - 1 : 1);
            console.log("working");
          }}
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
