import {Card,Button,Tag} from '@blueprintjs/core';
import Auth from '../auth/auth'
export default function List(props) {
  return (
    <>
      <Card id='item-card' key={props.item.id}>
        <Auth action='delete'>
        <Button fill='true' intent='warning'onClick={() => props.deleteItem(props.item.id)}>Remove</Button>
        </Auth>
        <div id='items-contents'>
        <p id='item-details'>{props.item.text}</p>
        <p>
          <small>Assigned to: {props.item.assignee}</small>
        </p>
        <p>
          <small>Difficulty: {props.item.difficulty?props.item.difficulty:3}</small>
        </p>
        <Tag style={{marginLeft:5}}round='true' intent={props.item.complete? 'success' : 'danger'} interactive='true' onClick={() => props.toggleComplete(props.item.id)}>
          Complete: {props.item.complete.toString()}
        </Tag>
        </div>
      </Card>
    </>
  );
}
