import {useState, useEffect} from 'react';
import '../css/search-bar.css'

const SearchBar = ({setSearchQuery, searchQuery}) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.input.value);
    };

    const handleChange = (event) => {
    setInputValue(event.target.value);
  };

    const handleClear = () => {
        setInputValue('');
        setSearchQuery("")
    }


    return (
        <form className="search-bar" onSubmit={handleSubmit} onReset={handleClear} >
            <input type='text' id='input' placeholder='Search boards...' value={inputValue} onChange={handleChange}/>
             <div>
                <button type='submit'>Search</button>
                <button type='reset' onClick={handleClear} >Clear</button>
            </div>   
        </form>
    )
}

export default SearchBar;