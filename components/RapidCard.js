import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteRapid } from '../api/rapidData';

export default function RapidCard({ id, level, onUpdate }) {
  const deleteThisRapid = () => {
    if (window.confirm(`Delete ${level}?`)) {
      deleteRapid(id).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>{level}</Card.Title>
          <Link href={`/rapid/edit/${id}`} passHref>
            <Button variant="info">Edit</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisRapid} className="m-2">
            Delete
          </Button>
        </Card.Body>
        <Card.Footer />
      </Card>
    </>
  );
}

RapidCard.propTypes = {
  level: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
