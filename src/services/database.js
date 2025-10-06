// src/services/database.js
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);
let db;

export const initDatabase = async () => {
  try {
    db = await SQLite.openDatabase({ name: 'TravelJournal.db', location: 'default' });
    
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        photos TEXT,
        tags TEXT,
        latitude REAL,
        longitude REAL,
        location TEXT,
        dateTime TEXT,
        synced INTEGER DEFAULT 0,
        createdAt TEXT,
        updatedAt TEXT
      )
    `);
    
    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

export const insertEntry = async (entry) => {
  try {
    const {
      id,
      title,
      description,
      photos,
      tags,
      latitude,
      longitude,
      location,
      dateTime,
      synced = 0,
      createdAt,
      updatedAt,
    } = entry;

    await db.executeSql(
      `INSERT INTO journal_entries 
      (id, title, description, photos, tags, latitude, longitude, location, dateTime, synced, createdAt, updatedAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        title,
        description || '',
        JSON.stringify(photos || []),
        JSON.stringify(tags || []),
        latitude || null,
        longitude || null,
        location || '',
        dateTime,
        synced,
        createdAt,
        updatedAt,
      ]
    );
    
    return true;
  } catch (error) {
    console.error('Insert entry error:', error);
    throw error;
  }
};

export const updateEntryInDB = async (entry) => {
  try {
    const {
      id,
      title,
      description,
      photos,
      tags,
      latitude,
      longitude,
      location,
      dateTime,
      updatedAt,
    } = entry;

    await db.executeSql(
      `UPDATE journal_entries 
      SET title = ?, description = ?, photos = ?, tags = ?, 
          latitude = ?, longitude = ?, location = ?, dateTime = ?, 
          synced = 0, updatedAt = ?
      WHERE id = ?`,
      [
        title,
        description || '',
        JSON.stringify(photos || []),
        JSON.stringify(tags || []),
        latitude || null,
        longitude || null,
        location || '',
        dateTime,
        updatedAt,
        id,
      ]
    );
    
    return true;
  } catch (error) {
    console.error('Update entry error:', error);
    throw error;
  }
};

export const deleteEntryFromDB = async (id) => {
  try {
    await db.executeSql('DELETE FROM journal_entries WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Delete entry error:', error);
    throw error;
  }
};

export const getAllEntries = async () => {
  try {
    const [results] = await db.executeSql('SELECT * FROM journal_entries ORDER BY dateTime DESC');
    
    const entries = [];
    for (let i = 0; i < results.rows.length; i++) {
      const row = results.rows.item(i);
      entries.push({
        ...row,
        photos: JSON.parse(row.photos || '[]'),
        tags: JSON.parse(row.tags || '[]'),
      });
    }
    
    return entries;
  } catch (error) {
    console.error('Get all entries error:', error);
    return [];
  }
};

export const getEntryById = async (id) => {
  try {
    const [results] = await db.executeSql('SELECT * FROM journal_entries WHERE id = ?', [id]);
    
    if (results.rows.length > 0) {
      const row = results.rows.item(0);
      return {
        ...row,
        photos: JSON.parse(row.photos || '[]'),
        tags: JSON.parse(row.tags || '[]'),
      };
    }
    return null;
  } catch (error) {
    console.error('Get entry by id error:', error);
    return null;
  }
};

export const searchEntries = async (query, tags = [], dateRange = null) => {
  try {
    let sql = 'SELECT * FROM journal_entries WHERE 1=1';
    const params = [];

    if (query) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${query}%`, `%${query}%`);
    }

    if (dateRange?.start && dateRange?.end) {
      sql += ' AND dateTime BETWEEN ? AND ?';
      params.push(dateRange.start, dateRange.end);
    }

    sql += ' ORDER BY dateTime DESC';

    const [results] = await db.executeSql(sql, params);
    
    let entries = [];
    for (let i = 0; i < results.rows.length; i++) {
      const row = results.rows.item(i);
      entries.push({
        ...row,
        photos: JSON.parse(row.photos || '[]'),
        tags: JSON.parse(row.tags || '[]'),
      });
    }

    // Filter by tags in memory (since tags are stored as JSON)
    if (tags.length > 0) {
      entries = entries.filter(entry =>
        tags.some(tag => entry.tags.includes(tag))
      );
    }

    return entries;
  } catch (error) {
    console.error('Search entries error:', error);
    return [];
  }
};

export const getUnsyncedEntries = async () => {
  try {
    const [results] = await db.executeSql('SELECT * FROM journal_entries WHERE synced = 0');
    
    const entries = [];
    for (let i = 0; i < results.rows.length; i++) {
      const row = results.rows.item(i);
      entries.push({
        ...row,
        photos: JSON.parse(row.photos || '[]'),
        tags: JSON.parse(row.tags || '[]'),
      });
    }
    
    return entries;
  } catch (error) {
    console.error('Get unsynced entries error:', error);
    return [];
  }
};

export const markAsSynced = async (id) => {
  try {
    await db.executeSql('UPDATE journal_entries SET synced = 1 WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Mark as synced error:', error);
    return false;
  }
};

export default {
  initDatabase,
  insertEntry,
  updateEntryInDB,
  deleteEntryFromDB,
  getAllEntries,
  getEntryById,
  searchEntries,
  getUnsyncedEntries,
  markAsSynced,
};