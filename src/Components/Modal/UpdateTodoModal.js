import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { updateTodoById } from '../../Redux/TodosSlice';
import { modalStyles } from '../../Constans/modalStyle';

ReactModal.setAppElement('#main');

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

  console.log(todo);

  return (
    <div>
      <ReactModal
        isOpen={show}
        contentLabel="Inline Styles Modal Example"
        onRequestClose={close}
        style={modalStyles}
      >
        <p>Update todo title</p>
        <input
          type="text"
          value={updatedTodoTitle}
          onChange={e => setUpdatedTodoTitle(e.target.value)}
        />
        <button type="button" onClick={() => updateTodo()}>
          Update
        </button>
      </ReactModal>
    </div>
  );
};

export default UpdateTodoModal;
