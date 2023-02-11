class Disk{
    constructor(peg, w, h, weight){
        this.px = peg.px;
        this.py = peg.py+(peg.h/2)-(peg.w*1.5)-(peg.diskNum*h);
        this.w = w;
        this.h = h;
        this.moving=false;
        this.frompeg;
        this.topeg;
        this.temp_px;
        this.temp_py;
        this.phase;
        this.movingLen;
        this.weight = weight
        peg.diskNum++;
    }

    moveTo(from_peg, to_peg){
        this.frompeg = from_peg;
        this.topeg = to_peg;
        this.moving = true;
        diskMoving = true;
        this.phase = 1;
        this.movingLen = (this.frompeg.h/2)+this.py+this.h;
        this.temp_px = to_peg.px;
        this.temp_py = to_peg.py+(to_peg.h/2)-(to_peg.w*1.5)-(to_peg.diskNum*this.h);
        to_peg.diskNum++;
        from_peg.diskNum--;
    }

    display(){

        push();
        let moving_speed = speedSlider.value();
        if(this.moving){
            if(this.phase==1){
                if(this.movingLen>0){
                    this.py -= moving_speed;
                    this.movingLen -= moving_speed;
                }
                else{
                    this.phase = 2;
                }
            }
            if(this.phase==2){
                
                if(this.px < this.temp_px){
                    if(this.px+moving_speed>this.temp_px){
                        this.px = this.temp_px;
                        this.phase = 3;
                    }
                    else{
                        this.px += moving_speed;
                    }
                    
                }
                else if(this.px>this.temp_px){
                    if(this.px-moving_speed<this.temp_px){
                        this.px = this.temp_px;
                        this.phase = 3;
                    }
                    else{
                        this.px -= moving_speed;
                    }
                    
                }

                else{
                    this.phase = 3;
                }
            }
            if(this.phase==3){
                if(this.py<this.temp_py){
                    if(this.py+moving_speed>this.temp_py){
                        this.py = this.temp_py;
                        this.moving = false;
                        diskMoving = false;
                    }
                    else{
                        this.py += moving_speed;
                    }
                }
                else{
                    this.moving = false;
                    diskMoving = false;
                }
            }
        }
        translate(width/2, height/2);
        rectMode(CENTER);
        stroke(0,0,0);
        fill(161, 20, 255, 200);
        rect(this.px, this.py, this.w, this.h);
        fill(0,0,255);
        stroke(0,0,255);
        textSize(16);
        textAlign(CENTER);
        text(this.weight,this.px, this.py+this.h/3);
        pop();
    }

    

}