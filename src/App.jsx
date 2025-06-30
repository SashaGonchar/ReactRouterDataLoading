import {
    createBrowserRouter,
    RouterProvider,
    Link,
    Form,
    useNavigation,
    useActionData,
    useRouteError,
} from "react-router-dom";

const createPost = async ({ request }) => {
    console.log(request);
    const formData = await request.formData();
    const title = formData.get("title");
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    if (!response.ok) {
        throw new Error("Failed to create a post");
    }

    const result = await response.json();
    console.log(result);
    return result;
};

function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <p>
                Navigate to the <Link to="/create">Create Post</Link> page.
            </p>
        </div>
    );
}

function CreatePost() {
    const actionData = useActionData();
    const navigation = useNavigation();

    return (
        <div>
            <h1>Create a Post</h1>
            <Form method="post" action="/create">
                <input type="text" name="title" placeholder="Title" required />
                <button type="submit" disabled={navigation.state === "submitting"}>
                    {navigation.state === "submitting" ? "Sending..." : "Create Post"}
                </button>
            </Form>
            {actionData && (
                <div style={{ marginTop: "1rem", color: "green" }}>
                    <strong>Post created successfully!</strong>
                    <br />
                    ID: {actionData.id}, Title: {actionData.title}
                </div>
            )}
            <Link to="/">Back to Home</Link>
        </div>
    );
}

function ErrorBoundary() {
    const error = useRouteError();
    return (
        <div>
            <h1>Error</h1>
            <p>{error.message || "Something went wrong"}</p>
            <Link to="/">Go back to Home</Link>
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/create",
        element: <CreatePost />,
        action: createPost,
        errorElement: <ErrorBoundary />,
    },
    {
        path: "*",
        element: <h1>404: Page Not Found</h1>,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
