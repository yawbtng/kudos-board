import '../css/board.css'
import { deleteBoard } from '../utils/api';


const Board = ({content, onRemoved}) => {
    const board = content;

    const handleDelete = async () => {
        try {
            await deleteBoard(board.id);
            onRemoved(board.id);
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <>
            <div className='board'>
                <img src={board.image} alt={board.title}/>
                <h3>{board.title}</h3>
                <p>{board.category}</p>
                <div className='board-buttons'>
                    <button className='view'>View Board</button>
                    <button className='delete' onClick={handleDelete}>Delete Board</button>
                </div>
            </div>
        </>
    )
}

export default Board;