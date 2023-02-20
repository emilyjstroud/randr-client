import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getRapids } from '../api/rapidData';
import RapidCard from '../components/RapidCard';

function Rapids() {
  const [rapids, setRapids] = useState([]);

  const router = useRouter();

  const { user } = useAuth();

  const getUserRapids = () => {
    getRapids(user.id).then((response) => {
      setRapids(response);
    });
  };

  useEffect(() => {
    getUserRapids();
  }, [user]);

  return (
    <>
      <Button
        className="btn btn-danger"
        onClick={() => {
          router.push('/rapid/new');
        }}
      >
        Add a Rapid
      </Button>
      <article className="styles">
        <h1 style={{ color: 'white' }}>Rapids</h1>
        {rapids.map((rapid) => (
          <section key={`rapid--${rapid.id}`} className="rapid">
            <RapidCard
              id={rapid.id}
              name={rapid.level}
              onUpdate={getUserRapids}
            />
          </section>
        ))}
      </article>
    </>
  );
}

export default Rapids;
