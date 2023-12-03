import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { updateTodoById } from '../../Redux/TodosSlice';
import { modalStyles } from '../../Constans/modalStyle';
import s from './modal.module.css';

ReactModal.setAppElement('#main');

// Модальне вікно для редагування Todo

const UpdateTodoModal = ({ show, close, todo }) => {
  const [updatedTodoTitle, setUpdatedTodoTitle] = useState(todo.title);
  const dispatch = useDispatch();

  const updateTodo = e => {
    if (updatedTodoTitle.length > 3) {
      return (
        dispatch(
          updateTodoById({
            title: updatedTodoTitle,
            id: todo.id,
            completed: todo.completed,
          })
        ),
        setUpdatedTodoTitle(todo.title),
        close()
      );
    }
    window.alert('Todo title must have more then 3 characters');
  };

  return (
    <div>
      <ReactModal
        isOpen={show}
        contentLabel="Inline Styles Modal Example"
        onRequestClose={close}
        style={modalStyles}
      >
        <input
          className={s.input}
          type="text"
          value={updatedTodoTitle}
          placeholder="Update todo title"
          onChange={e => setUpdatedTodoTitle(e.target.value)}
        />
        <button type="button" className={s.modal_add_btn} onClick={() => updateTodo()}>
          Update
        </button>
      </ReactModal>
    </div>
  );
};

export default UpdateTodoModal;
