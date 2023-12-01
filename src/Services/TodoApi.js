import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';

export const fetchAllTodos = async () => {
  const { data } = await axios('/todos');
  return data;
};

export const updateTodo = async todo => {
  const { data } = await axios.patch(`todos/${todo.id}`, todo);
  //   console.log(data);
  return data;
};

export const addNewTodo = async todo => {
  const { config } = await axios.post('/todos', todo);
  return config.data;
};

// export const deleteTodo = async id => {
//   const data = await axios.delete(`/todos/${id}`);
//   console.log(data);
// };
