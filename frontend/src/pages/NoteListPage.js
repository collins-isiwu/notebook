import React, { useState, useEffect } from 'react'
import ListItem from '../component/ListItem'
import AddButton from '../component/AddButton'

const NoteListPage = () => {
  
  let [ notes, setNotes ] = useState([])

  useEffect(() => {
      getNotes()
  }, [])

  let getNotes = async () => {

    let response = await fetch(`/api/notes/`)
    let data = await response.json()
    setNotes(data)
  }

  return (
    <div className='notes'>
        <div className='notes-header'>
          <h2 className='notes-title'>&#9782; Notes</h2>
          <p className='notes-count'>{notes.length}</p>
        </div>
        <div className='notes'>
            {notes.map((note, index) => (
              <ListItem key={index} note={note} />
            ))}
        </div>
        <AddButton/>
    </div>
  )
}

export default NoteListPage