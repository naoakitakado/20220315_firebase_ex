const functions = require("firebase-functions");
const express = require("express");
const requestPromise = require("request-promise-native");
const cors = require("cors");

const app = express();

app.use(cors());

const getDataFromApi = async (keyword) => {
    const requestUrl =
      "https://www.googleapis.com/books/v1/volumes?country=JP&q=intitle:";
    const result = await requestPromise(`${requestUrl}${keyword}`);
    return result;
  };

app.get("/hello", (req, res) => {
  res.send("Hello Express!");
});

app.get("/user/:userId", (req, res) => {
    const users = [
      { id: 1, name: "ジョナサン" },
      { id: 2, name: "ジョセフ" },
      { id: 3, name: "承太郎" },
      { id: 4, name: "仗助" },
      { id: 5, name: "ジョルノ" },
    ];
    // req.params.userIdでURLの後ろにつけた値をとれる．
    const targetUser = users.find(
      (user) => user.id === Number(req.params.userId)
    );
    res.send(targetUser);
  });

// エンドポイント追加
app.get("/gbooks/:keyword", async (req, res) => {
    // APIリクエストの関数を実行
    const response = await getDataFromApi(req.params.keyword);
    res.send(response);
  });

// 出力
const api = functions.https.onRequest(app);
module.exports = { api };



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// localサーバ
// http://localhost:5000/functions-8330d/us-central1/api/
//deployサーバ
//https://us-central1-functions-8330d.cloudfunctions.net/api/
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
