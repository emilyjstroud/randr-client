/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteRiver } from '../api/riverData';
import { getSingleLocation } from '../api/locationData';

function RiverCard({ riverObj, onUpdate }) {
  const [setShop] = useState({});

  const deleteThisRiver = () => {
    if (window.confirm(`Delete ${riverObj.name}?`)) {
      deleteRiver(riverObj.id).then(() => onUpdate());
    }
  };

  useEffect(() => {
    getSingleLocation(riverObj.location.id).then(setShop);
  }, []);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={riverObj.photo} alt={riverObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{riverObj.name}</Card.Title>
        <Link href={`/river/${riverObj.id}`} passHref>
          View River Details
        </Link>
        <br />
        <Link href={`/river/edit/${riverObj.id}`} passHref>
          Edit Info
        </Link>
        <br />
        <br />
        <Button variant="danger" onClick={deleteThisRiver} className="justify-content-left">
          Delete River
        </Button>
      </Card.Body>
    </Card>
  );
}

RiverCard.propTypes = {
  riverObj: PropTypes.shape({
    name: PropTypes.string,
    blurb: PropTypes.string,
    photo: PropTypes.string,
    location: PropTypes.shape({
      id: PropTypes.number,
    }),
    rapid: PropTypes.shape({
      id: PropTypes.number,
    }),
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RiverCard;
