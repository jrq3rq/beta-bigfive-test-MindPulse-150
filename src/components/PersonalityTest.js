import React, { useState, useEffect, useRef } from "react";
import QuestionComponent from "./QuestionComponent";
import styled from "styled-components";
import BounceLoader from "react-spinners/MoonLoader"; // Ensure you have installed react-spinners
import { IoClose } from "react-icons/io5"; // Import the close icon

import QRCode from "qrcode.react";

const Container = styled.div`
  /* background-color: rgb(255, 192, 203); */
  background-color: #f4f4f4;
  margin: 20px;
  padding: 20px;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
`;

const HeadContainer = styled.div`
  /* padding: 20px; */
  display: flex; // Added for flexbox layout
  flex-direction: column; // Children stacked vertically
  align-items: center; // Center children horizontally
  justify-content: center; // Center children vertically
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Header = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1em;
  color: #282c34;
  letter-spacing: 0px;
  position: relative; // Required for positioning the pseudo-element
  display: inline-block; // Ensures the container fits the content

  &::after {
    content: "";
    display: block;
    width: 100%; // Matches the width of the text
    height: 1px; // Thickness of the underline
    background: #282c34; // Color of the underline
    position: absolute;
    left: 0;
    bottom: -2px; // Adjust this to control the distance between text and underline
  }
`;

const AdmissionHeader = styled.div`
  text-transform: uppercase;
  font-size: 0.8em;
  color: #282c34;
  letter-spacing: 0px;
  position: relative; // Required for positioning the pseudo-element
  display: inline-block; // Ensures the container fits the content
  padding: 0px 0px 10px 0px;
`;

const AdmissionTag = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.7em;
  color: #282c34;
  padding: 10px 0px 0px 0px;
`;
const Header2 = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1em;
  padding: 10px 10px 0px 10px;
`;

const ScoreCard = styled.div`
  width: 100%;
  padding: 40px 10px;
  color: #fff;
  background-color: #282c34;
  border-radius: 10px;
  overflow-wrap: break-word; // Break long words to prevent overflow
  overflow-x: auto; // Horizontal scrollbar if necessary

  @media (max-width: 600px) {
    font-size: 0.7em; // Smaller text on smaller screens
    padding: 20px 10px;
  }
`;
const ScoreParagraph = styled.p`
  font-size: 0.8em;
  color: #333;
  margin: 5px 0;
  white-space: nowrap; // Prevents text from wrapping to the next line
  overflow: hidden; // Hides overflow
  text-overflow: ellipsis; // Adds ellipsis to overflowing text
`;

const QRScoreCard = styled.div`
  padding: 10px 20px 10px 30px;
  background-color: transparent; // Green background: ;
  color: #fff;
`;

const Card = styled.div`
  width: 350px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  /* width: 200px; */
  /* height: 200px; */
  margin: 0px auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* @media (max-width: 600px) {
    width: 100px;
    height: 100px;
  } */
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
  padding: 30px 20px 10px 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 100;
  display: ${(props) => (props.show ? "block" : "none")};
  /* Adjust width and layout as needed */
  @media (max-width: 600px) {
    width: 80%;
    /* padding: 25px; */
  }
`;
const CardHeader = styled.h2`
  /* color: #f4f4f4; */
  color: #333;
  text-transform: uppercase;
  padding: 0px 10px 0px 10px;
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

const TraitName = styled.span`
  font-size: 1em; // Adjust the font size as needed
  color: #fff; // Adjust the text color as needed
  font-weight: bold; // Make the trait name bold
  @media (max-width: 600px) {
    font-size: 0.9em; // Adjust the font size as needed
  }
`;

const ScoreValue = styled.span`
  font-size: 1em; // Slightly smaller font size for the score
  color: #e05063; // Different color for the score
  margin-left: 2px; // Space between the trait name and score
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px 10px 0px; // Adjust as needed
  gap: 10px;
`;

const Button = styled.button`
  background-color: #282c34;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  width: 100%;
  // Gives space between buttons
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #666;
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    padding: 7px 14px; // 30% smaller padding
    font-size: 10px; // Slightly smaller font size
  }
`;

// Define a styled component for displaying error messages
const ErrorContainer = styled.div`
  background-color: #ffcccc; // Light red background for error visibility
  color: #cc0000; // Dark red color for error text
  padding: 20px;
  margin: 0px 0;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1.2em;
`;

const LoadingContainer = styled.div`
  background-color: #ccffcc; // Light green background for visibility
  color: #008000; // Dark green color for text
  padding: 20px;
  margin: 0px 0;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1.2em;
`;

const SubHeader = styled.div`
  font-size: 0.8em;
  padding: 0px 10px 10px 10px;
  letter-spacing: 3px;
  /* color: #f4f4f4; */
  color: #333;
`;

const SubSubHeader = styled.h3`
  font-size: 0.8em;
  padding: 10px 0px 1px 0px;
  /* color: #f4f4f4; */
  color: #333;
`;

const StyledParagraph = styled.p`
  /* color: #f4f4f4; */
  padding: 0px 10px 20px 10px;
  color: #333;
  width: 70%;
  @media (max-width: 600px) {
    width: 100%;
    padding: 10px 10px 10px 10px;
  }
`;
const Subheader = styled.h3`
  /* text-transform: uppercase; */
  font-size: 1em;
  padding: 10px 10px 0px 10px;
  color: #333;
`;
const SubheaderDesc = styled.p`
  color: #333;
  width: 70%;
  @media (max-width: 600px) {
    width: 100%;
    padding: 10px 10px 10px 10px;
  }
`;

// Adjusting FlexContainer to initially center content
const FlexContainer = styled.div`
  display: flex;
  justify-content: center; // Center the content
  align-items: center;
`;

// Adjusting HalfWidthDiv for the QR code and score card layout
const HalfWidthDiv = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center; // Center the score card initially
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
    profileUrl: "https://carl-xii.web.app/rebel", // URL for the Hero profile
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
    profileUrl: "https://carl-xii.web.app/magician", // URL for the Hero profile
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
    profileUrl: "https://carl-xii.web.app/hero", // URL for the Hero profile
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
    profileUrl: "https://carl-xii.web.app/creator", // URL for the Hero profile
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
    profileUrl: "https://carl-xii.web.app/ruler", // URL for the Hero profile
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
    profileUrl: "https://carl-xii.web.app/caregiver", // URL for the Hero profile
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
    profileUrl: "https://carl-xii.web.app/innocent", // URL for the Hero profile
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
    profileUrl: "https://carl-xii.web.app/sage", // URL for the Hero profile
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
    profileUrl: "https://carl-xii.web.app/explorer", // URL for the Hero profile
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
    profileUrl: "https://carl-xii.web.app/lover", // URL for the Hero profile
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
    profileUrl: "https://carl-xii.web.app/joker", // URL for the Hero profile
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
    profileUrl: "https://carl-xii.web.app/everyman", // URL for the Hero profile
    scores: {
      Openness: 0.5,
      Conscientiousness: 0.6,
      Extraversion: 0.5,
      Agreeableness: 0.7,
      Neuroticism: 0.4,
    },
  },
};

// Utility function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Define the cache outside the component
const archetypesCache = {};

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
  const [qrCodeData, setQrCodeData] = useState(""); // State to store QR code data
  const [showQRCode, setShowQRCode] = useState(false); // New state variable
  const [isQRCodeGenerating, setIsQRCodeGenerating] = useState(false);
  const [qrButtonLabel, setQrButtonLabel] = useState("Generate QRKey");
  const [selectedArchetype, setSelectedArchetype] = useState({});

  const someThreshold = 0.5; // Replace 0.5 with your actual threshold value

  const determineArchetype = (userScores) => {
    let closestMatch = null;
    let smallestDifference = Infinity;
    let archetypeDetails = {};

    Object.entries(archetypes).forEach(([archetypeName, details]) => {
      if (details.scores) {
        let totalDifference = 0;

        Object.entries(details.scores).forEach(([trait, score]) => {
          totalDifference += Math.abs(score - userScores[trait]);
        });

        if (totalDifference < smallestDifference) {
          smallestDifference = totalDifference;
          closestMatch = archetypeName;
          archetypeDetails = { ...details }; // Copy all details
        }
      }
    });

    return { name: closestMatch, ...archetypeDetails };
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        // const response = await fetch(`http://localhost:3000/bigFive/`);
        const response = await fetch(
          "https://us-central1-archetype-builder-api.cloudfunctions.net/api/bigfive"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const allTraitsData = await response.json();
        const traitData = allTraitsData.find(
          (trait) => trait.trait === traits[currentTraitIndex]
        );
        setCurrentTrait(traitData);
        const shuffledQuestions = shuffleArray([...traitData.questions]);
        // setQuestions(traitData.questions);
        setQuestions(shuffledQuestions);
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
      setShowQRCode(false); // Ensure QR code does not show automatically

      const archetypeMatch = determineArchetype(scores);
      setMatchedArchetypeName(archetypeMatch.name);
      setArchetypeImage(archetypeMatch.imagePath);
      setSelectedArchetype(archetypes[archetypeMatch.name]);

      setLoading(false);
      setImageLoaded(true);
    }, 2000);
  };
  const generateQRCode = async () => {
    setQrButtonLabel("Loading...");
    setIsQRCodeGenerating(true);

    try {
      const userScores = calculateFinalScores(); // User's calculated scores
      setFinalScores(userScores);

      const archetypeMatchName = determineArchetype(userScores);

      // Fetch archetype data
      if (!archetypesCache[archetypeMatchName]) {
        const response = await fetch(
          `https://us-central1-archetype-builder-api.cloudfunctions.net/api/archetypes/${archetypeMatchName}`
        );
        if (!response.ok) throw new Error("Failed to fetch archetype data");
        const archetypeData = await response.json();

        // Extract necessary fields excluding scores
        const { order, id, timestamp, name } = archetypeData;
        const extractedData = { order, id, timestamp, name };

        // Cache the extracted data
        archetypesCache[archetypeMatchName] = extractedData;
      }

      // Combine user scores with the cached archetype data
      const qrDataObject = {
        ...archetypesCache[archetypeMatchName],
        scores: userScores, // Injecting user's scores here
      };

      const qrData = JSON.stringify(qrDataObject);

      setQrCodeData(qrData);
      setShowQRCode(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsQRCodeGenerating(false);
      setQrButtonLabel("Generate QR Key");
    }
  };
  const qrCodeRef = useRef(null);

  const downloadQRCode = () => {
    const qrElement = qrCodeRef.current;
    if (qrElement) {
      const canvas = qrElement.querySelector("canvas");
      if (canvas) {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "Archetype-Student-ID.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  if (isLoading) return <LoadingContainer>Loading...</LoadingContainer>;
  if (error)
    return <ErrorContainer>MindPulse-150 Error: {error}</ErrorContainer>;

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
        <Header>The Archetype Academy</Header>
        <AdmissionHeader>MindPulse-150 results: </AdmissionHeader>
        <FlexContainer>
          {/* Scores Display */}
          <ScoreCard>
            {Object.entries(finalScores).map(([trait, score]) => (
              <ScoreParagraph key={trait}>
                <TraitName>{trait}:</TraitName>
                <ScoreValue>{score}</ScoreValue>
              </ScoreParagraph>
            ))}
          </ScoreCard>
          <ImageContainer>
            {showQRCode && qrCodeData && (
              <QRScoreCard ref={qrCodeRef}>
                <QRCode
                  value={qrCodeData}
                  size={128} // Adjust size as needed
                  level={"H"} // Error correction level: 'L', 'M', 'Q', 'H'
                  includeMargin={true}
                />
              </QRScoreCard>
            )}
          </ImageContainer>
        </FlexContainer>
        {imageLoaded && (
          <>
            <AdmissionTag>Admissions</AdmissionTag>

            <ButtonContainer>
              {/* <Button onClick={generateQRCode}>Generate QRKey</Button> */}
              <Button onClick={generateQRCode} disabled={isQRCodeGenerating}>
                {qrButtonLabel}
              </Button>

              <Button onClick={downloadQRCode}>Download</Button>
            </ButtonContainer>
            <Header2>Gemstone</Header2>
            <SubHeader>{matchedArchetypeName}</SubHeader>
            <ImageContainer>
              <HalfWidthDiv>
                {/* Image Display */}
                {imageLoaded && (
                  <Image src={archetypeImage} alt="Archetype Image" />
                )}
              </HalfWidthDiv>
            </ImageContainer>
            <ButtonContainer>
              {selectedArchetype.profileUrl && (
                <a
                  href={selectedArchetype.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "100%" }}
                >
                  <Button>Build</Button>
                </a>
              )}
            </ButtonContainer>
          </>
        )}
      </Card>
    </>
  );
  return (
    <Container>
      {/* <h2>{currentTrait.trait}</h2> */}
      {/* <p>{currentTrait.description}</p> */}
      <HeadContainer>
        <SubSubHeader>
          Trait {currentTraitIndex + 1} of {traits.length}
        </SubSubHeader>
        <CardHeader>{currentTrait.trait}</CardHeader>
        <StyledParagraph>{currentTrait.description}</StyledParagraph>
        <Subheader>{currentTrait.subheader}</Subheader>
        <SubheaderDesc>{currentTrait.subheaderDescription}</SubheaderDesc>
      </HeadContainer>
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
