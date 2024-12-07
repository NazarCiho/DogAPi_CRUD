import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import AddDog from './components/AddDog';
import EditDog from './components/EditDog';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/add-dog' element={<AddDog/>}></Route>
          <Route path='/edit-dog/:id' element={<EditDog/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
