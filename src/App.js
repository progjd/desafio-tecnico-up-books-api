/* eslint-disable no-undef */
import React, { useState} from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';


const App = () => {
 
  const [apiKey] = useState("AIzaSyDPy7DK8HpEQMptzX13YE-MQj6d5-hMzj4");
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [book, setBooks] = useState('');
  // const [result, setResult] = useState([]);
   const [result, setResult] = useState([], () => {
    const starBooks = localStorage.getItem('@Repositories:result');
    if (starBooks) {
      return JSON.parse(starBooks);
    }else{
      return [];
    }
  });
 
// Change page
   const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = result.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const consultar = () => {
alert(localStorage.getItem('@Repositories:result'))
  }
// Get current posts
function handleChange(event){
  const book = event.target.value;
     setBooks(book);
     
  }

  //Conexão com a api
  function handleSubmit(event){
    event.preventDefault();
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=/${book}&key=${apiKey}&maxResults=40`).then(data => {
      console.log(data.data.items);
      setResult(data.data.items);
      
   });
  };
 
  function handleToFavorite (title) {
    if (localStorage.getItem('@Repositories:result')) {
      let starBooks = JSON.parse(localStorage.getItem('@Repositories:result'));
      if (Object.keys(starBooks).includes(title)) {
        delete starBooks[title];
      } else {  
        starBooks[title] = true;
      }
      localStorage.setItem('@Repositories:result', JSON.stringify(starBooks));
     
    } else {
      localStorage.setItem('@Repositories:result', JSON.stringify({ [title]: true }));
   
    }
  };

 
  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>Book Search App</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
          type="text" onChange={handleChange}
          className="form-control mt-10"
          placeholder="Search for Books"
          autoComplete="off"
          />
        </div>
      <button type="submit" className="btn-btn-danger">
            Search
      </button>
      </form>
    
      <Posts result={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={result.length}
        paginate={paginate}
      />
          {result.map((book, i) => {
        return (
          <>
            <span key={i}>{book.volumeInfo.title}</span>

            <button onClick={() => handleToFavorite(book.volumeInfo.title)}>Favoritar</button>
            <br />
          </>
        );
      })}
      <br/><br/>
      <button onClick={() => consultar('@Repositories:result')}>Consultar Favoritos</button>
    </div>
  );
};

export default App;
