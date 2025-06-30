import {
    createBrowserRouter,
    RouterProvider,
    Link,
    useLoaderData,
    Outlet,
    useNavigate,
    useNavigation
} from "react-router-dom";

const fetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if(!res.ok){
        throw new Error("Failed to fetch posts");
    }
    return res.json();
};

function Layout() {
    const navigation = useNavigation()
    return <div>{navigation.state === "loading" && <p>Loading</p>}
        <Outlet/>
    </div>

}

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

function Posts() {
    const posts = useLoaderData()
    console.log(posts)

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

const router = createBrowserRouter([
    {
        path: "/",
        element:<Layout/>,
        children:[{
            index: true,
            element: <Home />, // Home page
        },
            {
                path: "/posts",
                element: <Posts />,
                loader: fetchData,
            },
            {
                path: "*",
                element: <h1>404: Page Not Found</h1>, // Component for non-existent routes
            },],
    },
    {
        path: "/",
        element: <Home />, // Home page
    },
    {
        path: "/posts",
        element: <Posts />,
        loader: fetchData,
    },
    {
        path: "*",
        element: <h1>404: Page Not Found</h1>, // Component for non-existent routes
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;