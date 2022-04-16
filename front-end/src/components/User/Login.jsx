import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../store/actions/userAction";
import Loader from "../Loader";

const Login = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ShowLoader } = useSelector(store => store.userReducer);
    const loginUser = (e) => {
        e.preventDefault();
        dispatch(UserLogin({ email, password }, navigate));
    }

    return (
        <div className="pt-5 d-flex justify-content-center text-align-center">
            <form onSubmit={loginUser}>
                <h2>Login</h2>
                <div className="form-group">
                    <input required type="text" placeholder="Email" className="form-control" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <input required type="text" placeholder="Password" className="form-control" onChange={e => setPassword(e.target.value)} />
                </div>
                {
                    ShowLoader ? (
                        <div className="pl-3 d-flex">
                            <Loader />
                            <p className="ml-2"><strong>Please wait..</strong>
                               </p>
                        </div>
                    ) : (
                        <>
                            <button className="btn btn-info">Login</button>
                            <button className='btn btn-info ml-2' onClick={_ => navigate("/Signup", { replace: false })}>Signup</button>
                        </>
                    )
                }

            </form>
        </div >
    )
}
export default Login
