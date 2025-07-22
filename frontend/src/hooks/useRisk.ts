import { useEffect, useState } from 'react';

export function useRisk({ location, days = 14 }: { location?: string, days?: number }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);
    
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (days !== undefined) params.append('days', String(days));
    
    const apiUrl = process.env.REACT_APP_API_URL || 'https://afya-backend-1iqy.onrender.com';
    
    fetch(`${apiUrl}/risk?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(`Risk API error (${res.status}): ${text}`);
          });
        }
        return res.json();
      })
      .then(setData)
      .catch(e => {
        console.error('Risk API error:', e);
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, [location, days]);

  return { loading, error, data };
} 