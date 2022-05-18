import {
  Card,
  Button,
  FormGroup,
  InputGroup,
  Switch,
  Elevation,
  ButtonGroup,
  AnchorButton,
} from '@blueprintjs/core';
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
                <ButtonGroup>
                <Button outlined='true' minimal='true' onClick={(e) => settings.setSortBy(e.target.innerText)}>
                  name
                </Button>
                <Button outlined='true' minimal='true' onClick={(e) => settings.setSortBy(e.target.innerText)}>
                  complete
                </Button>
                </ButtonGroup>
                <AnchorButton intent='primary' onClick={props.sortList}>sort</AnchorButton>
              </div>
            </div>
          </Card>
        </form>
      </FormGroup>
      <div></div>
    </>
  );
}
