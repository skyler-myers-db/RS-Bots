// import the robotjs library

var robot = require('robotjs');

var shortsleep = getRandomInt(100, 700);
var mediumSleep = getRandomInt(1200, 2000);
var longSleep = getRandomInt(2100, 5000);

OakCutter();

function OakCutter() {

    console.log("Initializing client...");
    sleep(1427);

    // basic infinite loop
    while (true) {

        var end_inventory_x = 1888, end_inventory_y = 932;
        var inventory_log_color = "7b5c32";
        var pixel_color = robot.getPixelColor(end_inventory_x, end_inventory_y);

        if (pixel_color == inventory_log_color) {
            fletchLogs();
            //burnLogs();
        }

        console.log("Searching for trees to cut...");

        var tree = findTree();
        if (tree == false) {
            rotateCamera();
            continue;
        }

        // chop down the tree we found
        robot.moveMouseSmooth(tree.x, tree.y);
        sleep(shortsleep);
        robot.mouseClick();
        console.log("Cutting tree.");
        //confirmCut();
        sleep(30000);
    }
}

function fletchLogs() {

    var end_inventory_x = 1888, end_inventory_y = 932;
    var inventory_log_color = "7b5c32";
    var pixel_color = robot.getPixelColor(end_inventory_x, end_inventory_y);

    console.log("Full inventory; fletching logs.");
    robot.moveMouseSmooth(end_inventory_x, end_inventory_y);
    sleep(shortsleep);
    robot.mouseClick();
    sleep(shortsleep);
    robot.keyTap("space");

    //while (pixel_color == inventory_log_color) {
    while (pixel_color == inventory_log_color) {
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
    sleep(shortsleep);
    robot.mouseClick("right");
    sleep(shortsleep);
    robot.moveMouseSmooth(light_x, light_y);
    sleep(shortsleep);
    robot.mouseClick();
    sleep(7354);
    robot.moveMouseSmooth(mid_inventory_x, mid_inventory_y);
    sleep(shortsleep);
    robot.mouseClick();
    console.log("Initiating bonfire...");
    sleep(shortsleep);
    robot.moveMouse(bonfire_x, bonfire_y);
    sleep(shortsleep);
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

    var oak_tree_colors = ["f1ae57", "eeaa54", "e8a54f", "e29e4a", "f2ae57", "c98939", "a86f27", "a7712d", "825b23", "b98138", "d89a48", "c98c3b",
        "7d541e", "835a22", "7f5620", "614111", "865c24", "684513", "b27a33", "7b561f", "aa7732", "ba8137", "886027", "714e19", "edac56", "573a0a",
        "b57a2d", "f1b05a", "c3883d", "7b551e", "875e25", "6e4b17", "875f26", "78531d", "e1a14e", "b67e37"];

    for (var i = 0; i < width; i++) {
        var random_x = getRandomInt(0, width - 1);
        var random_y = getRandomInt(0, height - 1);
        // Corresponds to top let corner of screencapture, so x and y
        var sample_color = img.colorAt(random_x, random_y);

        //if (reg_tree_colors.includes(sample_color)) {
        if (oak_tree_colors.includes(sample_color)) {
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
    var check_x1 = 82, check_y1 = 30, pixel_color1 = robot.getPixelColor(check_x1, check_y1);
    var check_x2 = 97, check_y2 = 31, pixel_color2 = robot.getPixelColor(check_x2, check_y2);

    return pixel_color1 == "00ffff" && pixel_color2 == "00ffff";
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