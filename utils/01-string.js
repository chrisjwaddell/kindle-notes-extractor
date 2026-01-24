// Alternative: Custom function using matchAll() - cleaner approach
function splitWithDelimiters(text, pattern) {
	const segments = []
	let lastIndex = 0
	const regex = new RegExp(pattern.source, `g${pattern.flags || ""}`)
	const matches = [...text.matchAll(regex)]

	for (const match of matches) {
		// Add segment before the match
		if (match.index > lastIndex) {
			segments.push(text.substring(lastIndex, match.index))
		}

		// Find where this segment ends (start of next match or end of text)
		const nextMatch = matches.find((m) => m.index > match.index)
		const endIndex = nextMatch ? nextMatch.index : text.length

		// Add segment starting with the delimiter
		segments.push(text.substring(match.index, endIndex))
		lastIndex = endIndex
	}

	// Add remaining text after last match
	if (lastIndex < text.length) {
		segments.push(text.substring(lastIndex))
	}

	return segments
}

// splitText splits the text into an array when it finds
// seperatorStringOrRegEx in the text
// This is different to .split()
// .split()
// it can then trim each item in the resulting array
function splitText(txt, seperatorStringOrRegEx, trim) {
	const splitTextArray = splitWithDelimiters(txt, seperatorStringOrRegEx)

	if (trim) {
		return splitTextArray.map((t) => t.trim())
	}
	return splitTextArray
}

module.exports = {
	splitText,
}
