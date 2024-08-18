import express from "express";


let configviewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set('view engine','ejs');
    app.set("views","./src/views") // tat ca cai file view tu tim den /src/ views
    
}
module.exports =configviewEngine;