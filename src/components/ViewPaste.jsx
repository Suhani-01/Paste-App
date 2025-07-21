import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  //id is unique hence will fetch the 0th index object as it store the required paste
  const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div className="max-w-[700px]  mt-12 max-sm:mt-7 min-w-[300px] mx-auto px-[20px]">
      <div className="flex items-center gap-[10px] justify-between">
        <span className="text-lg font-bold w-fit max-sm:text-base">TITLE : </span>
        <input
          className="px-3 py-2 flex-1 bg-white border-[2px] border-gray-400 rounded-xl max-sm:text-base"
          type="text"
          placeholder=""
          value={paste.title}
          disabled
        />
      </div>

      <div className="mt-4 mb-4 bg-gray-200 border-[2px] border-gray-400 rounded-2xl max-sm:h-[450px]">
        <div className="h-[35px] w-[100%] bg-linear-to-t from-sky-500 to-indigo-500 rounded-t-xl m-0 flex gap-1 justify-between items-center px-3">
          <div className="flex gap-2 h-[15px] w-[100px] items-center">
            <div className="h-[15px] w-[15px] bg-red-700 rounded-[50%]"></div>
            <div className="h-[15px] w-[15px] bg-yellow-600 rounded-[50%]"></div>
            <div className="h-[15px] w-[15px] bg-green-700 rounded-[50%]"></div>
          </div>

          {/* copy button */}
          <button className="flex h-full items-center"
            onClick={() => {
              navigator.clipboard.writeText(paste.content);
              toast.success("Copied to clipboard");
            }}
          >
            <span className="material-symbols-outlined  text-white cursor-pointer">
              content_copy
            </span>

          </button>
        </div>
        <textarea
          className="w-full p-[10px] bg-gray-200 rounded-xl max-sm:h-[410px]"
          disabled
          value={paste.content}
          rows={19}
          cols={80}
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPaste;
