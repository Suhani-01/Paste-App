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
    <div className="max-w-[700px] min-w-[300px] mx-auto px-[20px]  mt-15">
      <div className="flex flex-row gap-3 w-[100%]">
        <input
          className="px-3 py-2 border-[2px] border-gray-500 bg-white rounded-xl w-[80%] max-sm:w-[70%] max-sm:text-base"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <button onClick={createPaste} className="px-3 cursor-pointer w-[20%] max-sm:w-[30%] max-sm:text-base text-white font-bold bg-linear-to-t from-sky-500 to-indigo-500 rounded-2xl flex items-center justify-center gap-2">
          {pasteId ? "Update" : "Create"}
          <span className="material-symbols-outlined text-white">add_circle</span>
        </button>
      </div>

      <div className="w-[100%] mx-auto max-sm:h-[450px]">
        <textarea 
        className="bg-white w-[100%] h-full border-[2px] border-gray-500 rounded-xl mt-7 p-5 max-sm:p-3 max-sm:text-base"
        placeholder="Enter content here ..."
        value={value}
        onChange={(e) => {
            setValue(e.target.value);
          }}
        rows={18}
        >

        </textarea>
      </div>
    </div>
  );
};

export default Home;
