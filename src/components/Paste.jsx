import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
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
    <div className="max-w-[700px] min-w-[300px] mx-auto mt-14">
      <input
        className="bg-white border-[2px] border-gray-500 px-4 py-2 rounded-xl w-[100%] mt-3"
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-6 mt-6 border-[2px] border-gray-500 rounded-xl p-4 h-[500px] scroll-auto overflow-y-auto">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border-[2px] font-serif border-gray-500 rounded-xl py-[8px] px-[10px] w-full h-[120px] flex gap-3 justify-between">
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
                    <button>
                      <a href={`/?pasteId=${paste?._id}`}>
                        <span className="material-symbols-outlined text-black border border-gray-500 rounded">
                          edit
                        </span>
                      </a>
                    </button>

                    <button>
                      <a href={`/pastes/${paste._id}`}>
                        <span className="material-symbols-outlined text-black border border-gray-500 rounded">
                          visibility
                        </span>
                      </a>
                    </button>

                    <button
                      className="cursor-pointer"
                      onClick={() => handleDelete(paste._id)}
                    >
                      <span className="material-symbols-outlined text-red-600 border border-gray-500 rounded">
                        delete
                      </span>
                    </button>

                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(paste.content);
                        toast.success("copied to clipboard");
                      }}
                    >
                      <span className="material-symbols-outlined text-black border border-gray-500 rounded">
                        content_copy
                      </span>
                    </button>

                    {/* not build yet */}
                    <button>
                      <span className="material-symbols-outlined text-black border border-gray-500 rounded">
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
