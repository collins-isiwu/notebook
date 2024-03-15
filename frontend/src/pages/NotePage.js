import React, {useState, useEffect} from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow.svg'
import { Link } from 'react-router-dom'

const NotePage = ({ match, history }) => {

  let noteId = match.params.id
  let [ note, setNote ] = useState(null)

  useEffect(() => {
    getNotes()
}, [noteId])


  let getNotes = async () => {
    if (noteId === 'new') return 

    let response = await fetch(`/api/note/${noteId}/`)
    let data = await response.json()
    setNote(data)
  }

  let createNote = async () => {
    fetch(`/api/note/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    history.push('/')
  }

  let updateNote = async () => {
    fetch(`/api/note/${noteId}/`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  }

  let deleteNote = async () => {
    fetch(`/api/note/${noteId}/`, {
      'method' : "DELETE",
      'headers': {
        'Content-Type': 'application/json'
      },
    })
    history.push('/')
  }

  let handleSubmit = () => {
    if (noteId !== 'new' && note.body === '') {
      deleteNote()
    } else if (noteId !== 'new') {
      updateNote()
    } else if (noteId === 'new' && note.body !== null) {
      createNote()
    }
    history.push('/')
  }
  
  let handleChange = (value) => {
    setNote( note => ({...note, 'body': value}) )
    console.log('Handle Change:', note)
  }

  return (
    <div className='note'>
        <div className='note-header'>
          <h3>
            <ArrowLeft onClick={handleSubmit} />
          </h3>
          {noteId !== 'new' ? (
            <button onClick={deleteNote}>Delete</button>
          ): (
            <button onClick={handleSubmit}>Done</button>
          )}
        </div>
        <textarea onChange={(e) => {handleChange(e.target.value)}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage