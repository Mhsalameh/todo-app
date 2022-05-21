import { useContext } from 'react';
import { SettingsContext } from '../../context/settings';
import { LoginContext } from '../../context/login';
import { When } from 'react-if';
import { Button } from '@blueprintjs/core';
import Login from '../login/login';
export default function Header() {
  const settings = useContext(SettingsContext);
  const protect = useContext(LoginContext);
  return (
    <>
      <div id='header'>
        <header id='site-header'>
          <h1>To Do List: {settings.incomplete} items pending</h1>
        </header>
        <Login />
        <When condition={protect.isLoggedin}>
          <div id='user-info'>
            <span>Username : {protect.userInfo.username}</span>
            <span>Role: {protect.userInfo.role}</span>
          </div>
          <Button intent='danger' onClick={(e) => protect.logout()}>
            Logout
          </Button>
        </When>
      </div>
    </>
  );
}
