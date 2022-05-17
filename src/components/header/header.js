import { useContext } from 'react';
import { ItemsCompletedContext } from '../../context/itemsCompleted';

export default function Header() {
  const incomplete = useContext(ItemsCompletedContext);
  return (
    <header id='site-header'>
      <h1>To Do List: {incomplete.incomplete} items pending</h1>
    </header>
  );
}
