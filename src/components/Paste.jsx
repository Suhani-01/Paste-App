import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast';




const Paste = () => {

  const pastes=useSelector((state)=>state.paste.pastes);

  //dispatcher
  const dispatch=useDispatch();

  //searching
  const [searchTerm,setSearchTerm]=useState('');

  //while searching 
  const filteredData=pastes.filter(
    (paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  //deleting
  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }


  return (
    <div>
      <input
      className='bg-black px-4 py-2 rounded-2xl w-110 mt-3'
      type='search'
      placeholder='Search here'
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-5 mt-6'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste)=>{
              return (
                <div className='border w-full'>
                  <div>
                    {paste.title}
                  </div>
                  
                  <div>
                    {paste.content}
                  </div>

                  <div className='flex flex-row gap-4 place-content-evenly'>
                    <button>
                      <a href={`/?pasteId=${paste?._id}`}>
                        Edit
                      </a>
                    </button>

                    <button>
                      <a href={`/pastes/${paste._id}`}>
                        View
                      </a>
                      
                    </button>

                    <button onClick={()=>handleDelete(paste._id)}>
                      Delete
                    </button>

                    <button onClick={() => {
                      navigator.clipboard.writeText(paste.content)
                      toast.success("copied to clipboard")
                      }}
                    >
                      Copy
                    </button>


                    {/* not build yet */}
                    <button>
                      Share
                    </button>

                  </div>

                  <div>
                    {paste.createdAt}
                  </div>
                </div>

                
              );
            }
          )
        }
      </div>
    </div>
  )
}

export default Paste
