import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DynamicForm from './DynamicForm'
import SavedData from './SavedData'

const Routers = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<DynamicForm/>}/>
            <Route path='/saved-data' element={<SavedData/>}/>
        </Routes>
    </Router>
  )
}

export default Routers
