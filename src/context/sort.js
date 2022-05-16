import React,{useState} from 'react';

export const SortContext = React.createContext();


export default function SortSettings(props){

const [sortBy,setSortBy] = useState('completed');

const state = {sortBy, setSortBy};

return (
    <SortContext.Provider value={state}>
        {props.children}
    </SortContext.Provider>
)
}
