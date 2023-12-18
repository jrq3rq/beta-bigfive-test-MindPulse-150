# Personality Test Application

```markdown
Personality-Test-App
├── public/
│ └── index.html # Main HTML file
│ ├── data/
│ │ ├── archetype-crystal1.png
│ │ ├── archetype-crystal2.png
│ │ ├── archetype-crystal3.png
│ │ ├── archetype-crystal4.png
│ │ ├── archetype-crystal5.png
│ │ ├── archetype-crystal6.png
│ │ ├── archetype-crystal7.png
│ │ ├── archetype-crystal8.png
│ │ ├── archetype-crystal9.png
│ │ ├── archetype-crystal10.png
│ │ ├── archetype-crystal11.png
│ │ └── archetype-crystal12.png
├── src/
│ ├── components/
│ │ ├── PersonalityTest.js # Main component for handling personality test logic
│ │ └── QuestionComponent.js # Component to render individual questions
│ ├── services/
│ │ └── APIService.js # (Optional) Service for API calls
│ ├── App.js # Main React component
│ ├── App.css # Styles for the application
│ └── index.js # Entry point for React application
├── .env
├── .gitignore # List of files to be ignored by git
├── README.md # Documentation and instructions
├── package.json # NPM package configuration
└── node_modules/ # Node modules (dependencies)
└── (various modules)
```

# Personality Test Application

This repository contains a React-based web application designed to conduct a personality test based on the Big Five personality traits model. The application dynamically fetches questions associated with each of the five traits - Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism - from a local API and tallies responses to present a final score.

## Features

- **Dynamic Question Loading**: Questions for each personality trait are loaded dynamically from a local API.
- **Trait Description**: Each set of questions is preceded by a description of the corresponding personality trait.
- **Responsive Design**: The UI is responsive and user-friendly, making it accessible on various devices.
- **Reverse Scoring**: Certain questions are reverse scored based on the `isReverseScored` property in the API response.
- **Progressive Questionnaire**: Users navigate through the questionnaire trait by trait, with progress indication.

## Future Enhancements

### Normalized Scoring

We plan to add normalization of scores against a larger reference group in the future. This would allow users to see how their scores compare to a broader population. The implementation would involve:

1. Sourcing normative dataset
2. Adjusting scoring algorithm
3. Updating result interpretation
4. Improving UI/UX
5. Testing and validating
6. Addressing legal and ethical considerations

Adding this feature would increase accuracy and provide better context for understanding results.

## Installation and Setup

1. Clone the Repository
2. Install Dependencies
3. Run the Application
4. **API Setup**: Ensure the local API server is running at `http://localhost:3000/bigFive/`. The application expects the API to return data in a specific format.

### API Response Format

The application expects the API to return an array of objects, each representing a personality trait with its description and associated questions. For example:

```json
[
  {
    "trait": "Openness",
    "description": "A measure of one's appreciation for art, emotion, adventure, unusual ideas, imagination, curiosity, and variety of experience.",
    "questions": [
      {
        "text": "I have a rich vocabulary.",
        "isReverseScored": false
      }
      // More questions...
    ]
  }
  // Other traits...
]
```
