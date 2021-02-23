// import the robotjs library

var robot = require('robotjs');

main();

function main() {

    console.log("Initializing client...");
    sleep(1500);

    // basic infinite loop
    while (true) {

        var end_inventory_x = 1888, end_inventory_y = 932;
        var inventory_log_color = "7d5d32";
        var pixel_color = robot.getPixelColor(end_inventory_x, end_inventory_y);

        //if (pixel_color == inventory_log_color) {
        if (pixel_color == inventory_log_color) {
            //fletchLogs();
            burnLogs();
        }

        console.log("Searching for trees to cut...");

        var tree = findTree();
        if (tree == false) {
            rotateCamera();
            continue;
        }

        // chop down the tree we found
        robot.moveMouseSmooth(tree.x, tree.y);
        sleep(742);
        robot.mouseClick();
        console.log("Cutting tree.");
        //confirmCut();
        sleep(30000);
    }
}

function fletchLogs() {

    var end_inventory_x = 1888, end_inventory_y = 932;
    var inventory_log_color = "806432", inventory_oak_color = "7d5d32";
    var pixel_color = robot.getPixelColor(end_inventory_x, end_inventory_y);

    console.log("Full inventory; fletching logs.");
    robot.moveMouseSmooth(end_inventory_x, end_inventory_y);
    sleep(738);
    robot.mouseClick();
    sleep(1450);
    robot.keyTap("space");

    //while (pixel_color == inventory_log_color) {
    while (pixel_color == inventory_oak_color) {
        sleep(6938);
        console.log("Waiting to finish fletching all of the logs in the inventory...");
        pixel_color = robot.getPixelColor(end_inventory_x, end_inventory_y);
    }

    console.log("Finished fletching all the logs. Finding more trees to cut...");
}

function burnLogs() {

    var start_inventory_x = 1795, start_inventory_y = 715;
    var light_x = 1770, light_y = 760;
    var mid_inventory_x = 1889, mid_inventory_y = 933;
    var bonfire_x = 1009, bonfire_y = 556;

    console.log("Full invenory; lighting first log.");
    robot.moveMouseSmooth(start_inventory_x, start_inventory_y);
    sleep(774);
    robot.mouseClick("right");
    sleep(821);
    robot.moveMouseSmooth(light_x, light_y);
    sleep(783);
    robot.mouseClick();
    sleep(7354);
    robot.moveMouseSmooth(mid_inventory_x, mid_inventory_y);
    sleep(1289);
    robot.mouseClick();
    console.log("Initiating bonfire...");
    sleep(1937);
    robot.moveMouse(bonfire_x, bonfire_y);
    sleep(782);
    robot.mouseClick();
    sleep(195983);
}

function testScreenCapture() {
    // taking a screenshot
    var img = robot.screen.capture(0, 0, 1900, 864);

    var pixel_color = img.colorAt(1080, 500);
    console.log(pixel_color);
}

function findTree() {
    var x = 489, y = 217, width = 1484, height = 477;
    var img = robot.screen.capture(x, y, width, height);

    var tree_colors = ["dda25f", "c08a4c", "d9a15c", "d49a58", "c38c4d", "d59c5b", "d09a58", "d39a59",
        "dca25f", "c68f50", "d09955", "dda25f", "b98346", "cd9453", "d59b59", "77562e", "74542c"];

    for (var i = 0; i < width; i++) {
        var random_x = getRandomInt(0, width - 1);
        var random_y = getRandomInt(0, height - 1);
        // Corresponds to top let corner of screencapture, so x and y
        var sample_color = img.colorAt(random_x, random_y);

        //if (reg_tree_colors.includes(sample_color)) {
        if (tree_colors.includes(sample_color)) {
            var screen_x = random_x + x, screen_y = random_y + y;
            if (confirmTree(screen_x, screen_y)) {
                console.log("Tree confirmed at position: " + screen_x + ", " + screen_y + " with hex color: " + sample_color);
                return { x: screen_x, y: screen_y };
            } else {
                console.log("Clickable tree not found at position: " + screen_x + ", " + screen_y + " with hex color: " + sample_color +
                    ". Searching for another tree to cut.");
                return findTree();
            }
        }
    }
    // did not find the color in our screenshot
    return false;
}

function rotateCamera() {

    console.log("Didn't detect any trees; rotating camera...");
    robot.keyToggle('right', 'down');
    sleep(300);
    robot.keyToggle('right', 'up');
}

function confirmTree(screen_x, screen_y) {
    // first move the mouse to the given coordinates
    robot.moveMouseSmooth(screen_x, screen_y);
    // wait a moment for the help text to appear
    sleep(389);

    // now check the color of the action text
    var check_x = 100, check_y = 35, pixel_color = robot.getPixelColor(check_x, check_y);

    return pixel_color1 == "00ffff";
}

function confirmCut() {

    sleep(384);
    var tree_position = robot.getMousePos();
    const pixel_color1 = robot.getPixelColor(tree_position.x, tree_position.y);
    var pixel_color2 = robot.getPixelColor(tree_position.x, tree_position.y);

    var wait_cycles = 0, max_wait_cycles = 19;

    while (pixel_color1 == pixel_color2 && wait_cycles > max_wait_cycles) {
        console.log("Waiting for tree to be chopped down...")
        sleep(4382);
        pixel_color2 = robot.getPixelColor(tree_position.x, tree_position.y);
        wait_cycles ++;
    }
    
    console.log("Finished cutting down tree. Searching for next.")
}

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}