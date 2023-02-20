import React from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const [note, setNote] = React.useState([])
  const [click, setClick] = React.useState(false)
  const [id, setId] = React.useState()
  const [value, setValue] = React.useState({
    title: "",
    description: ""
  })
  const [log, setLog] = React.useState({
    status: false,
    message: null,
    logged: true
  })

  async function getNotes() {
    const response = await fetch('https://pink-adorable-codfish.cyclic.app/api/notes/fetchallnotes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const data = await response.json()
    setNote(data)
  }


  return (
    <NoteContext.Provider value={{ note, setNote, click, setClick, id, setId, value, setValue, log, setLog, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState