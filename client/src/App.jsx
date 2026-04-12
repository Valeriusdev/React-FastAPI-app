import BookList from "./components/Books";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Library App</h1>
      <BookList />
    </div>
  );
}

export default App;
