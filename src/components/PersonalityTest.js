import React, { useState, useEffect } from "react";
import QuestionComponent from "./QuestionComponent";
import styled from "styled-components";
import BounceLoader from "react-spinners/MoonLoader"; // Ensure you have installed react-spinners
import { IoClose } from "react-icons/io5"; // Import the close icon
import { FaUserAlt } from "react-icons/fa"; // Importing a user icon as an example
import { SlPicture } from "react-icons/sl";

const Container = styled.div`
  /* background-color: rgb(255, 192, 203); */
  background-color: #f4f4f4;
  margin: 20px;
  padding: 20px;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ScoreCard = styled.div`
  padding: 20px;
  margin-bottom: 10px;
  background-color: #282c34; // Green background
  color: #fff;
`;

const Card = styled.div`
  width: 400px;
  @media (max-width: 600px) {
    width: auto;
  }
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0px auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    width: 100px;
    height: 100px;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  margin: 0 auto;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 50;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 100;
  display: ${(props) => (props.show ? "block" : "none")};
  /* Adjust width and layout as needed */
  @media (max-width: 600px) {
    width: 50%;
    padding: 25px;
  }
`;
const CardHeader = styled.h4`
  text-transform: uppercase;
  padding: 20px 0px 10px 0px;
`;

// const Image = styled.img`
//   width: 100px;
//   height: 100px;
//   display: block;
//   margin: 0 auto;
// `;
const StyledButton = styled.button`
  background-color: #282c34; // Green background
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  /* border-radius: 4px; */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #666;
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;

const ScoreParagraph = styled.p`
  font-size: 1em; // Adjust the font size as needed
  color: #fff; // Adjust the text color as needed
  margin: 10px 0; // Adjust top and bottom margins as needed
  text-align: left; // Align text to left, right, or center as needed
`;

const TraitName = styled.span`
  font-size: 1em; // Adjust the font size as needed
  color: #fff; // Adjust the text color as needed
  font-weight: bold; // Make the trait name bold
  @media (max-width: 600px) {
    font-size: 0.9em; // Adjust the font size as needed
  }
`;

const ScoreValue = styled.span`
  font-size: 0.9em; // Slightly smaller font size for the score
  color: #999; // Different color for the score
  margin-left: 2px; // Space between the trait name and score
`;

const Button = styled.button`
  background-color: #282c34; // Green background
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid #282c34;
  &:hover {
    color: #fff; // Darker shade for hover
    background-color: #666;
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    padding: 7px 14px; // 30% smaller padding
    font-size: 12px; // Slightly smaller font size
    margin: 10px 2px 2px 2px;
  }
`;

const StyledParagraph = styled.p`
  font-size: 1em; // Example: Change font size
  color: #333; // Example: Text color
  margin: 10px 0; // Example: Margin around the paragraph
  line-height: 1.5; // Example: Line height for better readability
  padding: 5px; // Example: Padding around the text
  border-radius: 8px; // Example: Rounded corners
  max-width: 80%; // Example: Max width to control the line length
  margin: 20px auto; // Example: Center the paragraph with auto margins
`;

const traits = [
  "Openness",
  "Conscientiousness",
  "Extraversion",
  "Agreeableness",
  "Neuroticism",
];
const archetypes = {
  Default: {
    imagePath: "/data/Black13long.png",
    scores: null,
  },
  "The Rebel": {
    imagePath: "/data/rebel-stone1.png",
    scores: {
      Openness: 0.7,
      Conscientiousness: 0.3,
      Extraversion: 0.6,
      Agreeableness: 0.2,
      Neuroticism: 0.5,
    },
  },
  "The Magician": {
    imagePath: "/data/magician-stone2.png",
    scores: {
      Openness: 0.8,
      Conscientiousness: 0.5,
      Extraversion: 0.7,
      Agreeableness: 0.4,
      Neuroticism: 0.3,
    },
  },
  "The Hero": {
    imagePath: "/data/hero-stone3.png",
    scores: {
      Openness: 0.6,
      Conscientiousness: 0.7,
      Extraversion: 0.8,
      Agreeableness: 0.6,
      Neuroticism: 0.4,
    },
  },
  "The Creator": {
    imagePath: "/data/creator-stone4.png",
    scores: {
      Openness: 0.9,
      Conscientiousness: 0.6,
      Extraversion: 0.5,
      Agreeableness: 0.5,
      Neuroticism: 0.3,
    },
  },
  "The Ruler": {
    imagePath: "/data/ruler-stone5.png",
    scores: {
      Openness: 0.5,
      Conscientiousness: 0.8,
      Extraversion: 0.7,
      Agreeableness: 0.3,
      Neuroticism: 0.4,
    },
  },
  "The Caregiver": {
    imagePath: "/data/caregiver-stone6.png",
    scores: {
      Openness: 0.4,
      Conscientiousness: 0.7,
      Extraversion: 0.6,
      Agreeableness: 0.8,
      Neuroticism: 0.5,
    },
  },
  "The Innocent": {
    imagePath: "/data/innocent-stone7.png",
    scores: {
      Openness: 0.4,
      Conscientiousness: 0.6,
      Extraversion: 0.4,
      Agreeableness: 0.7,
      Neuroticism: 0.3,
    },
  },
  "The Sage": {
    imagePath: "/data/sage-stone8.png",
    scores: {
      Openness: 0.9,
      Conscientiousness: 0.7,
      Extraversion: 0.5,
      Agreeableness: 0.6,
      Neuroticism: 0.2,
    },
  },
  "The Explorer": {
    imagePath: "/data/explorer-stone9.png",
    scores: {
      Openness: 0.9,
      Conscientiousness: 0.4,
      Extraversion: 0.8,
      Agreeableness: 0.5,
      Neuroticism: 0.4,
    },
  },
  "The Lover": {
    imagePath: "/data/lover-stone10.png",
    scores: {
      Openness: 0.6,
      Conscientiousness: 0.5,
      Extraversion: 0.7,
      Agreeableness: 0.8,
      Neuroticism: 0.4,
    },
  },
  "The Joker": {
    imagePath: "/data/joker-stone11.png",
    scores: {
      Openness: 0.8,
      Conscientiousness: 0.4,
      Extraversion: 0.9,
      Agreeableness: 0.3,
      Neuroticism: 0.6,
    },
  },
  "The Everyman": {
    imagePath: "/data/everyman-stone12.png",
    scores: {
      Openness: 0.5,
      Conscientiousness: 0.6,
      Extraversion: 0.5,
      Agreeableness: 0.7,
      Neuroticism: 0.4,
    },
  },
};

const PersonalityTest = () => {
  const [currentTraitIndex, setCurrentTraitIndex] = useState(0);
  const [currentTrait, setCurrentTrait] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scores, setScores] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [finalScores, setFinalScores] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [archetypeImage, setArchetypeImage] = useState("");
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [matchedArchetypeName, setMatchedArchetypeName] = useState("");

  const someThreshold = 0.5; // Replace 0.5 with your actual threshold value

  const determineArchetype = (userScores) => {
    let closestMatch = null;
    let smallestDifference = Infinity;
    let imagePath = "";

    Object.entries(archetypes).forEach(([archetypeName, archetypeDetails]) => {
      if (archetypeDetails.scores) {
        let totalDifference = 0;

        Object.entries(archetypeDetails.scores).forEach(([trait, score]) => {
          totalDifference += Math.abs(score - userScores[trait]);
        });

        if (totalDifference < smallestDifference) {
          smallestDifference = totalDifference;
          closestMatch = archetypeName;
          imagePath = archetypeDetails.imagePath;
        }
      }
    });

    return { name: closestMatch, imagePath };
  };

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
    setAnsweredQuestions({});
  }, [currentTraitIndex]);

  const handleAnswerChange = (e, isReverseScored) => {
    const score = isReverseScored
      ? 1 - Number(e.target.value)
      : Number(e.target.value);
    setAnswers({ ...answers, [e.target.name]: score });

    // Mark the question as answered
    setAnsweredQuestions({ ...answeredQuestions, [e.target.name]: true });
  };
  // Check if all questions have been answered
  const allQuestionsAnswered = () => {
    return questions.every(
      (_, index) => answeredQuestions[`question_${currentTraitIndex}_${index}`]
    );
  };
  const handleNextTrait = () => {
    if (allQuestionsAnswered() && currentTraitIndex < traits.length - 1) {
      setCurrentTraitIndex(currentTraitIndex + 1);
    }
  };

  // const handlePrevTrait = () => {
  //   if (allQuestionsAnswered() && currentTraitIndex > 0) {
  //     setCurrentTraitIndex(currentTraitIndex - 1);
  //   }
  // };
  const handlePrevTrait = () => {
    if (currentTraitIndex === traits.length - 1) {
      // Reset the test
      setCurrentTraitIndex(0);
      setAnswers({});
      setAnsweredQuestions({});
      // Add any other state resets if necessary
    } else if (currentTraitIndex > 0) {
      setCurrentTraitIndex(currentTraitIndex - 1);
    }
  };

  const calculateFinalScores = () => {
    let traitScores = {};
    for (const trait of traits) {
      const traitIndex = traits.indexOf(trait);
      const traitAnswers = Object.entries(answers)
        .filter(([key, _]) => key.startsWith(`question_${traitIndex}_`))
        .map(([_, value]) => value);
      traitScores[trait] =
        traitAnswers.length > 0
          ? (
              traitAnswers.reduce((acc, curr) => acc + curr, 0) /
              traitAnswers.length
            ).toFixed(2)
          : "No Data";
    }
    return traitScores;
  };

  const handleFinalSubmit = () => {
    setLoading(true);
    setShowModal(true);

    setTimeout(() => {
      const scores = calculateFinalScores();
      setFinalScores(scores);

      const archetypeMatch = determineArchetype(scores);
      setMatchedArchetypeName(archetypeMatch.name);
      setArchetypeImage(archetypeMatch.imagePath);

      setLoading(false);
      setImageLoaded(true); // Ensure this is set to true here
    }, 2000);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const modalContent = loading ? (
    <LoadingSpinner>
      <BounceLoader color="#45FE47" size={120} />
    </LoadingSpinner>
  ) : (
    <>
      <Card>
        <CloseIconContainer onClick={() => setShowModal(false)}>
          <IoClose size={30} /> {/* Adjust size as needed */}
        </CloseIconContainer>
        {/* Display the matched archetype name here */}

        <h2>Gemstone</h2>
        <p>{matchedArchetypeName}</p>
        <ImageContainer>
          {imageLoaded && (
            <Image
              src={archetypeImage}
              alt="Archetype Image"
              onLoad={() => setImageLoaded(true)}
            />
          )}
          {/* <SlPicture size={100} color="#282c34" /> */}
        </ImageContainer>
        <Button>Build</Button>
        {imageLoaded && (
          <>
            <CardHeader>Your Scores</CardHeader>
            <ScoreCard>
              {Object.entries(finalScores).map(([trait, score]) => (
                <ScoreParagraph key={trait}>
                  <TraitName>{trait}:</TraitName>
                  <ScoreValue> {score}</ScoreValue>
                </ScoreParagraph>
              ))}
            </ScoreCard>
          </>
        )}
        <Button>Genrate QRKey </Button>
      </Card>
    </>
  );
  return (
    <Container>
      {/* <h2>{currentTrait.trait}</h2> */}
      {/* <p>{currentTrait.description}</p> */}
      <CardHeader>
        {currentTrait.trait} {currentTraitIndex + 1} / {traits.length}
      </CardHeader>
      <StyledParagraph>{currentTrait.description}</StyledParagraph>
      <Overlay show={showModal} />
      <Modal show={showModal}>{modalContent}</Modal>
      {questions.map((question, index) => {
        const questionName = `question_${currentTraitIndex}_${index}`;
        const isQuestionAnswered = answeredQuestions[questionName] === true;

        return (
          <QuestionComponent
            key={index}
            question={question.text}
            isReverseScored={question.isReverseScored}
            onChange={(e) => handleAnswerChange(e, question.isReverseScored)}
            name={questionName}
            isAnswered={isQuestionAnswered} // Add this prop
          />
        );
      })}

      {currentTraitIndex > 0 && (
        <StyledButton
          onClick={handlePrevTrait}
          disabled={!allQuestionsAnswered()}
        >
          {currentTraitIndex === traits.length - 1
            ? "Start Over"
            : "Previous Trait"}
        </StyledButton>
      )}

      <StyledButton
        onClick={
          currentTraitIndex < traits.length - 1
            ? handleNextTrait
            : handleFinalSubmit
        }
        disabled={!allQuestionsAnswered()}
      >
        {currentTraitIndex < traits.length - 1
          ? "Next Trait"
          : "Submit Answers"}
      </StyledButton>
    </Container>
  );
};

export default PersonalityTest;
