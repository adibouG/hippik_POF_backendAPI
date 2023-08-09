import app from './server';


console.log (process.env.DB)
const { PORT, DB, HOST, SCHEME } = process.env;

app.listen (Number (PORT), String (HOST),  () => {
  console.log (`[server]: Server is running at ${SCHEME}://${HOST}:${PORT}`);
});