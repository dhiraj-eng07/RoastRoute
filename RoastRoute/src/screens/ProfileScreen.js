import React from 'react';
import { View, Text, Button } from 'react-native';

const ProfileScreen = () => {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="Edit Profile" onPress={() => { /* Handle edit profile action */ }} />
    </View>
  );
};

export default ProfileScreen;