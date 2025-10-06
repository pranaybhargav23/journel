// src/components/JournalCard.jsx
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../utils/colors';
import TagChip from './TagChip';

const { width } = Dimensions.get('window');

const JournalCard = ({ entry, onPress, isDarkMode }) => {
  const cardBg = isDarkMode ? '#1C1C1E' : colors.cardBackground;
  const textColor = isDarkMode ? '#FFFFFF' : colors.textPrimary;
  const secondaryColor = isDarkMode ? '#8E8E93' : colors.textSecondary;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardBg }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {entry.photos && entry.photos.length > 0 && (
        <Image
          source={{ uri: entry.photos[0] }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
          {entry.title}
        </Text>
        
        <Text style={[styles.description, { color: secondaryColor }]} numberOfLines={2}>
          {entry.description}
        </Text>

        <View style={styles.tagsContainer}>
          {entry.tags && entry.tags.slice(0, 3).map((tag, index) => (
            <TagChip key={index} tag={tag} isDarkMode={isDarkMode} />
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.metaInfo}>
            <Icon name="calendar-outline" size={14} color={secondaryColor} />
            <Text style={[styles.date, { color: secondaryColor }]}>
              {formatDate(entry.dateTime)}
            </Text>
          </View>

          {entry.location && (
            <View style={styles.metaInfo}>
              <Icon name="location-outline" size={14} color={secondaryColor} />
              <Text style={[styles.location, { color: secondaryColor }]} numberOfLines={1}>
                {entry.location}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - 32,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  date: {
    fontSize: 12,
    marginLeft: 4,
  },
  location: {
    fontSize: 12,
    marginLeft: 4,
    flex: 1,
  },
});

export default JournalCard;