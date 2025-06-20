import { useState, useEffect } from "react";
import "../css/board-modal.css"
import { createBoard } from "../utils/api";

const CreateBoardModal = ({handleOpen, onBoardCreated}) => {
    const [title, setTitle]     = useState('');
    const [category, setCategory]  = useState('');
    const [author, setAuthor]    = useState('');

    const isValid = title.trim() !== '' && category !== '';


    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal-container') {
        handleOpen(false);
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        handleOpen(false);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!isValid) {
            alert("Title and category are required")
            return; 
        }
        try {
            const newBoard = await createBoard({
                title: title.trim(),
                category,
                author: author.trim() || undefined
            });

            onBoardCreated?.(newBoard);

            setTitle('');
            setCategory('');
            setAuthor('');

            handleOpen(false);
        } catch (err) {
            console.error(err);
            alert('Failed to create board');
        }
    };


    return (
        <>
        <div className='modal-container' onClick={handleOutsideClick}>
            <div className='modal'> 
                <div className='modal-content'>
                    <span className='close' onClick={handleClose}>&times;</span>

                    <h3>Create a New Board</h3>
                    <form className="new-board" onSubmit={handleSubmit}>
                        <label htmlFor="board-title">Title: </label>
                        <input required type='text' id="board-title" 
                        value={title} onChange={(e) => setTitle(e.target.value)}/>

                        <label htmlFor="category"> Category: </label>

                        <select required id="category" name="board-categories" 
                        defaultValue="Select a category" value={category} 
                        onChange={(e) => setCategory(e.target.value)}>

                            <option hidden disabled selected value=''>Select a category</option>
                            <option value="Celebration">Celebration</option>
                            <option value="Thank You">Thank You</option>
                            <option value='Inspiration'>Inspiration</option>
                        </select>

                        <label htmlFor="author">Author: </label>
                            <input id="author" type='text' placeholder="optional" 
                            value={author} onChange={(e) => setAuthor(e.target.value)}/>

                        <button tye="submit" disabled={!isValid}
                            className={isValid ? 'active' : ''}>Create Board</button>

                    </form>
                </div>
            </div>
        </div>
        </>
    )
    
}

export default CreateBoardModal;
