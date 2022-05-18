import {
  Card,
  Button,
  FormGroup,
  InputGroup,
  Switch,
  Elevation,
  ButtonGroup} from '@blueprintjs/core';
import { useContext } from 'react';
// import { DisplayContext } from '../../context/display.js';
// import { SortContext } from '../../context/sort';
import {SettingsContext} from '../../context/settings'
import useForm from '../../hooks/form.js';

export default function Form(props) {
  
  const settings= useContext(SettingsContext);
  // const display = useContext(DisplayContext);
  // const sort = useContext(SortContext);
  function toggleDisplay() {
    settings.setDisplay(settings.display ? false : true);
  }
  const { handleChange, handleSubmit } = useForm(props.addItem);
  function handlePagesNum(e){
    settings.setNum(parseInt(e.target.value));
  }

function saveToLocalStorage(){
  localStorage.setItem('settings',JSON.stringify(settings))
}

  return (
    <>
      <FormGroup id='form'>
        <form onSubmit={handleSubmit}>
          <Card
            id='form-card'
            elevation={Elevation.TWO}
          >
            <h2>Add To Do Item</h2>
            <label>
              <span>To Do Item</span>
              <InputGroup
                onChange={handleChange}
                name='text'
                type='text'
                placeholder='Item Details'
              />
            </label>

            <label>
              <span>Assigned To</span>
              <InputGroup
                onChange={handleChange}
                name='assignee'
                type='text'
                placeholder='Assignee Name'
              />
            </label>
            <div className='settings'>
              <div>
                <label>
                  <span>Difficulty</span>
                  <input
                    onChange={handleChange}
                    defaultValue={3}
                    type='range'
                    min={1}
                    max={5}
                    name='difficulty'
                  />
                </label>
                <label>
                  <Button fill='true' type='submit'>add item</Button>
                </label>
              </div>
              <div className='displaySettings'>
                <label>
                  <Switch
                    checked={settings.display}
                    label='show complete'
                    onChange={toggleDisplay}
                  />
                </label>
                <label>
                  <span>sort by:</span>
                <ButtonGroup>
                <Button outlined='true' minimal='true' onClick={props.sortList}>
                  name
                </Button>
                <Button outlined='true' minimal='true' onClick={props.sortList}>
                  complete
                </Button>
                </ButtonGroup>
                </label>
                <label>
                  <span>items per page</span>
                  <InputGroup
                onChange={handlePagesNum}
                name='assignee'
                type='number'
                placeholder={settings.num}
              />
                </label>
                <Button onClick={saveToLocalStorage}>Save Settings</Button>
              </div>
            </div>
          </Card>
        </form>
      </FormGroup>
      <div></div>
    </>
  );
}
