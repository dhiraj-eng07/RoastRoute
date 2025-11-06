import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useLocation } from '../hooks/useLocation';
import coffeeShops from '../data/mock-coffee-shops.json';

const { height } = Dimensions.get('window');

export default function MapAndListScreen({ navigation }) {
  const { location, loading: locationLoading } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef(null);

  // Filter shops based on search query
  const filteredShops = useMemo(() => {
    if (!searchQuery.trim()) return coffeeShops;
    
    const query = searchQuery.toLowerCase();
    return coffeeShops.filter(shop =>
      shop.name.toLowerCase().includes(query) ||
      shop.address.toLowerCase().includes(query) ||
      shop.specialty.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Handle marker press
  const handleMarkerPress = useCallback((shop) => {
    navigation.navigate('ShopDetail', { shop });
  }, [navigation]);

  // Handle list item press with map animation
  const handleListItemPress = useCallback((shop) => {
    // Animate map to shop location
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: shop.latitude,
        longitude: shop.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);
    }

    // Navigate to detail after short delay
    setTimeout(() => {
      navigation.navigate('ShopDetail', { shop });
    }, 500);
  }, [navigation]);

  // Render list item
  const renderShopItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={styles.shopItem}
      onPress={() => handleListItemPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.shopItemContent}>
        <View style={styles.shopItemLeft}>
          <Ionicons name="cafe" size={24} color="#92400e" />
        </View>
        <View style={styles.shopItemCenter}>
          <Text style={styles.shopName}>{item.name}</Text>
          <Text style={styles.shopAddress} numberOfLines={1}>
            {item.address}
          </Text>
          <Text style={styles.shopSpecialty}>{item.specialty}</Text>
        </View>
        <View style={styles.shopItemRight}>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color="#f59e0b" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemove(item.id)}
        >
          <Ionicons name="heart" size={24} color="#dc2626" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <Ionicons name="heart-outline" size={64} color="#d1d5db" />
      </View>
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptyText}>
        Start exploring and add your favorite coffee shops!
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Finder')}
      >
        <Ionicons name="search" size={20} color="#fff" />
        <Text style={styles.exploreButtonText}>Explore Coffee Shops</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#92400e" />
        <Text style={styles.loadingText}>Loading favorites...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerSubtitle}>
          {favoriteShops.length} {favoriteShops.length === 1 ? 'shop' : 'shops'} saved
        </Text>
      </View>
      <FlatList
        data={favoriteShops}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          favoriteShops.length === 0 && styles.listContentEmpty,
        ]}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  listContent: {
    padding: 16,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  favoriteItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  favoriteIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  favoriteDetails: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  favoriteAddress: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
  },
  favoriteFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400e',
  },
  specialty: {
    fontSize: 11,
    color: '#92400e',
    fontStyle: 'italic',
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#92400e',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});