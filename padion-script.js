setButtonImage("https://image.itmedia.co.jp/nl/articles/1408/26/ah_rk03.jpg");
setWindowDrag(0,0,350,60);

var UserteamHP;
function checkAlert(checkbox) {
if (checkbox.checked) {
    //   alert('Checked!');
    intervalID = setInterval(change_stage, 500);
}else{
    clearInterval(intervalID);
}
}

function showPrompt() {
    var userInput = prompt('ここに入力してください:');
    if (userInput != null) {
        // 入力された値を使用する処理をここに書く
        UserteamHP = userInput;
        // document.getElementById('checkbox-label').innerText = 'チェックボックス1 (' + UserteamHP + ')';
        alert('入力された値: ' + userInput);
    }
}

function change_stage(){
    // UserteamHP を使って検索する場合
    h5gg.searchNumber(UserteamHP, 'I32','0x00000000','0x200000000'); // HPをUserteamHPで検索
    let results = h5gg.getResults(20, 0);
    let filteredResults = [];

    // アドレスの末尾が '44' の結果を絞り込む
    for (let i = 0; i < results.length; i++) {
        let address = results[i].address;
        if (address.endsWith('44')) { // アドレスの末尾が '44' であるかを確認
            filteredResults.push(results[i]);
        }
    }

    // filteredResultsが空でないことを確認
    if (filteredResults.length > 0) {
        // アドレスの末尾が '44' のものを取得し、数値型として計算する
        let HPAddress = parseInt(filteredResults[0].address, 16);  // 数値型としてアドレスを扱う
        document.getElementById('checkbox-label').innerText = 'チェックボックス1 (0x' + filteredResults[0].address + ')';  // 表示用に0xを追加

        // clear の計算はそのままでOK
        let clear = HPAddress - 0x14;

        // setValueには0xプレフィックスをつけたアドレスを渡す
        h5gg.setValue("0x" + clear.toString(16), 0, "I32");  // アドレスを16進数で0x付きで設定
        h5gg.setValue("0x" + (clear + 4).toString(16), 0, "I32");  // 次のアドレスにも同様に0x付きで設定
    } else {
        console.log("No valid results found.");
    }
}


//他に処理を追加するよ