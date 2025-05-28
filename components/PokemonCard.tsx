import { Image } from 'expo-image';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type PokemonCardProps = {
  name: string;
  id: number;
  imageUrl: string;
  onPress?: () => void;
};

export function PokemonCard({ name, id, imageUrl, onPress }: PokemonCardProps) {
  return (
    <Pressable onPress={onPress}>
      <ThemedView style={styles.card}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          contentFit="contain"
        />
        <ThemedView style={styles.infoContainer}>
          <ThemedText type="defaultSemiBold" style={styles.name}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </ThemedText>
          <ThemedText style={styles.id}>#{id.toString().padStart(3, '0')}</ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 12,
    margin: 8,
    width: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  infoContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
  },
  id: {
    fontSize: 14,
    opacity: 0.7,
  },
}); 