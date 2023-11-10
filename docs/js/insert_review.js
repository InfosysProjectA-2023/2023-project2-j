window.onload = function onLoad() {

	//呼び出された際のURLパラメータの解析（.../detail.html?id=1などのとき，変数名idの値(1)を取り出す）
	const urlParam = function(name){
		let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if(results != null){
			return results[1] || 0;
		}
		else{
			return 0;
		}
	};

	//下記のURLは変更の必要なし（WebAPIです）
	let url = "https://athena.abe-lab.jp/~hidenao/ProA_2023/Project2_reviewAPI/review_json.php?";

	let gid = "X";
	gid = document.getElementById("gid"); //グループのidを表す<input type="hidden" id="gid">があったら
	if(gid != null){
			gid =gid.value; //obj_idの値を取得
	}
	else{
		alert("id=\"gid\"の属性が付いたinputタグ，あるいはdivタグをHTMLファイルに記入してあるか確認してください．");
	}
	url += "gid="+gid;

	let id = urlParam('id'); //?id=として渡されてきた値を読み取る
	let obj_id_input = document.getElementById("obj_id"); //id="obj_id"が付いた<input>タグがあったら
	obj_id_input.value = id; //id="obj_id"が付いた<input>タグのvalue=に値を設定
	if(id != 0){
		url += "&obj_id="+id;
	}
	else{
		url += "&obj_id="+id;
	}

	//urlにfetchAPIでアクセスして，JSONデータを取得
	const fetch_json = async (url) => {
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			return data;
		}
		else{
			alert("エラー：" + response.status+"\n以下のURLにアクセスできませんでした．"+url);
		}
	}

	fetch_json(url).then(function(data){ //JSONデータを取得したら
		//console.log(data); //デバッグ用に取得したJSONデータをコンソールに表示
		//console.log(data.review_list); //デバッグ用に取得したJSONデータのreview_listをコンソールに表示

		const review_tag = document.getElementById("review_list"); //id="review_list"の<table>タグを取得
		//JSONデータからレビューを一行ずつ取り出し，HTMLを繰り返し生成
		for(let i=0; i<data.review_list.length; i++){

			let review = data.review_list[i]; //JSONデータから１つのレビューを取り出す
			//※review_json.php側では，最初，新しい方から並び替え，5件を取得するようなSQL文としてある
			//scoreの計算などを適宜読み取り対象として加えてみよう
			let item_html = '<tr>';
			item_html += '<th>'+review.user_name+'</th>';
			item_html += '<td>'+review.text+'</td>';
			item_html += '</tr>';

			review_tag.innerHTML += item_html;//生成したHTMLを<tbody id="review_list">～</tbody>間に追加

		}
	});

}