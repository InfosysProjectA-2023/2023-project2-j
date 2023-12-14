window.onload = function onLoad() {

    const search_btn = document.getElementById("search_btn");
    
    search_btn.addEventListener("click", function(event){
        const keyword = document.getElementById("search_keyword").value;//id=search_keywordのinputタグからキーワードを取得

        //readJSON_list.jsを含むリスト形式の検索を表示するhtmlファイル←list_example.htmlから作成する検索結果表示用htmlファイル
        //（検索結果を別の表示にする場合は，一覧形式のhtmlとreadJSON_list.jsとペアで複製すること）
        //let search_url = "https://athena.abe-lab.jp/~hidenao/ProA_2023/Project2_example/list_example.html";
        let search_url = "https://infosysprojecta-2023.github.io/2023-project2-j/list_j.html";
            
        search_url +='?q='+keyword;//キーワードをURLに追加
        search_url = encodeURI(search_url); //URLエンコードを行い
        window.location.href = search_url; //検索機能の付いたhtmlとreadJSON_list.jsのコピーのペアに結果を表示させる
        window.open(search_url); //検索機能の付いたhtmlとreadJSON_list.jsのコピーのペアに結果を表示させる（別タブで開く）
    });
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
			if(q == 0 || (q != 0 && elem.title.indexOf(q) != -1)) { //?q=が無いときはq==0，?q=があるとき(q!=0)はelemの要素（title, abstract, detailなど）にマッチ
			item_html += '<div class="col">';
			item_html += '<div class="card">'; //Bootstrapのcardを使って繰り返し要素を出力する（ここでは1段のみ）
			item_html += '<img class="card-img-top" src="photos/'+elem.image_file+'_thum.jpg" alt="'+elem.title+'の画像">'; //image_fileの値と対応する画像のファイル名に_thumを付けた.jpgファイルを用意する
			item_html += '<div class="card-body">';
			item_html += '<h5 class="card-title">'+elem.title+'</h5>';
			item_html += '<p class="card-text">'+elem.abstract+'</p>';
			item_html += '<a href="'+detail_html+'?id='+elem.id+'" class="card-link">詳細はこちらをクリック！</a>';
			item_html += '</div>';
			item_html += '</div>';
			item_html += '</div>';
			} //if(elem.title.indexOf(q) != -1) {の終わり（先頭の//だけ消す）
			//”item_htmlの生成の文”はここまで

			list_container_row.innerHTML += item_html;//生成したHTMLを<div id="main_content">～</div>間に追加
			num++;
		}
	});


};
