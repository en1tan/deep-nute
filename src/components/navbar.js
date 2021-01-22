// import { Transition } from '@headlessui/react';
import React from 'react';

export const Navbar = ({ user, logout }) => {
  // const [isOpenProfile, toggleProfile] = useState(false);
  // const [direction, changeDirection] = useState('origin-top-right')
  const { photoURL } = user;
  return (
    <nav className="bg-gray-800">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block sm:ml-6">
              <h1 className="leading-2 text-white font-bold text-2xl mt-0 uppercase">Deep Nutes</h1>
            </div>
          </div>
          {/* <!-- Profile dropdown --> */}
          {/* End of Profile Dropdown */}
        </div>
      </div>
    </nav>
  );
};
