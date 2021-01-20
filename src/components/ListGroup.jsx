import React from 'react';
//sfc
const ListGroup = ({ groups, selectedGroup, onGroupSelect }) => {
  return (
    <ul className="list-group">
      {groups.map((group, index) => (
          <li
            style={{ cursor: 'pointer' }}
            onClick={() => onGroupSelect(group)}
            className={
              group === selectedGroup
                ? 'list-group-item active'
                : 'list-group-item'
            }
            key={index}
          >
            {group}
          </li>
        ))}
    </ul>
  );
}
 
export default ListGroup;