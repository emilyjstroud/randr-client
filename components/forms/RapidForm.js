import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { createRapid, updateRapid } from '../../api/rapidData';

const initialState = {
  level: '',
};

const RapidForm = ({ rapidObj }) => {
  const [currentRapid, setCurrentRapid] = useState(initialState);

  const router = useRouter();

  useEffect(() => {
    if (rapidObj.id) setCurrentRapid(rapidObj);
  }, [rapidObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRapid((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      level: currentRapid.level,
    };
    if (rapidObj.id) {
      updateRapid(payload, rapidObj.id).then(() => router.push('/rapid'));
    } else {
      createRapid(payload).then(() => router.push('/rapid'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <h2 className="text-white mt-5">{rapidObj.id ? 'Update' : 'Create'} a Rapid</h2>
          <Form.Label className="text-white">Rapid Level</Form.Label>
          <Form.Control name="level" required value={currentRapid.level} onChange={handleChange} />
        </Form.Group>
        <Button type="submit" variant="danger">{rapidObj.id ? 'Update' : 'Create'} Rapid</Button>
      </Form>
    </>
  );
};

RapidForm.propTypes = {
  rapidObj: PropTypes.shape({
    id: PropTypes.number,
    level: PropTypes.number,
  }),
};

RapidForm.defaultProps = {
  rapidObj: initialState,
};

export default RapidForm;
