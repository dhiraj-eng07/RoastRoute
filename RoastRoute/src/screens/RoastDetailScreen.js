import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RoastDetailScreen = ({ route }) => {
  const { roast } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{roast.name}</Text>
      <Text style={styles.description}>{roast.description}</Text>
      <Text style={styles.details}>Origin: {roast.origin}</Text>
      <Text style={styles.details}>Flavor Notes: {roast.flavorNotes.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
});

export default RoastDetailScreen;