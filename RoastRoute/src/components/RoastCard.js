import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RoastCard = ({ roast }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{roast.name}</Text>
      <Text style={styles.description}>{roast.description}</Text>
      <Text style={styles.details}>Origin: {roast.origin}</Text>
      <Text style={styles.details}>Roast Level: {roast.roastLevel}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
});

export default RoastCard;