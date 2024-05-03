import axios from "axios";
const express = require('express');
const app = express();

app.get('/eventbrite', async (req, res) => {
  try {
    const response = await axios.get('https://www.eventbriteapi.com/v3/organizations/174137383265/events?order_by=name_asc&expand=venue,ticket_availability&organizer_filter=33966304351&time_filter=current_future&page_size=100', {
      headers: {
        'Authorization': `Bearer E7FDKAIHD2ZPXKIK5R37`
      }
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

app.get('/eventbrite/:id', async (req, res) => {
  try {
    const id = req.params.id
    const response = await axios.get(`https://www.eventbriteapi.com/v3/events/${id}?expand=venue,ticket_availability`, {
      headers: {
        'Authorization': `Bearer E7FDKAIHD2ZPXKIK5R37`
      }
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = {
  path: '/api',
  handler: app
};
