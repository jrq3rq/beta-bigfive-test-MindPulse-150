import React, { useState, useEffect, useRef } from "react";
import QuestionComponent from "./QuestionComponent";
import styled from "styled-components";
import BounceLoader from "react-spinners/MoonLoader"; // Ensure you have installed react-spinners
import { IoClose } from "react-icons/io5"; // Import the close icon
import { v4 as uuidv4 } from "uuid";
import SquareLOGO from "../images/SQUARE.png";

import QRCode from "qrcode.react";

const Container = styled.div`
  /* background-color: rgb(255, 192, 203); */
  border: 1px solid #ccc;
  border-radius: 5px;
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

const ImageBox = styled.div`
  /* border: 0.8px solid #282c34; */
  background-color: #282c34;
  /* background-color: #f4f4f4; */
  border-radius: 8px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  text-transform: uppercase;
  font-family: "Orbitron", sans-serif;
  font-weight: 900;
  font-size: 1em;
  color: #000000;
  /* color: #f4f4f4; */
  letter-spacing: 0px;
  position: relative; // Required for positioning the pseudo-element
  display: inline-block; // Ensures the container fits the content
  padding: 5px 5px 5px 5px;
`;

const AdmissionHeader = styled.div`
  /* text-transform: uppercase; */
  /* font-family: "Orbitron", sans-serif;
  font-weight: 100; */
  font-size: 0.8em;
  color: #282c34;
  /* color: #f4f4f4; */
  letter-spacing: 0px;
  position: relative;
  display: inline-block;
  padding: 10px 0px 10px 0px;
  text-align: center; /* Center-align the text within this element */
`;

// const AdmissionTag = styled.div`
//   text-transform: uppercase;
//   font-weight: bold;
//   font-size: 0.7em;
//   color: #282c34;
//   padding: 10px 0px 0px 0px;
//   text-align: center; /* Center-align the text within this element */
// `;

const Header2 = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1em;
  padding: 10px 10px 0px 10px;
`;

const CompHeader = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9em;
  padding: 10px 10px 0px 10px;
`;

const CompSubHeader = styled.div`
  font-size: 0.7em;
  padding: 0px 10px 10px 10px;
  letter-spacing: 3px;
  /* color: #f4f4f4; */
  color: #333;
`;

const CompDesc = styled.div`
  font-size: 0.4em;
  padding: 0px 10px 10px 10px;
  letter-spacing: 3px;
  /* color: #f4f4f4; */
  color: #333;
`;

const ScoreCard = styled.div`
  width: 100%;
  /* padding: 5px 5px 5px 5px; */
  border: 2px solid #282c34;

  /* padding: 0px 5px 0px 5px; */
  color: #fff;
  /* background-color: #f4f4f4; */
  background-color: #282c34;
  border-radius: 8px;
  overflow-wrap: break-word; // Break long words to prevent overflow
  overflow-x: auto; // Horizontal scrollbar if necessary

  @media (max-width: 600px) {
    font-size: 0.7em; // Smaller text on smaller screens
    padding: 5px 10px 5px 10px;
  }
`;

const ScoreParagraph = styled.p`
  font-size: 0.8em;
  margin: 0.5px 0px 0.5px 0px;
  padding: 5px 5px 5px 5px;
  background-color: #fff;
  line-height: 16px;
  /* background-color: #282c34; */
  white-space: nowrap; // Prevents text from wrapping to the next line
  overflow: hidden; // Hides overflow
  text-overflow: ellipsis; // Adds ellipsis to overflowing text
  /* border-radius: 4px; */
`;

const QRScoreCard = styled.div`
  padding: 10px 20px 5px 20px;
  background-color: transparent; // Green background: ;
  color: #fff;
`;

const Card = styled.div`
  width: 350px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

// const ImageContainer = styled.div`
//   /* width: 200px; */
//   /* height: 200px; */
//   margin: 0px auto;
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   /* @media (max-width: 600px) {
//     width: 100px;
//     height: 100px;
//   } */
// `;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

// const Image = styled.img`
//   width: 100%;
//   height: 100%;
//   display: block;
//   margin: 0 auto;
// `;

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
  border-radius: 5px;
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
  /* color: #fff; // Adjust the text color as needed */
  color: #282c34; // Adjust the text color as needed
  font-weight: bold; // Make the trait name bold
  padding: 10px 0px 10px 10px;
  @media (max-width: 600px) {
    font-size: 0.9em; // Adjust the font size as needed
  }
`;

const ScoreValue = styled.span`
  font-size: 1em; // Slightly smaller font size for the score
  font-weight: bold;
  color: #e05063; // Different color for the score
  margin-left: 2px; // Space between the trait name and score
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px 0px 0px;
  gap: 10px;
`;

const BuildButton = styled.button`
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
  margin-bottom: 10px;
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
  border-bottom: 1px solid #ccc;
  padding: 20px;
  margin: 0px 0;
  /* border-radius: 8px; */
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
  text-align: center;
  font-size: 1.2em;
`;

const LoadingContainer = styled.div`
  background-color: #ccffcc; // Light green background for visibility
  color: #008000; // Dark green color for text
  padding: 20px;
  margin: 0px 0;
  /* border-radius: 8px; */
  border-bottom: 1px solid #ccc;
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
  text-align: center;
  font-size: 1.2em;
`;

const SubHeader = styled.div`
  font-size: 0.7em;
  padding: 0px 0px 10px 0px;
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

const FlexRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
`;

const ArchetypeCard = styled.div`
  /* background: #f8f8f8; */
  border-radius: 10px;
  border: 2px solid #282c34;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 10px;
  width: 45%; // Each card takes almost half of the container width
  text-align: center;
`;

const ArchetypeImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
`;

const AlignCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0rem 1rem 0rem;

  @media (max-width: 768px) {
    border: 2px solid transparent;
  }
`;

const HeaderBox = styled.div`
  /* border: 0.5px solid #282c34; */
  /* background-color: #282c34; */
  /* background-color: #f4f4f4; */
  /* border-radius: 40px; */
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px 0px 10px;
  margin: 0px 0px 10px 0px;
  @media screen and (max-width: 768px) {
    padding: 12px 0px 10px 5px;
  }
`;

const The = styled.div`
  font-size: 0.8rem; // Adjust as needed
  color: #57575b;
  /* margin-bottom: -10px;  */
  padding: 0;
  text-transform: uppercase;
  letter-spacing: 8px;
  font-weight: 100;
`;

const Archetype = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem; // Adjust as needed
  color: #57575b;
  line-height: 20px;
  margin: 0;
  /* padding-top: 2rem; */
  text-transform: uppercase;
`;

const Academy = styled.div`
  text-align: center;
  font-size: 1rem; // Adjust as needed
  color: #57575b;
  padding-right: 5px;

  /* margin-bottom: 12px; // Adjust this value to control the overlap */
  padding: 0;
  text-transform: uppercase;
  letter-spacing: 8px;
  font-weight: 100;
`;

const ImageContainer = styled.div`
  margin: 0px auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* You might want to adjust the size here to ensure it fits well with your layout */
`;

const Image = styled.img`
  max-height: 50px; /* Adjust this value to make the logo's height complementary to the text */
  width: auto; /* This will ensure the logo maintains its aspect ratio */
  display: block;
  margin: 0 auto;
  /* If you have specific needs for the logo's width on smaller screens, consider adding media queries */
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
    order: "Ego",
    imagePath: "/data/rebel-stone1.png",
    profileUrl: "https://carl-xii.web.app/rebel", // URL for the Hero profile
    scores: {
      Openness: 0.7,
      Conscientiousness: 0.3,
      Extraversion: 0.6,
      Agreeableness: 0.2,
      Neuroticism: 0.5,
    },
    complimentaryArchetype: "The Lover",
    complimentaryArchetypeImagePath: "/data/lover-stone10.png",
    complimentaryArchetypeReasoning:
      "The Rebel's disruptive and unconventional approach can be tempered by the Diplomat's ability to build relationships and find common ground to create positive change.",
  },
  "The Magician": {
    order: "Ego",
    imagePath: "/data/magician-stone2.png",
    profileUrl: "https://carl-xii.web.app/magician", // URL for the Hero profile
    scores: {
      Openness: 0.8,
      Conscientiousness: 0.5,
      Extraversion: 0.7,
      Agreeableness: 0.4,
      Neuroticism: 0.3,
    },
    complimentaryArchetype: "The Hero",
    complimentaryArchetypeImagePath: "/data/hero-stone3.png",
    complimentaryArchetypeReasoning:
      "The Magician's ability to transform challenges into opportunities can be supported by the Hero's courage and determination to take action and lead the way.",
  },
  "The Hero": {
    order: "Ego",
    imagePath: "/data/hero-stone3.png",
    profileUrl: "https://carl-xii.web.app/hero", // URL for the Hero profile
    scores: {
      Openness: 0.6,
      Conscientiousness: 0.7,
      Extraversion: 0.8,
      Agreeableness: 0.6,
      Neuroticism: 0.4,
    },
    complimentaryArchetype: "The Everyman",
    complimentaryArchetypeImagePath: "/data/everyman-stone12.png",
    complimentaryArchetypeReasoning:
      "The Hero's bold leadership and determination can be enhanced by the Collaborator's ability to build strong teams and foster a sense of unity and purpose.",
  },
  "The Creator": {
    order: "Personal",
    imagePath: "/data/creator-stone4.png",
    profileUrl: "https://carl-xii.web.app/creator", // URL for the Hero profile
    scores: {
      Openness: 0.9,
      Conscientiousness: 0.6,
      Extraversion: 0.5,
      Agreeableness: 0.5,
      Neuroticism: 0.3,
    },
    complimentaryArchetype: "The Sage",
    complimentaryArchetypeImagePath: "/data/sage-stone8.png",
    complimentaryArchetypeReasoning:
      "The Creator's creativity and vision can be supported by the Analyst's strategic thinking and data-driven insights to create viable and impactful innovations.",
  },
  "The Ruler": {
    order: "Personal",
    imagePath: "/data/ruler-stone5.png",
    profileUrl: "https://carl-xii.web.app/ruler", // URL for the Hero profile
    scores: {
      Openness: 0.5,
      Conscientiousness: 0.8,
      Extraversion: 0.7,
      Agreeableness: 0.3,
      Neuroticism: 0.4,
    },
    complimentaryArchetype: "The Caregiver",
    complimentaryArchetypeImagePath: "/data/caregiver-stone6.png",
    complimentaryArchetypeReasoning:
      "The Ruler's structure and stability can be balanced by the Caregiver's empathy and concern for the well-being of customers and employees.",
  },
  "The Caregiver": {
    order: "Personal",
    imagePath: "/data/caregiver-stone6.png",
    profileUrl: "https://carl-xii.web.app/caregiver", // URL for the Hero profile
    scores: {
      Openness: 0.4,
      Conscientiousness: 0.7,
      Extraversion: 0.6,
      Agreeableness: 0.8,
      Neuroticism: 0.5,
    },
    complimentaryArchetype: "The Rebel",
    complimentaryArchetypeImagePath: "/data/rebel-stone1.png",
    complimentaryArchetypeReasoning:
      "The Caregiver's nurturing and supportive nature can be complemented by the Maverick's ability to challenge the status quo and push for necessary changes to better serve customers and employees.",
  },
  "The Innocent": {
    order: "Transpersonal",
    imagePath: "/data/innocent-stone7.png",
    profileUrl: "https://carl-xii.web.app/innocent", // URL for the Hero profile
    scores: {
      Openness: 0.4,
      Conscientiousness: 0.6,
      Extraversion: 0.4,
      Agreeableness: 0.7,
      Neuroticism: 0.3,
    },
    complimentaryArchetype: "The Ruler",
    complimentaryArchetypeImagePath: "/data/ruler-stone5.png",
    complimentaryArchetypeReasoning:
      "The Innocent's optimism and trust can be grounded by the Ruler's structure, stability, and ability to create order and security within the organization.",
  },
  "The Sage": {
    order: "Transpersonal",
    imagePath: "/data/sage-stone8.png",
    profileUrl: "https://carl-xii.web.app/sage", // URL for the Hero profile
    scores: {
      Openness: 0.9,
      Conscientiousness: 0.7,
      Extraversion: 0.5,
      Agreeableness: 0.6,
      Neuroticism: 0.2,
    },
    complimentaryArchetype: "The Creator",
    complimentaryArchetypeImagePath: "/data/creator-stone4.png",
    complimentaryArchetypeReasoning:
      "The Sage's wisdom and strategic thinking can provide a solid foundation for the Innovator's creative ideas and visions to flourish.",
  },
  "The Explorer": {
    order: "Transpersonal",
    imagePath: "/data/explorer-stone9.png",
    profileUrl: "https://carl-xii.web.app/explorer", // URL for the Hero profile
    scores: {
      Openness: 0.9,
      Conscientiousness: 0.4,
      Extraversion: 0.8,
      Agreeableness: 0.5,
      Neuroticism: 0.4,
    },
    complimentaryArchetype: "The Magician",
    complimentaryArchetypeImagePath: "/data/magician-stone2.png",
    complimentaryArchetypeReasoning:
      "The Explorer's adventurous spirit and willingness to take risks can be guided by the Visionary's ability to see the big picture and transform challenges into opportunities.",
  },
  "The Lover": {
    order: "Collective",
    imagePath: "/data/lover-stone10.png",
    profileUrl: "https://carl-xii.web.app/lover", // URL for the Hero profile
    scores: {
      Openness: 0.6,
      Conscientiousness: 0.5,
      Extraversion: 0.7,
      Agreeableness: 0.8,
      Neuroticism: 0.4,
    },
    complimentaryArchetype: "The Explorer",
    complimentaryArchetypeImagePath: "/data/explorer-stone9.png",
    complimentaryArchetypeReasoning:
      "The Lover's ability to build relationships and create harmony can be complemented by the Explorer's willingness to venture into new markets and seek out new opportunities.",
  },
  "The Joker": {
    order: "Collective",
    imagePath: "/data/joker-stone11.png",
    profileUrl: "https://carl-xii.web.app/joker", // URL for the Hero profile
    scores: {
      Openness: 0.8,
      Conscientiousness: 0.4,
      Extraversion: 0.9,
      Agreeableness: 0.3,
      Neuroticism: 0.6,
    },
    complimentaryArchetype: "The Innocent",
    complimentaryArchetypeImagePath: "/data/innocent-stone7.png",
    complimentaryArchetypeReasoning:
      "The Joker's humor and ability to bring joy can be grounded by the Innocent's sincerity and authenticity, creating a positive and engaging brand experience.",
  },
  "The Everyman": {
    order: "Collective",
    imagePath: "/data/everyman-stone12.png",
    profileUrl: "https://carl-xii.web.app/everyman", // URL for the Hero profile
    scores: {
      Openness: 0.5,
      Conscientiousness: 0.6,
      Extraversion: 0.5,
      Agreeableness: 0.7,
      Neuroticism: 0.4,
    },
    complimentaryArchetype: "The Joker",
    complimentaryArchetypeImagePath: "/data/joker-stone11.png",
    complimentaryArchetypeReasoning:
      "The Everyman's relatability and down-to-earth nature can be complemented by the Entertainer's ability to bring joy, humor, and a positive atmosphere to the workplace.",
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
  const [complementaryArchetype, setComplementaryArchetype] = useState({});
  const [qrCodeInfo, setQrCodeInfo] = useState({
    uuid: null,
    timestamp: null,
    scores: null,
  });

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
      setSelectedArchetype(archetypes[archetypeMatch.name]);

      // Correctly fetching complimentary archetype information
      const compArchetypeInfo =
        archetypes[archetypeMatch.name]?.complimentaryArchetype;
      if (compArchetypeInfo) {
        const compArchetype = archetypes[compArchetypeInfo];
        setComplementaryArchetype({
          name: compArchetypeInfo,
          imagePath: compArchetype.imagePath, // This should refer to the complementary archetype's image
          reasoning: compArchetype.complimentaryArchetypeReasoning,
        });
      } else {
        // Handle cases with no complimentary archetype properly
        setComplementaryArchetype({
          name: "",
          imagePath: "",
          reasoning: "",
        });
      }

      setLoading(false);
      setImageLoaded(true);
    }, 2000);
  };
  const generateQRCode = async () => {
    setQrButtonLabel("Loading...");
    setIsQRCodeGenerating(true);

    try {
      const userScores = calculateFinalScores();

      // Check if the current scores match the last generated scores
      if (JSON.stringify(userScores) !== JSON.stringify(qrCodeInfo.scores)) {
        // Scores have changed, generate new UUID and timestamp
        const newUuid = uuidv4();
        const newTimestamp = new Date().toISOString();

        // Update state with new UUID, timestamp, and scores
        setQrCodeInfo({
          uuid: newUuid,
          timestamp: newTimestamp,
          scores: userScores,
        });

        // Update final scores state
        setFinalScores(userScores);
      }

      // Regardless of whether the scores have changed, use the cached UUID and timestamp
      const qrDataObject = {
        order: archetypes[matchedArchetypeName]?.order, // Adjusted to use matched archetype's order
        id: qrCodeInfo.uuid,
        timestamp: qrCodeInfo.timestamp,
        name: matchedArchetypeName,
        scores: userScores,
      };

      const qrData = JSON.stringify(qrDataObject);
      setQrCodeData(qrData);
      setShowQRCode(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
      setShowQRCode(false);
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
        link.download = "ArchetypeAcademy-QRCode.png"; // Set the download filename
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
              <QRScoreCard>
                <QRCode
                  ref={qrCodeRef}
                  value={qrCodeData}
                  size={128} // example size
                  level="H" // example error correction level
                  includeMargin={true} // example margin inclusion
                />
              </QRScoreCard>
            )}
          </ImageContainer>
        </FlexContainer>
        {imageLoaded && (
          <>
            <ButtonContainer>
              <Button onClick={generateQRCode} disabled={isQRCodeGenerating}>
                {qrButtonLabel}
              </Button>
            </ButtonContainer>
            <FlexRow>
              <ArchetypeCard>
                <Header2>Gemstone</Header2>
                <SubHeader>{matchedArchetypeName}</SubHeader>
                <ArchetypeImage
                  src={selectedArchetype.imagePath} // Correctly reference state variable
                  alt="Matching Archetype"
                />
              </ArchetypeCard>
              <ArchetypeCard>
                <ArchetypeImage
                  src={complementaryArchetype.imagePath}
                  alt="Complementary Archetype"
                />
                <Header2>Duality</Header2>
                <CompSubHeader>{complementaryArchetype.name}</CompSubHeader>
                {/* <CompDesc>{complementaryArchetype.reasoning}</CompDesc> */}
              </ArchetypeCard>
            </FlexRow>

            <ButtonContainer>
              {selectedArchetype.profileUrl && (
                <a
                  href={selectedArchetype.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: "100%" }}
                >
                  <BuildButton>Build</BuildButton>
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
      <AlignCenter>
        <ImageBox>
          <Image to="//carl-xii.web.app/" target="_blank" src={SquareLOGO} />
        </ImageBox>
        <HeaderBox>
          <The>The</The>
          <Archetype>Archetype</Archetype>
          <Academy>Academy</Academy>
        </HeaderBox>
      </AlignCenter>
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
