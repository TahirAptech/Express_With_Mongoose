import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { addNewUser, updateUser } from "../../store/actions/userAction";
import axios from 'axios';

const UserAddEditForm = ({ id }) => {
  let [fname, setfname] = useState('');
  let [lname, setlname] = useState('');
  let [email, setemail] = useState('');
  let [cource, setcourse] = useState('');
  let [salary, setsalary] = useState('');
  const dispatch = useDispatch();

  useEffect(async () => {
    if (id) {
      const data = await axios.get('http://localhost:9000/api/userById?id=' + id);
      const userdata = data.data;
      console.log("By Id:", userdata);
      setfname(userdata.fname);
      setlname(userdata.lname);
      setemail(userdata.email);
      setcourse(userdata.cource);
      setsalary(userdata.salary);
    }
  }, [id]);

  const SubmitForm = (e) => {
    e.preventDefault();
    const user = { fname, lname, email, cource, salary };
    if (id) {
      dispatch(updateUser(id, user));
      alert('Record updated!')

    }
    else {
      dispatch(addNewUser(user));
      alert('Record inserted.')
    }
  }

  return (
    <div className='w-50 m-2'>
      <form onSubmit={SubmitForm}>
        <h2>Form</h2>
        <div className='form-group'>
          <input type="text" value={fname} placeholder='First name' className='form-control' onChange={e => setfname(e.target.value)} />
        </div>
        <div className='form-group'>
          <input type="text" value={lname} placeholder='Last name' className='form-control' onChange={e => setlname(e.target.value)} />
        </div>
        <div className='form-group'>
          <input type="text" value={email} placeholder='Email' className='form-control' onChange={e => setemail(e.target.value)} />
        </div>
        <div className='form-group'>
          <input type="text" value={cource} placeholder='Course' className='form-control' onChange={e => setcourse(e.target.value)} />
        </div>
        <div className='form-group'>
          <input type="text" value={salary} placeholder='Salary' className='form-control' onChange={e => setsalary(e.target.value)} />
        </div>

        <button className='btn btn-info'>Submit</button>
      </form>
    </div>
  )
}

export default UserAddEditForm
