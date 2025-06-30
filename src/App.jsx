import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import {useEffect, useState} from "react";

//URL DATA "https://jsonplaceholder.typicode.com/posts"
const fetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if(!res.ok){
        throw new Error("Failed to fetch posts");
    }
    return res.json();
};
// Component for the Home page
function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>
        Go to the <Link to="/posts">Posts</Link> page to view the list of posts.
      </p>
    </div>
  );
}

// Component for the Posts page
function Posts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadPosts() {
            try {
                const data = await fetchData();
                setPosts(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
        loadPosts();
    }, []);

if(isLoading){
    return <p>Loading...</p>
}

    if(error){
        return <div>
            <h1>Error</h1>
            <p>{error.message || "Something went wrong"}</p>
        </div>
    }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        { posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Home page
  },
  {
    path: "/posts",
    element: <Posts />, // Posts page
  },
  {
    path: "*",
    element: <h1>404: Page Not Found</h1>, // Component for non-existent routes
  },
]);

// Main application component
function App() {
  return <RouterProvider router={router} />;
}

export default App;
