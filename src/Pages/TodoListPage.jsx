import React, { useEffect, useState } from 'react';
import { fetchAllTodos } from '../Services/TodoApi';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTodosOperation } from '../Redux/Operations';
import Modal from '../Components/Modal/AddTodoModal';
import ReactPaginate from '../Components/Paginate/ReactPaginate';
import s from './TodoListPage.module.css';

const TodoListPage = () => {
  const todos = useSelector(state => state.todo.todos);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const completedTodo = todos?.filter(el => el.completed === true);

  useEffect(() => {
    const getAllTodos = async () => {
      const allTodos = await fetchAllTodos();
      dispatch(getAllTodosOperation(allTodos));
    };
    getAllTodos();
  }, [dispatch]);

  return (
    <div className={s.container}>
      <p>Всього виконаних задач: {`${completedTodo.length} / ${todos?.length}` || 0}</p>

      <button type="button" onClick={() => openModal()}>
        Add todo
      </button>

      <ReactPaginate items={todos} />
      <Modal showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

export default TodoListPage;
