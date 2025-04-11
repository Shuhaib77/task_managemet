import React from 'react'

function Button({name,type,className,onclick}) {
    const baseStyle = "p-2 w-full";
    return (
      <button onClick={onclick} type={type} className={`${baseStyle} ${className}`}>
        {name}
      </button>
    );
}

export default Button