var robot = require('robotjs');

// console.log(robot.getPixelColor(188, 625))
// console.log(robot.getPixelColor(1168, 553))
// console.log(robot.getPixelColor(1166, 506))
// console.log(robot.getPixelColor(236, 667))
// console.log(robot.getPixelColor(507, 521))
// console.log(robot.getPixelColor(281, 682))
// console.log(robot.getPixelColor(1138, 562))

WillowCutter();

function WillowCutter() {

    console.log("Initializing client...");

    while (true) {

        var endInventory_x = 1888, endInventory_y = 932, inventory_log_color = "";
        var pixel_color = robot.getPixelColor(endInventory_x, endInventory_y);

        if (pixel_color == inventory_log_color) {
            fletchLogs();
            burnLogs();
        }

        console.log("Searching for trees to cut...");

        var tree = findTree();
        if (tree == false) {
            rotateCamera();
            continue;
        }

        robot.moveMouseSmooth(tree.x, tree.y)
        
    }
}