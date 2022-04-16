import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import SignUp from './components/User/SignUp';
import UserList from './components/User/UserList'
import { getUsers } from './store/actions/userAction';

const App = () => {
  const dispatch = useDispatch();
  let [uid, setuid] = useState({});

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div>
      <SignUp userObj={uid} setUserId={setuid} />
      <UserList setUserId={setuid} />
    </div>
  )
}
export default App
