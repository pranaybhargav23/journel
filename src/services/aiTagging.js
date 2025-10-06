// src/services/aiTagging.js
import axios from 'axios';
import { CLARIFAI_API_KEY, IMGBB_API_KEY } from '@env';

// Using Clarifai API for image recognition
// ⚠️ SECURITY: Never expose API keys in source code!
// Use environment variables or secure storage
const API_KEY = CLARIFAI_API_KEY || 'YOUR_API_KEY_HERE';
const CLARIFAI_MODEL_ID = 'aaa03c23b3724a16a56b629203edc62c'; // General model

export const getImageTags = async (imageUri) => {
  try {
    // Read image and convert to base64
    const base64Image = await convertImageToBase64(imageUri);
    
    const response = await axios.post(
      `https://api.clarifai.com/v2/models/${CLARIFAI_MODEL_ID}/outputs`,
      {
        inputs: [
          {
            data: {
              image: {
                base64: base64Image,
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Key ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const concepts = response.data.outputs[0].data.concepts;
    
    // Get top 5 tags with confidence > 0.85
    const tags = concepts
      .filter(concept => concept.value > 0.85)
      .slice(0, 5)
      .map(concept => concept.name);

    return tags;
  } catch (error) {
    console.error('AI Tagging error:', error);
    // Return fallback tags
    return ['travel', 'journey', 'adventure'];
  }
};

const convertImageToBase64 = async (imageUri) => {
  try {
    const RNFS = require('react-native-fs');
    const base64 = await RNFS.readFile(imageUri, 'base64');
    return base64;
  } catch (error) {
    console.error('Image conversion error:', error);
    throw error;
  }
};

// Alternative: Using ImgBB (free image hosting with analysis)
export const getImageTagsImgBB = async (imageUri) => {
  try {
    const API_KEY_IMGBB = IMGBB_API_KEY || 'YOUR_IMGBB_API_KEY';
    
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${API_KEY_IMGBB}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // ImgBB doesn't provide tags, so we'll use fallback
    // You can integrate with Google Vision API or Azure Computer Vision instead
    return ['travel', 'photo', 'memory'];
  } catch (error) {
    console.error('ImgBB tagging error:', error);
    return ['travel', 'journey'];
  }
};

// Fallback: Extract tags from location or manual input
export const generateFallbackTags = (location, title, description) => {
  const tags = [];
  
  const text = `${location} ${title} ${description}`.toLowerCase();
  
  const tagKeywords = {
    beach: ['beach', 'ocean', 'sea', 'coast', 'shore'],
    mountain: ['mountain', 'hill', 'peak', 'alpine', 'summit'],
    city: ['city', 'urban', 'downtown', 'metro', 'street'],
    nature: ['nature', 'forest', 'park', 'garden', 'wildlife'],
    food: ['food', 'restaurant', 'meal', 'cuisine', 'dinner'],
    adventure: ['adventure', 'hiking', 'trek', 'explore', 'journey'],
    culture: ['museum', 'temple', 'church', 'culture', 'heritage'],
    sunset: ['sunset', 'sunrise', 'dusk', 'dawn'],
  };

  Object.entries(tagKeywords).forEach(([tag, keywords]) => {
    if (keywords.some(keyword => text.includes(keyword))) {
      tags.push(tag);
    }
  });

  return tags.slice(0, 5);
};

export default {
  getImageTags,
  getImageTagsImgBB,
  generateFallbackTags,
};