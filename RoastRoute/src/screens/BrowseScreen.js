import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BrowseScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse Roasts</Text>
      {/* Additional content for browsing roasts will go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default BrowseScreen;