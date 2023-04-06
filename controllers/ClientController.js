const { response } = require("express");
const Client = require('../models/Client');

exports.createClient = (req, res) => {
    const name = req.body.name;

    const client = new Client({
    name: name,
    });

    client.save()
    .then(() => {
    res.status(201).json({ message: 'Client created successfully' });
    })
    .catch((error) => {
        res.status(500).json({ error: error });
    });
};
