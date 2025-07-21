import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  //fetch pastes data in initial state object present in the "paste"  named slice
  const pastes = useSelector((state) => state.paste.pastes);

  //dispatcher
  const dispatch = useDispatch();

  //searching
  const [searchTerm, setSearchTerm] = useState("");

  //while searching
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //deleting
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="max-w-[700px] min-w-[300px] mx-auto mt-14 px-[20px]">
      <input
        className="bg-white border-[2px] border-gray-500 px-4 py-2 rounded-xl w-[100%] mt-3"
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-6 mt-6 border-[3px] border-gray-500 rounded-xl p-4 h-[500px] scroll-auto overflow-y-auto ">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border-[2px] overflow-y-hidden font-serif border-gray-500 rounded-xl py-[8px] px-[10px] w-full min-h-[120px] max-h-[140px] flex gap-3 justify-between bg-green-300">
                <div className="w-[60%]">
                  <div>
                    <b>TITLE</b> : {paste.title}
                  </div>

                  <div className="text-gray-500 overflow-hidden">
                    <b>Content : </b>
                    {paste.content.length > 60
                      ? paste.content.slice(0, 60) + "..."
                      : paste.content}
                  </div>
                </div>

                <div className="flex flex-col justify-between h-full">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="material-symbols-outlined text-blue-600">
                      calendar_month
                    </span>
                    {new Date(paste.createdAt).toLocaleDateString("en-IN")}
                  </div>

                  <div className="flex flex-row gap-4 place-content-evenly">

                    {/* edit button redirect to home page*/}
                    <button>
                      <a href={`/?pasteId=${paste?._id}`}>
                        <span className="material-symbols-outlined bg-white text-black border-2 border-gray-500 rounded transition-all duration-200 hover:text-yellow-500">
                          edit
                        </span>
                      </a>
                    </button>

                    {/* view button redirect to viewPaste page*/}
                    <button>
                      <a href={`/pastes/${paste?._id}`}>
                        <span className="material-symbols-outlined bg-white text-black border-2 border-gray-500 rounded transition-all duration-200 hover:text-blue-500">
                          visibility
                        </span>
                      </a>
                    </button>

                    {/* delete button have handler*/}
                    <button
                      className="cursor-pointer"
                      onClick={() => handleDelete(paste._id)}
                    >
                      <span className="material-symbols-outlined bg-white text-red-600 border-2 border-gray-500 rounded">
                        delete
                      </span>
                    </button>

                    {/* copy button , copy to clipboard */}
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(paste.content);
                        toast.success("copied to clipboard");
                      }}
                    >
                      <span className="material-symbols-outlined bg-white text-black border-2 border-gray-500 rounded transition-all duration-200 hover:text-green-500">
                        content_copy
                      </span>
                    </button>

                    {/* not build yet share button */}
                    <button onClick={()=>{
                      const shareUrl = `${window.location.origin}/pastes/${paste._id}`;
                      navigator.clipboard.writeText(shareUrl);
                      toast.success("URL Copied Sucessfully")
                    }}>
                      <span className="material-symbols-outlined  bg-white text-black border-2 border-gray-500 rounded cursor-pointer transition-all duration-200 hover:text-purple-500">
                        share
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
