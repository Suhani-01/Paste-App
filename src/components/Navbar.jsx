import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className=' pb-3 flex w-[100%] flex-row gap-20 justify-center pt-8 bg-linear-to-t from-sky-500 to-indigo-500'>
      <NavLink className="text-white" to='/'>
        Home
      </NavLink>

      <NavLink to='/pastes' className="text-white">
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
