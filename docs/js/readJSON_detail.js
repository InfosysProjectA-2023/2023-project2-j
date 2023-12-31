window.onload = function onLoad() {

		//呼び出された際のURLパラメータの解析（.../detail1.html?id=1などのとき，変数名idの値(1)を取り出す）※テンプレートの時点では使っていない
		const urlParam = function(name){
			let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if(results != null){
				return results[1] || 0;
			}
			else{
				return 0;
			}
		};

		//const json_url = "https://athena.abe-lab.jp/~hidenao/ProA_2023/Project1_example/data.json";
		// data.jsonでの動作が確認できたら，↑の行をコメント（//を先頭に付ける）して，↓の行のコメント//を外す
		const json_url = "https://infosysprojecta-2023.github.io/2023-project2-j/data.json";

		var id = 0;
		let obj_id = document.getElementById("obj_id"); //紹介対象idを表す<input type="hidden" id="obj_id" value="0">があったら
		if(obj_id != null){
			id =obj_id.value; //obj_idの値を取得
		}
		if(id == 0){
			id = urlParam('id'); //?id=Nで指定されたとき
			if(obj_id != null){
				obj_id.value = id;
			}
		}

		const fetch_json = async (url) => {//urlの文字列のURLからidまたはqで指定した値を持つJSONオブジェクトを取得
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				const obj = data.introduction_obj_list[id]; //対象の１つ（一行）をオブジェクトとしてJSONから取り出す

				if(obj === undefined){
					alert('idの値は'+json_url+'のJSONデータ内にあるidの値としてください．');
					return false;
				}

				const main = document.getElementsByTagName("main"); //mainタグを取得

				if(main.length > 0){ //<main>～</main>があったら
					let head_title = document.getElementsByTagName("title"); //titleタグを取得
					head_title.item(0).innerText = obj.title; //<head><title>～</title></head>の間の～のところ（文字列）を変更
					let top_title = document.getElementById("top-title");
					top_title.innerText = obj.title; //ページの一番上の見出しの<div id="top-title">ところ（文字列）を変更
					//let top_abstract = document.getElementById("top-abstract");
					//top_abstract.innerText = obj.abstract; //ページの一番上の見出しの<div id="top-abstract">ところ（文字列）を変更
					//let page_headline = document.getElementsByTagName("h2");
					//if(page_headline.length > 0){ //<h2>のタグがあったら(すべてのh2タグが変更されるので，必要に応じてidで区別する)
						//page_headline.item(0).innerText = obj.title;
					//}

					//<img id="thumnail_img">タグのsrcの値をサムネイル画像のファイルに設定（photosフォルダに”画像名_thum.jpg”がある必要がある）
					let thumnail_img = document.getElementById("thumnail_img");
					if(thumnail_img != null){
						thumnail_img.setAttribute("src","./photos/"+obj.image_file+"_thum.jpg");
					}

					let abstract_text = document.getElementById("abstract");
					if(abstract_text != null){ //<p id="abstract"></p>のタグがあったら
						abstract_text.innerText = obj.abstract; //abstract（DBではカラム）の値に内容のテキストを変更
					}
					
					let abstract_2_text = document.getElementById("abstract_2");
					if(abstract_2_text != null){ //<p id="abstract_2"></p>のタグがあったら
						abstract_2_text.innerText = obj.abstract_2; //abstract_2（DBではカラム）の値に内容のテキストを変更
					}

					let detail_text = document.getElementById("detail");
					if(detail_text != null){//<p id="detail"></p>のタグがあったら
						detail_text.innerHTML = obj.detail; //detail（DBではカラム）の値に内容のHTMLを変更
					}

					let syosai_detail_text = document.getElementById("syosai_detail");
					if(syosai_detail_text != null){//<p id="syosai_detail"></p>のタグがあったら
						syosai_detail_text.innerHTML = obj.syosai_detail; //syosai_detail（DBではカラム）の値に内容のHTMLを変更
					}

					let jusyo_text = document.getElementById("jusyo");
					if(jusyo_text != null){//<p id="jusyo"></p>のタグがあったら
						jusyo_text.innerHTML = obj.jusyo; //jusyo（DBではカラム）の値に内容のHTMLを変更
					}

					let tyui_text = document.getElementById("tyui");
					if(tyui_text != null){//<p id="tyui"></p>のタグがあったら
						tyui_text.innerHTML = obj.tyui; //tyui（DBではカラム）の値に内容のHTMLを変更
					}

					let event_text = document.getElementById("event");
					if(event_text != null){ //<p id="event"></p>のタグがあったら
						event_text.innerHTML = obj.event; //event（DBではカラム）の値に内容のテキストを変更
					}

					let kotu_text = document.getElementById("kotu");
					if(kotu_text != null){ //<p id="kotu"></p>のタグがあったら
						kotu_text.innerHTML = obj.kotu; //kotu（DBではカラム）の値に内容のテキストを変更
					}
					
					let image_list = document.getElementById("image_list");
					if(image_list){//<div id="image_list">のタグがあったら
						image_list.innerHTML = ""; //id=image_listのタグの中のHTMLを空にする
						let image_list_html = ""; //HTMLを文字列として追加していく
						//各画像ファイルを「追加の画像」としてlightbox2のリストとして<img>タグを追加していく
						if(obj.image_file1 != null && obj.image_file1!=""){
							image_list_html += '<a href="./photos/'+obj.image_file1+'.jpg" data-lightbox="image-list">';
							image_list_html += '<img src="./photos/'+obj.image_file1+'_thum.jpg" class="col-3 mb-5 box-shadow"/></a>';
						}

						if(obj.image_file2 != null && obj.image_file2!=""){
							image_list_html += '<a href="./photos/'+obj.image_file2+'.jpg" data-lightbox="image-list">';
							image_list_html += '<img src="./photos/'+obj.image_file2+'_thum.jpg" class="col-3 mb-5 box-shadow"/></a>';
						}

						if(obj.image_file3 != null && obj.image_file3!=""){
							image_list_html += '<a href="./photos/'+obj.image_file3+'.jpg" data-lightbox="image-list">';
							image_list_html += '<img src="./photos/'+obj.image_file3+'_thum.jpg" class="col-3 mb-5 box-shadow"/></a>';
						}

						image_list.innerHTML = image_list_html; //id=image_listのタグの中のHTMLをimage_list_htmlの文字列にする
	 				}

					let star_ratings = document.getElementsByClassName("star-rating");

					if(star_ratings.length > 0){//<div class="star-rating">のタグがあったら，scoreの値によって黄色い☆の表示幅を変更する
						for(let i=0; i< star_ratings.length; i++){ //個別詳細のページでは1つだけだが，一覧ページでは複数もあり得る（要obj_idの値との一致をチェック）
							let star_rating = star_ratings.item(i);
							if(obj.score != null){
								const style = window.getComputedStyle(star_rating); //style属性の値を取得
								const font_size_str = style.getPropertyValue('font-size'); //font-sizeの値を取得
								const font_size = font_size_str.match(/\d+/)[0]; //○○pxの○○（数字の部分を抜き出す）
								const width = (obj.score / 5.0) *font_size*5; //px値にする(5は満点)
								let star_rating_front = star_rating.getElementsByClassName("star-rating-front");
								star_rating_front.item(0).style.width = width+"px"; //scoreの値をstar-rating-frontのstyle="width: ○○%"の値とする
							}
						}
					}
					let map_here = document.getElementById("map_here");
					if(map_here != null){//<div id="map_here">のタグがあったら
						//leaflet.jsを使ってOpen Street Mapを表示する
						// 地図のデフォルトの緯度経度(35.369744, 139.415493)と拡大率(拡大レベル16)
						let map = L.map('map_here').setView([obj.lat, obj.lng], 16);//map_hereはidの値
 
						// 描画する(Copyrightは消してはならない)
						L.tileLayer(
							'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
							{ attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }
						).addTo(map);

						//マーカーを地図に追加する
						L.marker([obj.lat, obj.lng]).addTo(map);
					}

					//下記のURLは変更の必要なし（WebAPIです）
					let url = "https://athena.abe-lab.jp/~hidenao/ProA_2023/Project2_reviewAPI/review_json.php?";

					let gid = "j";
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
						item_html += '<td>'+review.score+'</td>';
						item_html += '<td>'+review.text+'</td>';
						item_html += '</tr>';
						review_tag.innerHTML += item_html;//生成したHTMLを<tbody id="review_list">～</tbody>間に追加
						}
					});
				
				} //if(main != null)の終わり
				else{
					alert('<main>のタグは消さないでください．');
				}
			}
			else{ //urlにアクセスできなかった時のエラー処理
    			alert("エラー：" + "以下のURLにアクセスできませんでした．"+url);
			}
		}; //const fetch_json = async (url) => の終わり
		fetch_json(json_url); //非同期処理を開始
}
