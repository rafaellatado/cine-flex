import GlobalStyles from './GlobalStyles.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList.jsx';
import MovieSessions from './components/MovieSessions.jsx';
import Spots from './components/Spots.jsx';
import Finale from './components/Finale.jsx';
import styled from 'styled-components';

function App() {

  return (
    <BrowserRouter>  
      <GlobalStyles />
      <OuterContainer>
        <LogoTitle>
          <img src="/logo.png" alt="Logo" />
          <h1>Cineflex</h1>
        </LogoTitle>
        <Routes>
          <Route path='/' element={<MovieList />} />
          <Route path='/sessions/:movieId' element={<MovieSessions />} />
          <Route path='/spots/:movieId/:sessionId' element={<Spots />} />
          <Route path='/finale' element={<Finale />} />
        </Routes>
      </OuterContainer>
    </BrowserRouter>
  )
}

export default App

const OuterContainer = styled.div`
  max-width: 600px;
  height: 100%;
  margin: 0 auto;  
  background-color: #EE897F;
`

const LogoTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  background-color: #EE897F;
  height: 70px;

  h1{
    color: #FADBC5;
    font-size: 34px;
  }

  img{
    width: 40;
    height: 40px;
  }
`
