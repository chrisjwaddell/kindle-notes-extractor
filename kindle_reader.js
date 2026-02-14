// const {splitText} = require("./utils/01-string")
const {bookNotes, bookList} = require("./helpers/kindle")

// booklist just needs 1 argument - <kindle text file>
// booknotes needs <kindle text file> <Book Name>
function main() {
	// Input file location
	if (process.argv[2] === "booklist") {
		if (!process.argv[3]) {
			console.log("Usage: npm run booklist './My Clippings.txt'")
		} else {
			// console.log("Generating book list...")
			const bL = bookList(process.argv[3])
			// console.log(bL)
			bL.forEach((segment, index) => {
				// console.log(`[${index}]:`, JSON.stringify(segment))
				console.log(`${index} - `, segment)
			})
		}
	} else if (process.argv[2] === "booknotes") {
		if (!process.argv[3] || !process.argv[4]) {
			console.log(
				"Usage: npm run booknotes './My Clippings.txt' '<Book Name>' > '<output file>'"
			)
		} else {
			// console.log("Generating book notes for " + process.argv[4] + "...")
			const bN = bookNotes(process.argv[3], process.argv[4])
			bN.forEach((segment, index) => {
				// console.log(`[${index}]:`, JSON.stringify(segment))
				console.log(segment + "\n")
			})
		}
	} else {
		console.log(
			"Usage: npm run booklist './My Clippings.txt' OR Usage: npm run booknotes './My Clippings.txt' '<Book Name>' > '<output file>'"
		)
	}
}

main()
