import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ViewPaste = () => {
  const {id}=useParams();

  const allPastes=useSelector((state)=>state.paste.pastes);
  

  const paste=allPastes.filter((p)=>p._id===id)[0];
  console.log(paste);
  return (
    <div>
      <input
          className="px-3 py-2 bg-black rounded-2xl mt-2 w-120"
          type="text"
          placeholder=""
          value={paste.title}
          disabled
        />

        <div>
        <textarea 
        className=" bg-black rounded-xl mt-10 p-5"
        disabled
        value={paste.content}
        rows={20}
        cols={80}
        >

        </textarea>
      </div>
    </div>
  )
}

export default ViewPaste
