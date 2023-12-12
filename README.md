# Personality Test Application

```markdown
Personality-Test-App
├── public/
│ └── index.html # Main HTML file
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

This repository contains a React-based web application designed to conduct a personality test based on the Big Five personality traits model. The application dynamically fetches questions associated with each of the five traits - Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism - from a local API and tallies responses to present a final score.

## Features

- **Dynamic Question Loading**: Questions for each personality trait are loaded dynamically from a local API.
- **Trait Description**: Each set of questions is preceded by a description of the corresponding personality trait.
- **Responsive Design**: The UI is responsive and user-friendly, making it accessible on various devices.
- **Reverse Scoring**: Certain questions are reverse scored based on the `isReverseScored` property in the API response.
- **Progressive Questionnaire**: Users navigate through the questionnaire trait by trait, with progress indication.

## Installation and Setup

1. **Clone the Repository**: Clone this repository to your local machine using `git clone`.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
   This command installs all the necessary dependencies.
3. **Run the Application**:
   ```bash
   npm start
   ```
   This will start the application on localhost:3000 (or your default React port).
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
