import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';

import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from '@blueprintjs/core';

import { useContext } from 'react';

import { ItemsCompletedContext } from '../../context/itemsCompleted';
import { DisplayContext } from '../../context/display.js';

import { ItemsNumContext } from '../../context/itemsNum';

import ReactPaginate from 'react-paginate';

import { SortContext } from '../../context/sort.js';

import { v4 as uuid } from 'uuid';

const ToDo = () => {
  const incomplete = useContext(ItemsCompletedContext);
  const display = useContext(DisplayContext);
  const itemsPerPage = useContext(ItemsNumContext);
  const sort = useContext(SortContext);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [list, setList] = useState([]);
  const [currentList, setCurrentList] = useState(list);
  //   const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleDisplay() {
    display.setDisplay(display.display ? false : true);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage.num) % list.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  function sortList() {
    switch (sort.sortBy) {
      case 'name':
        setList(list.sort((a, b) => a.assignee.localeCompare(b.assignee)));
        break;
      case 'complete':
        setList(list.sort((a, b) => (b.complete ? 1 : -1)));
        break;

      default:
        break;
    }

    console.log(list);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    incomplete.setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete.incomplete}`;
    const endOffset = itemOffset + itemsPerPage.num;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentList(
      display.display
        ? list.slice(itemOffset, endOffset)
        : list.filter((item) => !item.complete).slice(itemOffset, endOffset)
    );
    setPageCount(
      itemsPerPage.num > 0
        ? Math.ceil(
            display.display
              ? list.length / itemsPerPage.num
              : incomplete.incomplete / itemsPerPage.num
          )
        : 0
    );
    console.log(sort.sortBy);
  }, [list, pageCount, itemOffset, sort.sortBy, display.display,incomplete,itemsPerPage.num]);

  return (
    <>
      <FormGroup>
        <form onSubmit={handleSubmit}>
          <h2>Add To Do Item</h2>
          <Card
            className='formCard'
            interactive={true}
            elevation={Elevation.TWO}
          >
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
                  <Button type='submit'>add item</Button>
                </label>
              </div>
              <div className='displaySettings'>
                <label>
                  <span onClick={toggleDisplay}>
                    Display Completed Items : {display.display ? 'on' : 'off'}
                  </span>
                </label>
                <span onClick={(e) => sort.setSortBy(e.target.innerText)}>
                  name
                </span>
                <span onClick={(e) => sort.setSortBy(e.target.innerText)}>
                  complete
                </span>
                <Button onClick={sortList}>sort</Button>
              </div>
            </div>
          </Card>
        </form>
      </FormGroup>
      <div></div>
      {display.display
        ? currentList.map((item) => (
            <Card key={item.id}>
              <p>{item.text}</p>
              <p>
                <small>Assigned to: {item.assignee}</small>
              </p>
              <p>
                <small>Difficulty: {item.difficulty}</small>
              </p>
              <div onClick={() => toggleComplete(item.id)}>
                Complete: {item.complete.toString()}
              </div>
              <Button onClick={() => deleteItem(item.id)}>X</Button>
            </Card>
          ))
        : currentList
            .filter((item) => !item.complete)
            .map((item) => (
              <Card key={item.id}>
                <p>{item.text}</p>
                <p>
                  <small>Assigned to: {item.assignee}</small>
                </p>
                <p>
                  <small>Difficulty: {item.difficulty}</small>
                </p>
                <div onClick={() => toggleComplete(item.id)}>
                  Complete: {item.complete.toString()}
                </div>
                <hr />
              </Card>
            ))}
      <ReactPaginate
        breakLabel='...'
        nextLabel='next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageCount}
        pageCount={pageCount}
        previousLabel='< previous'
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default ToDo;
