const xlsx = require('node-xlsx').default;
const express = require('express');
const app = express();
const port = 3000;

//API
app.get('/data', (req, res) => {
    const formation = xlsx.parse(`${__dirname}/formationprofessionnelle.xls`);
    const years = formation[0].data[7].slice(1);
    const values = formation[0].data.slice(8, 19).filter(function(item) {
        return item.length;
    });
    res.json({
        years: years,
        labels: values.map(function(item) {
            return item.shift();
        }),
        data: values.map(function(item) {
            return item.slice(0);
        }),
    });
})

// fichier qui va consulter l'API
app.get('/', (req, res) => {
    res.sendFile(__dirname+ '/index.html');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})