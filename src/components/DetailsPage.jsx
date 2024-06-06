import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/DetailsPage.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DetailsPage = () => {
  const { id } = useParams();
  const API_KEY = "693677a4";
  const [isLoading, setIsLoading] = useState(true);
  const [movieInfo, setMovieInfo] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      if (id) {
        try {
          const response = await axios.get(
            `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
          );
          setMovieInfo(response?.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error, "Error in fetching movie details");
          setIsLoading(false);
        }
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleClick = (title) => {
    window.open(
      `https://www.youtube.com/results?search_query=${title}+trailer`,
      "_blank"
    );
  };

  return (
    <div className="detailspage-container">
      {isLoading ? (
        <>
          <div className="movie-poster">
            <div style={{ width: "100%", height: "100%" }}>
              <Skeleton width={"100%"} height={"100%"} />
            </div>
          </div>
          <div className="movie-details">
            <Skeleton width={"100%"} height={30} />
            <Skeleton width={"100%"} height={30} />
            <Skeleton width={"100%"} height={30} />
            <Skeleton width={"100%"} height={80} />
            <Skeleton width={"100%"} height={30} />
            <Skeleton width={"100%"} height={30} />
            <Skeleton width={"100%"} height={30} />
            <Skeleton width={100} height={30} />
          </div>
        </>
      ) : (
        <>
          <div className="movie-poster">
            <img src={movieInfo?.Poster} alt="" />
          </div>
          <div className="movie-details">
            <h3>{movieInfo?.Title}</h3>
            <div>Released on: {movieInfo?.Released}</div>
            <div>Runtime: {movieInfo?.Runtime}</div>
            <div>Genre: {movieInfo?.Genre}</div>
            <div>Director: {movieInfo?.Director}</div>
            <div>Writer: {movieInfo?.Writer}</div>
            <div>Actors: {movieInfo?.Actors}</div>
            <div>Plot: {movieInfo?.Plot}</div>
            <div>Language: {movieInfo?.Language}</div>
            <div>Country: {movieInfo?.Country}</div>
            <div>Awards: {movieInfo?.Awards}</div>
            <div>IMDB rating: {movieInfo?.imdbRating} / 10</div>
            <button
              onClick={() => {
                handleClick(movieInfo?.Title);
              }}
            >
              Watch Trailer
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailsPage;
