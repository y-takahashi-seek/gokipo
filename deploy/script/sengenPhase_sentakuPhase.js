function sentakuPhase(){
	turn_player = next_turn_player;
    phase = 'sentaku';
    display();
}

function sengenPhase(){
    phase = 'sengen';
    display();
    if(turn_player == 0){
        answer_player = 1;
    }else{
        answer_player = 0;
    }
}