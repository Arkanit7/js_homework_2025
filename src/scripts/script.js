const dateString = "2025-02-01";
const date = new Date(dateString);

const ukrainianDate = date.toLocaleDateString('uk-UA', {
  year: '',
  month: 'long',
  day: '2-digit',
});

console.log(ukrainianDate); 