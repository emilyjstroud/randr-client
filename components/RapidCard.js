import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteRapid, getRapids } from '../api/rapidData';

export default function RapidCard({ level, id, onUpdate }) {
  const deleteThisRapid = () => {
    if (window.confirm(`Delete ${level}?`)) {
      deleteRapid(id).then(() => onUpdate());
    }
  };
  // console.warn(rapidObj.level);
  useEffect(() => {
    getRapids();
  }, []);

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
  level: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

// RapidCard.propTypes = {
//   rapidObj: PropTypes.shape({
//     level: PropTypes.number,
//     river: PropTypes.shape({
//       id: PropTypes.number,
//     }),
//     id: PropTypes.number,
//   }).isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };
