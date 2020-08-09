let bx;
let by;
let boxSize = 60;

let nodeA = "";

let nodesArray = [];
let connectionsArray = [];

let modeSwitch = "addNodes";
let Source;

function setup() {
    let renderer = createCanvas(700, 700);
    renderer.parent("canvasDiv");
    renderer.mouseClicked(mouseClickedOnCanvas);
    renderer.mouseReleased(mouseReleasedOnCanvas);
    renderer.mousePressed(mousePressedOnCanvas);
    strokeWeight(2);

    Source = new source((renderer.width / 2), (renderer.height - boxSize), boxSize, "source", (renderer.width - boxSize));
    nodesArray.push(Source);
}

function draw() {
    background(150, 150, 150);
    //drawGrid();
    //drawConnections();
    //Source.drawSource();

    for (var i=0; i< connectionsArray.length; i++) {
        connectionsArray[i].drawConnection();
    }

    for (var i=0; i< nodesArray.length; i++) {
        nodesArray[i].drawNode()
    }
}

function drawGrid() {
    for (var i = 0; i < 700; i += 20) {
        line(i, 0, i, 700);
    }
    for (var i = 0; i < 700; i += 20) {
        line(0, i, 700, i);
    }
}

function mouseClickedOnCanvas() {
    switch(modeSwitch) {
        case "addNodes":
            addNode(mouseX, mouseY);
        break;
        case "deleteNodes":
            deleteNode(mouseX, mouseY);
        // code block
        break;
        case "joinNodes":
        // code block
        break;
        case "toggleConnections":
            toggleConnections(mouseX, mouseY);
        break;
        default:
        console.log("error, unknown edit mode");
    }
}

function mousePressedOnCanvas() {
    switch(modeSwitch) {
        case "addNodes":
            //addNode(mouseX, mouseY);
        break;
        case "deleteNodes":
            //deleteNode(mouseX, mouseY);
        // code block
        break;
        case "joinNodes":
        // code block
            //console.log("mousePressedOnCanvas");
            joinNodesPressed(mouseX, mouseY);
        break;
        case "toggleConnections":
        // code block
        break;
        default:
        console.log("error, unknown edit mode");
    }
}

function joinNodesPressed(Xloc, Yloc) {
    nodeA = "";
    for (var i = 0; i < nodesArray.length; i++) {
        if (nodesArray[i].onNode(Xloc, Yloc)) {
            //console.log("node A Found = " + nodesArray[i].uniqueID);
            nodeA = nodesArray[i].uniqueID;
        }
    }
}

function mouseReleasedOnCanvas() {
    switch(modeSwitch) {
        case "addNodes":
            //addNode(mouseX, mouseY);
        break;
        case "deleteNodes":
            //deleteNode(mouseX, mouseY);
        // code block
        break;
        case "joinNodes":
        // code block
            //console.log("mouseReleasedOnCanvas");
            joinNodesReleased(mouseX, mouseY);
        break;
        case "toggleConnections":
        // code block
        break;
        default:
        console.log("error, unknown edit mode");
    }
}

function joinNodesReleased(Xloc, Yloc) {
    if (nodeA != "") {
        for (var i = 0; i < nodesArray.length; i++) {
            if (nodesArray[i].onNode(Xloc, Yloc)) {
                //console.log("node B Found = " + nodesArray[i].uniqueID);
                var nodeB = nodesArray[i].uniqueID;
                nodesArray[i].addConnection(nodeA);
                nodesArray[findByUniqueID(nodeA)].addConnection(nodeB);
                //TODO: make sure the connection is unique!!
                var connection = new connections(nodesArray[findByUniqueID(nodeA)], nodesArray[i]);
                connectionsArray.push(connection);

                powerStatus();
            }
        }
    }
}

function findByUniqueID(idString) {
    for (var i = 0; i < nodesArray.length; i++) {
        if (nodesArray[i].uniqueID == idString) {
            return i;
        }
    }
}

function addNode(Xloc, Yloc) {
    for (var i = 0; i < nodesArray.length; i++) {
        if (nodesArray[i].onNode(Xloc, Yloc)) {
            //console.log("area occupied");
            return "AREA OCCUPIED, NODE WAS NOT ADDED";
        }
    }
    var uniqueID = makeid(6);
    //console.log(uniqueID);
    //console.log(boxSize);
    node = new nodes(Xloc, Yloc, boxSize, uniqueID, getRndInteger(10,100));
    nodesArray.push(node);
    return "NODE ADDED";

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function deleteNode(Xloc, Yloc) {
    for (var i = 0; i < nodesArray.length; i++) {
        if (nodesArray[i].onNode(Xloc, Yloc)) {
            var idToDelete = nodesArray[i].uniqueID;
            //console.log("node to delete = " + idToDelete);

            for (var z = connectionsArray.length - 1; z >= 0; z--) {
                if (connectionsArray[z].connectsToNode(idToDelete)) {
                    connectionsArray.splice(z, 1);
                }
            }
            nodesArray.splice(i, 1);
            //console.log("node " + idToDelete + " was deleted");
        }
    }
    powerStatus();
}

function toggleConnections(Xloc, Yloc) {
    //console.log("toggleConnections");
    //console.log("X = " + Xloc + ", Y = " + Yloc);
    for (var i = 0; i < connectionsArray.length; i++) {
        if (connectionsArray[i].onConnection(Xloc, Yloc)) {
            connectionsArray[i].toggleConnectionStatus();
            powerStatus(); //every time we toggle a connection we need to rerun the powerStatus function
        }
    }
}

function powerStatus() {
    //set all hasPower to false except for source at the 0 index
    for (var i=1; i < nodesArray.length; i++) {
        nodesArray[i].hasPower = false;
    }
    for (var i=0; i < nodesArray.length; i++) {
        //find all nodes that have power and each time hasPower is set to true restart the scan
        if (nodesArray[i].hasPower == true) {
            for (var j=1; j < nodesArray.length; j++) {
                if (nodesArray[j].hasConnection(nodesArray[i].uniqueID)) {
                    //find the connection and check its STATUS
                    for (var k=0; k < connectionsArray.length; k++) {
                        if (connectionsArray[k].isConnection(nodesArray[j].uniqueID, nodesArray[i].uniqueID)) {
                            if (connectionsArray[k].connectionStatus == "GREEN") {
                                if (nodesArray[j].hasPower == false) {
                                    nodesArray[j].hasPower = true;
                                    //console.log("nodesArray["+ i +" has power!");
                                    i=0;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    calculateConnectionLoad();

}


function addNodesButton() {
    console.log("addNodesButton pressed");
    modeSwitch = "addNodes";
}

function deleteNodesButton() {
    console.log("deleteNodesButton pressed");
    modeSwitch = "deleteNodes";
}

function joinNodesButton() {
    console.log("joinNodesButton pressed");
    modeSwitch = "joinNodes";
}

function toggleConnectionsButton() {
    console.log("toggleConnectionsButton pressed");
    modeSwitch = "toggleConnections";
}

function runButton() {
    console.log("runButton pressed");
    autoRestorePower();
}
