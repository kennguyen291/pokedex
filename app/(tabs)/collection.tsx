import { PokemonCard } from '@/components/PokemonCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlatList, StyleSheet } from 'react-native';

// Mock caught Pokemon data
const mockCaughtPokemon = [
  {
    id: 1,
    name: 'bulbasaur',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  },
  {
    id: 4,
    name: 'charmander',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
  },
  {
    id: 7,
    name: 'squirtle',
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
  },
];

export default function CollectionScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">My Collection</ThemedText>
        <ThemedText style={styles.subtitle}>
          {mockCaughtPokemon.length} Pokemon caught
        </ThemedText>
      </ThemedView>

      <FlatList
        data={mockCaughtPokemon}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonCard
            name={item.name}
            id={item.id}
            imageUrl={item.imageUrl}
            onPress={() => {
              // We'll implement navigation to details page later
              console.log('Pressed:', item.name);
            }}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  subtitle: {
    opacity: 0.7,
    marginTop: 5,
  },
  listContainer: {
    padding: 8,
  },
}); 