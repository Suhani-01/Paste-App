import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log(paste);
  return (
    <div className="max-w-[700px]  mt-16 min-w-[300px] mx-auto">
      <div className="flex items-center gap-[10px]"> 
        <span className="text-lg font-bold w-[10%]">TITLE : </span>
        <input
          className="px-3 py-2 w-[90%]  bg-white border-[2px] border-gray-400 rounded-xl"
          type="text"
          placeholder=""
          value={paste.title}
          disabled
        />
      </div>

      <div className="mt-4 bg-gray-200 border-[2px] border-gray-400 rounded-2xl">
        <div className="h-[30px] w-[100%] bg-linear-to-t from-sky-500 to-indigo-500 rounded-t-xl m-0"></div>
        <textarea
          className="w-full p-[10px] bg-gray-200 rounded-xl"
          disabled
          value={paste.content}
          rows={18}
          cols={80}
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPaste;
