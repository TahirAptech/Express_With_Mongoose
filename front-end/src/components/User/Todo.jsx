import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoList } from '../../store/actions/userAction';
import TodoAddEditForm from './TodoAddEditForm'
import TodoList from './TodoList'

const Todo = () => {
    let [todo, setTodo] = useState({});
    const { UserLogin } = useSelector(store => store.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addTodoList(UserLogin._id));
    }, [])

    return (
        <div>
            <TodoAddEditForm mytodo={todo} setTodoId={setTodo} />
            <TodoList userId={UserLogin._id} setTodoId={setTodo} />
        </div>
    )
}

export default Todo
