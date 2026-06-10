const API_URL = 'http://localhost:3000/api/v1';

export async function getActiveBookings(token) {
  const response = await fetch(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch bookings');
  }

  return data;
}