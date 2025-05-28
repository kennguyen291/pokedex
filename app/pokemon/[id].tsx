import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type PokemonDetails = {
  name: string;
  id: number;
  imageUrl: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
};

export default function PokemonDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonDetails();
  }, [id]);

  const fetchPokemonDetails = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();

      const pokemonDetails: PokemonDetails = {
        name: data.name,
        id: data.id,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        types: data.types.map((type: any) => type.type.name),
        height: data.height / 10, // Convert to meters
        weight: data.weight / 10, // Convert to kg
        abilities: data.abilities.map((ability: any) => ability.ability.name),
        stats: {
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          specialAttack: data.stats[3].base_stat,
          specialDefense: data.stats[4].base_stat,
          speed: data.stats[5].base_stat,
        },
      };

      setPokemon(pokemonDetails);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (!pokemon) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText>Pokemon not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <Image
          source={{ uri: pokemon.imageUrl }}
          style={styles.image}
          contentFit="contain"
        />
        <ThemedText type="title" style={styles.name}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </ThemedText>
        <ThemedText style={styles.id}>#{pokemon.id.toString().padStart(3, '0')}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Types</ThemedText>
        <ThemedView style={styles.typesContainer}>
          {pokemon.types.map((type) => (
            <ThemedView key={type} style={styles.typeBadge}>
              <ThemedText>{type.charAt(0).toUpperCase() + type.slice(1)}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">About</ThemedText>
        <ThemedView style={styles.infoRow}>
          <ThemedText>Height</ThemedText>
          <ThemedText>{pokemon.height} m</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoRow}>
          <ThemedText>Weight</ThemedText>
          <ThemedText>{pokemon.weight} kg</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoRow}>
          <ThemedText>Abilities</ThemedText>
          <ThemedText>
            {pokemon.abilities
              .map((ability) => ability.charAt(0).toUpperCase() + ability.slice(1))
              .join(', ')}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Base Stats</ThemedText>
        {Object.entries(pokemon.stats).map(([stat, value]) => (
          <ThemedView key={stat} style={styles.statRow}>
            <ThemedText style={styles.statName}>
              {stat.charAt(0).toUpperCase() + stat.slice(1)}
            </ThemedText>
            <ThemedView style={styles.statBar}>
              <ThemedView
                style={[
                  styles.statFill,
                  { width: `${(value / 255) * 100}%` },
                ]}
              />
            </ThemedView>
            <ThemedText style={styles.statValue}>{value}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 24,
    marginTop: 10,
  },
  id: {
    fontSize: 18,
    opacity: 0.7,
  },
  section: {
    padding: 20,
    gap: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
  },
  statName: {
    width: 100,
  },
  statBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  statFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  statValue: {
    width: 40,
    textAlign: 'right',
  },
}); 