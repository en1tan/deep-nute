// import { Transition } from '@headlessui/react';
import React from 'react'

export const Navbar = ({user, logout}) => {
  // const [isOpenProfile, toggleProfile] = useState(false);
  // const [direction, changeDirection] = useState('origin-top-right')
  const { photoURL } = user;
  return (
    <nav className="bg-gray-800">
  <div className="px-2 sm:px-6 lg:px-8">
    <div className="relative flex items-center justify-between h-16">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        {/* <!-- Mobile menu button--> */}
        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
          <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              {/* TODO: Make the mobile logo clickable */}
              <img className="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg" alt="Workflow logo" onClick={logout} role="button"/>
          {/* <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-on-dark.svg" alt="Workflow logo" /> */}
            </div>
            <div className="hidden sm:block sm:ml-6">
              <h1 className="leading-2 text-white font-bold text-2xl mt-0 uppercase">Deep Nutes</h1>
            </div>
        {/* <div className="hidden sm:block sm:ml-6">
          <div className="flex">
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Dashboard</a>
            <a href="#" className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Team</a>
            <a href="#" className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Projects</a>
            <a href="#" className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">Calendar</a>
          </div>
        </div> */}
      </div>
      <div className="absolute inset-y-0 right-0 flex items-ceter pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {/* <!-- Profile dropdown --> */}
        <div className="ml-3 relative">
          <div className="hidden sm:block">
            <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out" id="user-menu" aria-label="User menu" aria-haspopup="true" onClick={logout}>
              <img className="h-8 w-8 rounded-full" src={photoURL} alt="" />
            </button>
          </div>
              {/* <Transition
                show={isOpenProfile}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100 tranform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"

              >
                {(ref) => (

                  <div ref={ref} className={`${direction} w-48 rounded-md shadow-lg ${direction === 'origin-top'? "relative mt-16 right-0 bg-gray-800 text-white" : "absolute right-0 mt-2 bg-white text-gray-700"}`}>
            <div className="rounded-md shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                      <a href="#" className={`block px-4 py-2 text-sm leading-5 ${direction === 'origin-top' ? "text-gray-100 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"} focus:outline-none focus:bg-gray-100`} role="menuitem">Your Profile</a>
                    <a href="#" className={`block px-4 py-2 text-sm leading-5 ${direction === 'origin-top' ? "text-gray-100 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`} role="menuitem">Settings</a>
                    <a href="#" role="button" className={`block px-4 py-2 text-sm leading-5 ${direction === 'origin-top' ? "text-gray-100 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`} role="menuitem" onClick={logout}>Sign out</a>
            </div>
                </div>
              )}
              </Transition> */}
            </div>
            {/* End of Profile Dropdown */}
      </div>
    </div>
  </div>
</nav>
  )
}