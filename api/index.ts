import serverless from "serverless-http";
import app from "../src/types/app";

export default serverless(app);