import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleRapid } from '../../../api/rapidData';
import RapidForm from '../../../components/forms/RapidForm';

export default function EditRapid() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleRapid(id).then(setEditItem);
  }, [id]);

  return (
    <RapidForm styleObj={editItem} />
  );
}
