import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import UserAddEditForm from './components/User/UserAddEditForm'
import UserList from './components/User/UserList'
import { getUsers } from './store/actions/userAction';

const App = () => {
  const dispatch = useDispatch();
  let [uid, setuid] = useState('');

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div>
      <UserAddEditForm id={uid} />
      <UserList setUserId={setuid}/>
    </div>
  )
}
export default App
