import React from "react";
import ReactDOM from "react-dom";

import "./style.css";

import Header from "./Header";
import ToggleAll from "./ToggleAll";
import TodoList from "./TodoList";
import Footer from "./Footer";

export const ALL = "all";
export const ACTIVE = "active";
export const COMPLETED = "completed";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
      nowShowingTodos: [],
      todoFilter: ALL,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.filterTodos = this.filterTodos.bind(this);
  }

  componentDidMount() {
    const newTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    let newTodoFromStorage = localStorage.getItem("new-todo");
    if (newTodoFromStorage) {
      newTodoFromStorage = JSON.parse(newTodoFromStorage);
    } else {
      newTodoFromStorage = "";
    }

    this.setState({
      todos: newTodos,
      nowShowingTodos: newTodos,
      newTodo: newTodoFromStorage,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const { todos, newTodo } = this.state;
    const newTodos = [
      ...todos,
      { id: newTodo.replace(" ", "-"), labelName: newTodo, completed: false },
    ];

    this.setState({ todos: newTodos, nowShowingTodos: newTodos, newTodo: "" });
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  toggleAll(checked) {
    const newTodos = this.state.todos.map((todo) => {
      return { ...todo, completed: checked };
    });

    this.setState({ todos: newTodos, nowShowingTodos: newTodos });
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  updateTodo(id) {
    const newTodos = this.state.todos.map((item) => {
      if (item.id == id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    this.setState({ todos: newTodos, nowShowingTodos: newTodos });
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  deleteTodo(id) {
    const newTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({ todos: newTodos, nowShowingTodos: newTodos });
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  clearCompleted() {
    const newTodos = this.state.todos.filter((todo) => todo.completed !== true);
    this.setState({ todos: newTodos, nowShowingTodos: newTodos });
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  filterTodos(todoFilter) {
    const { todos } = this.state;
    let showingTodos = [];
    if (todoFilter === ACTIVE) {
      showingTodos = todos.filter((todo) => todo.completed === false);
    } else if (todoFilter === COMPLETED) {
      showingTodos = todos.filter((todo) => todo.completed === true);
    } else {
      showingTodos = todos;
    }
    this.setState({ nowShowingTodos: showingTodos });
  }
  render() {
    const { newTodo, todos, nowShowingTodos, todoFilter } = this.state;

    return (
      <div className="todoapp">
        <Header
          handleSubmit={this.handleSubmit}
          newTodo={newTodo}
          handleChange={(newTodo) => {
            this.setState({ newTodo });
            localStorage.setItem("new-todo", JSON.stringify(newTodo));
          }}
        />
        <section className="main">
          <ToggleAll handleChange={this.toggleAll} todos={todos} />
          <TodoList
            todos={nowShowingTodos}
            handleChange={this.updateTodo}
            handleDelete={this.deleteTodo}
          />
        </section>
        <Footer
          todos={todos}
          activeFilter={todoFilter}
          handleClick={(filter) => {
            this.setState({ todoFilter: filter });
            this.filterTodos(filter);
          }}
          handleClear={this.clearCompleted}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
