import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const MovieList = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies')
      .then(res => {
        setMovies(res.data),
        console.log('movies: ', res.data)
      })
      .catch(err => console.log(err.res.data));
  }, [])

  if (movies === null) {
    return <Loading>Carregando...</Loading>
  }

  return (
    <ContentContainer>
      <h1>Em Cartaz</h1>

      <StyledUl>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/sessions/${movie.id}`}>
              <img src={movie.posterURL} alt="Poster do Filme" />
            </Link>
          </li>))}
      </StyledUl>
    </ContentContainer>
  )
}

export default MovieList;

const Loading = styled.div`
  background-color: #1F2028;
  height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`

const ContentContainer = styled.div`
  background-color: #1F2028;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1{
    text-align: center;
    padding-top: 25px;
    font-size: 24px;
    font-weight: 400;
  }
`

const StyledUl = styled.ul`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 25px 20px;
  
  li {
    all: unset;
    cursor: pointer;
    display: flex;
    justify-content: center;  
    align-items: center;  

    img {
      width: 150px;
      height: auto;
      border-radius: 8px;
    }
  } 
`
