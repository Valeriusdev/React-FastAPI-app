import BookList from './components/Books';

function App() {
  return (
    <div className="grid place-items-center min-h-screen">
      <h1 className="text-3xl font-bold">Library App</h1>
      <BookList />
    </div>
  );
}

export default App;
