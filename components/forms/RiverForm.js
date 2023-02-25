/* eslint-disable import/no-extraneous-dependencies */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import { getLocations } from '../../api/locationData';
import { getRapids, getRiverRapids } from '../../api/rapidData';
import { createRiver, updateRiver } from '../../api/riverData';

const initialState = {
  name: '',
  blurb: '',
  photo: '',
  rapids: [],
};

function RiverForm({ riverObj }) {
  const [riverFormInput, setRiverFormInput] = useState(initialState);
  const [locations, setLocations] = useState([]);
  const router = useRouter();

  const rapidOptions = () => new Promise((resolve, reject) => {
    getRapids().then((rapidsArray) => {
      const options = rapidsArray.map((rapid) => (
        {
          value: rapid.id,
          label: rapid.level,
        }
      ));
      resolve(options);
    })
      .catch(reject);
  });

  const handleRapidSelect = (selected) => {
    setRiverFormInput((prevState) => ({
      ...prevState,
      rapids: selected,
    }));
  };

  useEffect(() => {
    getLocations().then(setLocations);
    if (riverObj.id) {
      getRiverRapids(riverObj.id).then((rapidsArray) => {
        const rapidsSelect = rapidsArray.map((rapid) => ({
          value: rapid.rapid.id,
          label: rapid.rapid.level,
        }));
        setRiverFormInput({ ...riverObj, locationId: riverObj.location.id, rapids: rapidsSelect });
      });
    }
  }, [riverObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRiverFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: riverFormInput.name,
      blurb: riverFormInput.blurb,
      photo: riverFormInput.photo,
      rapids: riverFormInput.rapids.map((rapid) => rapid.value),
      location: Number(riverFormInput.locationId),
    };
    if (riverObj.id) {
      updateRiver(payload, riverObj.id)
        .then(() => router.push('/river'));
    } else {
      createRiver(payload).then(() => {
        router.push('/river');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <title>Rivers and Roads</title>
      <h2 className="text-black mt-5">{riverObj.id ? 'Update' : 'Create'} River</h2>
      <FloatingLabel controlId="floatingInput1" label="River Name" className="mb-3">
        <Form.Control type="text" placeholder="River's Name" name="name" value={riverFormInput.name} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="River Info" className="mb-3">
        <Form.Control type="text" placeholder="River Info" name="blurb" value={riverFormInput.blurb} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="River Photo" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image url" name="photo" value={riverFormInput.photo} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Location">
        <Form.Select
          aria-label="Location"
          name="locationId"
          onChange={handleChange}
          className="mb-3"
          value={riverFormInput.locationId}
          required
        >
          <option value="">Select a Location</option>
          {
            locations.map((location) => (
              <option
                key={location.id}
                value={location.id}
              >
                {location.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>
      <div>
        <Form.Label>Rapids</Form.Label>
        <AsyncSelect
          classNamePrefix="select"
          backspaceRemovesValue
          isClearable
          isMulti
          onChange={handleRapidSelect}
          value={riverFormInput.rapids}
          loadOptions={rapidOptions}
          defaultOptions
        />
      </div>

      <Button type="submit">{riverObj.id ? 'Update' : 'Create'} a River</Button>
    </Form>
  );
}

// PROP TYPES
RiverForm.propTypes = {
  riverObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    blurb: PropTypes.string,
    photo: PropTypes.string,
    location: PropTypes.shape({
      id: PropTypes.number,
    }),
    rapid: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

// DEFAULT PROPS
RiverForm.defaultProps = {
  riverObj: initialState,
};

export default RiverForm;
