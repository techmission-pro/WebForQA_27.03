const express = require('express');
const app = express();
const port = 3000;

const currencies = require('./currencies');

app.get('/', (req, res) => {
    res.send('Hello Web For QA!');
});

app.get('/currencies/csv', (req, res) => {
    currencies.getAllCurrencies().then(result => {
        const content = result.map(item => [item.currencyA, item.currencyB, item.rateBuy, item.rateSell, item.rateCross].join(';')).join('\n');
        res.send(content);
    });

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});