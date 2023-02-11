
function showDiskNumText() {
    var id = numSlider.elt.id;
    var display = document.getElementById(id).style.display;
    if (display != "none") {
        diskNum(60, 115);
    }
}

function showSpeedText() {
    var id = speedSlider.elt.id;
    var display = document.getElementById(id).style.display;
    if (display != "none") {
        textSpeed(btn_spaceing_x * 1, btn_spaceing_y * 5);
    }
}


function diskNum(x, y) {
    push();
    textSize(22);
    text("Disk Number:", x, y);
    pop();
}

function textSpeed(x, y) {
    push();
    textSize(22);
    text("Speed:", x, y);
    pop();
}
function textDestination(x, y) {
    push();
    textSize(22);
    text("Destination:", x, y);
    pop();
}