import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AntTable from './components/AntTable'
import QueryTable from './components/QueryTable'
import FetchTable from './components/FetchTable'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/ant' element={<AntTable />}></Route>
      <Route path='/query' element={<QueryTable />}></Route>
      <Route path='/fetch' element={<FetchTable />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
