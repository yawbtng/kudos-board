import { useState, useEffect } from 'react'
import '../css/board-grid.css'
import Board from './Board'


function BoardGrid() {

  return (
    <>
      <div className='board-grid'>
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
      </div>
    </>
  )
}

export default BoardGrid;
