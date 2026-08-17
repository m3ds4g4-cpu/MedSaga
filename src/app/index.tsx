import { useState } from 'react';
import WelcomeSplash from '@/components/welcome-splash';
import GenderSelection from '@/components/gender-selection';
import MainMenu from '@/components/main-menu';

export default function HomeScreen() {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);

  if (!hasSeenWelcome) {
    return (
      <WelcomeSplash onContinue={() => setHasSeenWelcome(true)} />
    );
  }

  if (!selectedGender) {
    return (
      <GenderSelection 
        onSelectGender={(gender) => setSelectedGender(gender)}
        onBack={() => setHasSeenWelcome(false)}
      />
    );
  }

  const handleNewGame = () => {
    // TODO: Navigate to disease selection screen
    console.log('New Game started');
  };

  const handleLoadGame = () => {
    // TODO: Load saved game
    console.log('Load Game');
  };

  return (
    <MainMenu
      selectedGender={selectedGender}
      onNewGame={handleNewGame}
      onLoadGame={handleLoadGame}
      onBack={() => setSelectedGender(null)}
    />
  );
}

