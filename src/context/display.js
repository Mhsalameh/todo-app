import React,{useState} from 'react';

export const DisplayContext = React.createContext();


export default function DisplaySettings(props){

const [display,setDisplay] = useState(true);

const state = {display, setDisplay};

return (
    <DisplayContext.Provider value={state}>
        {props.children}
    </DisplayContext.Provider>
)
}
