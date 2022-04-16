import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addNewUser, updateUser } from "../../store/actions/userAction";

const SignUp = ({ userObj, setUserId }) => {
  let [fname, setfname] = useState('');
  let [lname, setlname] = useState('');
  let [email, setemail] = useState('');
  let [password, setpassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(async () => {
    if (userObj._id) {
      debugger
      //const data = await axios.get('http://localhost:9000/api/userById?id=' + id);
      const userdata = userObj;//data.data;
      setfname(userdata.fname);
      setlname(userdata.lname);
      setemail(userdata.email);
      setpassword(userdata.password);
    }
  }, [userObj._id]);

  const SubmitForm = (e) => {
    e.preventDefault();
    let user = { fname, lname, email, password };

    if (userObj._id) {
      user._id = userObj._id;
      dispatch(updateUser(user));
    }
    else {
      dispatch(addNewUser(user, navigate));
    }
    setUserId({}); //Parent useState function for remove current updated id.
    setfname('');
    setlname('');
    setemail('');
    setpassword('');
  }

  return (
    <div className='w-50 m-2'>
      <form onSubmit={SubmitForm}>
        <h2>Signup Form</h2>
        <div className='form-group'>
          <input required type="text" value={fname} placeholder='First name' className='form-control' onChange={e => setfname(e.target.value)} />
        </div>
        <div className='form-group'>
          <input required type="text" value={lname} placeholder='Last name' className='form-control' onChange={e => setlname(e.target.value)} />
        </div>
        <div className='form-group'>
          <input required type="text" value={email} placeholder='Email' className='form-control' onChange={e => setemail(e.target.value)} />
        </div>
        <div className='form-group'>
          <input required type="text" value={password} placeholder='Password' className='form-control' onChange={e => setpassword(e.target.value)} />
        </div>

        <button className='btn btn-info'>Submit</button>
        <button className='btn btn-info ml-2' onClick={e => navigate("/", { replace: false })}>Login</button>
        {/* <Link className="nav-item nav-link" to="/Login">Login</Link> */}
      </form>
    </div>
  )
}

export default SignUp
