import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import './css/Login.css';

function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    var user = username;
    var pass = password;

    const handleSubmit = (e) => {
        if(user==='admin' && pass==='admin') {
            toast.info('Welcome Admin');
            navigate("/Appartement");
        } else {
            toast.error('Username or Password incorrect');
        }
    }

  return (
    <div className='page'>
        <div className='formLogin'>
            <form action="" onSubmit={handleSubmit}>
                <div className='element'>
                    <h3>LOGIN</h3>
                </div>
                <div className='element'>
                    <label for="username">Username</label>
                    <input type="text" name="username" onChange={(e) => {setUsername(e.target.value);}} required />
                </div>
                <div className='element'>
                    <label for="password">Password</label>
                    <input type="password" name="password" onChange={(e) => {setPassword(e.target.value);}} required />
                </div>
                <input type="submit" className='loginbtn' value="LOGIN" name="login" />
            </form>
        </div>
    </div>
  )
}

export default Login;