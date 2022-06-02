import Renderer from "./renderer.js";
import Keyboard from "./keyboard.js";
import Speaker from './speakers.js';
import CPU from "./cpu.js";


const renderer = new Renderer(10);
const keyboard = new Keyboard();
const speaker = new Speaker();
const cpu = new CPU(renderer, keyboard, speaker);

let rom;

document.getElementById("rombutton").addEventListener("click", function() {
    renderer.clear();
    window.cancelAnimationFrame(loop);
    cpu.memory = new Uint8Array(4096);
    cpu.v = new Uint8Array(16);
    cpu.stack = new Array();
    cpu.pc = 0x200;
    cpu.paused = false;
    cpu.speed = 10;

    rom = document.getElementById("romname").value;
    document.getElementById("canvas").style.visibility = "visible";
    boot();
});



let loop;
let fps = 60, fpsInterval, startTime, now, then, elapsed;

function boot() {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;


    cpu.loadSpritesIntoMemory();
    cpu.loadRom(rom);


    loop = requestAnimationFrame(step);
}

function step() {
    now = Date.now();
    elapsed = now-then;
    if (elapsed > fpsInterval) {
        cpu.cycle();
    }
    loop = requestAnimationFrame(step);
}

