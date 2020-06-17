import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AddMovie";


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  // Adding a refresh state
  const [refresh, setRefresh] = useState(true)

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response))
      // adding a finally promise for refresh purposes
      .finally(() => setRefresh(false))
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [refresh]); //Adding refresh as dependency for rerendering

  return (
    <>
      <SavedList list={savedList} />

      {/* Stretch?????? */}
     <Link to='/add-movie'><button>Add New Movie</button></Link> 
      {/* ??????????? */}

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        {/* Adding more props to Movie -- movieList and setMovieList */}
        <Movie addToSavedList={addToSavedList} setRefresh={setRefresh} />
      </Route>

      {/* Adding a new Route */}
      <Route path='/update-movie/:id'>
        <UpdateMovie movieList={movieList} setMovieList={setMovieList} setRefresh={setRefresh} />
      </Route>

      {/* Stretch??????? */}
      <Route path='/add-movie'>
        <AddMovie movieList={movieList} setMovieList={setMovieList}/>
      </Route>

    </>
  );
};

export default App;
