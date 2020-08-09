
class nodes {

    constructor(Xloc, Yloc, boxSize, uniqueID, load) {
        this.Xloc = Xloc;
        this.Yloc = Yloc;
        this.boxSize = boxSize;
        this.uniqueID = uniqueID;
        this.hasPower = false;
        this.load = load;

        this.connections = [];
        //this.drawnConnections = [];

        var X = this.Xloc % this.boxSize;
        this.Xlower = this.Xloc - X;
        this.Xupper = this.Xlower + this.boxSize;
        this.Xloc = this.Xlower + (this.boxSize/2);

        var Y = this.Yloc % this.boxSize;
        this.Ylower = this.Yloc - Y;
        this.Yupper = this.Ylower + this.boxSize;
        this.Yloc = this.Ylower + (this.boxSize/2);

        //this.drawNode();
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
        rect(this.Xloc, this.Yloc, boxSize, boxSize);

        fill(0,0,0);
        textSize(30);
        textAlign(CENTER);
        text(this.load, this.Xloc, this.Yloc);
    }

    onNode(Xloc, Yloc) {
        //console.log("onNode Xloc = " + Xloc);
        if (this.Xlower < Xloc && Xloc < this.Xupper) {
            if (this.Ylower < Yloc && Yloc < this.Yupper) {
                //console.log("onNode == true");
                return true;
            }
        }
        return false;
    }

    addConnection(connectionID) {
        this.connections.push(connectionID);
        console.log("connection Added = " + connectionID);
    }

    hasConnection(connectionID) {
        if (this.connections.includes(connectionID)) {
            return true;
        }
        return false;
    }


}
