# Kindle Notes Extractor

A Node.js command-line tool to extract and organize notes from Amazon Kindle's.
"My Clippings.txt" file. It allows you to list all books in your clippings and
retrieve notes for a specific book, sorted by location and deduplicated.

## Features

- List all unique book titles from your Kindle clippings.
- Extract notes for a specific book, removing duplicates and sorting by Kindle
  location.
- Supports standard Kindle clipping formats.

## Prerequisites

- Node.js (version 14 or higher recommended)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/chrisjwaddell/kindle-notes-extractor.git
    cd kindle-notes-extractor
    ```

# List all books in the Kindle text file

npm run booklist './My Clippings.txt'

### Example Output

0 - The Great Gatsby 1 - To Kill a Mockingbird

# Extract all notes of a book

```bash
npm run booknotes './My Clippings.txt' 'Book Title' > 'Output file'
```

Replace 'Book Title' with the exact name from the book list.

Replace 'Output file' with a filename with a .txt extension eg output.txt

```bash
npm run booknotes './My Clippings.txt' 'The Great Gatesby' > 'output.txt'
```
