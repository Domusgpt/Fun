const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/signup', (req, res) => {
    const email = req.body.email;
    if (email) {
        fs.appendFile('emails.txt', `${email}\n`, (err) => {
            if (err) {
                console.error('Failed to save email:', err);
                return res.status(500).send('Server error. Please try again later.');
            }
            res.send('Thank you for signing up!');
        });
    } else {
        res.status(400).send('Invalid email address.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
