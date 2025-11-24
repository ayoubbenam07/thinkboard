import React, { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import Navbar from '../component/Navbar'
import RateLimitedUI from '../component/RateLimitedUI'
import NoteCard from'../component/NoteCard'
import toast from 'react-hot-toast'
import NoteNotFound from '../component/NoteNotFound'
const HomePage = () => {
  const [isLimited, setIsLimited] = useState(false)  
  const [isLoading, setIsLoading] = useState(true)  
  const [notes, setNotes] = useState([]) 
  useEffect(()=>{
    const fetchNotes = async() =>{
      try {
        const res = await api.get("/notes")
        setNotes(res.data)
        setIsLimited(false)
        console.log(res.data);
      } catch (error) {
        console.log("Error fetching data");
        if(error.response.status === 429)
          setIsLimited(true)
        else
          toast.error("failed to load notes")
      } finally{
        setIsLoading(false)
      }
    }
    fetchNotes()
  }, []) 
  return (
    <div className='min-h-screen'>
      <Navbar/>
      {isLimited && <RateLimitedUI/>}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isLoading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isLimited && !isLoading && <NoteNotFound/>}

        {notes.length > 0 && !isLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage