import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import Todo from '../Todo/Todo';
import { GrCaretNext } from 'react-icons/gr';
import { GrChapterNext } from 'react-icons/gr';
import { GrCaretPrevious } from 'react-icons/gr';
import { GrChapterPrevious } from 'react-icons/gr';
import Select from 'react-select';
import s from './ReactPaginate.module.css';

const options = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '40', label: '40' },
];

const optionOfCompletedTodo = [
  { value: 'all', label: 'Всі' },
  { value: 'completed', label: 'Виконані' },
  { value: 'Not completed', label: 'Не виконані' },
];
const customStyles = {
  control: base => ({
    ...base,
    height: 35,
    minHeight: 35,
  }),
};

const ReactPaginate = ({ items }) => {
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
  const [filter, setFilter] = useState('all');
  const handlePageChange = pageNumber => {
    setActivePage(pageNumber);
  };

  // eslint-disable-next-line array-callback-return
  const filteredTodo = items.filter(el => {
    if (filter === 'all') {
      return el;
    }
    if (filter === 'completed') {
      return el.completed === true;
    }
    if (filter === 'Not completed') {
      return el.completed === false;
    }
  });

  const visibleItems = filteredTodo.slice(
    (activePage - 1) * +itemsCountPerPage,
    +itemsCountPerPage * activePage
  );

  return (
    <>
      <div className={s.selectBox}>
        <p>Виберіть кількість видимих елементів на сторінці</p>
        <Select
          options={options}
          className="basic-single"
          classNamePrefix="select"
          onChange={e => setItemsCountPerPage(e.value)}
          defaultValue={options[0]}
          styles={customStyles}
        />
      </div>

      <div className={s.selectBox}>
        <p>Показати </p>
        <Select
          options={optionOfCompletedTodo}
          className="basic-single"
          classNamePrefix="select"
          onChange={e => setFilter(e.value)}
          defaultValue={optionOfCompletedTodo[0]}
          styles={customStyles}
        />
      </div>

      <ul className={s.todoList}>
        {visibleItems?.map((el, i) => (
          <Todo key={el.title + i} todo={el} />
        ))}
      </ul>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={+itemsCountPerPage}
        totalItemsCount={items.length}
        onChange={handlePageChange}
        innerClass="pagination-list"
        firstPageText={<GrChapterPrevious size={12} color="black" />}
        lastPageText={<GrChapterNext size={12} color="black" />}
        prevPageText={<GrCaretPrevious size={12} color="black" />}
        nextPageText={<GrCaretNext size={12} color="black" />}
        activeLinkClass="activePaginateLink"
      />
    </>
  );
};

export default ReactPaginate;
