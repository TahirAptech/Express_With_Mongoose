import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, updateTodo } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const TodoAddEditForm = ({ mytodo, setTodoId }) => {
  let [todo, setTodo] = useState('');
  let [IsPrivate, setIsPrivate] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { UserLogin, ShowLoader } = useSelector(store => store.userReducer);

  useEffect(async () => {
    if (mytodo._id) {
      // const data = await axios.get('http://localhost:9000/api/todoById?id=' + id);
      const userdata = mytodo;//data.data;
      document.getElementById('makepriv').checked = userdata.IsPrivate;
      setTodo(userdata.todo);
      setIsPrivate(userdata.IsPrivate);
    }
  }, [mytodo._id]);

  const SubmitForm = (e) => {
    e.preventDefault();
    const todoData = { UserId: UserLogin._id, todo, IsPrivate };
    if (mytodo._id) {
      todoData._id = mytodo._id;
      dispatch(updateTodo(todoData));
    }
    else {
      dispatch(addNewTodo(todoData));
    }
    setTodo('');
    setTodoId({});
    document.getElementById('makepriv').checked = false;
    setIsPrivate(false);
  }

  return (
    <div className='w-50 m-2'>
      <button style={{ float: "right" }} onClick={() => dispatch(function (dsp) {
        dsp({ type: "User_Logout" });
        navigate('/', { replace: true });
      })}
      >
        Logout
      </button>

      <form onSubmit={SubmitForm}>
        <h2>{`Welcome ${UserLogin.fname} ${UserLogin.lname}`}</h2>
        <h3>My Todo's</h3>
        <div className='form-group'>
          <input required type="text" value={todo} placeholder='Todo' className='form-control' onChange={e => setTodo(e.target.value)} />
        </div>
        <div className='form-group'>
          <input type="checkbox" id="makepriv" onChange={e => setIsPrivate(e.target.checked)} /> Make Private
        </div>
        {
          ShowLoader ? <Loader/> : <button className='btn btn-info'>Submit</button>
        }
        
      </form>
    </div>
  )
}

export default TodoAddEditForm
