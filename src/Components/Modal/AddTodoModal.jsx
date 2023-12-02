import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addNewTodo } from '../../Redux/TodosSlice';
import { modalStyles } from '../../Constans/modalStyle';

ReactModal.setAppElement('#main');

const Modal = ({ showModal, closeModal }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const dispatch = useDispatch();
  const addNewTodoFunction = () => {
    if (todoTitle.length > 3) {
      return dispatch(
        addNewTodo({
          completed: false,
          title: todoTitle,
          id: nanoid(),
        }),
        setTodoTitle(''),
        closeModal()
      );
    }
    window.alert('Todo title must have more then 3 characters');
  };

  return (
    <div>
      <ReactModal
        isOpen={showModal}
        contentLabel="Inline Styles Modal Example"
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <p>Add title</p>
        <input type="text" value={todoTitle} onChange={e => setTodoTitle(e.target.value)} />
        <button type="button" onClick={() => addNewTodoFunction()}>
          Add todo
        </button>
      </ReactModal>
    </div>
  );
};

export default Modal;
