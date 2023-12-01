import React, { useEffect } from 'react';
import { fetchAllTodos } from '../Services/TodoApi';
import Todo from '../Components/Todo/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTodosOperation } from '../Redux/Operations';
import { addNewTodo } from '../Redux/TodosSlice';

const TodoListPage = () => {
  const todos = useSelector(state => state.todo.todos);
  const dispatch = useDispatch();
  const todo = {
    completed: false,
    id: 1123,
    title: 'Struzhak is Molodex',
    userId: 4,
  };

  useEffect(() => {
    const getAllTodos = async () => {
      const allTodos = await fetchAllTodos();
      dispatch(getAllTodosOperation(allTodos));
    };
    getAllTodos();
  }, [dispatch]);

  return (
    <>
      <p>Всього задач: {todos?.length || 0}</p>
      <ul>
        {todos?.map(el => (
          <Todo key={el.title} todo={el} />
        ))}
      </ul>
      <button type="button" onClick={() => dispatch(addNewTodo(todo))}>
        Add todo
      </button>
    </>
  );
};

export default TodoListPage;
