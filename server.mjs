import { opine, json } from "https://deno.land/x/opine@2.3.4/mod.ts";
//import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

//
import router from "./api/routes/index.js";

const app = opine();
const PORT = 7200;

// Use the JSON middleware to parse JSON request bodies
app.use(json());

// Set Pug as the view engine
//app.set("view engine", "pug");


// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Or specify your frontend's origin 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/", router);

app.listen(PORT);
console.log(`Server running on http://localhost:${PORT}`); 
