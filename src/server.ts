import app from './app';
import { env } from './config/env'; // <-- Import env

const PORT = env.PORT; // <-- Use env.PORT

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();