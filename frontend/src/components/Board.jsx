import '../css/board.css'
import { deleteBoard, setBoardPin } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Board = ({content, onRemoved, onPinChange}) => {
    const navigate = useNavigate();
    const [pinned, setPinned] = useState(content.pinned);

    const board = content;

    const openBoard = () => {
        navigate(`/boards/${board.id}`)
    }

    const togglePin = async (e) => {
        e.stopPropagation();
        const newVal = !pinned;
        setPinned(newVal);                         
        try {
            await setBoardPin(board.id, newVal);
            onPinChange?.(board.id, newVal);         
        } catch (err) {
            console.error(err);
            setPinned(!newVal);                     
        }
    };

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
                    <button className='view' onClick={handleView}>View</button>
                    <button onClick={togglePin} className={`pin ${pinned ? 'pinned' : ''}`}>{pinned ? '📌' : 'Pin'}</button>
                    <button className='delete' onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default Board;