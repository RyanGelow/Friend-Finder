const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const apiRoutes = require('./app/routes/apiRoutes');
const htmlRoutes = require('./app/routes/htmlRoutes');

app.use(express.static("./app/public"))

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));