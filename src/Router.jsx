import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import DynamicForm from './DynamicForm'
import Dynamic from './Dynamic'
import SavedData from './SavedData'

const Routers = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Dynamic/>}/>
            <Route path='/saved-data' element={<SavedData/>}/>
        </Routes>
    </Router>
  )
}

export default Routers
