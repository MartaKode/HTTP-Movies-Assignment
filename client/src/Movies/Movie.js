import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";


function Movie({ addToSavedList, setRefresh }) { //Added more props
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  //Helpers```````````````
  const deleteMovie = event => {
    event.preventDefault()

    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        console.log(res)
        setRefresh(true)
        history.push(`/`)
      })

      .catch(err => {
        console.log(err)
      })


  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      {/* Added a routing button */}
      <button onClick={() => history.push(`/update-movie/${params.id}`)}>Edit</button>
      <button onClick={deleteMovie}>Delete</button>

    </div>
  );
}

export default Movie;
