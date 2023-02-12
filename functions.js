function createDoms() {
    push();
    btn_spaceing_x = width / 36;
    btn_spaceing_y = height / 36;

    btn_start = createButton("Start");
    btn_start.position(btn_spaceing_x * 2, btn_spaceing_y);
    btn_start.id("runner");
    btn_start.attribute('onclick', 'run()');
    btnStyle(btn_start);


    btn_step = createButton("Next Step");
    btn_step.position(btn_spaceing_x * 10, btn_spaceing_y);
    btn_step.id("step");
    btn_step.attribute('onclick', 'diskMover()');
    btnStyle(btn_step);

    btn_reStart = createButton("Restart");
    btn_reStart.position(btn_spaceing_x * 18, btn_spaceing_y);
    btn_reStart.id("restart");
    btn_reStart.attribute('onclick', 'reStart()');
    btn_reStart.style("display", "none");
    btnStyle(btn_reStart);

   /* opt_destination = createSelect();
    opt_destination.position(btn_spaceing_x * 30, btn_spaceing_y*3);
    opt_destination.option('B');
    opt_destination.option('C');
    opt_destination.selected('C');
    opt_destination.id('destination');
    opt_destination.changed(destination);
    btnStyle(opt_destination, 3);*/


    //destinationh2 = createElement("h3", "Destination");
    //destinationh2.position(btn_spaceing_x * 30, 0);


    numSlider = createSlider(1, 11, 3);
    numSlider.position(btn_spaceing_x * 8, btn_spaceing_y * 8);
    numSlider.style('width', (btn_spaceing_x * 8) + 'px');
    numSlider.id("numSlider");

    numSliderh2 = createElement("h3", "Disk Number");
    numSliderh2.position(btn_spaceing_x * 8, btn_spaceing_y * 5);

    speedSlider = createSlider(1, 50, 5, 1);
    speedSlider.position(btn_spaceing_x * 26, btn_spaceing_y * 8);
    speedSlider.style('width', (btn_spaceing_x * 8) + 'px');
    speedSlider.id("speedSlider");

    speedSliderh2 = createElement("h3", "Speed");
    speedSliderh2.position(btn_spaceing_x * 26, btn_spaceing_y * 5);

    pop();
}

function btnStyle(btn, w = 6){
    btn.style("width", (btn_spaceing_x * w) + 'px');
    btn.style("height", (btn_spaceing_y*3) + 'px');
    btn.style("font-size", (btn_spaceing_y) + 'px');
}


function displayDoms() {
    if (totalDisk != numSlider.value()) {
        reStart();
    }
    if (!diskMoving && !runner && start) {
        btn_reStart.style('display', 'block');
        btn_step.style('display', 'block');
    }
    else {
        btn_reStart.style('display', 'none');
    }

    /*if (start) {
        opt_destination.style("display", "none");
        destinationh2.style("display", "none");
    }
    else {
        opt_destination.style("display", "block");
        destinationh2.style("display", "block");
    }*/
}

function createPegsDisks() {
    divx = width / 4;
    divy = height / 4;
    pegs[0] = new Pegs(-divx, 0, pegsw, pegsh, 0, "A");
    pegs[1] = new Pegs(0, 0, pegsw, pegsh, 0, "B");
    pegs[2] = new Pegs(divx, 0, pegsw, pegsh, 0, "C");
    pegs[3] = new Pegs(0, (pegsh / 2) + (pegsw / 2), (divx * 3), pegsw * 2, 0);

    totalDisk = numSlider.value();

    for (var i = 0; i < totalDisk; i++) {
        disks[i] = new Disk(pegs[0], (divx) - (i * (divx / totalDisk)), 20, totalDisk - i);
        diskA.push(disks[i]);
    }
    TowerOfHanoi(totalDisk, "A", dest, aux);
}

function animationController() {
    if (moves.length <= movesCounter) {
        solved = true;
        runner = false;
    }
    if (solved && !diskMoving) {
        numSlider.style('display', 'block');
        numSliderh2.style('display', 'block');
        btn_start.style('display', 'none');
        btn_step.style('display', 'none');
    }
    if (runner) {
        if (moves.length > movesCounter && !diskMoving) {
            moveDisk(moves[movesCounter++]);
        }
    }
    push();
    translate(0, btn_spaceing_y * 5);
    pegs.forEach(e => {
        e.display();
    });
    diskA.forEach(e => {
        e.display();
    });
    diskB.forEach(e => {
        e.display();
    });
    diskC.forEach(e => {
        e.display();
    });
    pop();
}

function pegToPeg(from, to, frompegIndex, topegIndex) {
    let popedDisk = from.pop();
    to.push(popedDisk);
    popedDisk.moveTo(pegs[frompegIndex], pegs[topegIndex]);
}


function moveDisk(move) {
    [from, to] = move;
    if (from == "A") {
        if (to == "B") {
            pegToPeg(diskA, diskB, 0, 1);
        }
        else {
            pegToPeg(diskA, diskC, 0, 2);
        }
    }
    if (from == "B") {
        if (to == "A") {
            pegToPeg(diskB, diskA, 1, 0);
        }
        else {
            pegToPeg(diskB, diskC, 1, 2);
        }
    }
    if (from == "C") {
        if (to == "A") {
            pegToPeg(diskC, diskA, 2, 0);
        }
        else {
            pegToPeg(diskC, diskB, 2, 1);
        }
    }
}

function diskMover() {
    start = true;
    //opt_destination.style('display', 'none');
    //destinationh2.style('display', 'none');
    if (!runner && !solved && !diskMoving) {
        moveDisk(moves[movesCounter++]);
        numSlider.style('display', 'none');
        numSliderh2.style('display', 'none');
        speedSlider.style('display', 'block');
    }

}

function run() {
    start = true;
    numSlider.style('display', 'none');
    numSliderh2.style('display', 'none');
    speedSlider.style('display', 'block');
    btn_step.style('display', 'none');
    if (!solved) {
        runner = !runner;
        document.getElementById("runner").textContent = runner ? "Stop" : "Start";
    }
}

function destination() {
    var d = document.getElementById("destination").value;
    if (d == "B") {
        dest = "B";
        aux = "C";
    }
    else {
        dest = "C";
        aux = "B";
    }
    reStart();
}

function reStart() {
    if (!runner && !diskMoving) {
        start = runner = solved = false;
        pegs = [];
        diskA = [];
        diskB = [];
        diskC = [];
        moves = [];
        movesCounter = 0;
        numSlider.style('display', 'block');
        numSliderh2.style('display', 'block');
        btn_reStart.style('display', 'none');
        btn_start.style('display', 'block');
        btn_step.style('display', 'block');
        document.getElementById("runner").textContent = "Start";
        createPegsDisks();
    }
}