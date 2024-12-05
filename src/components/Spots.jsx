import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Spots = () => {

  const { sessionId } = useParams();
  const [spots, setSpots] = useState(null);
  const [spotsClicked, setSpotsClicked] = useState([]);
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');

  useEffect(() => {
    axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessionId}/seats`)
    .then(res => {
      setSpots(res.data);
      console.log('spots: ', res.data);
    })
    .catch(err => console.log(err.res.data));
  }, [sessionId])

  const toggleSpot = (name) => {
    setSpotsClicked( 
      spotsClicked.includes(name) 
        ? spotsClicked.filter((spotName) => spotName !== name) 
        : [...spotsClicked, name] 
    );
  };

  if (spots === null) {
    return <Loading>Carregando...</Loading>
  }

  return (
    <OuterContainer>
      <h1>Selecione o(s) assento(s)</h1>
      <StyledUl>
        {spots.seats.map((spot, index) => (
          <li key={spot.id}>
            <button 
              onClick={spot.isAvailable ? () => toggleSpot(spot.name) : null}
              disabled={!spot.isAvailable} 
              style={{ 
                backgroundColor: spotsClicked.includes(spot.name) 
                  ? '#FADBC5'
                  : spot.isAvailable 
                  ? '#9DB899' 
                  : '#2B2D36',
                cursor: spot.isAvailable ? 'pointer' : 'not-allowed',
                border: spotsClicked.includes(spot.name)
                  ? 'solid 2px #EE897F'
                  : 'solid 2px transparent'
              }}
            >
              {/* {spot.isAvailable ? 'Available' : 'Unavailable'} */}
              {index + 1}
            </button>
          </li>
        ))}
      </StyledUl>

      <StyledForm>
        <label htmlFor='username'>Nome do comprador(a)</label>
        <input 
          type='text' 
          id='username'
          placeholder='Digite seu nome...' 
          onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor='cpf'>CPF do comprador(a)</label>
        <input 
          type="number" 
          id='cpf'
          placeholder='Digite seu cpf...'
          onChange={e => setCpf(e.target.value)} 
        />
      </StyledForm>

      <StyledLink 
        to={`/finale`}
        state={{ 
          title: spots.movie.title, 
          date: spots.day.date,
          hour: spots.name,
          seats: [...spotsClicked].sort((a, b) => a - b),
          username: username,
          cpf: cpf
        }}
      >
        <StyledLastButton 
          disabled={spotsClicked.length === 0 || username === '' || cpf === ''}
        >
          Reservar assento(s)
        </StyledLastButton>
      </StyledLink>
    </OuterContainer>
  )
}

export default Spots;


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

const StyledUl = styled.ul`
  box-sizing: border-box;
  margin: 25px 20px;
  display: grid;
  grid-template-columns: repeat(10, 1fr); 
  justify-items: center;
  gap: 10px;
  border-bottom: 1px solid #4E5A65;
  margin-bottom: 30px;
  padding-bottom: 30px;

  li {
    all: unset;

    button {
      all: unset;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #2B2D36;
    }
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0 20px 30px 20px;

  label {
    color: white;
    font-size: 16px;
  }

  input {
    all: unset;
    background-color: white;
    height: 40px;
    border-radius: 8px;
    padding: 0 0 0 15px;
  }

  & label:nth-of-type(2) {
    margin-top: 15px;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
`

const StyledLastButton = styled.button`
  all: unset;
  background-color: #EE897F;
  color: #2B2D36;
  font-size: 18px;
  height: 42px;
  border-radius: 8px;
  width: 100%;
  margin: 0 20px 25px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`
