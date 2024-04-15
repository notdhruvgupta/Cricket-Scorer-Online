import React from 'react'

export default function Button({ name, updateScore, updateWicket, updateUmpireScore }) {
  function getRun() {
    if (name === 'OUT') {
      updateWicket();
    }
    else if (name === 'WIDE') {
      updateUmpireScore(1);
    }
    else if (name === 'NO BALL') {
      updateUmpireScore(1);
    } else {
      updateScore(name);
    }
  }

  return (
    <div
      role='button'
      onClick={getRun}
      className='text-[1em] text-[#EEEEEE] border rounded-md py-3 px-10 flex justify-center items-center'
    >
      {name}
    </div>
  )
}
