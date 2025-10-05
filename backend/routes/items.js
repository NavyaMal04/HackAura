const express = require('express');
const router = express.Router();
const { db, admin } = require('../config/firebase');

// Get all items
router.get('/', async (req, res) => {
  try {
    const { category, status } = req.query;
    let query = db.collection('items');

    if (category && category !== 'All') {
      query = query.where('category', '==', category);
    }
    if (status) {
      query = query.where('status', '==', status);
    }

    const snapshot = await query.orderBy('createdAt', 'desc').limit(50).get();
    const items = [];
    
    snapshot.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() });
    });

    res.json({ success: true, items, count: items.length });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('items').doc(req.params.id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    res.json({ success: true, item: { id: doc.id, ...doc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Post new item
router.post('/', async (req, res) => {
  try {
    const { title, description, category, location, estimatedWeight, postedBy, postedByName } = req.body;

    if (!title || !description || !category || !location) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const itemData = {
      title,
      description,
      category,
      location,
      postedBy: postedBy || 'anonymous',
      postedByName: postedByName || 'Anonymous User',
      estimatedWeight: parseFloat(estimatedWeight) || 0,
      estimatedImpact: parseFloat(estimatedWeight) * 1.5 || 0,
      status: 'available',
      images: [],
      claimedBy: null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('items').add(itemData);

    res.json({ 
      success: true, 
      id: docRef.id, 
      message: 'Item posted successfully!',
      item: { id: docRef.id, ...itemData }
    });
  } catch (error) {
    console.error('Error posting item:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Claim an item
router.post('/:id/claim', async (req, res) => {
  try {
    const itemId = req.params.id;
    const { claimedBy, claimedByName } = req.body;

    const itemRef = db.collection('items').doc(itemId);
    const item = await itemRef.get();

    if (!item.exists) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    if (item.data().status !== 'available') {
      return res.status(400).json({ success: false, error: 'Item already claimed' });
    }

    await itemRef.update({
      status: 'claimed',
      claimedBy: claimedBy || 'anonymous',
      claimedByName: claimedByName || 'Anonymous User',
      claimedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Create claim record
    await db.collection('claims').add({
      itemId,
      claimedBy: claimedBy || 'anonymous',
      claimedByName: claimedByName || 'Anonymous User',
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ success: true, message: 'Item claimed successfully!' });
  } catch (error) {
    console.error('Error claiming item:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update item status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['available', 'claimed', 'picked-up', 'completed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    await db.collection('items').doc(req.params.id).update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('items').doc(req.params.id).delete();
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;