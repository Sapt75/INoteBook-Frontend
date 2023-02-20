import React from 'react'
import noteContext from '../context/Notes/NoteContext'
import Note from './note'
import CreateArea from './createarea'
import Modal from './modal'
import Alert from './alert'
import { useNavigate } from 'react-router-dom'



export default function Home() {

  const context = React.useContext(noteContext)
  const navigate = useNavigate()
  const { click, log, note, getNotes } = context

  React.useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      getNotes()
    } else {
      navigate('/login')
    }
  }, [getNotes, navigate])


  return (
    <>
      {log.status ? <Alert msg={log.message} status={log.status} logged={log.logged} /> : null}
      
      <div className='m-4'>
        {click ? <Modal /> : null}
        <CreateArea />
        <div className='grid xl:grid-cols-6 lg:grid-cols-5 lg:gap-4 xl:gap-4 md:grid-cols-4 md:gap-3 sm:grid-cols-3 sm:gap-2 xs:grid-cols-2 xs:gap-2'>
          {note.length > 0 ? note.map((item, index) => {

            return (
              <Note length={item.description.length} key={index} id={item._id} item={item} />
            )


          }) : null}
        </div>
      </div>
    </>
  )
}

