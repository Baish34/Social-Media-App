import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UseFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/admin/api/data', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data.message);
      } catch (err) {
        setError(err.response.data.error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>{data}</p>
      )}
    </div>
  );
};

export default UseFetch;
