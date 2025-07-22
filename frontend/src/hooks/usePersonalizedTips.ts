import { useEffect, useState } from 'react';

export function usePersonalizedTips({ location }: { location?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);
    
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    
    const apiUrl = process.env.REACT_APP_API_URL || 'https://afya-backend-1iqy.onrender.com';
    
    fetch(`${apiUrl}/personalized-tips?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(`Personalized Tips API error (${res.status}): ${text}`);
          });
        }
        return res.json();
      })
      .then(setData)
      .catch(e => {
        console.error('Personalized Tips API error:', e);
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, [location]);

  return { loading, error, data };
} 