import React from 'react'
import Button from './../../_components/button';
import { FcFinePrint } from 'react-icons/fc';

export default function SearchTicketSection() {
    return (
        <>

            <Button
                variant="secondary"
                className='transition-all hover:scale-105 active:scale-95 whitespace-nowrap'
            >
                <div className="text-blue-500 flex gap-1 font-black">
                    <FcFinePrint className='text-xl' />  SEARCH
                </div>

            </Button>
        </>
    )
}
