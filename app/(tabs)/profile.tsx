import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

// Mock user data - in a real app, this would come from a database or API
const mockUserData = {
  name: 'John Doe',
  gender: 'Male',
  dob: '1990-01-01',
  phone: '+1 234 567 8900',
  email: 'john.doe@example.com',
  address: '123 Pokemon Street, Pallet Town',
  pokemonCaught: 42,
};

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          My Profile
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.statsCard}>
        <ThemedText type="subtitle">Pokemon Caught</ThemedText>
        <ThemedText style={styles.statsNumber}>{mockUserData.pokemonCaught}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.infoCard}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          Personal Information
        </ThemedText>
        
        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Name</ThemedText>
          <ThemedText style={styles.value}>{mockUserData.name}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Gender</ThemedText>
          <ThemedText style={styles.value}>{mockUserData.gender}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Date of Birth</ThemedText>
          <ThemedText style={styles.value}>{mockUserData.dob}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Phone</ThemedText>
          <ThemedText style={styles.value}>{mockUserData.phone}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Email</ThemedText>
          <ThemedText style={styles.value}>{mockUserData.email}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText style={styles.label}>Address</ThemedText>
          <ThemedText style={styles.value}>{mockUserData.address}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
  },
  statsCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    padding: 20,
  },
  cardTitle: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  label: {
    opacity: 0.7,
  },
  value: {
    fontWeight: '500',
  },
}); 