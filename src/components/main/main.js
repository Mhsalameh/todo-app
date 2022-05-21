import ToDo from '../todo/todo';
import Header from '../header/header';
// import DisplaySettings from '../../context/display';
// import ItemsNumSettings from '../../context/itemsNum';
// import SortSettings from '../../context/sort';
// import ItemsCompletedSettings from '../../context/itemsCompleted';
import Settings from '../../context/settings.js';
import Login from '../../context/login';
export default function Main(props) {
  return (
    <>
      <Settings>
        <Login>
          <div id='main'>
            <Header />
            <ToDo />
          </div>
        </Login>
      </Settings>
    </>
  );
}
