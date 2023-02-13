import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import BlogApp from './BlogApp/BlogApp'
// import favico
import  './assets/scripts/css/reset.css'
import './App.css'

function App() {

  return (
    <>
      <BlogApp />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  )
}

export default App
