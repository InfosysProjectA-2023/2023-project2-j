// Description: JSONデータを読み込んで，list_example.htmlの<div id="main_content">～</div>間に繰り返し要素を生成する

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

	const detail_html = "detail_example.html"; //個別詳細形式のページのHTMLファイル

	const json_url = "https://athena.abe-lab.jp/~hidenao/ProA_2023/Project2_example/data.json";
	// data.jsonでの動作が確認できたら，↑の行をコメント（//を先頭に付ける）して，↓の行のコメント//を外す
	//const json_url = "https://infosysprojecta-2023.github.io/2023-project2-各チームの記号(A～T)/data.json";

	let q = urlParam('q'); //?q=検索語で指定されたとき
	q = decodeURI(q); //URLエンコードされた文字列をスクリプトのコードによる文字列に戻す
	let category = urlParam('category'); //?category=カテゴリ名で指定されたとき
	category = decodeURI(category); //URLエンコードされた文字列をスクリプトのコードによる文字列に戻す
	//qやcategoryなどでの検索する場合は，以下の表示HTML作成の処理にif文を追加する
	//[カテゴリごとのページや検索の実行を行うページを実現するためには，list_example.htmlとreadJSON_list.jsをペアで複製する]

	const list_container_row = document.getElementById("list_container_row"); //id="list_container_row"の<div>タグを取得
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

	fetch_json(json_url).then(function(data){ //json_urlで読み出せるJSONデータ(data)の処理を行う
		//console.log(data); //デバッグ用に取得したJSONデータをコンソールに表示
		//ページ全体のタイトルなどの設定が必要であれば行う
		const title = document.getElementsByTagName("title"); //titleタグを取得
		const top_title = document.getElementById("top-title"); //ページの一番上の見出しの<div id="top-title">ところを取得
		const top_abstract = document.getElementById("top-abstract"); //ページの一番上の見出しの<div id="top-abstract">ところを取得

		let num=0; //項目の数を数える
		//JSONデータから繰り返し内容部分のHTMLを繰り返し生成
		for(let i=0; i<data.introduction_obj_list.length; i++){
			let elem = data.introduction_obj_list[i]; //JSONデータから１つの項目を取り出す
			let item_html='';

			//?q=検索語 を付けてelemの要素を検索する場合は，下記のif文を入れる（item_htmlの生成の文を囲む）
			//if(q == 0 || (q != 0 && elem.title.indexOf(q) != -1)) { //?q=が無いときはq==0，?q=があるとき(q!=0)はelemの要素（title, abstract, detailなど）にマッチ
			item_html += '<div class="col">';
			item_html += '<div class="card">'; //Bootstrapのcardを使って繰り返し要素を出力する（ここでは1段のみ）
			item_html += '<img class="card-img-top" src="photos/'+elem.image_file+'_thum.jpg" alt="'+elem.title+'の画像">'; //image_fileの値と対応する画像のファイル名に_thumを付けた.jpgファイルを用意する
			item_html += '<div class="card-body">';
			item_html += '<h5 class="card-title">'+elem.title+'</h5>';
			item_html += '<p class="card-text">'+elem.abstract+'</p>';
			item_html += '<a href="'+detail_html+'?id='+elem.id+'" class="card-link">詳細...</a>';
			item_html += '</div>';
			item_html += '</div>';
			item_html += '</div>';
			//} //if(elem.title.indexOf(q) != -1) {の終わり（先頭の//だけ消す）
			//”item_htmlの生成の文”はここまで

			list_container_row.innerHTML += item_html;//生成したHTMLを<div id="main_content">～</div>間に追加
			num++;
		}
	});
