import React from 'react';
export const Avatar = ({ photoUrl, username }) => {
  return (
    <div className="flex overflow-hidden">
      <img className="inline-block h-20 w-20 rounded-full text-white shadow-solid" src={photoUrl} alt={username} />
    </div>
  )
}