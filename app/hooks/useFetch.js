import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, method = 'GET', payload = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;
        if (method === 'GET') {
          response = await axios.get(url, { params: payload });
        } else if (method === 'POST') {
          response = await axios.post(url, payload);
        } else if (method === 'PUT') {
          response = await axios.put(url, payload);
        } else if (method === 'DELETE') {
          response = await axios.delete(url, { data: payload });
        } else {
          throw new Error('Unsupported HTTP method');
        }

        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, payload]);

  return { data, loading, error };
};

export default useFetch;
