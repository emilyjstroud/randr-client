import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../utils/context/authContext';
import { getLocations } from '../api/locationData';

function LocationPage() {
  const [locations, setLocations] = useState([]);

  const { user } = useAuth();

  const getAllLocations = () => {
    getLocations(user.uid).then((locationsArray) => {
      setLocations(locationsArray);
    });
  };

  useEffect(() => {
    getAllLocations();
    console.warn(locations);
  }, [user]);

  return (
    <div>
      <Link href="/location/new" passHref>
        <Button className="btn btn-danger">Add a Location</Button>
      </Link>
      <br />
      <br />
      <div className="d-flex flex-wrap">
        <title>Rivers and Roads</title>
        <h1 style={{ color: 'white' }}>Tour the Locations</h1>
        <div className="d-flex flex-wrap flex-row">
          {/* {
      filteredLocations.map((location) => (
        <LocationCard key={location.id} locationObj={location} onUpdate={getAllLocations} />
      ))
      } */}
        </div>
      </div>
    </div>
  );
}

export default LocationPage;
