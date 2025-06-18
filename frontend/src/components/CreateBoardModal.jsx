import { useState, useEffect } from "react";
import "../css/board-modal.css"

const CreateBoardModal = ({handleOpen}) => {


    
    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal-container') {
        handleOpen(false);
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        handleOpen(false);
    };

    return (
        <>
        <div className='modal-container' onClick={handleOutsideClick}>
            <div className='modal'> 
                <div className='modal-content'>
                    <span className='close' onClick={handleClose}>&times;</span>

                    <h3>Create a New Board</h3>
                    <form className="new-board">
                        <label htmlFor="board-title">Title: </label>
                        <input type='text' id="board-title"/>

                        <label htmlFor="category"> Category: </label>
                        <select id="category" name="board-categories" defaultValue="Select a category">
                            <option value='none'>Select a category</option>
                            <option value="celebration">Celebration</option>
                            <option value="thank-you">Thank You</option>
                            <option value='inspiration'>Inspiration</option>
                        </select>

                        <label htmlFor="author">Author: </label>
                            <input id="author" type='text' />

                        <button>Create Board</button>

                    </form>
                </div>
            </div>
        </div>
        </>
    )
    
}

export default CreateBoardModal;
