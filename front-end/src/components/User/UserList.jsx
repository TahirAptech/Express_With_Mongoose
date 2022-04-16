import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../../store/actions/userAction';

const UserList = ({ setUserId }) => {
  const { UserList } = useSelector(store => store.userReducer);
  const dispatch = useDispatch();

  const deleteThisUser = (obj) => {
    if (window.confirm('Are you sure to delete this record?'))
      dispatch(deleteUser(obj._id))
  }

  return (
    <div className='p-2'>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            UserList.map((obj, index) => {
              return (
                <tr key={index}>
                  <td>{obj.fname}</td>
                  <td>{obj.lname}</td>
                  <td>{obj.email}</td>
                  <td>{obj.password}</td>
                  <td>
                    <button className="btn btn-info mr-2" onClick={_ => setUserId(obj)}>Edit</button>
                    <button className="btn btn-danger" onClick={_ => deleteThisUser(obj)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserList
