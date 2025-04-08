import React from 'react'

function Button({name,type,className}) {
    const baseStyle = "p-2 w-full";
    return (
      <button type={type} className={`${baseStyle} ${className}`}>
        {name}
      </button>
    );
}

export default Button