import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie)
    const params = useParams()
    const history = useHistory()

useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${params.id}`)
    .then(res=>{
        // console.log(res.data)
        setMovie(res.data)
    })
    .catch(err=>{
       console.log(err)
    })
},[params.id])

    // Helpers````````
    const handleChange = e => {
        setMovie({ ...movie, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        axios.put(`http://localhost:5000/api/movies/${params.id}`, movie)
        .then(res=>{
            console.log(res)
           const newMovieList= props.movieList.map(item=>{
               if(item.id === movie.id){
                   return res.data
               }else{
                   return item
               }
           })
        //    console.log(newMovieList)
        props.setMovieList(newMovieList)
        props.setRefresh(true)
        history.push(`/movies/${params.id}`)
          
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2> Update Movie:</h2>
            <div>
                <input
                    type='text'
                    name='title'
                    placeholder='title'
                    onChange={handleChange}
                    value={movie.title}
                />
            </div>

            <div>
                <input
                    type='text'
                    name='director'
                    placeholder='director'
                    onChange={handleChange}
                    value={movie.director}
                />
            </div>

            <div>
                <input
                    type='text'
                    name='metascore'
                    placeholder='metascore'
                    onChange={handleChange}
                    value={movie.metascore}
                />
            </div>

            <div>
                <input
                    type='text'
                    name='stars'
                    placeholder='stars'
                    onChange={handleChange}
                    value={movie.stars}
                />
            </div>

            <button >Update</button>
        </form>
    )
}

export default UpdateMovie