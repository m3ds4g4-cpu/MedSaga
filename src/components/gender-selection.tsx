import { StyleSheet, View, Text, Pressable, useColorScheme, Image } from 'react-native';
import { useState } from 'react';
import { Colors } from '@/constants/theme';

const maleCustomerImage = require('@/assets/images/malegender.png');
const femaleCustomerImage = require('@/assets/images/femalegender.png');

interface GenderSelectionProps {
  onSelectGender: (gender: 'male' | 'female') => void;
  onBack?: () => void;
}

export default function GenderSelection({ onSelectGender, onBack }: GenderSelectionProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);

  const handleContinue = () => {
    if (selectedGender) {
      onSelectGender(selectedGender);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {onBack && (
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
      )}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Choose Your Character</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          How would you like to be represented?
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.genderOption,
            {
              backgroundColor: selectedGender === 'male' ? '#8B5CF6' : colors.backgroundElement,
              opacity: pressed ? 0.8 : 1,
              borderColor: selectedGender === 'male' ? '#8B5CF6' : colors.backgroundElement,
            },
          ]}
          onPress={() => setSelectedGender('male')}
        >
          <View style={styles.characterContainer}>
            <Image source={maleCustomerImage} style={styles.characterImage} resizeMode="contain" />
          </View>
          <Text
            style={[
              styles.genderText,
              { color: selectedGender === 'male' ? '#FFFFFF' : colors.text },
            ]}
          >
            Male
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.genderOption,
            {
              backgroundColor: selectedGender === 'female' ? '#8B5CF6' : colors.backgroundElement,
              opacity: pressed ? 0.8 : 1,
              borderColor: selectedGender === 'female' ? '#8B5CF6' : colors.backgroundElement,
            },
          ]}
          onPress={() => setSelectedGender('female')}
        >
          <View style={styles.characterContainer}>
            <Image source={femaleCustomerImage} style={styles.characterImage} resizeMode="contain" />
          </View>
          <Text
            style={[
              styles.genderText,
              { color: selectedGender === 'female' ? '#FFFFFF' : colors.text },
            ]}
          >
            Female
          </Text>
        </Pressable>
      </View>

      <View style={[styles.infoBox, { backgroundColor: 'rgba(139, 92, 246, 0.08)' }]}>
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          Your choice helps personalize patient scenarios and interactions
        </Text>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.continueButton,
            {
              backgroundColor: selectedGender ? '#8B5CF6' : colors.backgroundElement,
              opacity: pressed && selectedGender ? 0.8 : selectedGender ? 1 : 0.5,
            },
          ]}
          onPress={handleContinue}
          disabled={!selectedGender}
        >
          <Text
            style={[
              styles.continueButtonText,
              { color: selectedGender ? '#FFFFFF' : colors.textSecondary },
            ]}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 24,
    alignItems: 'center',
    width: '100%',
  },
  backButton: {\n    position: 'absolute',
    top: 40,
    left: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 15,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    alignItems: 'center',
    paddingHorizontal: 12,
    width: '100%',
  },
  genderOption: {
    width: 160,
    borderRadius: 16,
    borderWidth: 3,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 25,
  },

  characterContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterImage: {
    width: 100,
    height: 100,
  },
  genderText: {
    fontSize: 20,
    fontWeight: '700',
  },
  infoBox: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    marginHorizontal: 0,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    paddingBottom: 20,
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 20,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
