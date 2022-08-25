// 初期処理ルーチン
// 定数定義

// 野菜の種類
var yasai_su = 4;
// 各野菜の枚数
var mai_su = 6;
// プレイヤー数
var player_su = 2;

// 変数定義

// 全カードの配列
var all_cards = ['carrot'   ,'carrot'   ,'carrot'   ,'carrot'   ,'carrot'   ,'carrot'   ,
                 'nasu'     ,'nasu'     ,'nasu'     ,'nasu'     ,'nasu'     ,'nasu'     ,
                 'piiman'   ,'piiman'   ,'piiman'   ,'piiman'   ,'piiman'   ,'piiman'   ,
                 'shimonita','shimonita','shimonita','shimonita','shimonita','shimonita' ];

// 山札の配列
var pile = new Array(yasai_su*mai_su);

// 手札の配列
var hand = new Array(player_su);



// 場の配列
var field = new Array(player_su);


// プレイヤー変数
var players = ['A','B'];

var turn_player = -1;
// alert(Math.floor( Math.random() * players.length ));
// alert(players[Math.floor( Math.random() * players.length )]);

var next_turn_player;
var answer_player;

// ゲームオーバフラグ  
var gameover_flag;
// 山札をシャッフルする
function pile_shuffle(array, num){
    var a = array;
    var t = [];
    var r = [];
    var l = a.length;
    var n = num < l ? num : l;
    while (n-- > 0) {
        var i = Math.random() * l | 0;
        r[n] = t[i] || a[i];
        --l;
        t[i] = t[l] || a[l];
    }
    return r;
}

// 手札にカードを配る
function dealer(){
    for(i=0;i<yasai_su*mai_su;i++){
        for(j=0;j<player_su;j++){
          hand[j][return_y_id(pile[i])]++;
          if(j == 0){
              i++ 
          }
        }
    }
}
function shokishori(){
  for(var i=0;i<player_su;i++){
    hand[i] = new Array(yasai_su);
    for(var j=0;j<yasai_su;j++){
      hand[i][j] = 0;
    }
  }
  for(var i=0;i<player_su;i++){
    field[i] = new Array(yasai_su);
    for(var j=0;j<yasai_su;j++){
      field[i][j] = 0;
    }
  }
  turn_player = -1;
  //next_turn_player = return_p_id(players[ Math.floor( Math.random() * players.length ) ]);//先手後手をランダムに
  next_turn_player = 0;//デバッグ用.先手はplayer1固定
  answer_player;
  gameover_flag = 0;
  pile = pile_shuffle(all_cards,24);
  dealer();

}

///////////かくにんよう
function test(){
  alert(hand);
}