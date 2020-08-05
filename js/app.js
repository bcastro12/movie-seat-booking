window.onload = function () {
    const column = document.getElementsByClassName("seatrow")[0].parentElement;
    const rows = 5;

    for (let i = 1; i < rows; i++) {
        let seats = document.getElementsByClassName("seatrow")[0].cloneNode(true);
        column.append(seats);
    }

    const seats = document.querySelectorAll(".seat:not(.out)");
    console.log(`Length: ${seats.length} seats`);

    let unavailable = [];
    for (let i = 1; i <= seats.length * 0.1; i++) {
        // creating unavailable seats
        let number = Math.abs(Math.ceil(Math.random() * seats.length) - 1);
        if (unavailable.includes(number)) {
            i--;
            continue;
        }
        unavailable.push(number);
    }

    for (let i = 0; i < seats.length; i++) {
        if (unavailable.includes(i)) {
            seats[i].classList.add("unavailable");
        } else {
            seats[i].id = i;
            seats[i].addEventListener("click", () => {
                seats[i].classList.toggle("selected");
                checkSelected();
            });
        }
    }

    document.getElementById("movie").addEventListener("change", function () {
        checkSelected();
    });
};

function checkSelected() {
    const seats = document.querySelectorAll(".selected:not(.out)");
    const span = document.getElementById("seats-span");
    const spanprice = document.getElementById("price");
    const img = document.getElementById("img");
    const movie = document.getElementById("movie").value;
    let price = 0;

    switch (movie) {
        case "joker":
            price = 10;
            img.src = "./img/joker.jpg";
            break;
        case "jurassic":
            price = 12;
            img.src = "./img/jurassic-world.jpg";
            break;
        case "avengers":
            price = 15;
            img.src = "./img/avengers.jpg";
            break;
    }

    span.innerHTML = seats.length + (seats.length == 1 ? " seat" : " seats");
    spanprice.innerHTML = seats.length * price;
}
