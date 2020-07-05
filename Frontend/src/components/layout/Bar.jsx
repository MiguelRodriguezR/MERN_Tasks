import React from 'react'

const Bar = () => {
    return ( <header className="app-header">
        <p className="nombre-usuario">
            Hi <span>Michael</span>
        </p>
        <nav className="nav-principal">
            <a href="#!"> Logout</a>
        </nav>
    </header> );
}
 
export default Bar;