import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFound, ToDoList } from './imports'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ToDoList />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}