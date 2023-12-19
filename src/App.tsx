import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AntTable from './components/AntTable'
import QueryTable from './components/QueryTable'
import FetchTable from './components/FetchTable'
import TraineeTable from './components/TraineeTable'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/ant' element={<AntTable />}></Route>
      <Route path='/query' element={<QueryTable />}></Route>
      <Route path='/fetch' element={<FetchTable />}></Route>
      <Route path='/trainee' element={<TraineeTable />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
