import authController from "./auth";
import adminController from "./admin";
import commentController from "./comment";
import postController from "./post";
import customerController from "./customer";
import categoryController from "./category";
import notificationController from "./notification";
import conversationController from "./conversation";
import messageController from "./message";
import sendEmailController from "./SendEmail";

let router = (app) => {
  app.use("/admin", adminController);
  app.use("/auth", authController);
  app.use("/comment", commentController);
  app.use("/customer", customerController);
  app.use("/category", categoryController);
  app.use("/post", postController);
  app.use("/notification", notificationController);
  app.use("/conversations", conversationController);
  app.use("/messages", messageController);
  app.use("/send", sendEmailController);
  app.use("/", (req, res) => {
    res.send("HELLO");
  });
};
module.exports = { router };
