/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { getRiversWithLocation, viewLocationDetails } from '../../api/locationData';
import RiverCard from '../../components/RiverCard';

export default function ViewLocation() {
  const [locationData, setLocationData] = useState({});
  const [riverData, setRiverData] = useState([]);

  const router = useRouter();

  const { id } = router.query;

  const getLocationDetails = () => {
    viewLocationDetails(id).then((data) => {
      setLocationData(data?.locationData || {});
      setRiverData(data?.riverData || []);
    });
  };
  useEffect(() => {
    getLocationDetails();
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={locationData.photo} alt={locationData.locationName} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5 style={{ color: 'white' }}>
          {locationData.name}
        </h5>
        {/* <p>Location: {locationData.name}</p> */}
        <p><b>Info:</b> {locationData.blurb}</p>
        <hr />
        <Link href="/location" passHref>
          <Button variant="danger" className="m-2">Back to Locations</Button>
        </Link>
      </div>
      { riverData.map((river) => (
        <RiverCard key={river.id} riverObj={river} onUpdate={getRiversWithLocation} />
      ))}
    </div>
  );
}
