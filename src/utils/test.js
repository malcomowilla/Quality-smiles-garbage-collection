


const path = '/api/customers';
const segments = path.split('/').filter(Boolean); // removes empty strings
console.log(segments); // ['api', 'customers']
console.log(segments[1] === 'customers'); // true