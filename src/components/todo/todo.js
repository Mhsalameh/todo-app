import React, { useEffect, useState } from 'react';
import List from '../list/list';
import Form from '../form/form';
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
    sort.setSortBy(sort.sortBy);
    switch (sort.sortBy) {
      case 'name':
        setList(list.sort((a, b) => a.assignee.localeCompare(b.assignee)));
        break;
      case 'complete':
        setList(list.sort((a, b) => (b.complete ? 1 : -1)));
        break;

      default:
        setList(list.sort((a, b) => (b.complete ? 1 : -1)));
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
  }, [
    list,
    pageCount,
    itemOffset,
    sort.sortBy,
    display.display,
    incomplete,
    itemsPerPage.num,
  ]);

  return (
    <>
      <div id="form-component">
          <Form sortList={sortList} addItem={addItem} />
        <div id='todo-pagination'>
          {list[0]? <div id='todo-card'>
            {display.display
              ? currentList.map((item) => (
                  <List
                    item={item}
                    toggleComplete={toggleComplete}
                    deleteItem={deleteItem}
                  />
                ))
              : currentList
                  .filter((item) => !item.complete)
                  .map((item) => (
                    <List
                      item={item}
                      toggleComplete={toggleComplete}
                      deleteItem={deleteItem}
                    />
                  ))}
          </div>:''}
        </div>
      </div>
      <div id='paginate'>
          <ReactPaginate
            breakLabel='...'
            nextLabel='next >'
            onPageChange={handlePageClick}
            pageRangeDisplayed={pageCount}
            pageCount={pageCount}
            previousLabel='< previous'
            renderOnZeroPageCount={null}
          />
          </div>
    </>
  );
};

export default ToDo;
