const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function getItems(filters = {}) {
  try {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/items?${params}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    return { success: false, items: [] };
  }
}

export async function postItem(itemData) {
  try {
    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting item:', error);
    return { success: false, error: error.message };
  }
}

export async function claimItem(itemId, claimedBy, claimedByName) {
  try {
    const response = await fetch(`${API_URL}/items/${itemId}/claim`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ claimedBy, claimedByName })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error claiming item:', error);
    return { success: false, error: error.message };
  }
}

export async function getUserProfile(uid) {
  try {
    const response = await fetch(`${API_URL}/auth/profile/${uid}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return { success: false };
  }
}