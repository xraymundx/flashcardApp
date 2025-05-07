import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardContent, IonToast } from '@ionic/react';
import { flashcards } from '../data/flashcards';

const Flashcards: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleCorrect = () => {
    setToastMessage('🎉 Great job!');
    setShowToast(true);
    nextCard();
  };

  const handleWrong = () => {
    setToastMessage('🙈 Oops! Try again.');
    setShowToast(true);
    nextCard();
  };

  const nextCard = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Flashcards</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <h2>{flashcards[index].question}</h2>
          </IonCardHeader>
          <IonCardContent>
            {showAnswer && <p>{flashcards[index].answer}</p>}
            <IonButton expand="block" onClick={() => setShowAnswer(!showAnswer)}>
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </IonButton>
            <IonButton expand="block" color="success" onClick={handleCorrect}>I got it!</IonButton>
            <IonButton expand="block" color="danger" onClick={handleWrong}>I was wrong</IonButton>
          </IonCardContent>
        </IonCard>
        <IonToast isOpen={showToast} message={toastMessage} duration={1500} onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Flashcards;
