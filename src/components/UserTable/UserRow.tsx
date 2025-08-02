import React from 'react';
import type { User } from '../../types';

interface Props {
  user: User;
  onClick: () => void;
}

const UserRow: React.FC<Props> = ({ user, onClick }) => {
  return (
    <div
      role="row"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onClick();
      }}
      className="grid grid-cols-3 gap-2 p-3 border-b hover:bg-gray-50 cursor-pointer"
    >
      <div>{user.name}</div>
      <div>{user.username}</div>
      <div>{user.email}</div>
      <div>{user.phone}</div>
      <div>{user.website}</div>
      <div>{user.address?.street}</div>
      <div>{user.address?.suite}</div>
      <div>{user.address?.city}</div>
      <div>{user.address?.zipcode}</div>
      <div>{user.address?.geo.lat}</div>
      <div>{user.address?.geo.lng}</div>
      <div>{user.company?.name}</div>
      <div>{user.company?.catchPhrase}</div>
      <div>{user.company?.bs}</div>
    </div>
  );
};

export default UserRow;
