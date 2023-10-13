import React from 'react';
import { styled } from 'styled-components';
import { MDBContainer} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer, nextQuestion, resetQuiz } from './questionSlice';
import { Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';


const Button = styled.button`
padding:2%;
color:white;
max-width:18em;
max-height:5em;
height:4em;
width:85%;
justify-content:center;

background-color:rgba(100,150,100,.5);
border-radius:1em;
font-size:1.6em;
text-color:white;

&:hover{
  transition:.2s;
  background-color:lightgreen;
}

`;
const Container = styled.div`
height:120vh;
max-height:auto;
overflow:scroll;





`
const Exit = styled.p`
color:white;
text-decoration: none !important;
display:flex;
align-items:center;
font-size:1.7em;
position:relative;

&:hover {
  transition:.5s;
  color:red;
}

`;
const ButtonFin = styled.button`
padding:2%;
color:white;
max-width:18em;
max-height:5em;
width:100%;
background-color:rgba(100,150,100,.5);
border-radius:1em;
font-size:1.6em;
text-color:white;
position:relative;
display:flex;
justify-content:center;


@media screen and (max-width:400px){
right:21%;
}
`;
const Answers = styled.li`
list-style-type: none;
display:flex;
justify-content:center;
padding:2%;
`;
const AnswersList = styled.ul``;

const Question = styled.h2`
color: white;
text-align:center;
justify-content:center;
margin-left:2%;
border:1px solid;
border-radius:.5em;
padding:2%;
`;

const QuestionNumber = styled.h3`
display:flex;
justify-content:center;
color:white;
font-size:3em;
text-align:center;
`;

const Score = styled.h2`
color:white;
font-size:3em;
display:flex;
justify-content:center;
border-bottom:1px solid white;
@media screen and (max-width:400px){
text-wrap:nowrap;
font-size:2.8em;
}
`;
const QuestionWrapper = styled.div``;

const QuestionResult = styled.div`
background-color: ${(props) => (props.isCorrect ? 'green' : 'red')};
padding:1%;
border:1px solid transparent;
border-radius:1em;
`;
const Wrapper = styled.div``;
const Wrapper1 = styled.div`
display:flex;
justify-content:center;
@media screen and (max-width:500px){
  display:inline;
}
`;

const QuestionAns = styled.p`
color:white;
font-size:1.3em;
padding:1%;

`;

// ______________________
const Quiz = ({}) => {

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions.results);
  const answers= useSelector((state)=> state.questions.answers);
  const currentQuestionIndex = useSelector((state) => {
    return questions.findIndex((question) => question === state.questions.questions.results[state.questions.currentQuestionIndex]);
    });
  const currentQuestion = questions[currentQuestionIndex];
  const decodedQuestion = atob(currentQuestion?.question || '');
  const decodedAnswerOptions = currentQuestion?.incorrect_answers.map((option) => atob(option)) || [];
  const decodedCorrectAnswer = atob(currentQuestion?.correct_answer || '');
  const allQuestionsAnswered = questions.length === answers.length;

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {dispatch(resetQuiz()); }
  },[currentQuestionIndex, dispatch, questions.length]);

  const CalculateCorrectAnswers = () => {
    const totalQuestions = questions.length;
    const correctAnswers = questions.map((question)=> atob(question.correct_answer));
    const totalCorrectAnswers = answers.reduce((counter, userAnswer, index) => {
    const correctAnswer = atob(questions[index]?.correct_answer || '');
  return counter + (userAnswer === correctAnswer ? 1  : 0)}, 0);

      const total = totalCorrectAnswers/ totalQuestions * 100;
      return{
      totalCorrectAnswers,
      correctAnswers,
      total
       }    
};

  const { totalCorrectAnswers, correctAnswers } = CalculateCorrectAnswers();
  const percentage = CalculateCorrectAnswers();

  const handleAnswer = (answer) => {
  dispatch(setAnswer(answer));
  dispatch(nextQuestion());
  };
   

  if (!questions.length) {
    return <Navigate to="../">Home</Navigate>
  };
  // _________________
  return (
       allQuestionsAnswered === false,
    <Container>
    <MDBContainer>
    <Exit>
      <Link to="../" onClick={()=> dispatch(resetQuiz())}style={{}}>Exit Quiz</Link>
    </Exit>
{
  allQuestionsAnswered ? (
<> 
      <MDBContainer>
      <MDBContainer>
      <MDBContainer>
      <Score>
        Quiz Completed!
      </Score>
      <Score>
        You Scored: {percentage.total}%
      </Score>
      </MDBContainer>
      <MDBContainer>
        <Wrapper1>
          <ButtonFin onClick= {()=> dispatch(resetQuiz())}><Link to="../" style={{color:'white'}}>Pick a different Quiz?</Link></ButtonFin>
          <ButtonFin onClick={()=> dispatch(resetQuiz())}>Try Again?</ButtonFin>
          </Wrapper1>
    </MDBContainer>
    </MDBContainer>
      </MDBContainer>
      </>) : (<></>) 
}
     <Wrapper>  
      {
      allQuestionsAnswered && questions.map((question, index) => 
      {
        const decodedQuestion = atob(question?.question || '');
        const decodedCorrectAnswer = decodeURIComponent(correctAnswers[index] || '');
        const userAnswer = answers[index] || '';
        const decodedUserAnswer = userAnswer ?  decodeURIComponent(userAnswer) : '';
        const isCorrect = userAnswer === correctAnswers[index];
        return (
        <>    
        <QuestionWrapper key={index}>
            <Question>{decodedQuestion}</Question>
            <QuestionResult isCorrect={isCorrect}>
            <QuestionAns>Your Answer: {decodedUserAnswer}</QuestionAns>
            </QuestionResult>
            <QuestionAns style={{backgroundColor:'black', border:'1px solid black', borderRadius:'1em'}}>Correct Answer: {decodedCorrectAnswer}</QuestionAns>
        </QuestionWrapper>
       </>
        
        );}
        )} 
       </Wrapper>
       <>
      <MDBContainer>
      { !allQuestionsAnswered ?
      (
        <>      
      <QuestionNumber>Question: { currentQuestionIndex + 1} out of 10</QuestionNumber>
      <Question>{decodedQuestion}</Question>
      </>):(<></>)}
     { !allQuestionsAnswered ?(
      <AnswersList>
        {decodedAnswerOptions.map((option, index) => (
          <Answers key={index}>
            <Button onClick={() => handleAnswer(option)}>{option}</Button>
          </Answers>
        ))}
        <Answers>
          <Button onClick={() => handleAnswer(decodedCorrectAnswer)}>
            {decodedCorrectAnswer}
          </Button>
        </Answers>
      </AnswersList>
      ): (<></>)

}
      </MDBContainer>   
      </>
    </MDBContainer>
    </Container>
  );
};

export default Quiz;


