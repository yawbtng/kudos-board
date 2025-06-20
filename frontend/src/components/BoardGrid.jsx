import '../css/board-grid.css'
import Board from './Board'


const BoardGrid = ({boards, onRemoved, onPinChange}) => {

  return (
    <div className='board-grid'>
      {boards.map((board) => (
        <Board key={board.id} content={board} onRemoved={onRemoved} onPinChange={onPinChange}/>
      ))}
    </div>
  )
}

export default BoardGrid;
