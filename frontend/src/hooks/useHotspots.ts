import { useEffect, useState } from 'react';

export function useHotspots({ days = 7, min_cases = 3 }: { days?: number, min_cases?: number }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);
    
    const params = new URLSearchParams();
    if (days !== undefined) params.append('days', String(days));
    if (min_cases !== undefined) params.append('min_cases', String(min_cases));
    
    const apiUrl = process.env.REACT_APP_API_URL || 'https://afya-backend-1iqy.onrender.com';
    
    fetch(`${apiUrl}/hotspots?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(`Hotspots API error (${res.status}): ${text}`);
          });
        }
        return res.json();
      })
      .then(setData)
      .catch(e => {
        console.error('Hotspots API error:', e);
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, [days, min_cases]);

  return { loading, error, data };
} 