import { useReducer, useState } from 'react'

const initialTodos = [
  { id: 1, text: 'Learn React Router basics', completed: false },
  { id: 2, text: 'Build theme toggle with context', completed: true },
]

function todoReducer(state, action) {
  switch (action.type) {
    case 'add': {
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ]
    }
    case 'toggle': {
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      )
    }
    case 'delete': {
      return state.filter((todo) => todo.id !== action.payload)
    }
    default:
      return state
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos)
  const [input, setInput] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedText = input.trim()

    if (!trimmedText) {
      return
    }

    dispatch({ type: 'add', payload: trimmedText })
    setInput('')
  }

  return (
    <section className="todo-card" aria-label="Todo app">
      <h2>Todo App</h2>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Add a task..."
          aria-label="Add todo"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: 'toggle', payload: todo.id })}
              />
              <span className={todo.completed ? 'todo-text completed' : 'todo-text'}>
                {todo.text}
              </span>
            </label>
            <button
              type="button"
              onClick={() => dispatch({ type: 'delete', payload: todo.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TodoApp
