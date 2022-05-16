import React,{useState} from 'react';

export const ItemsCompletedContext = React.createContext();


export default function ItemsCompletedSettings(props){

    const [incomplete, setIncomplete] = useState([]);

const state = {incomplete, setIncomplete};

return (
    <ItemsCompletedContext.Provider value={state}>
        {props.children}
    </ItemsCompletedContext.Provider>
)
}
