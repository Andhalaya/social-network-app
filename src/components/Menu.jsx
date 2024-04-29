import { useState } from 'react';

function DropdownMenu({ children, trigger }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="dropdown-menu">
      <div onClick={handleToggle}>
       {trigger}
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {children}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
