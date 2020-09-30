import React from 'react';
import ReactDOM from 'react-dom';

import TodoItem from './TodoItem'

const TodoItemsFromOutSide = [
  {id:"learn-react", labelName: "Learn React"},
  {id:"create-todo-app", labelName: "Create a todo app"},
  {id:"profit", labelName: "Profitx"},
  {id:"have-fun", labelName: "Have fun!"}
]

const App = () => (
<div id="my-todo-app" className="my-todo-app">
  <h1>My todo app</h1>
  {TodoItemsFromOutSide.map((item) => <TodoItem key={item.id} id={item.id} labelName={item.labelName} />) }
</div>
)

ReactDOM.render(<App />, document.getElementById("root"))