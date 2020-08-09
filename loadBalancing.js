function calculateConnectionLoad() {

    for (var i = 0; i < connectionsArray.length; i++) { //0 out the array each time before calling
        connectionsArray[i].load = 0;

    }
    checkedNodes.length = 0;
    testfunc("SEED", nodesArray[0].uniqueID);
}

//let nodesArray = [];
//let connectionsArray = [];
var checkedNodes = [];

function testfunc(previousNode, node) {
    var connects = 0;
    var totalLoad = 0;
    for (var i = 0; i < connectionsArray.length; i++) { //find connections to node in the connectionsArray
        if (connectionsArray[i].connectsToNode(node)) { //if it connects to this node
            //console.log("connection found");
            var otherNode = connectionsArray[i].getOtherNode(node);
            //console.log("otherNode = " + otherNode);
            if (otherNode != previousNode) { //but is not the connection to the last node
                //console.log("not the connection to the last node");
                if (connectionsArray[i].connectionStatus == "GREEN") { // if connection is active
                    //console.log("connection is active");
                    connects = connects + 1;
                    var returnedLoad = testfunc(node, otherNode);
                    totalLoad += returnedLoad;
                    //console.log("returnedLoad = " + returnedLoad);
                    connectionsArray[i].load = returnedLoad;
                    //return nodesArray[findByUniqueID(node)].load + returnedLoad;

                }
            }
        }
    }
    if (connects != 0) {
        totalLoad = nodesArray[findByUniqueID(node)].load + totalLoad;
        return totalLoad;
    }
    if (connects == 0) { //if its the last connection of the run
        var index = findByUniqueID(node);
        //console.log("index = " + index);
        var nodeLoad = nodesArray[index].load;
        //console.log("no more connections, return nodeLoad = " + nodeLoad);
        return nodesArray[findByUniqueID(node)].load; //return the load of the last node
    }
}

function loopDetection() {
    for (var i = 0; i < checkedNodes.length; i++) {
        if (checkedNodes[i] === node) { // infinite loop detection
            console.log("infinite Loop Detected!");
            return totalLoad;
        }
    }
    checkedNodes.push(node); //keep record of connected nodes
}

function setConnectionLoad(nodeA, nodeB, calcedLoad) {
    for (var i=0; i < connectionsArray.length; i++) {
        if (connectionsArray[i].isConnection(nodeA, nodeB)) {
            connectionsArray[i].load = calcedLoad;
        }
    }
    console.log("ERROR: findConnection()");
    return "ERROR";
}

function findConnectionStatus(nodeA, nodeB) {
    for (var i=0; i < connectionsArray.length; i++) {
        if (connectionsArray[i].isConnection(nodeA, nodeB)) {
            return connectionsArray[i].connectionStatus;
        }
    }
    console.log("ERROR: findConnection()");
    return "ERROR";
}
