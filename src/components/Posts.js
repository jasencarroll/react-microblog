import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default function Posts() {
  const [posts, setPosts] = useState();
  const [error, setError] = useState(null);  // State to capture errors

  useEffect(() => {
    // Async function to fetch the posts
    const fetchPosts = async () => {
      try {
        const response = await fetch(BASE_API_URL + '/api/feed');
        const contentType = response.headers.get('content-type');
        
        console.log('Response Status:', response.status);  // Log the response status
        console.log('Content-Type:', contentType);         // Log the content type

        // Check if response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Check if the response is JSON
        if (contentType && contentType.includes('application/json')) {
          const results = await response.json();
          setPosts(results.data);
        } else {
          const textResponse = await response.text();  // Log and store the response text
          console.error('Unexpected content type:', textResponse);  // Log the raw response body
          throw new Error('Unexpected content type, expected JSON');
        }
      } catch (err) {
        setError(err.message);
        setPosts(null);  // Set posts to null to show an error message in UI
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {posts === undefined ? (
        <Spinner animation="border" />
      ) : (
        <>
          {posts === null ? (
            <p>{error ? error : 'Could not retrieve blog posts.'}</p>
          ) : (
            posts.map((post) => (
              <p key={post.id}>
                <b>{post.author.username}</b> &mdash; {new Date(post.timestamp).toLocaleString()}
                <br />
                {post.text}
              </p>
            ))
          )}
        </>
      )}
    </>
  );
}
