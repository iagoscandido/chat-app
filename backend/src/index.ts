import { conversationRoutes } from "@/routes/conversation.routes";
import cors from "cors";
import e from "express";
import morgan from "morgan";
import { PORT } from "./config";
import { db } from "./db";

const app = e();

app.use(cors({ origin: "*" }));
app.use(e.json());
app.use(morgan("dev"));

app.use("/conversations", conversationRoutes);

const main = () => {
  try {
    const dbCheck = db.execute("SELECT 1");
    if (!dbCheck) throw new Error("Database connection failed");
    console.info("Database connection successful");

    app.listen(PORT, () => {
      console.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

main();
