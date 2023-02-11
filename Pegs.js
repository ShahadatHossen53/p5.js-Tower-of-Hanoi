class Pegs{
    constructor(px, py, w, h, diskNum, peg){
        this.px = px;
        this.py = py;
        this.w = w;
        this.h = h;
        this.diskNum = diskNum;
        this.peg = peg;
    }

    display(){
        push();
        translate(width/2, height/2);
        rectMode(CENTER);
        noStroke();
        fill(83, 109, 119);
        rect(this.px, this.py, this.w, this.h);
        if(this.peg != null){
            fill(0,0,255);
            textSize(24);
            text(this.peg,this.px-this.w, this.py+this.h/1.5);
        }
        pop();
    }

    
}