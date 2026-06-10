const API_URL = 'http://localhost:3000/api/v1';

export async function getDashboardSummary(token) {
  const response = await fetch(`${API_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch dashboard');
  }

  return data;
}