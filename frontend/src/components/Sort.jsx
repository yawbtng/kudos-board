import {useState, useEffect} from 'react';
import '../css/sort.css';

const SortButtons = ({setSortType}) => {
    const [active, setActive] = useState('All');
    const labels = ['All', 'Recent', 'Celebration', 'Thank You', 'Inspiration'];

    return (
    <div className="sort-buttons">
        {labels.map(label => (
            <button key={label} value={label}
            className={active === label ? 'button-active' : ''}
            onClick={() => {
                setActive(label);
                setSortType?.(label);   
            }}>
            {label}
        </button>
        ))}
    </div>
    );
}

export default SortButtons;