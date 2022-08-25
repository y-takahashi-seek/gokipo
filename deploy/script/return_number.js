// 野菜名を野菜ナンバーに変換
function return_y_id(y_name){
	if(y_name == 'carrot') return 0;
	else if(y_name == 'nasu') return 1;
	else if(y_name == 'piiman') return 2;
	else if(y_name == 'shimonita') return 3;
	else return -1;
}

// 野菜ナンバーを野菜名に変換
function return_y_name(y_id){
	if (y_id == 0) return 'carrot';
	else if(y_id == 1) return 'nasu';
	else if(y_id == 2) return 'piiman';
	else if(y_id == 3) return 'shimonita';
	else return 'incorrect_id';
}

// プレイヤー名をプレイヤーナンバーに変換
function return_p_id(p_name){
	if(p_name == 'A') return 0;
	else if(p_name == 'B') return 1;
	else return -1;
}

// プレイヤーナンバーをプレイヤー名に変換
function return_p_name(p_id){
	if (p_id == 0) return 'A';
	else if(p_id == 1) return 'B';
	else return 'incorrect_id';
}