import { useState } from "react";
import "../css/card-modal.css"
import { createCard, searchGifs } from "../utils/api";
import { useParams } from 'react-router-dom';

const CreatecardModal = ({handleOpen, onCardCreated}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription]  = useState('');
    const [gifUrl, setGifUrl] = useState('');
    const [owner, setOwner] = useState("")
    const { id: boardId } = useParams();

     /* gif search */
    const [query, setQuery]   = useState('');
    const [results, setRes]   = useState([]);
    const [loading, setLoad]  = useState(false);


    const isValid = title.trim() !== '' && description !== '' && gifUrl !== "";


    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal-container') {
        handleOpen(false);
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        handleOpen(false);
    };


    const doSearch = async () => {
        if (!query.trim()) return;
        setLoad(true);
    try {
        const gifs = await searchGifs(query, 6); 
        setRes(gifs);
    } catch (err) {
        console.error(err);
        alert('GIF search failed');
    }
        setLoad(false);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!isValid) {
            alert("Title and category are required")
            return; 
        }
        try {
            const newCard = await createCard(boardId, {
                title: title.trim(),
                description,
                "gif_url" : gifUrl,
                owner: owner.trim() || undefined
            });

            onCardCreated?.(newCard);

            setTitle('');
            setDescription('');
            setGifUrl('');
            setOwner("");

            handleOpen(false);
        } catch (err) {
            console.error(err);
            alert('Failed to create card');
        }
    };

    return (
        <>
        <div className='modal-container' onClick={handleOutsideClick}>
            <div className='modal'> 
                <div className='modal-content'>
                    <span className='close' onClick={handleClose}>&times;</span>

                    <h3>Create a New Card</h3>
                    <form className="new-card" onSubmit={handleSubmit}>
                        <label htmlFor="card-title">Title: </label>
                        <input required type='text' id="card-title" 
                        value={title} onChange={(e) => setTitle(e.target.value)}/>

                        <label htmlFor="card-description">Description: </label>
                        <input required type='text' id="card-description" 
                        value={description} onChange={(e) => setDescription(e.target.value)}/>


        
                        <div className="gif-search">
                            <input placeholder="Search GIFs…" value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && doSearch()}/>

                            <button type="button" onClick={doSearch}>Search</button>
                        </div>

                        {loading && <p style={{ fontSize: 14 }}>Searching…</p>}

                        {!!results.length && (
                            <div className="gif-grid">
                                {results.map((g) => (
                                    <img key={g.id} src={g.url} alt="" className={gifUrl === g.url ? 'selected' : ''}
                                    onClick={() => setGifUrl(g.url)}/>
                                ))}
                            </div>
                        )}

                        {/* selected GIF url */}
                        <input
                            placeholder="Enter GIF URL"
                            value={gifUrl}
                            onChange={(e) => setGifUrl(e.target.value)}
                        />

                        <label htmlFor="owner">Owner: </label>
                            <input id="owner" type='text' placeholder="optional" 
                            value={owner} onChange={(e) => setOwner(e.target.value)}/>

                        <button tye="submit" disabled={!isValid}
                            className={isValid ? 'active' : ''}>Create Card</button>

                    </form>
                </div>
            </div>
        </div>
        </>
    )
    
}

export default CreatecardModal;
