import { ImageBackground, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

interface MainMenuProps {
  selectedGender: 'male' | 'female';
  onNewGame: () => void;
  onLoadGame: () => void;
  onBack?: () => void;
}

const pharmacyBackground = require('@/assets/images/homescreen.png');

export default function MainMenu({ selectedGender, onNewGame, onLoadGame, onBack }: MainMenuProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={pharmacyBackground}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Back button */}
        {onBack && (
          <Pressable style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </Pressable>
        )}

        {/* Menu Buttons - Center overlay */}
        <View style={[styles.menuContainer, { backgroundColor: 'transparent' }]}>
          <Text style={[styles.welcomeText, { color: '#FFFFFF' }]}>
            Welcome to the Pharmacy
          </Text>

          <View style={styles.buttonsRow}>
            <Pressable
              style={({ pressed }) => [
                styles.menuButton,
                styles.newGameButton,
                { opacity: pressed ? 0.8 : 1 },
              ]}
              onPress={onNewGame}
            >
              <Text style={[styles.buttonText, { color: '#8B5CF6' }]}>New Game</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.menuButton,
                styles.loadButton,
                { opacity: pressed ? 0.8 : 1 },
              ]}
              onPress={onLoadGame}
            >
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Load Game</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    padding: 8,
    zIndex: 10,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 12,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  menuContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 5,
    width: '100%',
    maxWidth: 500,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  buttonsRow: {
    flexDirection: 'column',
    width: '100%',
    maxWidth: 220,
  },
  menuButton: {
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    marginVertical: 10,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 25,
    minHeight: 100,
  },
  newGameButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
  },
  loadButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    borderColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
  },
});
