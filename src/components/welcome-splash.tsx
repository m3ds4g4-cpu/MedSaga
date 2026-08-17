import { StyleSheet, View, Text, Pressable, useColorScheme, Image, Animated as RNAnimated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, useRef } from 'react';
import { Audio } from 'expo-av';
import { Colors } from '@/constants/theme';

const profNovo = require('@/assets/images/novo.png');

interface WelcomeSplashProps {
  onContinue: () => void;
}

export default function WelcomeSplash({ onContinue }: WelcomeSplashProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [showContent, setShowContent] = useState(false);
  const soundRef = useRef<any>(null);
  
  // Animation value using React Native's Animated API
  const scaleAnim = useRef(new RNAnimated.Value(0.8)).current;
  const opacityAnim = useRef(new RNAnimated.Value(0.3)).current;

  useEffect(() => {
    // Delay showing content for fade-in effect
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Trigger bounce animation after 5 seconds (when audio starts)
    const animationTimer = setTimeout(() => {
      RNAnimated.parallel([
        RNAnimated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: false,
          speed: 12,
          bounciness: 8,
        }),
        RNAnimated.spring(opacityAnim, {
          toValue: 1,
          useNativeDriver: false,
          speed: 12,
          bounciness: 8,
        }),
      ]).start();
    }, 5000);
    return () => clearTimeout(animationTimer);
  }, [scaleAnim, opacityAnim]);

  useEffect(() => {
    // Load audio first
    const loadAudio = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('@/assets/audio/novo-welcome.mp3'),
          { shouldPlay: false }
        );
        soundRef.current = sound;
        console.log('Audio loaded successfully');
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };
    loadAudio();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    // Play audio after animation completes (animation starts at 5s and takes ~600ms)
    const audioTimer = setTimeout(async () => {
      if (soundRef.current) {
        try {
          await soundRef.current.playAsync();
          console.log('Audio playing');
        } catch (error) {
          console.error('Error playing audio:', error);
        }
      }
    }, 5600);
    return () => clearTimeout(audioTimer);
  }, []);

  return (
    <LinearGradient
      colors={['#7D3C98', '#1E3A8A', '#0F172A']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      {/* Decorative header area */}
      <View style={styles.header}>
      </View>

      {/* Main content */}
      <RNAnimated.View 
        style={[
          styles.content,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        {/* Character frame */}
        <View style={styles.characterFrame}>
          <Image source={profNovo} style={styles.characterImage} resizeMode="contain" />
        </View>

        {/* Welcome message */}
        <Text style={[styles.greeting, { color: colors.text }]}>Welcome to MedSaga!</Text>

        {/* Character introduction */}
        <View style={styles.quoteContainer}>
          <Text style={[styles.characterName, { color: '#8B5CF6' }]}>
            Professor Novo
          </Text>
          <Text style={[styles.characterIntro, { color: colors.textSecondary }]}>
            Head of Clinical Training
          </Text>

          <Text style={[styles.quote, { color: colors.text }]}>
            {'"Welcome to MedSaga! I am Professor Novo, head of clinical training."'}
          </Text>

          <View style={styles.spacer} />

          <Text style={[styles.quote, { color: colors.text }]}>
            {'"Our mission here is vital: providing safe, accurate Over-The-Counter medication to patients in need. Are you ready to begin your journey?"'}
          </Text>
        </View>
      </RNAnimated.View>

      {/* Continue button */}
      {showContent && (
        <View style={styles.footer}>
          <Pressable
            style={({ pressed }) => [
              styles.continueButton,
              {
                backgroundColor: '#8B5CF6',
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={onContinue}
          >
            <Text style={styles.continueButtonText}>Start Your Journey</Text>
          </Pressable>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 48,
    fontWeight: '800',
    fontFamily: 'Poppins-Bold',
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },

  greeting: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  quoteContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
    width: '90%',
    maxWidth: 500,
  },
  characterName: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    marginBottom: 2,
    color: '#8B5CF6',
  },
  characterIntro: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    marginBottom: 16,
    color: '#6B7280',
  },
  quote: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'italic',
    marginBottom: 12,
    color: '#1F2937',
  },
  spacer: {
    height: 8,
  },
  characterFrame: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderRadius: 20,
    overflow: 'hidden',
  },
  characterImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 12,
    width: '100%',
    alignItems: 'center',
  },
  continueButton: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
  },
});
