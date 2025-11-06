import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ShopListItem({ shop, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="cafe" size={24} color="#92400e" />
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{shop.name}</Text>
          <Text style={styles.address} numberOfLines={1}>
            {shop.address}
          </Text>
          <Text style={styles.specialty}>{shop.specialty}</Text>
        </View>
        <View style={styles.right}>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color="#f59e0b" />
            <Text style={styles.ratingText}>{shop.rating}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  address: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 12,
    color: '#92400e',
    fontStyle: 'italic',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#92400e',
  },
});