import { useEffect, useRef, useState,  } from 'react'
import reactLogo from './assets/react.svg'
import io from 'socket.io-client'
import './App.css'
const socket = io("http://localhost:4000")



function App() {

  const [msg, setMsg] = useState("")
  const [messages, setBootMessages] = useState([])
  const [id, setId] = useState(0)
  const chatRef = useRef(null)


  // useEffect(() => {


  //   socket.on("bot-message", (data) => displayMessage(data, 'bot'))



  // }, [])

  socket.on("bot-message", (data, text) => displayMessage(data, 'bot'))


  const displayMessage = (items, user) => {
    setId(id + 1)
    setBootMessages([...messages, {items, user, id: id}])
  }





  const handleSubmit = (e) => {
    e.preventDefault()
    if(!msg) {
      return alert("input cannot be empty.")
    }
    socket.emit('client-msg', msg) 
    displayMessage(msg, 'client')
    setMsg("")
  }


 const formatMessage = (data) => {

  console.log(data)
 
  switch (typeof data) {
    case "string":
      return <p>{data}</p>
    default:
      return <ul ref={chatRef} className=' flex flex-col  gap-5'>
        {data.map((m) => <li className='' key={m.id}>{m.msg}</li>)}
      </ul>
    }

 
 }

  return (
    <div className="w-full h-screen flex flex-col p-4 pb-1 gap-4">
      <h1 className=' text-orange-500 flex-[0.1] text-3xl'>Restaurant Chat App</h1>
      {/* show messeages */}
      <div className='flex-[0.8] overflow-y-auto  rounded-sm p-3 flex flex-col gap-5'>
      {messages.map((message) => (
        <div  key={message.id} className={` relative flex flex-wrap min-w-[5%] ${message.user === "bot" ? ' self-start bg-slate-400 p-2 rounded': 'self-end p-2 rounded bg-blue-300'}`}>
          <div className={`chat-box ${message.user === "bot" ? ' self-start border-slate-400  rounded left-[-8px]': 'self-end  rounded border-blue-300'}`}></div>
          {formatMessage(message.items)}
        </div>
      ))}
      </div>
      <form onSubmit={handleSubmit} className="gap-2 w-full  flex flex-[0.1] ">
        <input autoFocus className='rounded-md border-none outline-none' onChange={(e) => setMsg(e.target.value)} name='msg' value={msg} />
        <button className=' text-white bg-slate-500 rounded-md border-none'>Submit</button>
      </form>
    </div>
  )
}

export default App
