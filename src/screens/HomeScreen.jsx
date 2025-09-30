// src/screens/HomeScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen(props) {
  const [search, setSearch] = useState('');

  return (
    <ImageBackground
      source={require('../assets/BG.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons 
              name="compass-outline" 
              size={40} 
              color="#FFFFFF" 
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Travel Journal</Text>
            <Text style={styles.headerSubtitle}>Your Adventure Stories</Text>
          </View>
        </View>

        {/* Modern Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <View style={styles.searchIconWrapper}>
              <MaterialCommunityIcons
                name="magnify"
                size={24}
                color="rgba(255, 255, 255, 0.9)"
              />
            </View>
            <TextInput
              placeholder="Search adventures..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              style={styles.input}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={22}
                  color="rgba(255, 255, 255, 0.6)"
                  style={styles.clearIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Stats/Results Header */}
        <View style={styles.resultsHeader}>
          <View style={styles.resultsBadge}>
            <Text style={styles.resultsCount}>0</Text>
          </View>
          <Text style={styles.resultsText}>Total Entries</Text>
        </View>

        {/* Empty State */}
        <View style={styles.contentContainer}>
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <MaterialCommunityIcons 
                name="book-open-page-variant" 
                size={70} 
                color="#FFFFFF" 
              />
            </View>
            <Text style={styles.emptyTitle}>No Journals Yet</Text>
            <Text style={styles.emptySubtitle}>
              Begin your journey by creating your first adventure entry
            </Text>
            <View style={styles.emptyDecoration} />
          </View>
        </View>

        {/* Floating Add Button */}
        <TouchableOpacity style={styles.floatingButton}>
          <MaterialCommunityIcons 
            name="plus" 
            size={32} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: height,
    width: width,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    padding: 20,
  },
  
  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  headerTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
    letterSpacing: 0.3,
  },

  // Search Styles
  searchContainer: {
    marginVertical: 20,
    marginHorizontal: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    borderRadius: 28,
    paddingHorizontal: 6,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  searchIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginLeft: 12,
    marginRight: 8,
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  clearIcon: {
    padding: 4,
    marginRight: 4,
  },

  // Results Header
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    borderLeftWidth: 3,
    borderLeftColor: 'rgba(255, 255, 255, 0.4)',
  },
  resultsBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  resultsCount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  resultsText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    flex: 1,
  },

  // Content Area
  contentContainer: {
    flex: 1,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emptyIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  emptyTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 32,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  emptySubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.65)',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 20,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  emptyDecoration: {
    marginTop: 40,
    width: 60,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },

  // Floating Action Button
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(99, 102, 241, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});