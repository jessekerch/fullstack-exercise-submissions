/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import { useField } from './hooks'

import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"

const Home = ({ anecdotes }) => {
  return (
    <div>
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  )
}

const Menu = ({ anecdotes, addNew, setNotification, notification }) => {
  const padding = {
    paddingRight: 5
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
        <div>
          <Link style={padding} to="/">anecdotes</Link>
          <Link style={padding} to="/create">create new</Link>
          <Link style={padding} to="/about">about</Link>
        </div>

        <Routes>
          <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
          <Route path="/create" element={
            <CreateNew addNew={addNew} setNotification={setNotification} notification={notification} />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home anecdotes={anecdotes}/>} />
        </Routes>
    </div>
  )
}

const Anecdote = ({ anecdote }) => (
  <h2>{anecdote.content}</h2>
)

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => { 
          const path = `anecdotes/${anecdote.id}`
          return (
            <li key={anecdote.id}>
              <Link to={path}>
                {anecdote.content}
              </Link>
            </li>
            )
          })}
      </ul>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is &quot;a story with a point.&quot;</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const Notification = ({ notification }) => {
  const notificationStyle = {
    border: "2px green solid",
    padding: "5px",
    borderRadius: "3px",
    fontSize: "1.2em",
  }
  if (!notification) {
    return <></>
  } else {
    return (
      <p style={notificationStyle}>
        {notification}
      </p>
    )
  }
}

const CreateNew = ({ addNew, setNotification, notification }) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
    setNotification(`Added: ${content.value}`)
    setTimeout(() => setNotification(''), 2000)
  }

  const resetAll = (event) => {
    event.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  }

  function omitReset(obj) {
    const { reset, ...rest } = obj;
    return rest;
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...omitReset(content)} />
        </div>
        <div>
          author
          <input {...omitReset(author)} />
        </div>
        <div>
          url for more info
          <input {...omitReset(info)} />
        </div>
        <button>create</button>
        <button onClick={resetAll}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification notification={notification} />
      <Menu
        anecdotes={anecdotes}
        addNew={addNew}
        setNotification={setNotification}
        notification={notification}
      />
      <Footer />
    </div>
  )
}

export default App