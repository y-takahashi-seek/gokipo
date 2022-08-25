// 負け処理ルーチン

//手札の合計枚数を計算の関数
function sumhand(p_id) {
  var sum_result = 0;
  for (var i = 0;i < yasai_su; i++) {
    sum_result += hand[p_id][i];
  }
  return sum_result;
}

//結果フェイズ
function kekkaPhase(){
    phase = 'kekka';
    //answerはkaitouフェイズ時のクリックで変数の値が決まっている
    if(answer == question){
      next_turn_player = turn_player;
    }else{
      next_turn_player = answer_player;
    }

    display();

//手札からカードを減らし場にカードを追加
    hand[turn_player][selected_yasai]--;
    field[next_turn_player][selected_yasai]++;
//敗北条件を満たしているかの確認
    if (field[next_turn_player][selected_yasai] >= 3){
      gameover_flag = 1;
    } else if (sumhand(next_turn_player) <= 0){
      gameover_flag = 2;
    }
}
function shuryouPhase(){
  phase = 'shuryou'
  display();

}
