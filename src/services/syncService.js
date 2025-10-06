// src/services/syncService.js
import NetInfo from '@react-native-community/netinfo';
import { getUnsyncedEntries, markAsSynced } from './database';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const checkInternetConnection = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

export const syncWithBackend = async (userId) => {
  try {
    const isConnected = await checkInternetConnection();
    
    if (!isConnected) {
      console.log('No internet connection');
      return { success: false, message: 'No internet connection' };
    }

    const unsyncedEntries = await getUnsyncedEntries();
    
    if (unsyncedEntries.length === 0) {
      return { success: true, message: 'All entries are synced' };
    }

    let syncedCount = 0;

    for (const entry of unsyncedEntries) {
      try {
        // Upload photos to Firebase Storage
        const uploadedPhotos = await uploadPhotosToStorage(entry.photos, userId, entry.id);
        
        // Save entry to Firestore
        await firestore()
          .collection('users')
          .doc(userId)
          .collection('journals')
          .doc(entry.id)
          .set({
            ...entry,
            photos: uploadedPhotos,
            syncedAt: firestore.FieldValue.serverTimestamp(),
          });

        // Mark as synced in local DB
        await markAsSynced(entry.id);
        syncedCount++;
      } catch (error) {
        console.error(`Error syncing entry ${entry.id}:`, error);
      }
    }

    return {
      success: true,
      message: `Synced ${syncedCount} of ${unsyncedEntries.length} entries`,
      syncedCount,
      totalCount: unsyncedEntries.length,
    };
  } catch (error) {
    console.error('Sync error:', error);
    return { success: false, message: 'Sync failed', error };
  }
};

const uploadPhotosToStorage = async (photos, userId, entryId) => {
  const uploadedUrls = [];

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    
    if (photo.startsWith('http')) {
      // Already uploaded
      uploadedUrls.push(photo);
      continue;
    }

    try {
      const fileName = `${userId}/${entryId}/photo_${i}_${Date.now()}.jpg`;
      const reference = storage().ref(fileName);
      
      await reference.putFile(photo);
      const url = await reference.getDownloadURL();
      
      uploadedUrls.push(url);
    } catch (error) {
      console.error('Photo upload error:', error);
      uploadedUrls.push(photo); // Keep local URI if upload fails
    }
  }

  return uploadedUrls;
};

export const downloadEntriesFromBackend = async (userId) => {
  try {
    const isConnected = await checkInternetConnection();
    
    if (!isConnected) {
      return { success: false, message: 'No internet connection' };
    }

    const snapshot = await firestore()
      .collection('users')
      .doc(userId)
      .collection('journals')
      .orderBy('dateTime', 'desc')
      .get();

    const entries = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    return { success: true, entries };
  } catch (error) {
    console.error('Download entries error:', error);
    return { success: false, message: 'Failed to download entries', error };
  }
};

export const setupNetworkListener = (onConnect, onDisconnect) => {
  const unsubscribe = NetInfo.addEventListener(state => {
    if (state.isConnected) {
      onConnect && onConnect();
    } else {
      onDisconnect && onDisconnect();
    }
  });

  return unsubscribe;
};

export default {
  checkInternetConnection,
  syncWithBackend,
  downloadEntriesFromBackend,
  setupNetworkListener,
};