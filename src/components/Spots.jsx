import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Spots = () => {

  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [spots, setSpots] = useState(null);
  const [spotsClicked, setSpotsClicked] = useState([]);
  const [spotsClickedId, setSpotsClickedId] = useState([]);
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

  const toggleSpot = (name, id) => {
    setSpotsClicked( 
      spotsClicked.includes(name) 
        ? spotsClicked.filter((spotName) => spotName !== name) 
        : [...spotsClicked, name] 
    );
    setSpotsClickedId( 
      spotsClickedId.includes(id) 
        ? spotsClickedId.filter((spotId) => spotId !== id) 
        : [...spotsClickedId, id] 
    );
  };

  const handleReservation = () => {
    axios
      .post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', {
        ids: spotsClickedId, 
        name: username, 
        cpf: cpf 
      })
      .then((response) => {
        console.log("Reserva bem-sucedida:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao fazer a reserva:", error);
      });
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
            <SpotButton 
              onClick={spot.isAvailable ? () => toggleSpot(spot.name, spot.id) : () => alert('Desculpe. Esse assento não está disponível.')}

              $spotsClicked={spotsClicked}
              $spotName={spot.name}
              $spotAvailable={spot.isAvailable}
            >
              {/* {spot.isAvailable ? 'Available' : 'Unavailable'} */}
              {index + 1}
            </SpotButton>
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

      <StyledLastButton 
        onClick={() => {
          if (spotsClicked.length === 0) {
            alert('Por favor, selecione pelo menos um assento.');
          } else if (username === '') {
            alert('Por favor, insira o nome do comprador.');
          } else if (cpf === '') {
            alert('Por favor, insira o CPF do comprador.');
          } else {
            handleReservation(spotsClicked, username, cpf);
            navigate('/finale', {
              state: { 
                title: spots.movie.title, 
                date: spots.day.date,
                hour: spots.name,
                seats: [...spotsClicked].sort((a, b) => a - b),
                username: username,
                cpf: cpf
              }
            });
          }
        }}
      >
        Reservar assento(s)
      </StyledLastButton>
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
  /* height: calc(100vh - 70px); */
  height: 100%;
  padding: 0 20px;
  margin-bottom: 25px;

  h1{
    text-align: center;
    padding-top: 25px;
    font-size: 24px;
    font-weight: 400;
  }
`

const StyledUl = styled.ul`
  box-sizing: border-box;
  margin: 25px 0;
  display: grid;
  grid-template-columns: repeat(10, 1fr); 
  justify-items: center;
  gap: 5px;
  border-bottom: 1px solid #4E5A65;
  margin-bottom: 30px;
  padding-bottom: 30px;

  li {
    all: unset;
  }
`

const SpotButton = styled.button`
  all: unset;
  width: 20px;
  height: 20px;
  /* font-size: 12px; */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2B2D36;
  cursor: ${props => props.$spotAvailable ? 'pointer' : 'default'};
  background-color: ${props => 
    props.$spotsClicked.includes(props.$spotName)
    ? '#FADBC5'
    : props.$spotAvailable
    ? '#9DB899' 
    : '#2B2D36'
  };
  border: ${props => 
    props.$spotsClicked.includes(props.$spotName)
    ? 'solid 2px #EE897F'
    : 'solid 2px transparent'
  };

/*   @media (max-width: 374px) {
    width: 20px;
    height: 20px;
  } */
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 30px;

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

const StyledLastButton = styled.button`
  all: unset;
  display: flex;
  background-color: #EE897F;
  color: #2B2D36;
  font-size: 18px;
  height: 42px;
  border-radius: 8px;
  width: 100%;
  /* margin-bottom: 25px; */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`
