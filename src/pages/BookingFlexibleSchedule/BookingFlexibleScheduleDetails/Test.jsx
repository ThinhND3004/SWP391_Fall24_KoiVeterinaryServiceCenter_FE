import React, { useEffect, useState } from 'react';

const Test = () => {
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);
  const [departureLocation, setDepartureLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');

  const departurePoint = '50.96209827745463,4.414458883409225'; // Điểm xuất phát
  const destinationPoint = '50.429137079078345,5.00088081232559'; // Điểm đến

  const fetchDistance = async () => {
    const waypoints = `${departurePoint}|${destinationPoint}`;
    const apiKey = '23da6a407e30403b98425c7841641268';
    const url = `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }
      const data = await response.json();
      console.log(data); // Kiểm tra phản hồi từ API

      if (data.features && data.features.length > 0) {
        const km = data.features[0].properties.distance / 1000; // Khoảng cách tính bằng km
        setDistance(km.toFixed(2));
      } else {
        setError('Không thể tính toán khoảng cách');
      }
    } catch (error) {
      setError('Lỗi khi tính khoảng cách: ' + error.message);
    }
  };

  const fetchLocationName = async (coordinates, setLocation) => {
    const apiKey = 'f89b01272ab747dcb9eb87889236e016'; // Khóa API của bạn
    const [lat, lon] = coordinates.split(',');
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Lỗi khi lấy thông tin địa điểm');
      }
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const locationName = data.features[0].properties.formatted; // Tên địa điểm
        setLocation(locationName);
      } else {
        setLocation('Không tìm thấy địa điểm');
      }
    } catch (error) {
      setLocation('Lỗi khi lấy tên địa điểm: ' + error.message);
    }
  };

  useEffect(() => {
    fetchDistance();
    fetchLocationName(departurePoint, setDepartureLocation);
    fetchLocationName(destinationPoint, setDestinationLocation);
  }, []);

  return (
    <div>
      <h1>Distance Calculation</h1>
      <p>Điểm xuất phát: {departureLocation || departurePoint}</p>
      <p>Điểm đến: {destinationLocation || destinationPoint}</p>
      {distance && <p>Khoảng cách: {distance} km</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Test;
