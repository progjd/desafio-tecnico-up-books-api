/* eslint-disable no-undef */
import React, { useEffect, useState} from 'react';
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
   const [result, setResult] = useState([], () => {
    const books = localStorage.getItem('@Repositories:result');
    if (books) {
      return JSON.parse(books);
    }
    return [];
  });

 
// Change page
   const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = result.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  
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
 
  function handleToFavorite (id) {
    if (localStorage.getItem('@Repositories:result')) {
      let books = JSON.parse(localStorage.getItem('@Repositories:result'));
      if (Object.keys(books).includes(id)) {
        delete books[id];
      } else {  
        books[id] = true;
      }
      localStorage.setItem('@Repositories:result', JSON.stringify(books));
    } else {
      localStorage.setItem('@Repositories:result', JSON.stringify({ [id]: true }));
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

            <button onClick={() => handleToFavorite(book.id)}>Favoritar</button>
            <br />
          </>
        );
      })}
    </div>
  );
};

export default App;
