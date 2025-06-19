import '../css/board-grid.css'
import Board from './Board'


const BoardGrid = ({boards}) => {

  return (
    <div className='board-grid'>
      {boards.map((board) => (
        <Board key={board.id} content={board} />
      ))}
    </div>
  )
}

export default BoardGrid;
