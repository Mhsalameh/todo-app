import { LoginContext } from '../../context/login';
import { useContext, useState } from 'react';
import { When } from 'react-if';
import { Button } from '@blueprintjs/core';

export default function Login(props) {
  const protect = useContext(LoginContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    protect.login(username, password);
  }

  function showLogin(e) {
    e.preventDefault();
    setLogin(!login);
    setSignup(false);
  }
  function showSignup(e) {
    e.preventDefault();
    setSignup(!signup);
    setLogin(false);
  }

  function handleSignup(e) {
    e.preventDefault();
    protect.signup(username, password, role);
    setSignup(false);
    setLogin(true);
  }

  return (
    <>
      <When condition={!protect.isLoggedin}>
        <div id='login'>
          <When condition={login}>
            <form action='' onSubmit={handleSubmit}>
              <input
                style={{ marginRight: 5 }}
                type='text'
                placeholder='username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
              <input
                placeholder='password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginRight: 5 }}
                required
              />
              <Button type='submit' style={{ height: '50%' }} >
                Log in
              </Button>
            </form>
          </When>
          <When condition={signup}>
            <form id='signup' onSubmit={handleSignup}>
              <div id='signup-inputs'>
                <input
                  type='text'
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ marginRight: 5 }}
                  placeholder='username'
                  required
                />
                <input
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginRight: 5 }}
                  placeholder='password'
                  required
                />
                <select
                  name='roles'
                  onChange={(e) => setRole(e.target.value)}
                  style={{ marginRight: 5 }}
                  required
                >
                  <option value='' disabled selected>
                    select your role
                  </option>
                  <option value='user'>user</option>
                  <option value='admin'>admin</option>
                  <option value='writer'>writer</option>
                  <option value='editor'>editor</option>
                </select>
              </div>
              <Button type='submit' style={{ height: '50%' }}>
                Sign up!
              </Button>
            </form>
          </When>
          <Button
            minimal='true'
            intent='primary'
            outlined='true'
            style={{ color: 'blue', marginRight: 5 }}
            onClick={showLogin}
          >
            {login ? 'hide' : 'login'}
          </Button>
          <Button
            minimal='true'
            intent='primary'
            outlined='true'
            style={{ color: 'blue' }}
            onClick={showSignup}
          >
            {signup ? 'hide' : 'create new account'}
          </Button>
        </div>
        <div></div>
      </When>
    </>
  );
}
