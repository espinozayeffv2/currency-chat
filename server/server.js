import express from 'express';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import cors from 'cors';
import mongoMessages from './models/messageModel.js';

const App = express();
const port = process.env.PORT || 5000;

/* Middlewares */
App.use(express.json());
App.use(cors());

/* Configuración DB */
const pusher = new Pusher({
  appId: '1097364',
  key: 'dbca6b598453283932d2',
  secret: '0c96020ed7c0d2963019',
  cluster: 'us2',
  useTLS: true
});

const mongoURI = 'mongodb+srv://admin:25102479@cluster0.byhyu.mongodb.net/solatiTest?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
	console.log('Server successfuly connected to MongoDB');

	const changeStream = mongoose
		.connection
		.collection('messages')
		.watch();

	changeStream.on('change', (change) => {
		pusher.trigger('messages', 'newMessage', { change });
	})
});

/* Rutas */ 
App.post('/api/message', (req, res) => {
	const message = req.body;

	mongoMessages.create(message, (error, data) => {
		if (error) return res.status(500).send(error);

		res.status(201).send(data);
	})
});

App.get('/api/messages', (req, res) => {
	mongoMessages.find((error, data) => {
		if (error) return res.status(500).send(error);
		const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);

		res.send(sortedData);
	})
});

/* Arranque */ 
App.listen(port, () => console.log(`Hello! Solati chat server is running in port: ${port}`));
