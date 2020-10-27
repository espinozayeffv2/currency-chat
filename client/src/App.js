import React, { useEffect, useState } from 'react';
import './App.css';
import { FormControl, Input } from '@material-ui/core';
import Message from './Message';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import axios from './axios';
import axiosCurrency from './axiosCurrency';
import Pusher from 'pusher-js';

const pusher = new Pusher('dbca6b598453283932d2', {
  cluster: 'us2'
});

const getCurrency = () => {
  const params = {
    access_key: '3b9ca85e040ed075f28083d4abdbd6d4',
    currencies: 'COP',
  }

  return axiosCurrency('/live', { params });
} 

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const roundNumber = (value = 0, decimals = 2) => Number(Math.round(value+'e'+decimals)+'e-'+decimals);

const addSeparatos = (value) =>     value = value ?? 0
  ? Intl.NumberFormat().format(value)
  : 0;

const formatNumber = pipe(roundNumber, addSeparatos);

export default function App(){
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('Usuario desconocido');

  const fetchMessages = async () => {
    try {
      const { data } = await axios('/messages');
      setMessages(data);
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchMessages()
  }, []);

  useEffect(() => {
    setUsername(prompt('Por favor, ingresa tu nombre'))
  }, []);

  useEffect(() => {
    const channel = pusher.subscribe('messages');
    channel.bind('newMessage', (data) => fetchMessages())
  }, [username]);

  const sendMessage = async (e) => {
    e.preventDefault()

    let currencyMessage = null;

    if (input.includes('/convertir')) {
      const quantity = input.split(' ')[1];
      if (quantity) {
        const { data }  = await getCurrency(quantity).catch(console.error);
        const conversion = quantity / data.quotes.USDCOP
        currencyMessage = `${formatNumber(quantity)}COP equivalen a ${formatNumber(conversion)}USD`;
      }
    }

    axios.post('/message', {
      username,
      message: currencyMessage ?? input
    })

    setInput('')
  }

  return (
    <div className="App">
      <h2>Bienvenido {username}</h2>

      <form className='app__form' >
        <FormControl className='app__formControl' >
          <Input className='app__input' placeholder='Escribe un mensaje...' value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton className='app__iconButton' variant='text' color='primary' disabled={!input} onClick={sendMessage} type="submit" >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove className='flipMove__custom'>
        {
          messages.map(({ _id: id, username: user, message }) => (
            <Message key={id} message={message} username={user} currentUser={username} />
          ))
        }
      </FlipMove>
    </div>
  );
}
