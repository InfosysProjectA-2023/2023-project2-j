window.onload = function onLoad() {

	//formタグ上でのsubmitイベントを処理(HTML上でformは1つのみが前提)
	let form = document.getElementsByTagName("form");
	if(form.length > 0){
		form.addEventListener("submit", function(event){
			event.preventDefault(); //formタグの働きによるsubmitを抑制
			// 送信ボタンを取得（後で使う: 二重送信を防止する。）
			let button = document.getElementById('submit_btn');
			let url = form.action; //<form>タグのaction属性の値を利用する
			let method = form.method; //<form>タグのmethod属性の値を利用する
			let data = new FormData(form); //formタグの中身を送信可能なオブジェクトに変換
			let timeout = 10000; //送信時に失敗まで待つタイムアウトまでの時間(ミリ秒)
			let dataType = 'text'; //送受信するデータのタイプ
			let crossDomain = true;
			// 送信前
			let beforeSend = function(xhr, settings) {
				// ボタンを無効化し、二重送信を防止
				button.setAttribute('disabled', true);
			};
			// 応答後
			let complete = function(xhr, textStatus) {
				// ボタンを有効化し、再送信を許可
				button.removeAttribute('disabled');
			};
			const postData = async (url, method, data, timeout, dataType, crossDomain, beforeSend, complete) => {
				const response = await fetch(url, {
					method: method,
					body: data,
					timeout: timeout,
					dataType: dataType,
					crossDomain: crossDomain,
					beforeSend: beforeSend,
					complete: complete
				});
				if (response.ok) {
					const data = await response.json();
					return data;
				}
				else{
					alert("エラー：" + response.status+"\n以下のURLにアクセスできませんでした．"+url);
				}
			}
						
			// 通信成功時の処理
			postData(url, method, data, timeout, dataType, crossDomain, beforeSend, complete).then(function(data){
				//console.log(data); //デバッグ用に取得したJSONデータをコンソールに表示
				//console.log(data.review_list); //デバッグ用に取得したJSONデータのreview_listをコンソールに表示
				// 入力値を初期化
				form[0].reset();
				
				alert("ステータス："+data.Status+"\nメッセージ："+data.Message);

				location.reload();

			});
		});
	}
}
