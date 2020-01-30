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
        if (localStorage.getItem("coords") !== null) {
            let prevCoords = JSON.parse(localStorage.getItem("coords")),
                concatCoords = prevCoords.concat(coords);

            localStorage.setItem("coords", JSON.stringify(concatCoords));
            return;
        }
        localStorage.setItem("coords", JSON.stringify(coords));
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

    function print(e, touch) {
        if (isMouseDown || touch) {
            let x = e.clientX,
                y = e.clientY;
            drawingLine(x, y);
        }
    }
    function drawingLine(x, y) {
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

    // touch

    canvas.addEventListener("touchstart", handleStart, false);
    canvas.addEventListener("touchend", handleEnd, false);
    canvas.addEventListener("touchcancel", handleCancel, false);
    canvas.addEventListener("touchmove", handleMove, false);

    function handleStart(e) {
        //onsole.log("touchstart.");
    }

    function handleEnd(e) {
        //console.log("touchend.");
        ctx.beginPath();
        coords.push("mouseup");
    }
    function handleCancel(e) {
        //console.log("touchcancel.");
    }
    function handleMove(e) {
        //console.log(e.changedTouches);
        let touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            let x = touches[i].pageX,
                y = touches[i].pageY;
            drawingLine(x, y);
        }
    }

    // touch

    canvas.addEventListener("touchstart", handleStart, false);
    canvas.addEventListener("touchend", handleEnd, false);
    canvas.addEventListener("touchcancel", handleCancel, false);
    canvas.addEventListener("touchmove", handleMove, false);

    function handleStart(e) {
        console.log("touchstart.");
    }

    function handleEnd(e) {
        console.log("touchend.");
        ctx.beginPath();
        coords.push("mouseup");
    }
    function handleCancel(e) {
        console.log("touchcancel.");
    }
    function handleMove(e) {
        console.log(e.changedTouches);
        //coords.push([x, y]);
        let touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            let x = touches[i].pageX,
                y = touches[i].pageY;
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
