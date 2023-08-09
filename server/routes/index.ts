import userRouter from "./users";
import contestRouter from "./contests";
import app from "../app";


app.use (contestRouter);
app.use (userRouter);

export default app;