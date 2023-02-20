/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import noteContext from '../context/Notes/NoteContext'

export default function Modal() {
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null)

  const context = useContext(noteContext)
  const { setClick, id, value, setValue, getNotes } = context

  async function handleClick(event) {
    event.preventDefault()
    await fetch(`https://pink-adorable-codfish.cyclic.app/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        title: event.target.title.value,
        description: event.target.description.value
      })
    })
    getNotes()
    setOpen(false)
    setClick(false)
  }


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <form onSubmit={handleClick} className="create-note">
                <input onChange={(event) => {
                  setValue((preValue) => {
                    return preValue.title + event.target.value
                  })
                }} id="title" value={value.title} name="title" placeholder="Title" required />
                <textarea onChange={(event) => {
                  setValue((preValue) => {
                    return preValue.description + event.target.value
                  })
                }} id="description" value={value.description} name="description" placeholder="Note" rows="3" required />
                <button type='submit'><i className="fa-solid fa-plus"></i></button>
              </form>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
