import React from "react";
import styled from "styled-components";

const QuestionContainer = styled.div`
  margin: 20px 0px 20px 0px;
  padding: 20px;
  /* border: 1px solid #ccc; */
  border-radius: 5px;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
  @media (max-width: 600px) {
    padding: 0px;
  }
`;

const QuestionText = styled.p`
  font-size: 1.2em;
  color: #fff;
  border-radius: 5px;
  /* color: #333; */
  padding: 10px;
  background-color: #282c34;
  @media (max-width: 600px) {
    border-radius: 5px 5px 0px 0px;
  }
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
  margin: 10px 20px 0px 20px;
  cursor: pointer; // Makes the entire pink area clickable
  @media (min-width: 601px) {
    margin-right: 15px; // Space out options on larger screens
  }
`;

const RadioInput = styled.input`
  margin-right: 10px; // Space between radio button and text
  cursor: pointer; // Change cursor to pointer on hover
`;

const RadioLabel = styled.label`
  font-size: 0.9em;
  color: #666;
  text-align: center;
  cursor: pointer; // Change cursor to pointer on hover
  display: flex;
  align-items: center;
  padding: 10px;
`;

const QuestionComponent = ({
  question,
  isReverseScored,
  onChange,
  name,
  isAnswered, // Add this prop
}) => {
  const questionStyle = isAnswered
    ? { border: "1px solid transparent" }
    : { backgroundColor: "#c6ffd5", border: "1px solid #ccc" }; // Highlight unanswered questions

  const likertOptions = [
    { text: "Very Inaccurate", value: 0 },
    { text: "Somewhat Inaccurate", value: 0.25 },
    { text: "Neither Accurate Nor Inaccurate", value: 0.5 },
    { text: "Somewhat Accurate", value: 0.75 },
    { text: "Very Accurate", value: 1.0 },
  ];

  return (
    <QuestionContainer style={questionStyle}>
      <QuestionText>{question}</QuestionText>
      <LikertScaleContainer>
        {likertOptions.map((option, index) => (
          <OptionContainer key={index}>
            <RadioLabel htmlFor={`${name}_${index}`}>
              <RadioInput
                type="radio"
                id={`${name}_${index}`}
                name={name}
                value={option.value}
                onChange={onChange}
              />
              {option.text}
            </RadioLabel>
          </OptionContainer>
        ))}
      </LikertScaleContainer>
    </QuestionContainer>
  );
};

export default QuestionComponent;
