import { useState, useEffect } from "react";
import "./App.css";

const API = "https://book-review-api-d5yk.onrender.com/api";

function App() {
  // Auth state
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const [authError, setAuthError] = useState("");

  // Book state
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    genre: "",
  });
  const [bookError, setBookError] = useState("");

  // Review state
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewError, setReviewError] = useState("");

  // Fetch all books
  useEffect(() => {
    fetch(`${API}/books`)
      .then((res) => res.json())
      .then(setBooks);
  }, [selectedBook]);

  // Auth handlers
  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch(`${API}/auth/${authMode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Auth failed");
      if (authMode === "login") {
        setToken(data.token);
        localStorage.setItem("token", data.token);
      } else {
        setAuthMode("login");
      }
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setSelectedBook(null);
  };

  // Book handlers
  const handleBookForm = (e) => {
    setBookForm({ ...bookForm, [e.target.name]: e.target.value });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    setBookError("");
    try {
      const res = await fetch(`${API}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Add book failed");
      setBooks([...books, data]);
      setBookForm({ title: "", author: "", genre: "" });
    } catch (err) {
      setBookError(err.message);
    }
  };

  const handleSelectBook = async (book) => {
    const res = await fetch(`${API}/books/${book._id}`);
    const data = await res.json();
    setSelectedBook(data);
  };

  // Review handlers
  const handleAddReview = async (e) => {
    e.preventDefault();
    setReviewError("");
    try {
      const res = await fetch(`${API}/books/${selectedBook._id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: reviewContent, rating: reviewRating }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Add review failed");
      setSelectedBook({
        ...selectedBook,
        reviews: [...selectedBook.reviews, data],
      });
      setReviewContent("");
      setReviewRating(5);
    } catch (err) {
      setReviewError(err.message);
    }
  };

  // UI
  if (!token) {
    return (
      <div className="auth-container">
        <h2>{authMode === "login" ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleAuth}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            {authMode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        <button
          onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
        >
          {authMode === "login"
            ? "Need an account? Sign Up"
            : "Already have an account? Login"}
        </button>
        {authError && <p style={{ color: "red" }}>{authError}</p>}
      </div>
    );
  }

  return (
    <div className="app-container">
      <header>
        <h1>Book Review App</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <section className="book-list">
        <h2>Books</h2>
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <button onClick={() => handleSelectBook(book)}>
                {book.title} by {book.author} ({book.genre})
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddBook} className="add-book-form">
          <h3>Add Book</h3>
          <input
            name="title"
            placeholder="Title"
            value={bookForm.title}
            onChange={handleBookForm}
            required
          />
          <input
            name="author"
            placeholder="Author"
            value={bookForm.author}
            onChange={handleBookForm}
            required
          />
          <input
            name="genre"
            placeholder="Genre"
            value={bookForm.genre}
            onChange={handleBookForm}
            required
          />
          <button type="submit">Add</button>
          {bookError && <p style={{ color: "red" }}>{bookError}</p>}
        </form>
      </section>
      {selectedBook && (
        <section className="book-detail">
          <h2>{selectedBook.title}</h2>
          <p>Author: {selectedBook.author}</p>
          <p>Genre: {selectedBook.genre}</p>
          <p>Average Rating: {selectedBook.avgRating?.toFixed(2) || "N/A"}</p>
          <h3>Reviews</h3>
          <ul>
            {selectedBook.reviews && selectedBook.reviews.length > 0 ? (
              selectedBook.reviews.map((review, idx) => (
                <li key={review._id || idx}>
                  <strong>Rating:</strong> {review.rating} <br />
                  <span>{review.content}</span>
                </li>
              ))
            ) : (
              <li>No reviews yet.</li>
            )}
          </ul>
          <form onSubmit={handleAddReview} className="add-review-form">
            <h4>Add Review</h4>
            <textarea
              placeholder="Your review"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              required
            />
            <input
              type="number"
              min="1"
              max="5"
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
              required
            />
            <button type="submit">Submit Review</button>
            {reviewError && <p style={{ color: "red" }}>{reviewError}</p>}
          </form>
          <button onClick={() => setSelectedBook(null)}>Back to list</button>
        </section>
      )}
    </div>
  );
}

export default App;
