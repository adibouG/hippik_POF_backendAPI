import app from './app';
import AppRoutes from './routes';

app.use (AppRoutes.contestRouter);
app.use (AppRoutes.userRouter);

export default app;