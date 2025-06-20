import { useState, useEffect } from 'react'
import '../css/board-page.css'
import CardGrid from '../components/CardGrid'
import CreateCardModal from '../components/CreateCardModal'
import { getCards } from '../utils/api'
import { useParams } from 'react-router-dom';
import { getBoard } from '../utils/api'
import { useNavigate } from 'react-router-dom'


function BoardPage() {

    const { id: boardId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    const [board, setBoard] = useState();

    const getCorrespondingBoard = async () => {
        try {
            const b = await getBoard(boardId);
            setBoard(b)
        } catch (err) {
            setError(err)
            console.log("could not find board")
        }
    }

    // loading cards from the API
    const loadCards = async () => {

        try {
            const list = await getCards(boardId)
            setCards(list)
        } catch (err) {
            console.log(err)
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCards()
        getCorrespondingBoard();
    }, [boardId])


    // removing a board
    const handleRemoved = (cardId) => {
        setCards((prev) => prev.filter((c) => c.id !== cardId));
    };

    // creating a board
    const handleCardCreated = () => {
        loadCards();
    };

    const handleModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    }

    const navigate = useNavigate();
    const backToHome = () => {
        navigate('/');
    }
    return (
        <>
        <header id="board-header">
            <span className="back-arrow" onClick={backToHome}>&larr;</span>
            <h1>KUDOS BOARD</h1>
        </header>

        <main>
            <marquee><h1 className='board-title'>{board?.title}</h1></marquee>

            <button className='create-card creating' onClick={handleModal}>Create a New Card</button>

            {isModalOpen && <CreateCardModal boardId={boardId} handleOpen={setIsModalOpen} onCardCreated={handleCardCreated} />}


            <CardGrid cards={cards} onRemoved={handleRemoved}/>

        </main>

        <footer className='kudos-board-footer'>
            <h2>© 2025 Boateng Productions</h2>
        </footer>
        </>
    )
}

export default BoardPage;
