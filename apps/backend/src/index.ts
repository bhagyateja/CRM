import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
// ... other imports

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Register routes
app.use('/api/auth', authRoutes); // this must be defined

// Test endpoint
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
