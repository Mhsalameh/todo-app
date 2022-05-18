import { useContext } from 'react';
import { SettingsContext } from '../../context/settings';

export default function Header() {
  const settings = useContext(SettingsContext);
  return (
    <header id='site-header'>
      <h1>To Do List: {settings.incomplete} items pending</h1>
    </header>
  );
}
