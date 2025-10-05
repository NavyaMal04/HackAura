const express = require('express');
const router = express.Router();
const { db, admin } = require('../config/firebase');

// Get all claims
router.get('/', async (req, res) => {
  try {
    const { userId, status } = req.query;
    let query = db.collection('claims');

    if (userId) {
      query = query.where('claimedBy', '==', userId);
    }
    if (status) {
      query = query.where('status', '==', status);
    }

    const snapshot = await query.orderBy('createdAt', 'desc').get();
    const claims = [];
    
    snapshot.forEach(doc => {
      claims.push({ id: doc.id, ...doc.data() });
    });

    res.json({ success: true, claims, count: claims.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update claim status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    await db.collection('claims').doc(req.params.id).update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ success: true, message: 'Claim updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;