import express from "express";
import { Book } from "../models/bookModels.js";

const router = express.Router();

// ROUTE : save new book:
router.post("/", async (request, response) => {
  try {
    // validation:

    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      console.log("reading request", request.body);
      return response
        .status(400)
        .send({ message: "one of the feilds not found" });
    }
    // buisness logic :
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// ROUTE : get all books:
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// ROUTE : get book by id:
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// ROUTE : update a book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "incomplete feilds",
      });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// ROUTE : delete book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }

    return response.status(200).send({ message: "book deleted" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});

export default router;
