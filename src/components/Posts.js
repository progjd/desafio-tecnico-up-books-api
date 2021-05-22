/* eslint-disable no-undef */
import React from 'react';

const Posts = ({ result, loading }) => {
  
  if (loading) {
    return <h2>Loading...</h2>;
  }

 
  return (
    <div>

<table>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Titulo</th>
                <th>Descriçao</th>
                <th>Publicado</th>
              </tr>
            </thead>

            <tbody>
              {result.map(book => (
                <tr key={book.id} >
                  <td className="title">{book.volumeInfo.imageLinks.thumbnail ? (
                  <a target="_blank" href={book.volumeInfo.previewLink}>
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                  </a>  
                  ) : (
                    <img
                      src={`https://avatar.oxro.io/avatar?name=${book.volumeInfo.title}`}
                      alt=""
                    />
              )}</td>
                  <td className="title">{book.volumeInfo.title}</td>
                  <td>{book.volumeInfo.subtitle}</td>
                  <td>{book.volumeInfo.publishedDate}</td>
       
                </tr>
              ))}
            </tbody>
          </table>
     
    </div>
  );
};

export default Posts;



