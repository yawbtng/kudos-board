import '../css/board-grid.css'
import Board from './Board'


const BoardGrid = ({boards, onRemoved}) => {

  return (
    <div className='board-grid'>
      {boards.map((board) => (
        <Board key={board.id} content={board} onRemoved={onRemoved}/>
      ))}
    </div>
  )
}

export default BoardGrid;
