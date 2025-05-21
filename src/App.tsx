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

import { flashcards } from "./data/flashcards";
import "./pages/Home.css"; // Make sure this file exists

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [gifType, setGifType] = useState<'correct' | 'wrong1' | 'wrong2' | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false); // Prevent double submissions

  const correctGif = "https://media.tenor.com/RW4PsXMWaLwAAAAM/the-office-comedy.gif";
  const wrongGif1 = "https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif";
  const wrongGif2 = "https://media.giphy.com/media/dkArMjm91xxflAlvRA/giphy.gif";

  const checkAnswer = () => {
    if (isLocked) return;
    const correctAnswer = flashcards[currentIndex].answer.toLowerCase();
    if (userAnswer.trim().toLowerCase() === correctAnswer) {
      setGifType('correct');
      setWrongAttempts(0);
      setIsLocked(true);
      setTimeout(() => {
        setGifType(null);
        setCurrentIndex((prev) => (prev + 1));
        setUserAnswer('');
        setIsLocked(false);
      }, 2500);
    } else {
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);
      setGifType(newWrongAttempts >= 2 ? 'wrong2' : 'wrong1');
      setShowAlert(true);
      setUserAnswer(''); // Clear input after wrong answer
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
        {currentIndex < flashcards.length ? (
          <IonCard className="flashcard">
            <IonCardContent>
              <h2>{flashcards[currentIndex].question}</h2>
              <IonInput
                placeholder="Your answer here"
                value={userAnswer}
                onIonChange={(e) => setUserAnswer(e.detail.value!)}
                disabled={isLocked}
              />
              <IonButton expand="block" className="ion-margin-top" onClick={checkAnswer} disabled={isLocked}>
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
        ) : (
          <div className="flashcard-center">
            <h2 className="flashcard-complete-message">Well done! You finished all flashcards.</h2>
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Z2d2Z2d3F2d3F2d3F2d3F2d3F2d3F2d3F2d3F2d3F2d3F2/g9582DNuQppxC/giphy.gif" alt="Celebration" style={{ width: '180px', marginBottom: '20px' }} />
            <IonButton color="secondary" onClick={() => {
              setCurrentIndex(0);
              setUserAnswer('');
              setWrongAttempts(0);
              setGifType(null);
            }}>
              Restart
            </IonButton>
          </div>
        )}

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
