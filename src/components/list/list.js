import {Card,Button} from '@blueprintjs/core';
 
export default function List(props) {
  return (
    <>
      <Card id='item-card' key={props.item.id}>
        <Button fill='true' intent='warning'onClick={() => props.deleteItem(props.item.id)}>Remove</Button>
        <p>{props.item.text}</p>
        <p>
          <small>Assigned to: {props.item.assignee}</small>
        </p>
        <p>
          <small>Difficulty: {props.item.difficulty}</small>
        </p>
        <div onClick={() => props.toggleComplete(props.item.id)}>
          Complete: {props.item.complete.toString()}
        </div>
      </Card>
    </>
  );
}
