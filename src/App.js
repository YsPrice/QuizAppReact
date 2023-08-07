import './App.css';
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import {MDBContainer} from 'mdb-react-ui-kit';
import styled from 'styled-components';
import Home from './Home';
import Quiz from './Quiz';

const Container = styled.div`
background: rgb(0,0,0);
background: linear-gradient(90deg, rgba(0,0,0,1) 19%, rgba(181,244,104,0.9702517162471396) 99%);
display:flex;
`;

function App() {
  return (
<Container>
<MDBContainer>
 <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />}>
    </Route>
<Route path="quiz" element={<Quiz />}>
</Route>
   </Routes>
 </BrowserRouter>
  </MDBContainer>
  </Container>
  );
}

export default App;
