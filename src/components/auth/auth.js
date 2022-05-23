
import {LoginContext} from '../../context/login';
import {When} from 'react-if';
import {useContext} from 'react';

export default function Auth(props){

    const protect = useContext(LoginContext);

    return( 
        <When condition={protect.login && protect.authorize(props.action)}>
            {props.children}
        </When>

    )
}