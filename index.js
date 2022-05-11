const express = require("express");
const { google } = require("googleapis");
const csv = require("csvtojson");
var cors = require('cors')
const app = express();

app.use(cors())

app.get("/", async(req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "cred.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const sheetId = "1HczFhP-EvCvH5fr4fPXvCO-PTiWIt5hTfhhFXbrlwfo";

    const data = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId: sheetId
    });
    const rows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: sheetId,
        range: "Product Sheet"
    })
    const genreRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: sheetId,
        range: "Genre List"
    })
    let rowsToJson = []
    for (var i = 1; i < rows.data.values.length; i++) {
        var rowObject = {};
        for (var j = 0; j < rows.data.values[i].length; j++) {
            rowObject[rows.data.values[0][j]] = rows.data.values[i][j];
        }
        rowsToJson.push(rowObject);
    }
    let genreRowsToJson = []
    for (var i = 1; i < genreRows.data.values.length; i++) {
        var rowObject = {};
        for (var j = 0; j < genreRows.data.values[i].length; j++) {
            rowObject[genreRows.data.values[0][j]] = genreRows.data.values[i][j];
        }
        genreRowsToJson.push(rowObject);
    }
    res.send({ products: rowsToJson, genre: genreRowsToJson });
});

app.get("/slider", async(req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "cred.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const sheetId = "1HczFhP-EvCvH5fr4fPXvCO-PTiWIt5hTfhhFXbrlwfo";

    const rows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: sheetId,
        range: "Slider Management"
    })

    let genreRowsToJson = [];
    // rows.data.values.map((_, i) => {
    //     genreRowsToJson.push(_[0]);
    // })
    for (var i = 1; i < rows.data.values.length; i++) {
        var rowObject = {};
        for (var j = 0; j < rows.data.values[i].length; j++) {
            rowObject[rows.data.values[0][j]] = rows.data.values[i][j];
        }
        genreRowsToJson.push(rowObject);
    }
    res.send(genreRowsToJson);
});
app.get("/new-release", async(req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "cred.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const sheetId = "1HczFhP-EvCvH5fr4fPXvCO-PTiWIt5hTfhhFXbrlwfo";

    const rows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: sheetId,
        range: "New Releases Block"
    })

    let rowsToJson = []
    for (var i = 1; i < rows.data.values.length; i++) {
        var rowObject = {};
        for (var j = 0; j < rows.data.values[i].length; j++) {
            rowObject[rows.data.values[0][j]] = rows.data.values[i][j];
        }
        rowsToJson.push(rowObject);
    }
    res.send({ products: rowsToJson });
});

app.get("/blogs", async(req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "cred.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const sheetId = "1HczFhP-EvCvH5fr4fPXvCO-PTiWIt5hTfhhFXbrlwfo";

    const rows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: sheetId,
        range: "Blog"
    })

    let rowsToJson = []
    for (var i = 1; i < rows.data.values.length; i++) {
        var rowObject = {};
        for (var j = 0; j < rows.data.values[i].length; j++) {
            rowObject[rows.data.values[0][j]] = rows.data.values[i][j];
        }
        rowsToJson.push(rowObject);
    }
    res.send({ products: rowsToJson });
});

app.listen(process.env.PORT || 3000, (req, res) => console.log("Server is live on 3000"));