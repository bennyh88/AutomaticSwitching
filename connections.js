class connections {

    constructor(nodeA, nodeB) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.connectionStatus = "GREEN";
        this.buffer = 10;
        this.load = 0;

        this.AXloc = this.nodeA.Xloc; //local variables to prevent overwriting of the node object variable
        this.AYloc = this.nodeA.Yloc;
        this.BXloc = this.nodeB.Xloc;
        this.BYloc = this.nodeB.Yloc;

        this.midX;
        this.midY;

        //fiddle to get the connection to be drawn vertically
        if (this.nodeA.uniqueID === "source") {
            //console.log("nodeA = source");
            //this.nodeA.Xloc = this.nodeB.XLoc;
            this.AXloc = this.BXloc;
        } else if (this.nodeB.uniqueID === "source") {
            //console.log("nodeB = source");
            //this.nodeB.Xloc == this.nodeA.Xloc;
            this.BXloc = this.AXloc;
        } else {
            //do nothing
            console.log("not connected to the source");
        }
        //console.log("AXloc = " + this.AXloc + ", BXloc = " + this.BXloc);


        //figure out where the midpoint of the connection is
        //X
        if (this.AXloc > this.BXloc) {
            this.midX = (this.AXloc - this.BXloc) / 2;
            this.midX = this.AXloc - this.midX;
        } else {
            this.midX = (this.BXloc - this.AXloc) / 2;
            this.midX = this.BXloc - this.midX;
        }
        //Y
        if (this.AYloc > this.BYloc) {
            this.midY = (this.AYloc - this.BYloc) / 2;
            this.midY = this.AYloc - this.midY;
        } else {
            this.midY = (this.BYloc - this.AYloc) / 2;
            this.midY = this.BYloc - this.midY;
        }
    }

    drawConnection() {
        switch(this.connectionStatus) {
            case "GREEN":
                stroke(0, 255, 0);
            break;
            case "AMBER":
                stroke(255, 191,0);
            break;
            case "RED":
                stroke(255, 0, 0);
            break;
            default:
            console.log("error, unknown connection colour");
        }
        strokeWeight(4);
        //line(this.nodeA.Xloc, this.nodeA.Yloc, this.nodeB.Xloc, this.nodeB.Yloc);
        line(this.AXloc, this.AYloc, this.BXloc, this.BYloc);
        stroke(0, 0, 0);
        fill(200, 200, 200);
        ellipse(this.midX, this.midY, this.buffer, this.buffer);

        fill(0,0,0);
        textSize(30);
        textAlign(RIGHT);
        if (this.load != 0) { //only write text if not 0
            text(this.load, this.midX, this.midY);
        }

    }

    connectsToNode(nodeID) {
        if (nodeID == this.nodeA.uniqueID || nodeID == this.nodeB.uniqueID) {
            return true;
        }
        return false;
    }

    isConnection(nodeIDA, nodeIDB) {
        if (nodeIDA == this.nodeA.uniqueID || nodeIDA == this.nodeB.uniqueID) {
            if (nodeIDB == this.nodeA.uniqueID || nodeIDB == this.nodeB.uniqueID) {
                return true;
            }
        }
        return false;
    }

    onConnection(Xloc, Yloc) {
        //console.log("distance = " + dist(Xloc, Yloc, this.midX, this.midY));
        if (dist(Xloc, Yloc, this.midX, this.midY) < this.buffer) {
            return true;
        }
        return false;
    }

    toggleConnectionStatus() {
        if (this.connectionStatus ==="GREEN") {
            this.connectionStatus = "AMBER";
        } else if (this.connectionStatus === "AMBER") {
            this.connectionStatus = "RED";
        } else if (this.connectionStatus === "RED") { //MUST BE RED
            this.connectionStatus = "GREEN";
        } else {
            console.log("BAD DATA, CONNECTION STATUS INVALID");
        }
    }

    getOtherNode(uniqueID) {
        if (uniqueID === this.nodeA.uniqueID) {
            return this.nodeB.uniqueID;
        } else {
            return this.nodeA.uniqueID;
        }
    }

}
