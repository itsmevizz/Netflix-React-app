import React, { useState } from "react";
import Youtube from 'react-youtube'
import "./RowPost.css";
import {  imgUrl, API_KEY } from "../../constants/constants";
import axios from "../../axios";
function RowPost(props) {
  const [movie, setMovies] = useState([]);
  const [urlid, setIrlId] = useState('')
  axios
    .get(props.url)
    .then((response) => {
        setMovies(response.data.results)
    })
    .catch((err) => {
    //   alert("Network Error");
    });

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

      const handleMovie = (id)=>{
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
            if (response.data.results.length !==0) {
                setIrlId(response.data.results[0])
            }
        })
      }
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movie.map((obj)=>
        <img
        onClick={()=>handleMovie(obj.id)}
          className={props.isSmall? 'smallPoster':'poster'}
          src={`${imgUrl+obj.backdrop_path}`}
          alt="Poster"
        />
        )}
      </div>
      {urlid &&  <Youtube opts={opts} videoId={urlid.key} />}
    </div>
  );
}

export default RowPost;
