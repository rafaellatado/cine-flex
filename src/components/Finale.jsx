import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Finale = () => {

  const { state } = useLocation(); 
  const { title, date, hour, seats, username, cpf } = state || {}; 
  console.log(state);

  const navigate = useNavigate()

  const restart = () => {
    navigate('/');
  }

  return (
    <OuterContainer>
      <h1>Pedido finalizado!</h1>

      <ContentContainer>
        <div>
          <h2>Filme e sessão</h2>
          <p>{title}</p>
          <p>{date} às {hour}</p>

          <h2>Ingressos</h2>
          {seats.map(seat => <p key={seat}>Assento {seat}</p>)}

          <h2>Comprador(a)</h2>
          <p>Nome: {username}</p>
          <p>CPF: {cpf}</p>
        </div>
      </ContentContainer>

      <StyledButton onClick={restart}>
        Voltar para a tela inicial
      </StyledButton>
    </OuterContainer>
  )
}

export default Finale;

const OuterContainer = styled.div`
  background-color: #1F2028;
  height: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    padding-top: 25px;
    color: #9DB899;
    text-align: center;
    font-size: 24px;
    font-weight: 400;
  }
`

const ContentContainer = styled.div`
  background-color: #2B2D36;
  margin: 25px 20px;
  border-radius: 8px;

  div {
    padding: 0 25px;

    p:not(:first-of-type):not(:nth-of-type(3)):not(:nth-last-of-type(2)) {
      padding-top: 5px;
    }
  }

  h2 {
    font-size: 22px;
    color: #EE897F;
    font-weight: 700;
    border-bottom: solid 1px #4E5A65;
    padding-bottom: 15px;
    margin-bottom: 15px;
    padding-top: 15px;
  }

  p {
    font-size: 20px;
  }

  & h2:first-of-type {
    padding-top: 25px;
  }

  & p:last-of-type {
    padding-bottom: 25px;
  }
`

const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 18px;
  color: #2B2D36;
  background-color: #EE897F;
  margin: 0 20px 25px 20px;
  padding: 10px 0;
  border-radius: 8px;
  display: flex;
  justify-content: center;
`
