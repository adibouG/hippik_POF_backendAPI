import app from './server';
const { PORT, DB, HOST, SCHEME } = process.env;

app.listen (Number (PORT), String (HOST), () => {
  console.log (`[DB]: SQLite Server running, using ${DB} as permanent storage`);
  console.log (`[server]: Server is running at ${SCHEME}://${HOST}:${PORT}`);
});