import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteLocation, getLocations } from '../api/locationData';

function LocationCard({ locationObj, onUpdate }) {
  const deleteThisLocation = () => {
    if (window.confirm(`Delete ${locationObj.name}?`)) {
      deleteLocation(locationObj.id).then(() => onUpdate());
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={locationObj.photo} alt={locationObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{locationObj.name} </Card.Title>
        <Link href={`/location/${locationObj.id}`} passHref style={{ color: 'red' }}>
          View Location Details
        </Link>
        <br />
        <Link href={`/location/edit/${locationObj.id}`} passHref>
          Edit Info
        </Link>
        <br />
        <br />
        <Button variant="danger" onClick={deleteThisLocation} className="justify-content-left">
          Delete Location
        </Button>
      </Card.Body>
    </Card>
  );
}

LocationCard.propTypes = {
  locationObj: PropTypes.shape({
    name: PropTypes.string,
    blurb: PropTypes.string,
    photo: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default LocationCard;
