import React from 'react'

export default function nav() {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Movies App</a>                    
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                            <a class="nav-link" href="movies">Movies</a>
                            <a class="nav-link" href="#">Pricing</a>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}
