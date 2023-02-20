import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleLocation } from '../../../api/locationData';
import LocationForm from '../../../components/forms/LocationForm';

export default function EditLocation() {
  const [editLocationItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleLocation(id).then(setEditItem);
  }, [id]);

  return (
    <LocationForm locationObj={editLocationItem} />
  );
}
