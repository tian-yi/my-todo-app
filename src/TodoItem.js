import React from 'react';

const TodoItem = ({id, labelName}) => {
  return (
  <div className="todo-item">
    <input type="checkbox" id={id}/>
    <label htmlFor={id}>
      {labelName}
    </label>
  </div>
  )
}

export default TodoItem;