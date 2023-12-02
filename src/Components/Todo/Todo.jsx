import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodoById, updateTodoById } from '../../Redux/TodosSlice';
import UpdateTodoModal from '../Modal/UpdateTodoModal';
import { LiaEdit } from 'react-icons/lia';
import { RiDeleteBin2Line } from 'react-icons/ri';
import s from './Todo.module.css';

const Todo = ({ todo }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [completedTodo, setCompletedTodo] = useState(todo.completed);
  const openUpdateModal = id => {
    setShowUpdateModal(true);
  };
  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const dispatch = useDispatch();

  const completedHandler = () => {
    setCompletedTodo(!completedTodo);
    dispatch(
      updateTodoById({
        title: todo.title,
        id: todo.id,
        completed: !completedTodo,
      })
    );
  };

  return (
    <>
      <li
        className={s.todoItem}
        style={{
          backgroundColor: todo.completed
            ? 'rgba(21, 255, 0, 0.47)'
            : 'rgba(255, 187, 0, 0.711)(255, 98, 0)',
          textDecoration: todo.completed && 'line-through ',
        }}
      >
        <p>{todo.title}</p>
        <div className={s.controllItem}>
          <button
            type="button"
            className={s.deleteBtn}
            onClick={() => dispatch(deleteTodoById(todo.id))}
          >
            <RiDeleteBin2Line />
          </button>

          <input
            type="checkbox"
            className={s.highload1}
            checked={completedTodo}
            onChange={completedHandler}
            id={todo.id}
          />
          <label htmlFor={todo.id} className={s.lb1}></label>

          <button type="button" className={s.editBtn} onClick={() => openUpdateModal(todo.id)}>
            <LiaEdit />
          </button>
        </div>
      </li>
      {showUpdateModal && (
        <UpdateTodoModal show={showUpdateModal} close={closeUpdateModal} todo={todo} />
      )}
    </>
  );
};

export default Todo;
