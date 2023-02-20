import React from 'react'
import "../createarea.css"
import noteContext from '../context/Notes/NoteContext'

const CreateArea = () => {
    const [text, settext] = React.useState(false)

    const context = React.useContext(noteContext)
    const { getNotes } = context

    async function handleClick(event) {
        event.preventDefault()
        settext(false)
        await fetch('https://pink-adorable-codfish.cyclic.app/api/notes/addnote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                'title': event.target.title.value,
                'description': event.target.description.value
            })
        })
        document.getElementById('title').value = ""
        document.getElementById('content').value = ""
        getNotes()
    }

    return (
        <div className="mb-10">
            <form onSubmit={handleClick} className="create-note">
                <input id="title" onClick={() => {
                    settext(true)
                }} name="title" placeholder="Title" required minLength={5} />
                {text ? <textarea id="content" name="description" placeholder="Note" rows={text ? 3 : 1} required minLength={5} /> : null}
                <button type='submit'><i className="fa-solid fa-plus"></i></button>
            </form>
        </div>
    )
}

export default CreateArea