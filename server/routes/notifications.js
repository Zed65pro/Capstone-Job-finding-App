const express = require('express');
const auth = require('../src/middleware/auth')
const app = express.Router()

app.use(express.json())


import { sendNotificationToClient } from '../src/notify';

export const addMessage = async (req, res) => {
  const { name, message } = req.body;
  const columns = 'name, message';
  const values = `'${name}', '${message}'`;
  try {
    const data = await messagesModel.insertWithReturn(columns, values);
    const tokens = [];
    const notificationData = {
      title: 'New message',
      body: message,
    };
    sendNotificationToClient(tokens, notificationData);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};