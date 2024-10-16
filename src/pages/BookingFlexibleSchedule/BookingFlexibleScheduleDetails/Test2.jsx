import React, { useEffect, useState } from 'react';

const Test2 = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);

  const fetchCoordinates = async (location) => {
    const apiKey = '23da6a407e30403b98425c7841641268';
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy tọa độ');
    }
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      return {
        lat: data.features[0].properties.lat,
        lon: data.features[0].properties.lon,
      };
    } else {
      throw new Error('Không tìm thấy tọa độ cho địa điểm này');
    }
  };

  const fetchDistance = async () => {
    try {
      const startCoords = await fetchCoordinates(startLocation);
      const endCoords = await fetchCoordinates(endLocation);

      const waypoints = `${startCoords.lat},${startCoords.lon}|${endCoords.lat},${endCoords.lon}`;
      const apiKey = '23da6a407e30403b98425c7841641268';
      const url = `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&apiKey=${apiKey}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Lỗi khi tính khoảng cách');
      }
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const km = data.features[0].properties.distance / 1000;
        setDistance(km.toFixed(2));
      } else {
        setError('Không thể tính toán khoảng cách');
      }
    } catch (error) {
      setError('Lỗi: ' + error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDistance(null); // Reset distance trước khi tính
    setError(null); // Reset error trước khi tính
    fetchDistance(); // Gọi hàm tính khoảng cách
  };

  return (
    <div>
      <h1>Tính Khoảng Cách</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={startLocation} 
          onChange={(e) => setStartLocation(e.target.value)} 
          placeholder="Điểm bắt đầu"
        />
        <input 
          type="text" 
          value={endLocation} 
          onChange={(e) => setEndLocation(e.target.value)} 
          placeholder="Điểm kết thúc"
        />
        <button type="submit">Tính khoảng cách</button>
      </form>
      {distance && <p>Khoảng cách: {distance} km</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Test2;
