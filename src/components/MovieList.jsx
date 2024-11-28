import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies')
  .then(response => setMovies(response.data))
  .catch(err => console.log(err))

  return (
    <StyledUl>
      {movies.map(movie => <li key={movie.id}><img src={movie.posterURL} alt="Poster do Filme" /></li>)}
    </StyledUl>
  )
}

export default MovieList;

const StyledUl = styled.ul`
  all: unset;

  li {
    all: unset;
    cursor: pointer;
    img {
      width: 145px;
      height: 210px;
    }
  }

`
