import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const pasteId = searchParams.get("pasteId");

  //selecting all paste
  const allPaste=useSelector((state)=>state.paste.pastes);


  //to access reducers
  const dispatch=useDispatch();

  //useEffect

  useEffect(()=>{
    const selectedPaste = allPaste.find(paste => paste._id === pasteId);

    if(selectedPaste){
      setTitle(selectedPaste.title);
      setValue(selectedPaste.content);
    }
    


  },[pasteId]);

  function createPaste(){
    const paste={
      title:title,
      content:value,
      _id:pasteId || Date.now().toString(36),
      createdAt:new Date().toISOString(),
    }

    if(pasteId){
      //update
      dispatch(updateToPastes(paste));
    }
    else{
      //create
      dispatch(addToPastes(paste));
    }

    //after creation and updation clean everything
    setTitle('');
    setValue('');
    setSearchParams({});
  }



  return (
    <div>
      <div className="flex flex-row gap-5">
        <input
          className="px-3 py-2 bg-black rounded-2xl mt-2 w-120"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <button onClick={createPaste} className="px-3 py-2 bg-black rounded-2xl mt-3">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div>
        <textarea 
        className=" bg-black rounded-xl mt-10 p-5"
        placeholder="enter content here"
        value={value}
        onChange={(e) => {
            setValue(e.target.value);
          }}
        rows={20}
        cols={80}
        >

        </textarea>
      </div>
    </div>
  );
};

export default Home;
