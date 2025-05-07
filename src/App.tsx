import React, { useState } from 'react';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonImg,
  IonAlert
} from '@ionic/react';

import "./pages/Home.css"; // Make sure this file exists

const flashcards = [
  { question: 'What is the capital of France?', answer: 'Paris' },
  { question: 'What is 2 + 2?', answer: '4' },
  { question: 'Who wrote "Macbeth"?', answer: 'William Shakespeare' },
  { question: 'Which planet is known as the Red Planet?', answer: 'Mars' },
  { question: 'What is the largest mammal?', answer: 'Blue Whale' }
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [gifType, setGifType] = useState<'correct' | 'wrong1' | 'wrong2' | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const correctGif = "https://media.tenor.com/RW4PsXMWaLwAAAAM/the-office-comedy.gif";
  const wrongGif1 = "https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif";
  const wrongGif2 = "https://media.giphy.com/media/dkArMjm91xxflAlvRA/giphy.gif";

  const checkAnswer = () => {
    const correctAnswer = flashcards[currentIndex].answer.toLowerCase();
    if (userAnswer.trim().toLowerCase() === correctAnswer) {
      setGifType('correct');
      setWrongAttempts(0); // reset wrong count on correct
      setTimeout(() => {
        setGifType(null);
        setCurrentIndex((prev) => (prev + 1) % flashcards.length);
        setUserAnswer('');
      }, 2500);
    } else {
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);
      setGifType(newWrongAttempts >= 2 ? 'wrong2' : 'wrong1');
      setShowAlert(true);
    }
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Flashcards</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <IonCard className="flashcard">
          <IonCardContent>
            <h2>{flashcards[currentIndex].question}</h2>
            <IonInput
              placeholder="Your answer here"
              value={userAnswer}
              onIonChange={(e) => setUserAnswer(e.detail.value!)}
            />
            <IonButton expand="block" className="ion-margin-top" onClick={checkAnswer}>
              Answer
            </IonButton>

            {gifType === 'correct' && (
              <IonImg src={correctGif} alt="Correct!" />
            )}
            {gifType === 'wrong1' && (
              <IonImg src={wrongGif1} alt="Wrong 1!" />
            )}
            {gifType === 'wrong2' && (
              <IonImg src={wrongGif2} alt="Wrong 2!" />
            )}
          </IonCardContent>
        </IonCard>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => {
            setShowAlert(false);
            setGifType(null);
          }}
          header="Wrong Answer!"
          message={wrongAttempts >= 2
            ? "Seryoso? Second time wrong! 😂"
            : "Cge pangayo balon sa ginikanan wrong japon ang answer 😂"}
          buttons={['Okay']}
        />
      </IonContent>
    </IonApp>
  );
};

export default App;
