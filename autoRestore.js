function autoRestorePower() {
    //find nodes without power,
    for (var i=0; i < nodesArray.length; i++) {
        if (nodesArray[i].hasPower != true) {
            console.log("node " + nodesArray[i].uniqueID + " has no power!");
            //search through the connections to find nodes that are attached to the node
            for (var j=0; j < connectionsArray.length; j++) {
                if (connectionsArray[j].connectsToNode(nodesArray[i].uniqueID)) {
                    //if the connection has a status of green or amber, check the power status of connected node
                    if (connectionsArray[j].connectionStatus === "AMBER") {
                        var otherNode = connectionsArray[j].getOtherNode(nodesArray[i].uniqueID);
                        otherNode = findByUniqueID(otherNode);
                        if (otherNode.hasPower = true) {
                            //if connected node has power and connection is amber, make the connection green, then re run the for loop
                            connectionsArray[j].connectionStatus = "GREEN";
                            powerStatus(); //called to work out what will have changed by toggling the connection
                            i=0; // set i to 0 to make full loop of array and find any more nodes without power
                        }
                    } else if (connectionsArray[j].connectionStatus === "GREEN") {
                        console.log("connection GREEN");
                    } else {
                        console.log("connection RED");
                    }
                }

            }

        }
    }

}
