import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Blog } from './pages/Blog'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Blogs } from './pages/Blogs'
import { Publish } from './components/publish'

function App(){

  return(
    <>
    
       <BrowserRouter>
            <Routes>
               <Route path="/signup" element={<Signup/>}/>
               <Route path="/signin" element={<Signin/>}/>
               <Route path="/publish" element={<Publish/>}/>
               <Route path="/blogs" element={<Blogs/>}/>
               <Route path="/blog/:id" element={<Blog/>}/>
            </Routes>
       </BrowserRouter>
    </>
  )
}

export default App