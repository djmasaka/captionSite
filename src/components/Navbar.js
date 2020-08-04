import React from 'react'
import {Navbar as Navb} from 'react-bootstrap'

export default function Navbar() {
    return(
        <Navb bg="dark" variant="dark" >
            <Navb.Brand href="/home">Caption Machine</Navb.Brand>
        </Navb>
    )
}