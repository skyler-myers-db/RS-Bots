var robot = require('robotjs');

var shortsleep = getRandomInt(100, 700);
var mediumSleep = getRandomInt(1200, 2000);
var longSleep = getRandomInt(2100, 5000);

// console.log(robot.getPixelColor(1164, 521))
// console.log(robot.getPixelColor(1309, 515))
// console.log(robot.getPixelColor(1145, 437))
// console.log(robot.getPixelColor(1216, 385))
// console.log(robot.getPixelColor(1097, 362))
// console.log(robot.getPixelColor(1031, 411))
// console.log(robot.getPixelColor(1154, 504))

Miner();

function Miner() {

    console.log("Initialzing client...");
    sleep(mediumSleep);

    while (true) {

        var endInventory_x = 1884, endInventory_y = 933;
        var inventoryClayColor = "91794b"
        var pixel_color = robot.getPixelColor(endInventory_x, endInventory_y);

        sleep(shortsleep);

        if (pixel_color == inventoryClayColor) {
            dropItem();
        }

        console.log("Searching for ore to mine...");

        var ore = findOre();
        if (ore == false) {
            rotateCamera();
            continue;
        }

        robot.moveMouseSmooth(ore.x, ore.y);
        sleep(shortsleep);
        robot.mouseClick();
        sleep(shortsleep);

        while (pixel_color != inventoryClayColor) {
            console.log("Mining ore...");
            sleep(shortsleep);
            pixel_color = robot.getPixelColor(endInventory_x, endInventory_y);
        }

        dropItem();
    }
}

function findOre() {

    var x = 498, y = 211, width = 1431, height = 459
    var img = robot.screen.capture(x, y, width, height);

    var clayColor = ["34423f", "262831", "3d4a44", "48554a", "283632", "283634", "2e3a36",
        "485548", "3b4648", "394448", "5b6659", "505d4f", "394741", "323d42"]

    for (var i = 0; i < width; i++) {
        var random_x = getRandomInt(0, width - 1);
        var random_y = getRandomInt(0, height - 1);
        var sample_color = img.colorAt(random_x, random_y);

        if (clayColor.includes(sample_color)) {
            var screen_x = random_x + x, screen_y = random_y + y;
            if (confirmOre(screen_x, screen_y)) {
                console.log("Ore confirmed at position: " + screen_x + ", " + screen_y + " with hex color: " + sample_color);
                return { x: screen_x, y: screen_y };
            } else {
                console.log("Clickable ore not found at position: " + screen_x + ", " + screen_y + " with hex color: " + sample_color +
                    ". Searching fo ranothe rore to mine.");
                return findOre();
            }
        }
    }
    return false;
}

function confirmOre(screen_x, screen_y) {

    robot.moveMouseSmooth(screen_x, screen_y);
    sleep(shortsleep);

    var check_x1 = 43, check_y1 = 30, pixel_color1 = robot.getPixelColor(check_x1, check_y1);
    var check_x2 = 94, check_y2 = 31, pixel_color2 = robot.getPixelColor(check_x2, check_y2);

    return pixel_color1 == "00ffff" && pixel_color2 == "00ffff";
}

function rotateCamera() {

    console.log("Didn't detect any ore; rotating camera...");
    robot.keyToggle('left', 'down');
    sleep(shortsleep);
    robot.keyToggle('left', 'up')
    sleep(shortsleep);
}

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dropItem() {

    console.log("Inventory full. Dropping first item.");
    var endInventory_x = 1884, endInventory_y = 933;
    var dropItem_x = endInventory_x, dropItem_y = endInventory_y + 43;

    sleep(shortsleep);
    robot.moveMouseSmooth(endInventory_x, endInventory_y);
    sleep(shortsleep);
    robot.mouseClick('right');
    sleep(shortsleep);
    robot.moveMouseSmooth(dropItem_x, dropItem_y);
    sleep(shortsleep);
    robot.mouseClick();
    sleep(shortsleep);
}