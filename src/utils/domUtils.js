export function formatWords(words) {
	return words.split('-').join(' ');
}

export function fahrenheitToCelcius(fahrenheit) {
	return (((fahrenheit - 32) * 5) / 9).toFixed(0);
}

export function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function formatTimezone(timezone) {
	return timezone.replace('_', ' ');
}
