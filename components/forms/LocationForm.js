import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { createLocation, updateLocation } from '../../api/locationData';

const initialState = {
  name: '',
  blurb: '',
  photo: '',
  user: 1,
};

function LocationForm({ user, locationObj }) {
  const [locationFormInput, setLocationFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (locationObj.id) setLocationFormInput(locationObj);
    console.warn(locationObj);
  }, [locationObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      user: locationFormInput.user,
      name: locationFormInput.name,
      blurb: locationFormInput.blurb,
      photo: locationFormInput.photo,
    };
    if (locationObj.id) {
      updateLocation(payload, locationObj.id).then(() => router.push('/location'));
    } else {
      createLocation(locationFormInput).then(() => router.push('/location'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <title>Rivers & Roads</title>
      <h2 className="text-black mt-5">{locationObj.id ? 'Update' : 'Create'} a Location</h2>
      <FloatingLabel controlId="floatingInput1" label="Location" className="mb-3">
        <Form.Control type="text" placeholder="Location" name="name" value={locationFormInput.name} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Info" className="mb-3">
        <Form.Control type="text" placeholder="Info" name="blurb" value={locationFormInput.blurb} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Location Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="photo" value={locationFormInput.photo} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{locationObj.id ? 'Update' : 'Create'} Location</Button>
    </Form>
  );
}

// PROP TYPES
LocationForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,

  locationObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    blurb: PropTypes.string,
    photo: PropTypes.string,
  }),
};

// DEFAULT PROPS
LocationForm.defaultProps = {
  locationObj: initialState,
};

export default LocationForm;
