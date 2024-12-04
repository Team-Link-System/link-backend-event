import express from "express";
import { initConfig } from "./config";

const app = express();
const port = process.env.PORT || 3000 as number;

const startServer = async() : Promise<void> =>{
  try{
    await initConfig();
    app.listen(port, () => {
      console.log(`LINK EVENT 서버 실행중 :  ${port}`);
    });
  }catch(err){
    console.error(err);
  }
}

startServer();