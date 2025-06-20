import '../css/board.css'
import { deleteBoard } from '../utils/api';
import { useNavigate } from 'react-router-dom';


const Board = ({content, onRemoved}) => {
    const navigate = useNavigate();
    const board = content;

    const openBoard = () => {
        navigate(`/boards/${board.id}`)
    }

    const handleDelete = async (e) => {
        e.stopPropagation();               
        try {
            await deleteBoard(board.id);
            onRemoved(board.id);             
        } catch (err) {
            console.error(err);
            alert('Failed to delete board');
        }
    };

    const handleView = (e) => {
        e.stopPropagation();
        openBoard();
    };

    return (
        <>
            <div className='board'>
                <img src={board.image} alt={board.title}/>
                <h3>{board.title}</h3>
                <p>{board.category}</p>
                <div className='board-buttons'>
                    <button className='view' onClick={handleView}>View Board</button>
                    <button className='delete' onClick={handleDelete}>Delete Board</button>
                </div>
            </div>
        </>
    )
}

export default Board;