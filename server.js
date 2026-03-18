import {loadEnvFile} from "node:process";
import app from "./app.js";
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
loadEnvFile(".env");
}

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});