import React,{useState} from 'react';

export const ItemsNumContext = React.createContext();


export default function ItemsNumSettings(props){

const [num,setNum] = useState(3);

const state = {num, setNum};

return (
    <ItemsNumContext.Provider value={state}>
        {props.children}
    </ItemsNumContext.Provider>
)
}
