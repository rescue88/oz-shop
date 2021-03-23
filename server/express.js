import express from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// default middlewares
app.use(express.json({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
// listen to a base url and calling routers
app.use('/', userRoutes);
app.use('/', authRoutes);

app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        res.status(401).json({ error: `${err.name}: ${err.message}` });
    }
    else if(err) {
        res.status(400).json({ error: `${err.name}: ${err.message}` });
        console.log(err);
    }
});

export default app;