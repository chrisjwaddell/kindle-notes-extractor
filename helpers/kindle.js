const fs = require("fs")
const {splitText} = require("../utils/01-string")

// Helpers

// --------------------------------
// Extract location, bookTitle and notes

const extractLocationFromItem = (itemString) => {
	const locationString = itemString.match(
		/(\| location | \| Location |Your Highlight on Location |Your Note on Location )([^(\r\n|\n|\r)]*)/
	)

	const location = locationString ? locationString[2].trim() : "0"
	return location ? Number(location.split("-")[0]) : 0
}

const secondLinePattern = /[^\r\n]*(\r\n|\n)([^\r\n]*)/

const extractBookTitleFromItem = (itemString, index) => {
	if (index === 0) {
		return itemString.split(/\r\n|\r|\n/)[0].trim()
	} else {
		const match = itemString.match(secondLinePattern)
		return match ? match[2].trim() : "Book Title Not Found"
	}
}

// Regex to get fourth line onwards (everything from fourth line to end)
// Pattern: skips first three lines, captures everything from fourth line onwards
// Capture group 4 contains all content from fourth line onwards
const fourthLineOnwardsPattern =
	/[^\r\n]*(\r\n|\n)[^\r\n]*(\r\n|\n)[^\r\n]*(\r\n|\n)([\s\S]*)/

const extractNotesFromItem = (itemString) => {
	const match = itemString.match(fourthLineOnwardsPattern)
	return match ? match[4].trim() : ""
}

// --------------------------------

// Create array of item objects ie book notes with bookTitle, location, notes
const itemObjectsArray = (items) =>
	items.map((itemString, index) => {
		return {
			bookTitle: extractBookTitleFromItem(itemString, index),
			location: extractLocationFromItem(itemString),
			notes: extractNotesFromItem(itemString),
		}
	})

const bookFilterArray = (items, bookTitle) =>
	itemObjectsArray(items).filter((item) => item.bookTitle === bookTitle)

// Filter first to get only that bookTitle

// When locations are the same, take the last one (if not 0)

// Deduplicate by location, keeping the last occurrence
const deduplicatedBookFilterArray = (bookFilterArray) =>
	bookFilterArray.filter((item, index, arr) => {
		// Find the last index in the array where this location appears
		const locationIndices = arr
			.map((i, idx) =>
				i.location !== 0 && i.location === item.location ? idx : -1
			)
			.filter((idx) => idx !== -1)
		const lastIndex = Math.max(...locationIndices)
		return index === lastIndex
	})

// Now order by location
const bookNotesLocationOrderArray = (deduplicatedBookFilterArray) =>
	deduplicatedBookFilterArray
		.sort((a, b) => a.location - b.location)
		.map((item) => item.notes)

// Show all the book notes given a fileLocation which is the
// Kindle My Clippings.txt file and a bookTitle
function bookNotes(fileLocation, bookTitle) {
	const text = fs.readFileSync(fileLocation, "utf8")

	const items = splitText(text, /==========/, true)

	const itemObjects = itemObjectsArray(items)
	const booksFiltered = bookFilterArray(items, bookTitle)

	const deduplicatedBooks = deduplicatedBookFilterArray(booksFiltered)

	return bookNotesLocationOrderArray(deduplicatedBooks)
}

// =======================================================================================

// Get unique book Titles (no duplicates)
const uniqueBookTitles = (itemObjectsArray) => [
	...new Set(itemObjectsArray.map((item) => item.bookTitle)),
]

// Show all the books given a fileLocation which is the
// Kindle My Clippings.txt file
function bookList(fileLocation) {
	const text = fs.readFileSync(fileLocation, "utf8")

	const items = splitText(text, /==========/, true)

	const itemObjects = itemObjectsArray(items)

	return uniqueBookTitles(itemObjects)
}

module.exports = {
	bookNotes,
	bookList,
}
