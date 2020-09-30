import React from 'react';

const TodoItem = ({id, labelName}) => {
  return  React.createElement(
    'div', 
    {className: "todo-item"}, 
    [
      React.createElement("input", {type: "checkbox", id: id}),
      React.createElement("label", {htmlFor: id}, labelName)
    ]
  )
}

export default TodoItem;