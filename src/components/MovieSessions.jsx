import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const MovieSessions = () => {
  const { movieId } = useParams();
  const [sessionsInfo, setSessionsInfo] = useState(null);

  useEffect(() => {
    axios
      .get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${movieId}/showtimes`)
      .then(res => {
        setSessionsInfo(res.data);
        console.log('sessionsInfo: ', res.data);
      })
      .catch(err => console.log(err.res.data));
  }, [movieId]);

  if (sessionsInfo === null) { 
    return <Loading>Carregando...</Loading>;
  }

  return (
    <OuterContainer>
      <h1>Selecione o horário</h1>
      <StyledOuterUl>
        {sessionsInfo.days.map((dayAndTime) => (
          <StyledDatesLi key={dayAndTime.id}>
            <div>
              <p>{dayAndTime.weekday}</p>
              <p>{dayAndTime.date}</p>
            </div>
            <StyledInnerUl>
              {dayAndTime.showtimes.map((sessionId) => (
                <StyledTimesLi key={sessionId.id}>
                  <Link to={`/spots/${movieId}/${sessionId.id}`}>
                    <button>{sessionId.name}</button>
                  </Link>
                </StyledTimesLi>
              ))}
            </StyledInnerUl>
          </StyledDatesLi>
        ))}
      </StyledOuterUl>
    </OuterContainer>
  );
};

export default MovieSessions;

const Loading = styled.div`
  background-color: #1F2028;
  height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`

const OuterContainer = styled.div`
  background-color: #1F2028;

  h1{
    text-align: center;
    padding-top: 25px;
    font-size: 24px;
    font-weight: 400;
  }
`

const StyledOuterUl = styled.ul`
  padding-bottom: 25px;
`

const StyledDatesLi = styled.li`
  list-style: none;
  background-color: #2B2D36;
  margin: 25px 20px;
  border-radius: 8px;
  padding: 25px;

  div {
    display: flex;
    gap: 10px;
    border-bottom: solid 1px #4E5A65;
    padding-bottom: 15px;
    margin-bottom: 15px;
  }

  p {
    font-size: 19px;
  }

  p:first-of-type::after {
    content: ', ';
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const StyledInnerUl = styled.ul`
  display: flex;
  gap: 20px;
`

const StyledTimesLi = styled.li`
  list-style: none;

  a {
    text-decoration: none;
  }

  button {
    all: unset;
    color: #EE897F;
    border: solid 1px #EE897F;
    padding: 5px 18px;
    border-radius: 4px;
    font-size: 16px;
  }
`
