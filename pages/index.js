/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <title>Rivers and Roads</title>
      <h1 style={{ color: 'white' }}>{user.displayName} </h1>
      <br />
      <img src="https://images.squarespace-cdn.com/content/v1/543e7367e4b0f38ea790072b/1441389387982-Z63QEJ1A9CTYL2D814PQ/third.jpg" alt="" />
      <br />
      <p style={{ color: 'white' }}>Welcome to Rivers and Roads! Get Started below.</p>
      <Link href="/river" passHref>
        <Button variant="danger" className="m-2">Float the Rivers</Button>
      </Link>
      <Link href="/location" passHref>
        <Button variant="danger" className="m-2">Tour the Locations</Button>
      </Link>
      <Button variant="danger" className="m-2" onClick={signOut}>Sign Out</Button>
    </div>
  );
}

export default Home;
