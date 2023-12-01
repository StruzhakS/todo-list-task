import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodoById, updateTodoById } from '../../Redux/TodosSlice';

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  //   console.log(todo.id);
  const updatedTodo = {
    title: 'newTodo by update Struzhaksom',
    id: todo.id,
    completed: todo.completed,
  };

  return (
    <li>
      <p>{todo.title}</p>
      {/* <input type="checkbox" checked={todo.completed} /> */}
      <button type="button" onClick={() => dispatch(updateTodoById(updatedTodo))}>
        Редагувати
      </button>
      <button type="button" onClick={() => dispatch(deleteTodoById(todo.id))}>
        Видалити
      </button>
    </li>
  );
};

export default Todo;
