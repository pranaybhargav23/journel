import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const sampleJournals = [
  { id: '1', title: 'Trip to Paris', date: '2025-09-21' },
  { id: '2', title: 'Weekend in Tokyo', date: '2025-09-15' }
];

const JournalListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Journals</Text>
      <FlatList
        data={sampleJournals}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('EntryDetail', { id: item.id })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No journal entries yet</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEditEntry')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fa', paddingHorizontal: 16, paddingTop: 24 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 12, color: '#222' },
  card: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  date: { marginTop: 6, fontSize: 14, color: '#666' },
  empty: { textAlign: 'center', marginTop: 50, color: '#999', fontSize: 16 },
  addButton: {
    backgroundColor: '#007bff',
    position: 'absolute',
    bottom: 30,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#007bff',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 }
  },
  addButtonText: { color: 'white', fontSize: 36, lineHeight: 36 }
});

export default JournalListScreen;