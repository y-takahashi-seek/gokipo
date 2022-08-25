

//領域に関する座標、大きさは将来的にこれで統一
//x0,y0:左上頂点のx座標、y座標
//x1,y1:右下頂点のx座標、y座標
function ryoiki(x0, y0, width, height) {
	this.x0 = x0;
	this.y0 = y0;
	this.width = width;
	this.height = height;
	this.x1 = x0 + width;
	this.y1 = y0 + height;
}

// function renzoku(x0,y0,width,height,interval){
// 	this.x0 = x0;
// 	this.y0 = y0;
// 	this.width = width;
// 	this.height = height;
// 	this.interval =interval;	
// }
//-----------カードの大きさ-----------
var h_card_width = 74;
var h_card_height = 92;

var f_card_width = 80;
var f_card_height = 100;

//中央領域に表示されるカードの大きさ
var shou_card = new ryoiki(0, 0, 34, 42.5);//宣言フェイズ、ゲーム終了フェイズ
var chuu_card = new ryoiki(0, 0, 42, 52);//宣言フェイズ、結果フェイズ
var dai_card = new ryoiki(0, 0, 58, 72.4);//解答フェイズ

//-----------ゲーム開始ボタンに関する座標やサイズ-----------
var gamestartFramePos = [800, 16];
var gamestartFrameSize = [100, 28];


//-----------手札領域に関する座標やサイズ-----------
//手前プレーヤーの手札領域に関する座標やサイズ
var handInterval = 2;
var myhandFramePos = [28, 636];
var myhandFrameSize = [944, 124];
var myhand_x_pos = new Array(5);
myhand_x_pos[0] = 45;
var myhand_y_pos = 662;

//奥プレーヤーの手札領域に関する座標やサイズ
var opphandFramePos = [28, 80];
var opphandFrameSize = [944, 124];
var opphand_x_pos = new Array(5);
opphand_x_pos[0] = 45;
var opphand_y_pos = 106;


//-----------場札領域に関する座標やサイズ-----------
var fieldFramePos = [38, 216];
var fieldFrameSize = [572, 408];
var fieldInterval = 122;

//手前プレーヤーの場札に関する座標やサイズ
var myfield_x_pos = new Array(5);
myfield_x_pos[0] = 58;
myfield_y_pos = 492;

//奥プレーヤーの場札領域に関する座標やサイズ
var oppfield_x_pos = new Array(5);
oppfield_x_pos[0] = 58;
oppfield_y_pos = 224;

//-----------判定領域に関する座標やサイズ-----------
var judgeFrame = new ryoiki(674, 240, 232, 280);
var hontouFrame = new ryoiki(636, 548, 140, 68);
var usoFrame = new ryoiki(808, 548, 140, 68);

//判定領域に表示されるカードの位置、大きさ
var hantei_card = new ryoiki(698, 264, 187, 233.4)

//-----------中央領域に関する座標やサイズ-----------
var messageFrame = new ryoiki(56, 356, 508, 120);
//宣言フェイズの中央領域
var selYasaiSengen = new ryoiki(222, 362, shou_card.width, shou_card.height);
var decYasaiSengenInterval = 24;
var decYasaiSengen = new Array(yasai_su);
decYasaiSengen[0] = new ryoiki(172, 416, chuu_card.width, chuu_card.height);
for (loop = 1; loop < yasai_su; loop++) {
	decYasaiSengen[loop] = new ryoiki(decYasaiSengen[loop - 1].x1 + decYasaiSengenInterval, decYasaiSengen[0].y0, chuu_card.width, chuu_card.height);
}
//解答フェイズの中央領域
var decYasaiKaitou = new ryoiki(182, 384, dai_card.width, dai_card.height);
//結果フェイズの中央領域
var okFrame = new ryoiki(450, 430, 60, 30)
var decYasaiKekka = new ryoiki(214, 372, chuu_card.width, chuu_card.height);
//ゲーム終了フェイズの中央領域
var selYasaiShuryou = new ryoiki(196, 378, shou_card.width, shou_card.height)



//フェイズ管理用変数
var phase = 'junbi';

var answer;//初期値未定
var selected_yasai = -1;
var declared_yasai = -1;



//canvasの定義（disoplay）等で使用
var cnvs = document.getElementById('canvas');
var ctx = cnvs.getContext('2d');

function init() {
	shokishori();
	turn_player = next_turn_player;//sengenPhase作成し次第移動
	handclick();
	display();
}

function display() {//---------------ｄisplay関数---------------

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//---------------画像のロード---------------
	var img = new Image();
	var img2 = new Image();
	var img3 = new Image();
	var img4 = new Image();
	var imgUra = new Image();
	img.src = "./image/carrot.png";
	img2.src = "./image/nasu.png";
	img3.src = "./image/piiman.png";
	img4.src = "./image/shimonita.png";
	imgUra.src = "./image/haimen.png";


	//---------------ターンプレーヤーの表示---------------
	ctx.fillStyle = 'rgb(250,255,253)';
	ctx.fillRect(32, 16, 300, 48);
	if (phase != 'junbi') {
		ctx.font = '20px sans-serif';
		ctx.fillStyle = '#9FE4FE'
		ctx.strokeStyle = '#FEA7D6'
		ctx.strokeText(players[turn_player] + 'さんのターンです', 36, 16 + 38);
	}

	//---------------ゲーム開始ボタンの表示---------------
	ctx.fillStyle = 'rgb(250,255,253)';
	ctx.fillRect(gamestartFramePos[0], gamestartFramePos[1], gamestartFrameSize[0], gamestartFrameSize[1]);
	ctx.font = '20px sans-serif';
	ctx.fillStyle = '#9FE4FE'
	ctx.strokeStyle = '#FEA7D6'
	ctx.strokeText('ゲーム開始', 800, 16 + 28 - 5);

	//---------------フェイズ表示(デバッグ用)---------------
	ctx.fillStyle = 'rgb(250,255,253)';
	ctx.fillRect(500, 16, 150, 28);
	ctx.font = '20px sans-serif';
	ctx.fillStyle = '#9FE4FE'
	ctx.strokeStyle = '#FEA7D6'
	ctx.strokeText(phase, 500, 16 + 28 - 5);



	//準備フェイズは手札に領域にカード裏面を表示
	if (phase == 'junbi') {
		imgUra.onload = function () {
			for (var loop = 0; loop < 12; loop++) {
				ctx.drawImage(imgUra, myhand_x_pos[0] + loop * (h_card_width + handInterval), myhand_y_pos, h_card_width, h_card_height);
				ctx.drawImage(imgUra, opphand_x_pos[0] + loop * (h_card_width + handInterval), opphand_y_pos, h_card_width, h_card_height);
			}
		}
	}


	//---------------手前プレーヤーの手札の表示---------------
	ctx.fillStyle = 'rgb(250,255,253)';
	ctx.fillRect(myhandFramePos[0], myhandFramePos[1], myhandFrameSize[0], myhandFrameSize[1]);
	ctx.strokeText('Aさんの手札', myhandFramePos[0] + 5, myhandFramePos[1] + 20);


	for (var i = 0; i < hand[0][0]; i++) {
		ctx.drawImage(img, myhand_x_pos[0] + (h_card_width + handInterval) * i, myhand_y_pos, h_card_width, h_card_height);
	}

	myhand_x_pos[1] = myhand_x_pos[0] + (h_card_width + handInterval) * i;

	for (var j = 0; j < hand[0][1]; j++) {
		ctx.drawImage(img2, myhand_x_pos[1] + (h_card_width + handInterval) * j, myhand_y_pos, h_card_width, h_card_height);
	}
	myhand_x_pos[2] = myhand_x_pos[1] + (h_card_width + handInterval) * j;

	for (var k = 0; k < hand[0][2]; k++) {
		ctx.drawImage(img3, myhand_x_pos[2] + (h_card_width + handInterval) * k, myhand_y_pos, h_card_width, h_card_height);
	}
	myhand_x_pos[3] = myhand_x_pos[2] + (h_card_width + handInterval) * k;

	for (var l = 0; l < hand[0][3]; l++) {
		ctx.drawImage(img4, myhand_x_pos[3] + (h_card_width + handInterval) * l, myhand_y_pos, h_card_width, h_card_height);
	}
	myhand_x_pos[4] = myhand_x_pos[3] + (h_card_width + handInterval) * l;

	//---------------奥プレーヤーの手札の表示---------------
	ctx.fillStyle = 'rgb(250,255,253)';
	ctx.fillRect(opphandFramePos[0], opphandFramePos[1], opphandFrameSize[0], opphandFrameSize[1]);
	ctx.strokeText('Bさんの手札', opphandFramePos[0] + 5, opphandFramePos[1] + 20);

	for (var i = 0; i < hand[1][0]; i++) {
		ctx.drawImage(img, opphand_x_pos[0] + (h_card_width + handInterval) * i, opphand_y_pos, h_card_width, h_card_height);
	}
	opphand_x_pos[1] = opphand_x_pos[0] + (h_card_width + handInterval) * i;

	for (var j = 0; j < hand[1][1]; j++) {
		ctx.drawImage(img2, opphand_x_pos[1] + (h_card_width + handInterval) * j, opphand_y_pos, h_card_width, h_card_height);
	}
	opphand_x_pos[2] = opphand_x_pos[1] + (h_card_width + handInterval) * j;

	for (var k = 0; k < hand[1][2]; k++) {
		ctx.drawImage(img3, opphand_x_pos[2] + (h_card_width + handInterval) * k, opphand_y_pos, h_card_width, h_card_height);
	}
	opphand_x_pos[3] = opphand_x_pos[2] + (h_card_width + handInterval) * k;

	for (var l = 0; l < hand[1][3]; l++) {
		ctx.drawImage(img4, opphand_x_pos[3] + (h_card_width + handInterval) * l, opphand_y_pos, h_card_width, h_card_height);
	}
	opphand_x_pos[4] = opphand_x_pos[3] + (h_card_width + handInterval) * l;

	//---------------場の枠の表示---------------
	ctx.fillStyle = 'rgb(231,225,143)';
	ctx.fillRect(fieldFramePos[0], fieldFramePos[1], fieldFrameSize[0], fieldFrameSize[1]);

	//---------------手前プレーヤーの場札の表示---------------
	for (var i = 0; i < field[0][0]; i++) {
		ctx.drawImage(img, myfield_x_pos[0] + i * 12, myfield_y_pos + i * 12, f_card_width, f_card_height);
	}
	myfield_x_pos[1] = myfield_x_pos[0] + fieldInterval;

	for (var i = 0; i < field[0][1]; i++) {
		ctx.drawImage(img2, myfield_x_pos[1] + i * 12, myfield_y_pos + i * 12, f_card_width, f_card_height);
	}
	myfield_x_pos[2] = myfield_x_pos[1] + fieldInterval;

	for (var i = 0; i < field[0][2]; i++) {
		ctx.drawImage(img3, myfield_x_pos[2] + i * 12, myfield_y_pos + i * 12, f_card_width, f_card_height);
	}
	myfield_x_pos[3] = myfield_x_pos[2] + fieldInterval;

	for (var i = 0; i < field[0][3]; i++) {
		ctx.drawImage(img4, myfield_x_pos[3] + i * 12, myfield_y_pos + i * 12, f_card_width, f_card_height);
	}
	myfield_x_pos[4] = myfield_x_pos[3] + fieldInterval;

	//---------------奥プレーヤーの場札の表示---------------	
	for (var i = 0; i < field[1][0]; i++) {
		ctx.drawImage(img, oppfield_x_pos[0] + i * 12, oppfield_y_pos + i * 12, f_card_width, f_card_height);
	}
	oppfield_x_pos[1] = oppfield_x_pos[0] + fieldInterval;

	for (var i = 0; i < field[1][1]; i++) {
		ctx.drawImage(img2, oppfield_x_pos[1] + i * 12, oppfield_y_pos + i * 12, f_card_width, f_card_height);
	}
	oppfield_x_pos[2] = oppfield_x_pos[1] + fieldInterval;

	for (var i = 0; i < field[1][2]; i++) {
		ctx.drawImage(img3, oppfield_x_pos[2] + i * 12, oppfield_y_pos + i * 12, f_card_width, f_card_height);
	}
	oppfield_x_pos[3] = oppfield_x_pos[2] + fieldInterval;

	for (var i = 0; i < field[1][3]; i++) {
		ctx.drawImage(img4, oppfield_x_pos[3] + i * 12, oppfield_y_pos + i * 12, f_card_width, f_card_height);
	}
	oppfield_x_pos[4] = oppfield_x_pos[3] + fieldInterval;


	//---------------判定領域---------------
	ctx.fillStyle = 'rgb(250,255,253)';
	ctx.fillRect(judgeFrame.x0, judgeFrame.y0, judgeFrame.width, judgeFrame.height);//判定領域

	//----本当ボタン----
	ctx.fillStyle = 'rgb(250,255,253)';
	ctx.fillRect(hontouFrame.x0, hontouFrame.y0, hontouFrame.width, hontouFrame.height);
	ctx.font = '50px sans-serif';
	ctx.fillStyle = '#9FE4FE';
	ctx.strokeStyle = '#FEA7D6';
	ctx.strokeText('本当', hontouFrame.x0, hontouFrame.y1 - 15);

	//----嘘ボタン----
	ctx.fillStyle = 'rgb(250,255,253)';
	ctx.fillRect(usoFrame.x0, usoFrame.y0, usoFrame.width, usoFrame.height);
	ctx.font = '50px sans-serif';
	ctx.fillStyle = '#9FE4FE';
	ctx.strokeStyle = '#FEA7D6';
	ctx.strokeText('嘘', usoFrame.x0, usoFrame.y1 - 15);

	if (phase == 'kaitou') {
		ctx.drawImage(imgUra, hantei_card.x0, hantei_card.y0, hantei_card.width, hantei_card.height);
	}
	if (phase == 'kekka') {
		if (selected_yasai == 0) ctx.drawImage(img, hantei_card.x0, hantei_card.y0, hantei_card.width, hantei_card.height);
		if (selected_yasai == 1) ctx.drawImage(img2, hantei_card.x0, hantei_card.y0, hantei_card.width, hantei_card.height);
		if (selected_yasai == 2) ctx.drawImage(img3, hantei_card.x0, hantei_card.y0, hantei_card.width, hantei_card.height);
		if (selected_yasai == 3) ctx.drawImage(img4, hantei_card.x0, hantei_card.y0, hantei_card.width, hantei_card.height);
	}

	//---------------中央のメッセージ領域---------------
	ctx.fillStyle = 'rgb(250,255,253)';
	ctx.fillRect(messageFrame.x0, messageFrame.y0, messageFrame.width, messageFrame.height);
	ctx.fillStyle = 'rgb(250,0,0)';
	//-----選択フェイズ------
	if (phase == 'sentaku') {
		ctx.font = '26px sans-serif';
		ctx.fillStyle = '#9FE4FE';
		ctx.strokeStyle = '#FEA7D6';
		ctx.strokeText(players[turn_player] + 'さんは手札からカードを選択してください', messageFrame.x0 + 20, messageFrame.y0 + messageFrame.height / 2)
	}
	//-----宣言フェイズ------
	if (phase == 'sengen') {
		ctx.drawImage(img, decYasaiSengen[0].x0, decYasaiSengen[0].y0, decYasaiSengen[0].width, decYasaiSengen[0].height);
		ctx.drawImage(img2, decYasaiSengen[1].x0, decYasaiSengen[1].y0, decYasaiSengen[1].width, decYasaiSengen[1].height);
		ctx.drawImage(img3, decYasaiSengen[2].x0, decYasaiSengen[2].y0, decYasaiSengen[2].width, decYasaiSengen[2].height);
		ctx.drawImage(img4, decYasaiSengen[3].x0, decYasaiSengen[3].y0, decYasaiSengen[3].width, decYasaiSengen[3].height);
		ctx.font = '16px sans-serif';
		ctx.fillStyle = '#9FE4FE';
		ctx.strokeStyle = '#FEA7D6';
		ctx.strokeText('あなたが選んだのは', messageFrame.x0 + 10, messageFrame.y0 + 16 * 2);
		ctx.strokeText("このカードを", messageFrame.x0 + 10, messageFrame.y0 + 16 * 6);
		ctx.strokeText("と宣言する", messageFrame.x0 + 380, messageFrame.y0 + 16 * 6);
		if (selected_yasai == 0) ctx.drawImage(img, selYasaiSengen.x0, selYasaiSengen.y0, selYasaiSengen.width, selYasaiSengen.height);
		if (selected_yasai == 1) ctx.drawImage(img2, selYasaiSengen.x0, selYasaiSengen.y0, selYasaiSengen.width, selYasaiSengen.height);
		if (selected_yasai == 2) ctx.drawImage(img3, selYasaiSengen.x0, selYasaiSengen.y0, selYasaiSengen.width, selYasaiSengen.height);
		if (selected_yasai == 3) ctx.drawImage(img4, selYasaiSengen.x0, selYasaiSengen.y0, selYasaiSengen.width, selYasaiSengen.height);
	}
	//-----解答フェイズ------
	if (phase == 'kaitou') {
		ctx.font = '16px sans-serif';
		ctx.fillStyle = '#9FE4FE';
		ctx.strokeStyle = '#FEA7D6';
		ctx.strokeText(players[turn_player] + "さんの宣言は", messageFrame.x0 + 10, messageFrame.y0 + 16 * 4.5);
		ctx.strokeText(players[answer_player] + "さんは「本当」か「嘘」か選択してください", messageFrame.x0 + 210, messageFrame.y0 + 16 * 4.5);

		if (declared_yasai == 0) ctx.drawImage(img, decYasaiKaitou.x0, decYasaiKaitou.y0, decYasaiKaitou.width, decYasaiKaitou.height);
		if (declared_yasai == 1) ctx.drawImage(img2, decYasaiKaitou.x0, decYasaiKaitou.y0, decYasaiKaitou.width, decYasaiKaitou.height);
		if (declared_yasai == 2) ctx.drawImage(img3, decYasaiKaitou.x0, decYasaiKaitou.y0, decYasaiKaitou.width, decYasaiKaitou.height);
		if (declared_yasai == 3) ctx.drawImage(img4, decYasaiKaitou.x0, decYasaiKaitou.y0, decYasaiKaitou.width, decYasaiKaitou.height);
	}


	//-----結果フェイズ------
	if (phase == 'kekka') {

		ctx.font = '16px sans-serif';
		ctx.fillStyle = '#9FE4FE';
		ctx.strokeStyle = '#FEA7D6';
		ctx.strokeText(players[turn_player] + 'さんの宣言', messageFrame.x0 + 10, decYasaiKekka.y0 + decYasaiKekka.height / 2)
		ctx.strokeText(players[answer_player] + 'さんの宣言', messageFrame.x0 + 10, decYasaiKekka.y0 + decYasaiKekka.height + 30)
		if (answer == 'hontou') ctx.strokeText("「本当」", decYasaiKekka.x0, decYasaiKekka.y0 + decYasaiKekka.height + 30);
		if (answer == 'uso') ctx.strokeText("「嘘」", decYasaiKekka.x0, decYasaiKekka.y0 + decYasaiKekka.height + 30);

		if (declared_yasai == 0) ctx.drawImage(img, decYasaiKekka.x0, decYasaiKekka.y0, decYasaiKekka.width, decYasaiKekka.height);
		if (declared_yasai == 1) ctx.drawImage(img2, decYasaiKekka.x0, decYasaiKekka.y0, decYasaiKekka.width, decYasaiKekka.height);
		if (declared_yasai == 2) ctx.drawImage(img3, decYasaiKekka.x0, decYasaiKekka.y0, decYasaiKekka.width, decYasaiKekka.height);
		if (declared_yasai == 3) ctx.drawImage(img4, decYasaiKekka.x0, decYasaiKekka.y0, decYasaiKekka.width, decYasaiKekka.height);

		ctx.font = '20px sans-serif';
		ctx.fillStyle = '#9FE4FE';
		ctx.strokeStyle = '#FEA7D6';
		if (next_turn_player == 0) ctx.strokeText("Aさんの負け", 300, decYasaiKekka.y0 + decYasaiKekka.height / 2);
		if (next_turn_player == 1) ctx.strokeText("Bさんの負け", 300, decYasaiKekka.y0 + decYasaiKekka.height / 2);

		ctx.fillRect(okFrame.x0, okFrame.y0, okFrame.width, okFrame.height);
		ctx.strokeText('OK', okFrame.x0, okFrame.y1 - 15);
	}
	//-----ゲーム終了フェイズ------
	if (phase == 'shuryou') {
		if (gameover_flag == 1) {
			if (selected_yasai == 0) ctx.drawImage(img, selYasaiShuryou.x0, selYasaiShuryou.y0, selYasaiShuryou.width, selYasaiShuryou.height);
			if (selected_yasai == 1) ctx.drawImage(img2, selYasaiShuryou.x0, selYasaiShuryou.y0, selYasaiShuryou.width, selYasaiShuryou.height);
			if (selected_yasai == 2) ctx.drawImage(img3, selYasaiShuryou.x0, selYasaiShuryou.y0, selYasaiShuryou.width, selYasaiShuryou.height);
			if (selected_yasai == 3) ctx.drawImage(img4, selYasaiShuryou.x0, selYasaiShuryou.y0, selYasaiShuryou.width, selYasaiShuryou.height);
			ctx.font = '16px sans-serif';
			ctx.fillStyle = '#9FE4FE';
			ctx.strokeStyle = '#FEA7D6';
			ctx.strokeText("が3枚揃ったので…", selYasaiShuryou.x0 + selYasaiShuryou.width + 10, selYasaiShuryou.y0 + selYasaiShuryou.height / 2,);
			ctx.font = '20px sans-serif';
			ctx.strokeText(players[next_turn_player] + "さんの敗北です", selYasaiShuryou.x0, selYasaiShuryou.y0 + selYasaiShuryou.height * 2);

		}
	}


}

function handclick() {//---------------click時の処理---------------
	//マウスイベントの設定
	cnvs.addEventListener('click', clickfunc, false);


	//クリックされた時に実行
	function clickfunc(event) {
		//座標の初期化
		var x = 0;
		var y = 0;
		//クリックされたときのカーソルの位置を取得
		x = event.clientX - canvas.offsetLeft;
		y = event.clientY - canvas.offsetTop;
		//        alert('x ='+ x+'y ='+ y);

		//game開始ボタンクリック時の処理
		if (gamestartFramePos[0] <= x && x <= gamestartFramePos[0] + gamestartFrameSize[0] && gamestartFramePos[1] <= y && y <= gamestartFramePos[1] + gamestartFrameSize[1]) {
			shokishori();
			sentakuPhase();
		}

		//*******************************
		//		turn_player =1;//デバッグ用(ターンプレーヤーを奥プレーヤーで固定)
		// 		display();
		// //*******************************		

		//選択フェイズ、宣言フェイズ時のクリック処理
		if (phase == 'sentaku' || phase == 'sengen') {
			if (turn_player == 0) {
				if (clickedMyYasaiSentaku(x, y) != -1) {
					selected_yasai = clickedMyYasaiSentaku(x, y);
					//					alert('selected_yasai='+selected_yasai);
					sengenPhase();
				}
			}
			else if (turn_player == 1) {
				if (clickedOppYasaiSentaku(x, y) != -1) {
					selected_yasai = clickedOppYasaiSentaku(x, y);
					//					alert('selected_yasai='+selected_yasai);
					sengenPhase();
				}
			}
		}
		//宣言フェイズ時のクリック処理
		/*タスク:clickedYasaiSengen()の実装*/
		if (phase == 'sengen') {
			if (clickedYasaiSengen(x, y) != -1) {
				declared_yasai = clickedYasaiSengen(x, y);
				//				alert('declared_yasai='+declared_yasai);
				kaitouPhase();
			}
		}

		//解答フェイズ時のクリック処理
		if (phase == 'kaitou') {
			if (clickedHontouUsoKaitou(x, y) != 'neither') {
				answer = clickedHontouUsoKaitou(x, y);
				//		 		alert('answer='+answer);
				kekkaPhase();
			}
		}
		//結果表示フェイズ時のクリック処理
		if (phase == 'kekka') {
			if (okFrame.y0 <= y && y <= okFrame.y1) {
				if (okFrame.x0 <= x && x <= okFrame.x1) {
					if (gameover_flag == 0) {
						sentakuPhase();
					} else {
						shuryouPhase();
					}
				}
			}
		}
	}
}

//---------マウスの位置情報に関する関数群---------
//
function clickedMyYasaiSentaku(mx, my) {
	if (myhand_y_pos <= my && my <= myhand_y_pos + h_card_height) {   //縦の判定
		if (myhand_x_pos[0] <= mx && mx <= myhand_x_pos[1] - 2) {//マウスが人参の上の場合
			return 0;
		}
		else if (myhand_x_pos[1] <= mx && mx <= myhand_x_pos[2] - 2) {//マウスがなすの上の場合
			return 1;
		}
		else if (myhand_x_pos[2] <= mx && mx <= myhand_x_pos[3] - 2) {//マウスがピーマンの上の場合
			return 2;
		}
		else if (myhand_x_pos[3] <= mx && mx <= myhand_x_pos[4] - 2) {//マウスが下仁田ネギの上の場合
			return 3;
		} else {
			return -1;
		}
	} else { //縦の判定から外れた場合
		return -1;
	}
}
function clickedOppYasaiSentaku(mx, my) {
	if (opphand_y_pos <= my && my <= opphand_y_pos + h_card_height) {   //縦の判定
		if (opphand_x_pos[0] <= mx && mx <= opphand_x_pos[1] - 2) {//マウスが人参の上の場合
			return 0;
		}
		else if (opphand_x_pos[1] <= mx && mx <= opphand_x_pos[2] - 2) {//マウスがなすの上の場合
			return 1;
		}
		else if (opphand_x_pos[2] <= mx && mx <= opphand_x_pos[3] - 2) {//マウスがピーマンの上の場合
			return 2;
		}
		else if (opphand_x_pos[3] <= mx && mx <= opphand_x_pos[4] - 2) {//マウスが下仁田ネギの上の場合
			return 3;
		} else {
			return -1;
		}
	} else { //縦の判定から外れた場合
		return -1;
	}
}
function clickedYasaiSengen(mx, my) {
	if (decYasaiSengen[0].y0 <= my && my <= decYasaiSengen[0].y1) {   //縦の判定
		if (decYasaiSengen[0].x0 <= mx && mx <= decYasaiSengen[0].x1) {//マウスが人参の上の場合
			return 0;
		}
		else if (decYasaiSengen[1].x0 <= mx && mx <= decYasaiSengen[1].x1) {//マウスがなすの上の場合
			return 1;
		}
		else if (decYasaiSengen[2].x0 <= mx && mx <= decYasaiSengen[2].x1) {//マウスがピーマンの上の場合
			return 2;
		}
		else if (decYasaiSengen[3].x0 <= mx && mx <= decYasaiSengen[3].x1) {//マウスが下仁田ネギの上の場合
			return 3;
		} else {
			return -1;
		}
	} else { //縦の判定から外れた場合
		return -1;
	}
}

function clickedHontouUsoKaitou(mx, my) {
	if (hontouFrame.y0 <= my && my <= hontouFrame.y1) {   //縦の判定
		if (hontouFrame.x0 <= mx && mx <= hontouFrame.x1) {//マウスが本当の上の場合
			return 'hontou';
		}
		else if (usoFrame.x0 <= mx && mx <= usoFrame.x1) {//マウスが嘘の上の場合
			return 'uso';
		} else {
			return 'neither'
		}
	} else {
		return 'neither';
	}
}
function hand_increment(player_id, yasai_id) {
	hand[player_id][yasai_id]++;
}
function hand_decrement(player_id, yasai_id) {
	hand[player_id][yasai_id]--;
	if (hand[player_id][yasai_id] <= 0) hand[player_id][yasai_id] = 0;
}
function field_increment(player_id, yasai_id) {
	field[player_id][yasai_id]++;
}
function field_decrement(player_id, yasai_id) {
	field[player_id][yasai_id]--;
	if (field[player_id][yasai_id] <= 0) field[player_id][yasai_id] = 0;
}


