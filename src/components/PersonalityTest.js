import React, { useState, useEffect } from "react";
import QuestionComponent from "./QuestionComponent";
import styled from "styled-components";

const Container = styled.div`
  /* background-color: rgb(255, 192, 203); */
  background-color: #f4f4f4;
  margin: 20px;
  padding: 20px;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
  @media (max-width: 600px) {
    /* padding: 0px; */
  }
`;

const traits = [
  "Openness",
  "Conscientiousness",
  "Extraversion",
  "Agreeableness",
  "Neuroticism",
];

const PersonalityTest = () => {
  const [currentTraitIndex, setCurrentTraitIndex] = useState(0);
  const [currentTrait, setCurrentTrait] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/bigFive/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const allTraitsData = await response.json();
        const traitData = allTraitsData.find(
          (trait) => trait.trait === traits[currentTraitIndex]
        );
        setCurrentTrait(traitData);
        setQuestions(traitData.questions);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [currentTraitIndex]);

  const handleAnswerChange = (e, isReverseScored) => {
    const score = isReverseScored
      ? 1 - Number(e.target.value)
      : Number(e.target.value);
    setAnswers({ ...answers, [e.target.name]: score });
  };

  const handleNextTrait = () => {
    if (currentTraitIndex < traits.length - 1) {
      setCurrentTraitIndex(currentTraitIndex + 1);
    }
  };

  const handleFinalSubmit = () => {
    console.log("Final Answers:", answers);
    // Process answers or navigate to results page/component
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <h2>{currentTrait.trait}</h2>
      <p>{currentTrait.description}</p>
      {questions.map((question, index) => (
        <QuestionComponent
          key={index}
          question={question.text}
          isReverseScored={question.isReverseScored}
          onChange={(e) => handleAnswerChange(e, question.isReverseScored)}
          name={`question_${currentTraitIndex}_${index}`}
        />
      ))}

      {currentTraitIndex < traits.length - 1 ? (
        <button onClick={handleNextTrait}>Next </button>
      ) : (
        <button onClick={handleFinalSubmit}>Submit Answers</button>
      )}
      <p>
        Progress: {currentTraitIndex + 1} / {traits.length}
      </p>
    </Container>
  );
};

export default PersonalityTest;
