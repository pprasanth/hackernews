import React from 'react';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { renderToString } from 'react-dom/server';

import App from '../src/App';

const app = express();
const PORT = process.env.PORT;

app.use(express.static('./dist'));
app.use(express.static('./public'));

app.get('/*', (req, res) => {
    const indexFile = path.resolve('./dist/index.html');
    const AppContainer = renderToString(<App />);
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Opps!!, Something gone wrong!');
        }

        res.status(200).send(data.replace('<div id="root"></div>', `<div id="root">${AppContainer}</div>`));
        // res.status(200).send(data);
    });
});

app.listen(PORT, () => console.log(`Server listening to localhost:${PORT}`));
