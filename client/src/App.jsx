import BookList from "./components/Books";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col items-center justify-center py-10">
        <BookList />
      </div>
    </div>
  );
}

export default App;
