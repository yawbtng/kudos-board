import '../css/card.css'
import { deleteCard, likeCard, setCardPin  } from '../utils/api';
import { useState } from 'react';


const Card = ({content, onRemoved, onPinChange}) => {
    const card = content;
    const [votes, setVotes] = useState(card.vote_cnt);
    const [pinned, setPinned] = useState(content.pinned);

    const togglePin = async () => {
        const newVal = !pinned;
        setPinned(newVal);                         
        try {
            await setCardPin(card.id, newVal);
            onPinChange?.(card.id, newVal);         
        } catch (err) {
            console.error(err);
            setPinned(!newVal);                     
        }
    };


    const handleDelete = async () => {
        try {
            await deleteCard(card.id);
            onRemoved(card.id);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpvote = async () => {
        setVotes((v) => v + 1);

        try {
            await likeCard(card.id);      
        } catch (err) {
            console.error(err);

            setVotes((v) => v - 1);
            alert('Failed to up-vote, try again!');
        }
    };


    return (
        <>
            <div className='card'>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <img src={card.gif_url} alt={card.title}/>
                <div className='card-buttons'>
                    <button className='upvote' onClick={handleUpvote}>▲&nbsp;- ({votes})</button>
                    <button onClick={togglePin} className={`pin ${pinned ? 'pinned' : ''}`}>{pinned ? '📌' : 'Pin'}</button>
                    <button className='delete' onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default Card;