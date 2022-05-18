import ToDo from '../todo/todo';
import Header from '../header/header';
// import DisplaySettings from '../../context/display';
// import ItemsNumSettings from '../../context/itemsNum';
// import SortSettings from '../../context/sort';
// import ItemsCompletedSettings from '../../context/itemsCompleted';
import Settings from '../../context/settings.js';

export default function Main(props) {
  return (
    <>
        <Settings>
          <div id='main'>
            <Header />
            <ToDo />
          </div>
        </Settings>
    </>
  );
}
