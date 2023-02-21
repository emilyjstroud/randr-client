/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { viewRiverDetails } from '../../api/riverData';
import { getRiverRapids } from '../../api/rapidData';
import RapidCard from '../../components/RapidCard';

export default function ViewRiver() {
  const [riverData, setRiverData] = useState({});
  const [rapidData, setRapidData] = useState([]);

  const router = useRouter();

  const { id } = router.query;

  const getRiverDetails = () => {
    viewRiverDetails(id).then((data) => {
      setRiverData(data?.riverData || {});
    });
  };

  useEffect(() => {
    getRiverDetails();
    getRiverRapids(id).then(setRapidData);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={riverData.photo} alt={riverData.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5 style={{ color: 'white' }}>
          {riverData.name}
        </h5>
        <p>Name: {riverData.name}</p>
        {/* <p>Rapid: {rapidData.rapid.id}</p> */}
        <p>Info: {riverData.blurb}</p>
        <hr />
        <Link href="/river" passHref>
          <Button variant="danger" className="m-2">Back to Rivers</Button>
        </Link>
        <br />
      </div>
      { rapidData.map((rapid) => (
        <RapidCard key={rapid.id} name={rapid.rapid.level} rapidObj={rapid} onUpdate={getRiverDetails} />
      ))}
    </div>
  );
}
