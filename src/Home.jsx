import React from 'react'
import styled from 'styled-components';
import { MDBContainer } from 'mdb-react-ui-kit';
import './styles.css';
import { useState } from 'react';
import axios from 'axios';
import Quiz from './Quiz';
import {useSelector, useDispatch} from 'react-redux';
import {defaultUrlManga, defaultUrlMusic} from './store';
import { resetQuiz, setQuestions } from './questionSlice'
import { useEffect } from 'react'; 
import { Route, Routes, Navigate } from 'react-router-dom';

const Header = styled.div`
display:flex;
border: 1px solid white;
padding:3%;
text-align:center;
justify-content:center;

font-size:2em;
color:white;
border-radius:1em;
`;
const Text = styled.p`
color:white;
font-size:2.6em;
display:flex;

`;
const TextContainer = styled.div`
display:flex;

justify-content:center;
width:70vw;
flex-wrap:wrap;
text-align:center;
align-items:center;

height:7vh;
position:absolute;
left:15%;



`;
const Wrapper = styled.div`
overflow:hidden;
display:flex;
height:100vh;


`;
const GoButton = styled.button`

border:1px solid black;
background-color:green;
border-radius:3em;
text-align:center;
height:12vh;
width:20vw;
font-size:2em;
color:white;
position:absolute;
bottom:8%;
right:40%;
margin-top:4%;

&:hover{
    transition:.5s;
    background-color:lightblue;
}
`;

const Button = styled.button`
padding:2%;
color:white;
max-width:8em;
max-height:5em;
height:4em;
width:85%;
background-color:transparent;
background-color:red;
border-radius:1em;
font-size:1.6em;
`;

const Button1 = styled.button`
padding:2%;
color:white;
max-width:8em;
max-height:5em;
height:4em;
width:85%;
background-color:transparent;
background-color:red;
border-radius:1em;
font-size:1.6em;
&:hover{
    transition:.2s;
    background-color:lightgreen;
}

`;

const ButtonC1 = styled.button`
padding:2%;
color:white;
max-width:8em;
max-height:5em;
height:4em;
width:85%;
background-color:transparent;
background-color:red;
border-radius:1em;
font-size:1.6em;
&:hover{
    transition:.2s;
    background-color:lightgreen;
}
`;
const ButtonFilled = styled.button`
padding:2%;
color:white;
max-width:8em;
max-height:5em;
height:4em;
width:85%;
background-color:transparent;
background-color:green;
border-radius:1em;
font-size:1.6em;
`;

const ButtonC2 = styled.button`
padding:2%;
color:white;
max-width:8em;
max-height:5em;
height:4em;
width:85%;
background-color:transparent;
background-color:red;
border-radius:1em;
font-size:1.6em;
&:hover{
    transition:.2s;
    background-color:lightgreen;
}
`;
const Button2 = styled.button`
padding:2%;
color:white;
max-width:8em;
max-height:5em;
height:4em;
width:85%;
background-color:transparent;
background-color:red;
border-radius:1em;
font-size:1.6em;
&:hover{
    transition:.2s;
    background-color:lightgreen;
}
`;
const Button3 = styled.button`
padding:2%;
color:white;
max-width:8em;
max-height:5em;
height:4em;
width:85%;
background-color:transparent;
background-color:red;
border-radius:1em;
font-size:1.6em;
&:hover{
    transition:.2s;
    background-color:lightgreen;
}
`;
const ButtonsContainer = styled.div`
display:flex;
gap: 2%;
justify-content:center;
background-color:transparent;
padding:1%;
position:relative;
color:blue;
top:12%;

height:15vh;

border:none;
`;
const ButtonsContainerDif = styled.div`
display:flex;

gap:2%;
justify-content:center;
background-color:transparent;
position:relative;
top:32%;

color:blue;
height:15vh;
border:none;
`;
const Question = styled.div`
color:red;
display:flex;
font-size:2em;
justify-content:center;
text-align:center;

`;
const Home = () => {



const dispatch = useDispatch();
const questions = useSelector((state)=> state.questions)
const [category,setCategory] = useState('');
const [difficulty, setDifficulty] = useState('');
const [data, setData] = useState(false);
const [color, setColor] = useState('green');
const [isActive, setIsActive] = useState(false);
const [error, setError] = useState('');

const handleCategory = category => {
setCategory(category);
setIsActive(true);
};

const handleDifficulty = difficulty => {
    setDifficulty(difficulty);
    setIsActive(true);

};

const handleLoad = () => {
    let url = ''
    let fullUrl ='';
if(category === 'manga'){
url = defaultUrlManga
} else if(category === 'music'){
url = defaultUrlMusic
}
 if(difficulty.length && url.length){
fullUrl = url + `&difficulty=${difficulty}`;
axios.get(fullUrl).then((res)=>{
    // console.log(res.data)
    dispatch(setQuestions(res.data))
    setData(true)
    setError('')
}).catch((error) => {
    if(error){
setError('something went wrong!')
    }
})
 };
}
  return (
      <MDBContainer>
          {error.length ? (<Question>
            Something Went Wrong!!
          </Question>) : (null)}
          <Header>React Quiz App</Header>
        <Wrapper>
            {data == true  ? (
            <Navigate to="quiz"/>
            ):(
        <MDBContainer>
            <TextContainer>
            <Text>Pick a Category</Text>
            </TextContainer>
            <ButtonsContainer>
            <ButtonC1 onClick={()=> handleCategory('manga')} style={ isActive && category === 'manga' ? {backgroundColor:color} : {}}>Manga</ButtonC1>
            <ButtonC2 onClick={()=> handleCategory('music')} style={isActive && category === 'music' ? {backgroundColor:color} : {}}>Music</ButtonC2>
            </ButtonsContainer>
            <div className="difficulty">
            <Text>Pick a Difficulty</Text>
            </div>
    <ButtonsContainerDif>
        <Button1 onClick={()=> handleDifficulty('easy')} style={ isActive && difficulty === 'easy' ? {backgroundColor:color} : {}} >Easy</Button1>
        <Button2 onClick={()=> handleDifficulty('medium')} style={isActive && difficulty === 'medium' ? {backgroundColor:color} : {}} >Medium</Button2>
        <Button2 onClick={()=> handleDifficulty('hard')} style={isActive && difficulty === 'hard' ? {backgroundColor:color} : {}}>Hard</Button2>
            </ButtonsContainerDif>
            <MDBContainer>
            <GoButton onClick={handleLoad}>Start</GoButton>
            </MDBContainer>
            </MDBContainer>
                )}
        </Wrapper>
    </MDBContainer>
  )
}

export default Home