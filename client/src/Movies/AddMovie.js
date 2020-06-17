import React, { useState } from 'react'
import Movie from './Movie'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import MovieList from './MovieList'

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars:'',
}

const AddMovie = props => {
    const [newMovie, setNewMovie] = useState(initialMovie)
    const history = useHistory()

    // var str = "Well, how, are , we , doing, today";
    // var res = str.split(",");
    // console.log(res)

    // Helpers``````````
    const handleChange = e => {
        setNewMovie({ ...newMovie, [e.target.name]: e.target.value })
    }

    const handleStarChange = (e) => {
        //    const newStars= e.target.value.split(',')
           setNewMovie({ ...newMovie, [e.target.name]: e.target.value.split(",") })
           
    console.log(e.target.name)
    console.log(e.target.value)
         
          
            console.log(newMovie)
         
           
        }

    const handleSubmit = e => {
        e.preventDefault();

        axios.post(`http://localhost:5000/api/movies`, newMovie)
            .then(res => {
                // console.log(res)
                props.setMovieList(res.data)
                // console.log(props.movieList)
                history.push('/')

            })
            .catch(err => {
                console.log(err)
            })
    }




    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Movie:</h2>

            <div>
                <input
                    type='text'
                    name='title'
                    placeholder='title'
                    onChange={handleChange}
                    value={newMovie.title}
                // required
                />
            </div>

            <div>
                <input
                    type='text'
                    name='director'
                    placeholder='director'
                    onChange={handleChange}
                    value={newMovie.director}
                // required
                />
            </div>

            <div>
                <input
                    type='number'
                    name='metascore'
                    placeholder='metascore'
                    onChange={handleChange}
                    value={newMovie.metascore}
                // required
                />
            </div>

            {/* Complicated stars input */}

            <div>
                <input
                    type='text'
                    name='stars'
                    placeholder='star1, star2, star3, etc...'
                    onChange={handleStarChange}
                    value={newMovie.stars}
                  
                />
            </div>

            <button >Add to the List</button>
        </form>
    )
}

export default AddMovie