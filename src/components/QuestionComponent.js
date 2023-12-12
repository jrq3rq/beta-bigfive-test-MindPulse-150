import React from "react";
import styled from "styled-components";

const QuestionContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
  @media (max-width: 600px) {
    padding: 0px;
  }
`;

const QuestionText = styled.p`
  font-size: 1.2em;
  color: #fff;
  /* color: #333; */
  padding: 10px;
  background-color: #282c34;
`;

const LikertScaleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; // Allow wrapping for smaller screens

  @media (max-width: 600px) {
    flex-direction: column; // Stack vertically on mobile
    align-items: center;
  }
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column; // Keep radio button above the label
  align-items: center;
  margin-bottom: 10px;
  margin: 10px 20px 0px 20px;
  @media (min-width: 601px) {
    margin-right: 15px; // Space out options on larger screens
  }
`;

const RadioInput = styled.input`
  margin-bottom: 5px; // Space between radio button and label
`;

const RadioLabel = styled.label`
  font-size: 0.9em;
  color: #666;
  text-align: center;
`;

const QuestionComponent = ({ question, onChange, name }) => {
  const likertOptions = [
    { text: "Very Inaccurate", value: 0 },
    { text: "Inaccurate", value: 0.2 },
    { text: "Somewhat Inaccurate", value: 0.4 },
    { text: "Somewhat Accurate", value: 0.6 },
    { text: "Accurate", value: 0.8 },
    { text: "Very Accurate", value: 1.0 },
  ];

  return (
    <QuestionContainer>
      <QuestionText>{question}</QuestionText>
      <LikertScaleContainer>
        {likertOptions.map((option, index) => (
          <OptionContainer key={index}>
            <RadioInput
              type="radio"
              id={`${name}_${index}`}
              name={name}
              value={option.value}
              onChange={onChange}
            />
            <RadioLabel htmlFor={`${name}_${index}`}>{option.text}</RadioLabel>
          </OptionContainer>
        ))}
      </LikertScaleContainer>
    </QuestionContainer>
  );
};

export default QuestionComponent;
