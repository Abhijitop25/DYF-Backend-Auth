const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig.js');
const ApiRoutes = require('./routes/index.js')
const db = require('./models/index.js');
const { User, Role } = require('./models/index.js');

const startServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());
    app.use('/api', ApiRoutes);


    app.listen(PORT, async () => {
        console.log(`server running on port ${PORT}`);
        //db.sequelize.sync({ alter: true });
        /*const u1 = await User.findByPk(4);
        const r1 = await Role.findByPk(1);
        u1.addRole(r1);*/
    })
}

startServer();