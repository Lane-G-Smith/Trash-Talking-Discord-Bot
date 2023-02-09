// imports Giphy API
const GphApiClient = require('giphy-js-sdk-core');
client = GphApiClient("GifKey")

// sets Giphy API token
const giphyToken = 'YOUR_GIPHY_TOKEN';

if (message.content.startsWith('!meme')) {
    let query = message.content.split(' ').slice(1).join(' ');
};
const giphy = GphApiClient(giphyToken);

giphy
    .search('gifs', { q: query })
    .then((response) => {
    let totalResponses = response.data.length;
    let responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
    })
