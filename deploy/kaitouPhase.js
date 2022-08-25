//解答フェイズ
//宣言がusoかhontouか判定する関数を定義する
function hantei(sel,dec){
  if(sel == dec){
    return "hontou";
  }else{
    return "uso"
  }
}

function kaitouPhase(){
  phase = 'kaitou'
  //selected_yasaiとdeclared_yasaiが以前のフェイズで確定している
  //usoかhontouか判定する
//  var answer = "mitei"
  question = hantei(selected_yasai,declared_yasai);
  display();

}
