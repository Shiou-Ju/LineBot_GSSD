// 引用linebot SDK
const linebot = require("linebot");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// 用於辨識Line Channel的資訊
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_TOEKN,
});

// 加入好友顯示的歡迎的訊息
bot.on("follow", function (event) {
  event.reply(
    `感謝您使用公示送達LINE BOT服務。\n您可以輸入應受送達人之名稱，系統將會自動顯示該送達人最近三筆的公示送達資料。\n\n使用方式：\n請輸入「搜尋 名字」（中間為半形空格）\n例如：「搜尋 王小明」`
  );
});;


// 當有人傳送訊息給Bot時
bot.on("message", function (event) {
  if(event.message.text.includes("搜尋 ")){
    if(event.message.text.includes("年度")){

    } else {
      let addressee = event.message.text.split("搜尋 ")[1];
      let queryStr =
        `https://gssd-server.herokuapp.com/api/v1/posts?addressee=${addressee}&limit=3`
      
      event
        .reply(`搜尋 ${addressee}的結果如下`)
        .then(function (data) {})
        .catch(function (error) {});
    }
  }

  else if (event.message.text==="測試 "){
    event
      .reply(`測試訊息：\n${event.message.text}`)
      .then(function (data) {})
      .catch(function (error) {});
  } 
  
  else {
      event
        .reply(
          "抱歉您的訊息目前不支援\n\n公示送達LINE服務使用方式：\n1. 搜尋應受送達人：\n請輸入「搜尋 名字」\n（中間為半形空格）\n例如：「搜尋 王小明」\n\n2. 查詢特定判決字號：\n請輸入「搜尋 判決字號」\n（中間為半形空格）\n例如：「搜尋 109年度家繼訴字第1號」"
        )
        .then(function (data) {})
        .catch(function (error) {});
  }
});

// Bot所監聽的webhook路徑與port
bot.listen("/linewebhook", 3000, function () {
  console.log("[BOT已準備就緒]");
});
