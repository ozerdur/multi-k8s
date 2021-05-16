import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState([]);
  const [entries, setEntries] = useState([]);
  const [index, setIndex] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/values', {
      index: index,
    });
    setIndex('');
  };

  useEffect(async () => {
    fetchIndexes();
    fetchValues();
  }, [index]);

  useEffect(() => {
    setEntries(renderValues());
  }, [values]);

  const fetchValues = async () => {
    const { data } = await axios.get('/api/values/current');
    setValues(data);
  };

  const fetchIndexes = async () => {
    const { data } = await axios.get('/api/values/all');
    setSeenIndexes(data);
  };

  const renderValues = () => {
    console.log('values', values);
    const entries2 = [];
    for (let key in values) {
      entries2.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }
    return entries2;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          vaule={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {seenIndexes.map(({ number }) => number).join(', ')}
      <h3>Calculated values:</h3>
      {entries}
    </div>
  );
};