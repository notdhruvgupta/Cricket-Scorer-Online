import React from 'react'

export default function TossModal({setModal, setBattingTeam}) {
    function handleTeam(team) {
        setModal(1);
        setBattingTeam(team)
    }

    return (
    <div className='text-2xl z-10 gap-5 border rounded-[10px] shadow-[0px_0px_5px_1px_#4A5568] flex flex-col p-10 justify-center items-center left-0 right-0 top-0 bottom-0 my-auto h-[200px] md:w-[500px] md:mx-auto mx-[0.7em] absolute bg-[#393E46]'>
        <p className=' font-semibold text-white'>Who's batting first ?</p>
        <div className='flex text-xl gap-5'>
            <p onClick={() => handleTeam(1)} role='button' className='border-2 hover:bg-[#8CABFF] hover:text-white text-[#8CABFF] border-[#8CABFF] px-2 py-1 font-bold rounded-md'>Team One</p>
            <p onClick={() => handleTeam(2)} role='button' className='border-2 hover:bg-[#ff707e] hover:text-white text-[#ff707e] border-[#ff707e] px-2 py-1 font-bold rounded-md'>Team Two</p>
        </div>
    </div>
  )
}
