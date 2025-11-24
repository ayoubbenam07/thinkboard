import React from 'react'
import { Link } from 'react-router'
import {PlusIcon} from 'lucide-react'
const Navbar = () => {
    return (
        <header className='border-b border-base-content/10' data-theme='forest'>
            <div className='mx-auto max-w-6xl p-4 w-9/10 flex justify-between items-center'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl font-bold text-primary tracking-tighter'>Thinkboard</h1>
                </div>
                    <Link to={"/create"} className="btn btn-primary">
                    <PlusIcon className='size-5'/>
                    <span>New Note</span>
                    </Link>
            </div>
        </header>
    )
}

export default Navbar