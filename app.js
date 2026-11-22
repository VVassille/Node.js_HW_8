import express from "express";
import Book from "./models/book.js";

// Create Express application
const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// GET - Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.findAll();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// POST - Create a new book
app.post("/books", async (req, res) => {
  try {
    const { title, author, year } = req.body;

    const newBook = await Book.create({
      title,
      author,
      year,
    });

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// PUT - Update an existing book
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { title, author, year } = req.body;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await book.update({
      title,
      author,
      year,
    });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// DELETE - Delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await book.destroy();

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
