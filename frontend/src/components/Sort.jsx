import {useState, useEffect} from 'react';
import '../css/sort.css';

const SortButtons = () => {
    return (
        <div className='sort-buttons'>
            <button>All</button>
            <button>Recent</button>
            <button>Celebration</button>
            <button>Thank You</button>
            <button>Inspiration</button>
        </div>
    )
}

export default SortButtons;