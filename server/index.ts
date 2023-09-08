import app, {errorHandler} from './app';
import AppRoutes from './routes';

app.use (AppRoutes.contestRouter);
app.use (AppRoutes.userRouter);

app.use(errorHandler);

export default app;