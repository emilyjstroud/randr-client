import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { getRiversWithLocation } from '../api/locationData';
import { useAuth } from '../utils/context/authContext';

function RiverPage() {
  const [rivers, setRivers] = useState([]);

  const { user } = useAuth();

  const getAllRivers = () => {
    getRiversWithLocation(user.uid).then((riverArray) => {
      setRivers(riverArray);
    });
  };

  useEffect(() => {
    getAllRivers();
    console.warn(rivers);
  }, [user]);

  return (
    <div>
      <Link href="/river/new" passHref>
        <Button className="artistBtn btn-danger">Add a River</Button>
      </Link>
      <br />
      <br />
      <div className="d-flex flex-wrap">
        <title>Rivers and Roads</title>
        <h1 style={{ color: 'white' }}>Float the Rivers</h1>
        <div className="d-flex flex-wrap flex-row">
          {/* {
        filteredRivers.map((river) => (
          <RiverCard key={river.id} riverObj={river} onUpdate={getAllRivers} />
        ))
} */}
        </div>
      </div>
    </div>
  );
}

export default RiverPage;
