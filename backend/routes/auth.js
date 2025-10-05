const express = require('express');
const router = express.Router();
const { auth, db, admin } = require('../config/firebase');

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, location } = req.body;

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name
    });

    // Create user document in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      name,
      location: location || '',
      stats: {
        itemsPosted: 0,
        itemsClaimed: 0,
        kgRecycled: 0,
        co2Saved: 0,
        points: 0
      },
      badges: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ 
      success: true, 
      message: 'User registered successfully',
      uid: userRecord.uid 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get user profile
router.get('/profile/:uid', async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.params.uid).get();
    
    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, user: doc.data() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update user stats
router.patch('/stats/:uid', async (req, res) => {
  try {
    const { field, increment } = req.body;
    const updateData = {};
    updateData[`stats.${field}`] = admin.firestore.FieldValue.increment(increment);

    await db.collection('users').doc(req.params.uid).update(updateData);

    res.json({ success: true, message: 'Stats updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;