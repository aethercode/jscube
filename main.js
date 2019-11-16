var debugMode = false;

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} //lines 3-7 taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

var cube = {
    edges: [],
    corners: []
}

var cubeEdgesDef = "yg yr yb yo go gr br bo wb wr wg wo ";
var cubeCornersDef = "ygo yrg ybr yob wbo wrb wgr wog";

var edge = 1;
var currentCharacter = 0;

var edgePositions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var cornerPositions = [1, 2, 3, 4, 5, 6, 7, 8];

function scramble() {

}

var moveOps = ["f", "f'", "r", "r'", "u", "u'", "d", "d'", "l", "l'", "b", "b'"];
function randomMove() {
    return moveOps[random(0, moveOps.length-1)];
}

function flipOr(id) {
    if (cube.edges[id].oriented) {
        cube.edges[id].oriented = false;
    } else {
        cube.edges[id].oriented = true;
    }
}

function cco(c, amount) {
    var p = cube.corners[c].orientation+amount;
    cube.corners[c].orientation = p % 3;
    if (cube.corners[c].orientation < 0) {
        cube.corners[c].orientation += 3;
    }
}

while (edge <= 12) {
    var letters = "";
    var end = false;
    while (end == false) {
        if (cubeEdgesDef.charAt(currentCharacter) !== " " && cubeEdgesDef.charAt(currentCharacter) !== "") {
            letters += cubeEdgesDef.charAt(currentCharacter);
        } else {
            end = true;
        }
        currentCharacter ++;
    }

    cube.edges.push({c1: letters.charAt(0), c2: letters.charAt(1), position: edge, oriented: true});
    edge ++;
}

var corner = 1;
currentCharacter = 0;

while (corner <= 8) {
    var letters = "";
    var end = false;
    while (end == false) {
        if (cubeCornersDef.charAt(currentCharacter) !== " " && cubeCornersDef.charAt(currentCharacter) !== "") {
            letters += cubeCornersDef.charAt(currentCharacter);
        } else {
            end = true;
        }
        currentCharacter ++;
    }

    cube.corners.push({c1: letters.charAt(0), c2: letters.charAt(1), c3: letters.charAt(2), position: corner, orientation: 0});
    corner ++;
}

function move(m) {
    if (m == "u") {
        for (var e in cube.edges) {
            var justMoved = false;
            if (cube.edges[e].position < 4) {
                cube.edges[e].position ++;
                justMoved = true;
            }
            if (cube.edges[e].position == 4 && !justMoved) {
                cube.edges[e].position = 1;
            }
        }
        for (var c in cube.corners) {
            var justMoved = false;
            if (cube.corners[c].position < 4) {
                cube.corners[c].position ++;
                justMoved = true;
            }
            if (cube.corners[c].position == 4 && !justMoved) {
                cube.corners[c].position = 1;
            }
        }
    } else if  (m == "u'") {
        for (var e in cube.edges) {
            var justMoved = false;
            if (cube.edges[e].position > 1 && cube.edges[e].position < 5) {
                cube.edges[e].position --;
                justMoved = true;
            }
            if (cube.edges[e].position == 1 && !justMoved) {
                cube.edges[e].position = 4;
            }
        }
        for (var c in cube.corners) {
            var justMoved = false;
            if (cube.corners[c].position > 1 && cube.corners[c].position < 5) {
                cube.corners[c].position --;
                justMoved = true;
            }
            if (cube.corners[c].position == 1 && !justMoved) {
                cube.corners[c].position = 4;
            }
        }
    } else if  (m == "l") {
        for (var e in cube.edges) {
            var justMoved = false;
            if (cube.edges[e].position == 8 && !justMoved) {
                cube.edges[e].position = 12;
                justMoved = true;
            }
            if (cube.edges[e].position == 4 && !justMoved) {
                cube.edges[e].position = 8;
                justMoved = true;
            }
            if (cube.edges[e].position == 5 && !justMoved) {
                cube.edges[e].position = 4;
                justMoved = true;
            }
            if (cube.edges[e].position == 12 && !justMoved) {
                cube.edges[e].position = 5;
                justMoved = true;
            }
        }
        for (var c in cube.corners) {
            var justMoved = false;
            if (cube.corners[c].position == 8 && !justMoved) {
                cube.corners[c].position = 1;
                cco(c, 2);
                justMoved = true;
            }
            if (cube.corners[c].position == 1 && !justMoved) {
                cube.corners[c].position = 4;
                cco(c, 1);
                justMoved = true;
            }
            if (cube.corners[c].position == 4 && !justMoved) {
                cube.corners[c].position = 5;
                cco(c, 2);
                justMoved = true;
            }
            if (cube.corners[c].position == 5 && !justMoved) {
                cube.corners[c].position = 8;
                cco(c, 1);
                justMoved = true;
            }
        }
    } else if  (m == "l'") {
        for (var e in cube.edges) {
            var justMoved = false;
            if (cube.edges[e].position == 12 && !justMoved) {
                cube.edges[e].position = 8;
                justMoved = true;
            }
            if (cube.edges[e].position == 8 && !justMoved) {
                cube.edges[e].position = 4;
                justMoved = true;
            }
            if (cube.edges[e].position == 4 && !justMoved) {
                cube.edges[e].position = 5;
                justMoved = true;
            }
            if (cube.edges[e].position == 5 && !justMoved) {
                cube.edges[e].position = 12;
                justMoved = true;
            }
        }
        for (var c in cube.corners) {
            var justMoved = false;
            if (cube.corners[c].position == 1 && !justMoved) {
                cube.corners[c].position = 8;
                cco(c, 1);
                justMoved = true;
            }
            if (cube.corners[c].position == 4 && !justMoved) {
                cube.corners[c].position = 1;
                cco(c, 2);
                justMoved = true;
            }
            if (cube.corners[c].position == 5 && !justMoved) {
                cube.corners[c].position = 4;
                cco(c, 1);
                justMoved = true;
            }
            if (cube.corners[c].position == 8 && !justMoved) {
                cube.corners[c].position = 5;
                cco(c, 2);
                justMoved = true;
            }
        }
    } else if  (m == "f") {
        for (var e in cube.edges) {
            var justMoved = false;
            if (cube.edges[e].position == 3 && !justMoved) {
                cube.edges[e].position = 7;
                cube.edges[e].oriented
                justMoved = true;
            }
            if (cube.edges[e].position == 7 && !justMoved) {
                cube.edges[e].position = 9;
                justMoved = true;
            }
            if (cube.edges[e].position == 9 && !justMoved) {
                cube.edges[e].position = 8;
                justMoved = true;
            }
            if (cube.edges[e].position == 8 && !justMoved) {
                cube.edges[e].position = 3;
                justMoved = true;
            }
            if (cube.edges[e].position == 3 || cube.edges[e].position == 7 || cube.edges[e].position == 9 || cube.edges[e].position == 8) {
                flipOr(e);
            }
        }
        for (var c in cube.corners) {
            var justMoved = false;
            if (cube.corners[c].position == 3 && !justMoved) {
                cube.corners[c].position = 6;
                cco(c, 2);
                justMoved = true;
            }
            if (cube.corners[c].position == 6 && !justMoved) {
                cube.corners[c].position = 5;
                cco(c, 1);
                justMoved = true;
            }
            if (cube.corners[c].position == 5 && !justMoved) {
                cube.corners[c].position = 4;
                cco(c, 2);
                justMoved = true;
            }
            if (cube.corners[c].position == 4 && !justMoved) {
                cube.corners[c].position = 3;
                cco(c, 1);
                justMoved = true;
            }
        }
    } else if  (m == "f'") {
        for (var e in cube.edges) {
            var justMoved = false;
            if (cube.edges[e].position == 7 && !justMoved) {
                cube.edges[e].position = 3;
                cube.edges[e].oriented
                justMoved = true;
            }
            if (cube.edges[e].position == 9 && !justMoved) {
                cube.edges[e].position = 7;
                justMoved = true;
            }
            if (cube.edges[e].position == 8 && !justMoved) {
                cube.edges[e].position = 9;
                justMoved = true;
            }
            if (cube.edges[e].position == 3 && !justMoved) {
                cube.edges[e].position = 8;
                justMoved = true;
            }
            if (cube.edges[e].position == 3 || cube.edges[e].position == 7 || cube.edges[e].position == 9 || cube.edges[e].position == 8) {
                flipOr(e);
            }
        }
        for (var c in cube.corners) {
            var justMoved = false;
            if (cube.corners[c].position == 6 && !justMoved) {
                cube.corners[c].position = 3;
                cco(c, 1);
                justMoved = true;
            }
            if (cube.corners[c].position == 5 && !justMoved) {
                cube.corners[c].position = 6;
                cco(c, 2);
                justMoved = true;
            }
            if (cube.corners[c].position == 4 && !justMoved) {
                cube.corners[c].position = 5;
                cco(c, 1);
                justMoved = true;
            }
            if (cube.corners[c].position == 3 && !justMoved) {
                cube.corners[c].position = 4;
                cco(c, 2);
                justMoved = true;
            }
        }
    } else if (m == "r") {
        for (var e in cube.edges) {
            var justMoved = false;
            if (cube.edges[e].position == 2 && !justMoved) {
                cube.edges[e].position = 6;
                justMoved = true;
            }
            if (cube.edges[e].position == 6 && !justMoved) {
                cube.edges[e].position = 10;
                justMoved = true;
            }
            if (cube.edges[e].position == 10 && !justMoved) {
                cube.edges[e].position = 7;
                justMoved = true;
            }
            if (cube.edges[e].position == 7 && !justMoved) {
                cube.edges[e].position = 2;
                justMoved = true;
            }
        }
        for (var c in cube.corners) {
            var justMoved = false;
            if (cube.corners[c].position == 2 && !justMoved) {
                cube.corners[c].position = 7;
                cco(c, 2);
                justMoved = true;
            }
            if (cube.corners[c].position == 7 && !justMoved) {
                cube.corners[c].position = 6;
                cco(c, 1);
                justMoved = true;
            }
            if (cube.corners[c].position == 6 && !justMoved) {
                cube.corners[c].position = 3;
                cco(c, 2);
                justMoved = true;
            }
            if (cube.corners[c].position == 3 && !justMoved) {
                cube.corners[c].position = 2;
                cco(c, 1);
                justMoved = true;
            }
        }
    } else if  (m == "r'") {
        for (var e in cube.edges) {
            var justMoved = false;
            if (cube.edges[e].position == 6 && !justMoved) {
                cube.edges[e].position = 2;
                justMoved = true;
            }
            if (cube.edges[e].position == 10 && !justMoved) {
                cube.edges[e].position = 6;
                justMoved = true;
            }
            if (cube.edges[e].position == 7 && !justMoved) {
                cube.edges[e].position = 10;
                justMoved = true;
            }
            if (cube.edges[e].position == 2 && !justMoved) {
                cube.edges[e].position = 7;
                justMoved = true;
            }
        }
        for (var c in cube.corners) {
            var justMoved = false;
            if (cube.corners[c].position == 7 && !justMoved) {
                cube.corners[c].position = 2;
                cco(c, 1);
                justMoved = true;
            }
            if (cube.corners[c].position == 6 && !justMoved) {
                cube.corners[c].position = 7;
                cco(c, 2);
                justMoved = true;
            }
            if (cube.corners[c].position == 3 && !justMoved) {
                cube.corners[c].position = 6;
                cco(c, 1);
                justMoved = true;
            }
            if (cube.corners[c].position == 2 && !justMoved) {
                cube.corners[c].position = 3;
                cco(c, 2);
                justMoved = true;
            }
        }
    } else if  (m == "b") {
        for (var e in cube.edges) {
            var justMoved = false;
            if (cube.edges[e].position == 1 && !justMoved) {
                cube.edges[e].position = 5;
                justMoved = true;
            }
            if (cube.edges[e].position == 5 && !justMoved) {
                cube.edges[e].position = 11;
                justMoved = true;
            }
            if (cube.edges[e].position == 11 && !justMoved) {
                cube.edges[e].position = 6;
                justMoved = true;
            }
            if (cube.edges[e].position == 6 && !justMoved) {
                cube.edges[e].position = 1;
                justMoved = true;
            }
            if (cube.edges[e].position == 1 || cube.edges[e].position == 5 || cube.edges[e].position == 11 || cube.edges[e].position == 6) {
                flipOr(e);
            }
        }
        for (var c in cube.corners) {
            var justMoved = false;
            if (cube.corners[c].position == 8 && !justMoved) {
                cube.corners[c].position = 7;
                cco(c, 1);
                justMoved = true;
            }
            if (cube.corners[c].position == 7 && !justMoved) {
                cube.corners[c].position = 2;
                cco(c, 2);
                justMoved = true;
            }
            if (cube.corners[c].position == 2 && !justMoved) {
                cube.corners[c].position = 1;
                cco(c, 1);
                justMoved = true;
            }
            if (cube.corners[c].position == 1 && !justMoved) {
                cube.corners[c].position = 8;
                cco(c, 2);
                justMoved = true;
            }
        }
        
    } else if  (m == "b'") {
        for (var e in cube.edges) {
            var justMoved = false;
            if (cube.edges[e].position == 5 && !justMoved) {
                cube.edges[e].position = 1;
                justMoved = true;
            }
            if (cube.edges[e].position == 11 && !justMoved) {
                cube.edges[e].position = 5;
                justMoved = true;
            }
            if (cube.edges[e].position == 6 && !justMoved) {
                cube.edges[e].position = 11;
                justMoved = true;
            }
            if (cube.edges[e].position == 1 && !justMoved) {
                cube.edges[e].position = 6;
                justMoved = true;
            }
            if (cube.edges[e].position == 1 || cube.edges[e].position == 5 || cube.edges[e].position == 11 || cube.edges[e].position == 6) {
                flipOr(e);
            }
        }
        for (var c in cube.corners) {
            var justMoved = false;
            if (cube.corners[c].position == 7 && !justMoved) {
                cube.corners[c].position = 8;
                cco(c, 2);
                justMoved = true;
            }
            if (cube.corners[c].position == 2 && !justMoved) {
                cube.corners[c].position = 7;
                cco(c, 1);
                justMoved = true;
            }
            if (cube.corners[c].position == 1 && !justMoved) {
                cube.corners[c].position = 2;
                cco(c, 2);
                justMoved = true;
            }
            if (cube.corners[c].position == 8 && !justMoved) {
                cube.corners[c].position = 1;
                cco(c, 1);
                justMoved = true;
            }
        }
    } else if  (m == "d") {
        for (var e in cube.edges) {
            var justMoved = false;
            if (cube.edges[e].position < 12 && cube.edges[e].position > 8) {
                cube.edges[e].position ++;
                justMoved = true;
            }
            if (cube.edges[e].position == 12 && !justMoved) {
                cube.edges[e].position = 9;
            }
        }
        for (var c in cube.corners) {
            var justMoved = false;
            if (cube.corners[c].position < 8 && cube.corners[c].position > 4) {
                cube.corners[c].position ++;
                justMoved = true;
            }
            if (cube.corners[c].position == 8 && !justMoved) {
                cube.corners[c].position = 5;
            }
        }
    } else if  (m == "d'") {
        for (var e in cube.edges) {
            var justMoved = false;
            if (cube.edges[e].position < 13 && cube.edges[e].position > 9) {
                cube.edges[e].position --;
                justMoved = true;
            }
            if (cube.edges[e].position == 9 && !justMoved) {
                cube.edges[e].position = 12;
            }
        }
        for (var c in cube.corners) {
            var justMoved = false;
            if (cube.corners[c].position < 9 && cube.corners[c].position > 5) {
                cube.corners[c].position --;
                justMoved = true;
            }
            if (cube.corners[c].position == 5 && !justMoved) {
                cube.corners[c].position = 8;
            }
        }
    }
    render();
}
function render() {
    for (var e in cube.edges) {
        document.getElementById("e"+cube.edges[e].position).classList = "";
        document.getElementById("e"+cube.edges[e].position+"a").classList = "";
        if (cube.edges[e].oriented) {
            document.getElementById("e"+cube.edges[e].position).classList.add(cube.edges[e].c1);
            document.getElementById("e"+cube.edges[e].position+"a").classList.add(cube.edges[e].c2);
        } else {
            document.getElementById("e"+cube.edges[e].position).classList.add(cube.edges[e].c2);
            document.getElementById("e"+cube.edges[e].position+"a").classList.add(cube.edges[e].c1);
        }
    }
    for (var c in cube.corners) {
        document.getElementById("c"+cube.corners[c].position).classList = "";
        document.getElementById("c"+cube.corners[c].position+"a").classList = "";
        document.getElementById("c"+cube.corners[c].position+"b").classList = "";

        if (cube.corners[c].orientation == 0) {
            document.getElementById("c"+cube.corners[c].position).classList.add(cube.corners[c].c1);
            document.getElementById("c"+cube.corners[c].position+"a").classList.add(cube.corners[c].c2);
            document.getElementById("c"+cube.corners[c].position+"b").classList.add(cube.corners[c].c3);
        } else if (cube.corners[c].orientation == 1) {
            document.getElementById("c"+cube.corners[c].position).classList.add(cube.corners[c].c2);
            document.getElementById("c"+cube.corners[c].position+"a").classList.add(cube.corners[c].c3);
            document.getElementById("c"+cube.corners[c].position+"b").classList.add(cube.corners[c].c1);
        } else if (cube.corners[c].orientation == 2) {
            document.getElementById("c"+cube.corners[c].position).classList.add(cube.corners[c].c3);
            document.getElementById("c"+cube.corners[c].position+"a").classList.add(cube.corners[c].c1);
            document.getElementById("c"+cube.corners[c].position+"b").classList.add(cube.corners[c].c2);
        }   
    }
}
if (debugMode == true) {
    for (i in document.getElementsByClassName("edge")) {
        document.getElementsByClassName("edge")[i].innerHTML = document.getElementsByClassName("edge")[i].id+" edge";
    }
    for (i in document.getElementsByClassName("corner")) {
        document.getElementsByClassName("corner")[i].innerHTML = document.getElementsByClassName("corner")[i].id+" corner";
    }
}
document.addEventListener("keydown", function(e) {
    if (e.key == "u") {
        move("u");
    } else if (e.key == "i") {
        move("u'");
    } else if (e.key == "f") {
        move("f");
    } else if (e.key == "g") {
        move("f'");
    } else if (e.key == "r") {
        move("r");
    } else if (e.key == "t") {
        move("r'");
    } else if (e.key == "l") {
        move("l");
    } else if (e.key == ";") {
        move("l'");
    } else if (e.key == "d") {
        move("d");
    } else if (e.key == "s") {
        move("d'");
    } else if (e.key == "b") {
        move("b");
    } else if (e.key == "n") {
        move("b'");
    } else if (e.code == "Space") {
        move(randomMove());
    }
});
scramble();
render();