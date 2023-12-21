import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", async (req, res)=>{
try{
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid={your API Key}");
    const result = response.data;
    console.log(result);
    res.render("index.ejs",{
        data: result,
    });
}catch(error){
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "Failed to make request.",
    });
}
})

app.post("/", async(req, res)=>{
    try{
        const city = req.body.city;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={your API Key}`);
        const result = response.data;
        console.log(result);
        res.render("index.ejs",{
            data : result,
        });
    }catch(error){
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: "No city found.",
        });
    }
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
