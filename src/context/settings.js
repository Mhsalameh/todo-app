import React, { useState } from 'react';

export const SettingsContext = React.createContext();

export default function Settings(props) {
  const [display, setDisplay] = useState(true);
  const [num, setNum] = useState(4);
  const [sortBy, setSortBy] = useState('');
  const [incomplete, setIncomplete] = useState([]);

  const state = {
    display,
    setDisplay,
    num,
    setNum,
    sortBy,
    setSortBy,
    incomplete,
    setIncomplete,
  };

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}
