window.onload = function onLoad() {

    const search_btn = document.getElementById("search_btn");
    search_btn.addEventListener("click", function(event){
        const keyword = document.getElementById("search_keyword").value;//id=search_keywordのinputタグからキーワードを取得

        //readJSON_list.jsを含むリスト形式の検索を表示するhtmlファイル←list_example.htmlから作成する検索結果表示用htmlファイル
        //（検索結果を別の表示にする場合は，一覧形式のhtmlとreadJSON_list.jsとペアで複製すること）
        let search_url = "https://athena.abe-lab.jp/~hidenao/ProA_2023/Project2_example/list_example.html";
        //let search_url = "https://infosysprojecta-2023.github.io/2023-project2-グループ記号[A-T]/list_example.html";
            
        search_url +='?q='+keyword;//キーワードをURLに追加
        search_url = encodeURI(search_url); //URLエンコードを行い
        //window.location.href = search_url; //検索機能の付いたhtmlとreadJSON_list.jsのコピーのペアに結果を表示させる
        window.open(search_url); //検索機能の付いたhtmlとreadJSON_list.jsのコピーのペアに結果を表示させる（別タブで開く）
    });

};
