import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo } from '../../store/actions/userAction';

const TodoList = ({ userId, setTodoId }) => {
    const { UserTODO } = useSelector(store => store.userReducer);
    const dispatch = useDispatch();
    function deleteTodoById(id){
        if(window.confirm("Are you sure?"))
        dispatch(deleteTodo(id));
    }
    return (
        <div className='p-2'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Todo</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        UserTODO.map((obj, index) => {
                            return (
                                <tr key={index}>
                                    <td>{obj.todo}</td>
                                    <td>{obj.IsPrivate ? "Private" : "Public"}</td>
                                    {
                                        (userId == obj.UserId) ? (
                                            <td>
                                                <button className="btn btn-info mr-2" onClick={_ => { setTodoId(obj) }}>Edit</button>
                                                <button className="btn btn-danger" onClick={_ => { deleteTodoById(obj._id) }}>Delete</button>
                                            </td>
                                        ) : (
                                            <td>
                                                <b>--------------------</b>
                                            </td>
                                        )
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TodoList
