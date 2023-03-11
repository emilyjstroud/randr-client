import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleRiver } from '../../../api/riverData';
import RiverForm from '../../../components/forms/RiverForm';

export default function EditRiver() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleRiver(id).then(setEditItem);
  }, [id]);

  return (
    <RiverForm riverObj={editItem} />
  );
}
