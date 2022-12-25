// indexedDBの名前などの設定
const dbName = "kakeiboDB";
const storeName = "kakeiboStore";
const dbVersion = 1;

// データベース接続するデータベースが未作成なら新規作成する
let database = indexedDB.open(dbName, dbVersion);

// データベースとオブジェクトストアの作成
database.onupgradeneeded = function(event) {
  let db = event.target.result;
  db.createObjectStore(storeName, { keyPath: "id" });
  console.log("データベースを新規作成しました");
}

// データベースの接続に成功したときに発生するイベント
database.onsuccess = function(event) {
  let db = event.target.result;
  // 接続を解除する
  db.close();
  console.log("データベースに接続できました");
}
database.onerror = function(event) {
  console.log("データベースに接続できませんでした");
}

// フォームの内容をDBに登録する
function regist() {
  // フォームの入力チェック。falseが返されたら登録処理を中断
  if(inputCheck() == false) {
    return;
  }

  // ラジオボタンの取得
  let radio = document.getElementsByName("balance");
  let balance;
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked == true) {
      balance = radio[i].value;
      break;
    }
  }

  // フォームに入力された値を取得
  let date = document.getElementById("date").value;
  let amount = document.getElementById("amount").value;
  let memo = document.getElementById("memo").value;
  let category = document.getElementById("category").value;
  // ラジオボタンが収入を電卓時はカテゴリを「収入」とする
  if (balance == "収入") {
    category = "収入";
  }
  // データベースにデータを登録する
  insertData(balance, date, category, amount, memo);
}