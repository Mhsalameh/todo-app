import React, { useState , useEffect} from 'react';

export const SettingsContext = React.createContext();

export default function Settings(props) {
  const [display, setDisplay] = useState(true);
  const [num, setNum] = useState(4);
  const [sortBy, setSortBy] = useState('');
  const [incomplete, setIncomplete] = useState([]);
  // const [localStorage,setLocalStorage] = useState({});


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

useEffect(()=>{
  let data = localStorage.getItem('settings');
  let parsedData = JSON.parse(data);
  if(parsedData){
    setNum(parsedData.num)
    setDisplay(parsedData.display)
    setSortBy(parsedData.sortBy)
    setIncomplete(parsedData.incomplete)
  }
},[])
  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}
