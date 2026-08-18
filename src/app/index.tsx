import { useState } from 'react';
import { View, Text } from 'react-native';
import WelcomeSplash from '@/components/welcome-splash';
import GenderSelection from '@/components/gender-selection';
import MainMenu from '@/components/main-menu';
import { ErrorBoundary } from '@/components/error-boundary';

export default function HomeScreen() {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);

  try {
    if (!hasSeenWelcome) {
      return (
        <ErrorBoundary>
          <WelcomeSplash onContinue={() => setHasSeenWelcome(true)} />
        </ErrorBoundary>
      );
    }

    if (!selectedGender) {
      return (
        <ErrorBoundary>
          <GenderSelection 
            onSelectGender={(gender) => setSelectedGender(gender)}
            onBack={() => setHasSeenWelcome(false)}
          />
        </ErrorBoundary>
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
      <ErrorBoundary>
        <MainMenu
          selectedGender={selectedGender}
          onNewGame={handleNewGame}
          onLoadGame={handleLoadGame}
          onBack={() => setSelectedGender(null)}
        />
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('HomeScreen error:', error);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <Text style={{ color: '#FFF', fontSize: 16 }}>Error loading home screen</Text>
      </View>
    );
  }
}

