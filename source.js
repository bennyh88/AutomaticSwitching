class source {

    constructor(Xloc, Yloc, boxSize, uniqueID, sourceWidth) {
        this.Xloc = Xloc;
        this.Yloc = Yloc;
        this.boxSize = boxSize;
        this.sourceWidth = sourceWidth;
        this.uniqueID = uniqueID;
        this.hasPower = true;
        this.load = 0;

        this.connections = [];
        //this.drawnConnections = [];

        this.Xlower = this.Xloc - (this.sourceWidth / 2);
        this.Xupper = this.Xlower + this.sourceWidth;
        this.Ylower = this.Yloc - (boxSize / 2);
        this.Yupper = this.Ylower + this.boxSize;

        console.log("source made");


    }

    drawNode() {
        stroke(0,0,0);
        strokeWeight(2);
        if (this.hasPower == false) {
            fill(255, 255, 255);
        } else {
            fill(255, 255, 0);
        }

        rectMode(CENTER);
        rect(this.Xloc, this.Yloc, this.sourceWidth, this.boxSize);


        fill(0,0,0);
        textSize(30);
        textAlign(CENTER);
        //text(this.load, this.Xloc, this.Yloc);

    }

    onNode(Xloc, Yloc) {
        if (this.Xlower < Xloc && Xloc < this.Xupper) {
            if (this.Ylower < Yloc && Yloc < this.Yupper) {
                return true;
            }
        }
        return false;
    }

    addConnection(connectionID) {
        this.connections.push(connectionID);
        console.log("connection Added = " + connectionID);
    }

}
