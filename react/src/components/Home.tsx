import { useState } from 'react'
import { useAddTodoMutation, useDeleteTodoMutation, useEditTodoMutation, useGetTodosQuery } from '@/api/todo'
import type { IData } from '@/api/todo.type'

const Home = () => {
  const { data, isLoading, isError } = useGetTodosQuery(null)
  const [deleteFn] = useDeleteTodoMutation()
  const [addFn] = useAddTodoMutation()
  const [editFn] = useEditTodoMutation()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [editId, setEditId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const handleDelete = (id: number | string) => {
    deleteFn(Number(id))
  }

  const handleAdd = () => {
    if (!name || !description || !image) {
      alert('Fill name, description and choose image')
      return
    }
    const formData = new FormData()
    formData.append('Name', name)
    formData.append('Description', description)
    if (image) {
      formData.append('Images', image)
    }
    addFn(formData)
    setName('')
    setDescription('')
    setImage(null)
  }

  const handleEdit = (e: IData) => {
    setEditId(Number(e.id))
    setName(e.name)
    setDescription(e.description)
  }

  const handleUpdate = () => {
    if (editId === null) {
      return
    }
    editFn({ id: editId, name: name, description: description })
    setEditId(null)
    setName('')
    setDescription('')
  }

  if (isLoading) {
    return <h1 className="text-xl">loading....</h1>
  }
  if (isError) {
    return <h1 className="text-xl text-red-600">Somthing went wrong refresh the page....</h1>
  }

  const todos = Array.isArray(data?.data) ? data.data : []

  const filteredTodos = todos.filter((e) => {
    const bySearch = e.name.toLowerCase().includes(search.toLowerCase())
    const byStatus =
      status === 'all' ||
      (status === 'completed' && e.isCompleted) ||
      (status === 'notCompleted' && !e.isCompleted)
    return bySearch && byStatus
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-3">
        <h2 className="text-lg font-bold">{editId === null ? 'Add todo' : 'Edit todo'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-3 py-2"
        />
        {editId === null && (
          <input
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="border rounded px-3 py-2"
          />
        )}
        {editId === null ? (
          <button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            add
          </button>
        ) : (
          <button onClick={handleUpdate} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
            save
          </button>
        )}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded px-3 py-2 bg-white"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-3 py-2 bg-white"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not completed</option>
        </select>
      </div>

      {filteredTodos.map((e) => {
        return (
          <div key={e.id} className="flex items-center justify-between bg-white rounded-lg shadow p-4">
            <div>
              <h1 className="text-lg font-semibold">{e.name}</h1>
              <p className="text-gray-600">{e.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(e)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
              >
                edit
              </button>
              <button
                onClick={() => handleDelete(e.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                delete
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
