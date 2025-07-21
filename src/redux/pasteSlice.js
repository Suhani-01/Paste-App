import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  //local storage key value pair of object
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],

  //if pastes exist the get it else create new array
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      //add a check for paste already exist
      //ie same title already exist krta hai tho
      const index = state.pastes.findIndex(
        (item) =>
          item.title.toLowerCase().trim() == paste.title.toLowerCase().trim()
      );

      //if title already exist
      if (index != -1) {
        toast.error("Title Already Exist", {
          duration: 1000, // time in milliseconds (1 second)
        });
      }

      //if title is empty
      else if (paste.title.trim().length === 0) {
        toast.error("Title is Empty", {
          duration: 1000, // time in milliseconds (1 second)
        });
      }

      //no issue
      else {
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Created Sucessfully", {
          duration: 1000, // time in milliseconds (1 second)
        });
      }
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;

      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste updated", {
          duration: 1000, // time in milliseconds (1 second)
        });
      }
    },

    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        //splice is array's method to delete item
        state.pastes.splice(index, 1);

        //updating array in local storage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste deleted", {
          duration: 1000, // time in milliseconds (1 second)
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
