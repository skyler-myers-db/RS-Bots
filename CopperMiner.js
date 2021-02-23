var robot = require('robotjs');

var shortsleep = getRandomInt(100, 700);
var mediumSleep = getRandomInt(1200, 2000);
var longSleep = getRandomInt(2100, 5000);
var extraSleep = getRandomInt(5100, 9832);

// console.log(robot.getPixelColor(1164, 521))
// console.log(robot.getPixelColor(1309, 515))
// console.log(robot.getPixelColor(1145, 437))
// console.log(robot.getPixelColor(1216, 385))
// console.log(robot.getPixelColor(1097, 362))
// console.log(robot.getPixelColor(1031, 411))
// console.log(robot.getPixelColor(1154, 504))

var endInventory_x = 1889, endInventory_y = 930, beginningInventory_x = 1743, beginningInventory_y = 715;
var copperOreInventoryColor = "cc6a2a", tinOreInventoryColor = "746b6b";
var endInventoryPixelColor = robot.getPixelColor(endInventory_x, endInventory_y);
var copperOre_x, copperOre_y, endingTinOre_x, endingTinOre_y;
var caveExit_x = 1122, caveExit_y = 444, compassLocation_x = 1695, compassLocation_y = 78;
var besideBank_x = 1341, besideBank_y = 118, bank_x = 859, bank_y = 302;
var bankOreBox_x = 777, bankOreBox_y = 490, faceSouth_x = compassLocation_x, faceSouth_y = compassLocation_y + 45;
var caveFront_x = 1087, caveFront_y = 110, caveEntrance_x = 1731, caveEntrance_y = 525;

copperOre_x = 958;
copperOre_y = 508;
endingTinOre_x = 917;
endingTinOre_y = 594;

Miner();

function Miner() {

    console.log("Initialzing client...");
    sleep(mediumSleep);

    while (true) {

        var endInventory_x = 1889, endInventory_y = 930;
        var tinOreInventoryColor = "746b6b";
        var endInventoryPixelColor = robot.getPixelColor(endInventory_x, endInventory_y);
        var startingTinOre_x = 803, startingTinOre_y = 883, startingCopperOre_x = 903, startingCopperOre_y = 474;

        console.log("Beginning to mine copper ore.")

        mineCopper();

        console.log("Filled up on copper ore. Now mining tin ore.")

        robot.moveMouseSmooth(startingTinOre_x, startingTinOre_y);
        sleep(shortsleep);
        robot.mouseClick();

        mineTin();

        console.log("Filling up inventory for the final time.");

        robot.moveMouseSmooth(endingTinOre_x, endingTinOre_y);
        sleep(shortsleep);
        robot.mouseClick();

        while (endInventoryPixelColor != tinOreInventoryColor) {
            sleep(longSleep);
            robot.mouseClick();
            endInventoryPixelColor = robot.getPixelColor(endInventory_x, endInventory_y);
        }

        goToBank();

        console.log("Going back to the original spot.");

        robot.moveMouseSmooth(startingCopperOre_x, startingCopperOre_y);
        sleep(shortsleep);
        robot.mouseClick();
        
        console.log("Ending loop...");
    }
}

function mineCopper() {

    for (i = 0; i < 4; i++) {

        console.log("Copper ore inventory number: " + i);

        sleep(shortsleep);
        robot.moveMouseSmooth(copperOre_x, copperOre_y);
        sleep(shortsleep);
        robot.mouseClick();
        endInventoryPixelColor = robot.getPixelColor(endInventory_x, endInventory_y);

            while (endInventoryPixelColor != copperOreInventoryColor) {
                sleep(longSleep);
                robot.mouseClick();
                console.log("Waiting to fill inventory with copper ore...");
                endInventoryPixelColor = robot.getPixelColor(endInventory_x, endInventory_y);
            }

        console.log("Filling up ore box with copper ore.");
        sleep(shortsleep);
        robot.moveMouseSmooth(beginningInventory_x, beginningInventory_y);
        sleep(shortsleep);
        robot.mouseClick();
    }
}

function mineTin() {

    for (i = 0; i < 4; i++) {

        console.log("Tin ore inventory number: " + i);

        sleep(mediumSleep);
        robot.moveMouseSmooth(endingTinOre_x, endingTinOre_y);
        sleep(shortsleep)
        robot.mouseClick();
        endInventoryPixelColor = robot.getPixelColor(endInventory_x, endInventory_y);

            while (endInventoryPixelColor != tinOreInventoryColor) {
                sleep(longSleep);
                robot.mouseClick();
                console.log("Waiting to fill inventory up with tin ore...");
                endInventoryPixelColor = robot.getPixelColor(endInventory_x, endInventory_y);
            }
        
        console.log("Filling up ore box with tin ore.");
        sleep(shortsleep);
        robot.moveMouseSmooth(beginningInventory_x, beginningInventory_y);
        sleep(shortsleep);
        robot.mouseClick();
    }
}

function goToBank() {

    console.log("Leaving cave.");
    sleep(shortsleep);
    robot.moveMouseSmooth(caveExit_x, caveExit_y);
    sleep(shortsleep);
    robot.mouseClick();
    sleep(longSleep);
    console.log("Facing north.");
    robot.moveMouseSmooth(compassLocation_x, compassLocation_y);
    sleep(shortsleep);
    robot.mouseClick();
    sleep(shortsleep);
    console.log("Going to bank.");
    robot.moveMouseSmooth(besideBank_x, besideBank_y);
    sleep(shortsleep);
    robot.mouseClick();
    sleep(extraSleep);
    console.log("Banking.");
    robot.moveMouseSmooth(bank_x, bank_y);
    sleep(shortsleep);
    robot.mouseClick();
    sleep(mediumSleep);
    console.log("Depositing inventory.");
    robot.keyTap("3");
    sleep(shortsleep);
    console.log("Getting ore box back.");
    robot.moveMouseSmooth(bankOreBox_x, bankOreBox_y);
    sleep(shortsleep);
    robot.mouseClick();
    sleep(shortsleep);
    console.log("Leaving bank.");
    robot.keyTap("escape");
    sleep(shortsleep);
    console.log("Facing south.");
    robot.moveMouseSmooth(compassLocation_x, compassLocation_y);
    sleep(shortsleep);
    robot.mouseClick("right");
    sleep(shortsleep);
    robot.moveMouseSmooth(faceSouth_x, faceSouth_y);
    sleep(shortsleep);
    robot.mouseClick();
    sleep(shortsleep);
    console.log("Going beside cave.");
    robot.moveMouseSmooth(caveFront_x, caveFront_y);
    sleep(shortsleep);
    robot.mouseClick();
    sleep(extraSleep);
    console.log("Entering cave.");
    robot.moveMouseSmooth(caveEntrance_x, caveEntrance_y);
    sleep(shortsleep);
    robot.mouseClick();
    sleep(mediumSleep);
    console.log("Facing north.");
    robot.moveMouseSmooth(compassLocation_x, compassLocation_y);
    sleep(shortsleep);
    robot.mouseClick()
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