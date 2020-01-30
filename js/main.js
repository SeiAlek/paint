window.addEventListener("DOMContentLoaded", function() {
    "use strict";

    let canvas = document.querySelector("canvas"),
        ctx = canvas.getContext("2d"),
        control = document.querySelector("#control");

    let isMouseDown = false,
        lineWidth = 20,
        lineColor = "black",
        coords = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.addEventListener("mousedown", () => {
        isMouseDown = true;
    });
    canvas.addEventListener("mouseup", () => {
        isMouseDown = false;
        ctx.beginPath();
        coords.push("mouseup");
    });

    canvas.addEventListener("mousemove", function(e) {
        print(e);
    });

    control.addEventListener("click", function(e) {
        if (e.target.classList.contains("save")) {
            save();
        }
        if (e.target.classList.contains("play")) {
            coords = JSON.parse(localStorage.getItem("coords"));
            clear();
            play();
        }
        if (e.target.classList.contains("clear")) {
            coords = [];
            localStorage.setItem("coords", JSON.stringify([coords]));
            clear();
        }
    });

    function save() {
        let prevCoords = JSON.parse(localStorage.getItem("coords")),
            complexCoords = prevCoords.concat(coords);

        localStorage.setItem("coords", JSON.stringify(complexCoords));
    }

    function play() {
        let timer = setInterval(function() {
            if (!coords.length) {
                clearInterval(timer);
                ctx.beginPath();
                return;
            }
            let crd = coords.shift(),
                x = crd[0],
                y = crd[1];

            ctx.lineTo(x, y);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x, y);
        }, 30);
    }

    function clear() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillStyle = "black";
    }

    function print(e) {
        if (isMouseDown) {
            let x = e.clientX,
                y = e.clientY;

            coords.push([x, y]);

            ctx.lineWidth = lineWidth;

            ctx.lineTo(x, y);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    }
});
