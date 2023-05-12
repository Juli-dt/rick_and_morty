const app = require("./app"); 
const { conn } = require("./DB_connection"); 

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`el servidor se levantó en el puerto: http://localhost:${PORT} pas`);
  await conn.sync({ force: true });
});

