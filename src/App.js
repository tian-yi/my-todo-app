
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
const App = () => {
  return React.createElement('div', {id: "my-todo-app", className: "my-todo-app"}, [
    React.createElement('h1', {}, "My todo app"),
    React.createElement(TodoItem, {id:"learn-react", labelName: "Learn React"}),
    React.createElement(TodoItem, {id:"create-todo-app", labelName: "Create a todo app"}),
    React.createElement(TodoItem, {id:"profit", labelName: "Profit"}),
  ])
}
ReactDOM.render(React.createElement(App), document.getElementById("root"))