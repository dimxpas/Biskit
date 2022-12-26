jQuery(document).ready(function () {
    $("#roll").on("click", function () {
        result1 = randomDice();
        result2 = randomDice();
        $("#result_dice").html(result1 + " " + result2);
        if (result1 == 6 && result2 == 6) {
            setTimeout(function () { $("#message").html("Distribues " + result1 + " gorgées, inventes une nouvelle règle et on change de sens"); }, 1300);
            setTimeout(function () { $("#luck").css("display", "block"); document.getElementById('luck').play(); }, 1300);
            setTimeout(function () { $("#luck").css("display", "none"); }, 4300);
        } else if (result1 == result2) {
            if (result1 == 5) {
                setTimeout(function () { $("#message").html("Bois une gorgée et distribues " + result1 + " gorgées"); }, 1300);
            } else if (result1 == 3) {
                setTimeout(function () { $("#message").html("Distribue " + result1 + " gorgées, LA POISSE !!"); }, 1300);
            } else {
                setTimeout(function () { $("#message").html("Distribue " + result1 + " gorgées"); }, 1300);
            }
        } else if (result1 == 1 && result2 == 2 || result2 == 1 && result1 == 2) {
            setTimeout(function () { $("#duel").css("display", "block"); document.getElementById('duel').play(); $("#message").html("Duel"); }, 1300);
            setTimeout(function () { $("#duel").css("display", "none"); }, 4400);
        } else if (result1 + result2 == 7) {
            if (result1 == 3 || result2 == 3) {
                setTimeout(function () { $("#message").html("BISKIT ! Tout le monde boit, LA POISSE !!"); }, 1300);
            } else {
                setTimeout(function () { $("#message").html("BISKIT ! Tout le monde boit"); }, 1300);
            }
            // setTimeout(function(){$("#duel").css("display", "block");document.getElementById('duel').play(); }, 1500);
            // setTimeout(function(){$("#duel").css("display", "none"); }, 4600);
        } else if (result1 + result2 == 9) {
            if (result1 == 3 || result2 == 3) {
                setTimeout(function () { $("#message").html("Le joueur précèdent boit, LA POISSE !!"); }, 1300);
            } else {
                setTimeout(function () { $("#message").html("Le joueur précèdent boit"); }, 1300);
            }
        } else if (result1 + result2 == 10) {
            setTimeout(function () { $("#message").html("Bois une gorgée"); }, 1300);
        } else if (result1 + result2 == 11) {
            setTimeout(function () { $("#message").html("Le joueur suivant boit"); }, 1300);
        } else {
            if (result1 == 3 || result2 == 3) {
                setTimeout(function () { $("#message").html("LA POISSE !!"); }, 1300);
            } else {
                $("#message").html("");
            }
        }
        a = 1;
        while (a < 7) {
            if (result1 == a) {
                b = a;
                // utilisation de fontawesome
                setTimeout(function () { $("#dice_1").html(number_to_letter(randomDice())); }, 200);
                setTimeout(function () { $("#dice_1").html(number_to_letter(randomDice())) }, 400);
                setTimeout(function () { $("#dice_1").html(number_to_letter(randomDice())); }, 600);
                setTimeout(function () { $("#dice_1").html(number_to_letter(b)); }, 800);
            }
            if (result2 == a) {
                c = a;
                // utilisation de fontawesome
                setTimeout(function () { $("#dice_2").html(number_to_letter(randomDice())); }, 200);
                setTimeout(function () { $("#dice_2").html(number_to_letter(randomDice())) }, 400);
                setTimeout(function () { $("#dice_2").html(number_to_letter(randomDice())); }, 600);
                setTimeout(function () { $("#dice_2").html(number_to_letter(c)); }, 800);
            }
            a++;
        }

    });
    
    // Pour fermer la modal
    $(".modal-content span.close").on("click", function() {
        closeModal();
    });
});

function closeModal() {
    $(".modal-content").removeClass("move-up").addClass("move-down");
    $("#biskit_rules").removeClass("fade-in").addClass("fade-out");
    $("body").css("overflow", "auto");
    setTimeout(() => {
        $("#biskit_rules").addClass("hidden");
    }, 500);
}

window.onclick = function (event) {
    if (event.target.id == "biskit_rules") {
        closeModal();
    }
}

function show_rules() {
    $("#biskit_rules").removeClass("hidden fade-out").addClass("fade-in");
    $(".modal-content").removeClass("move-down").addClass("move-up");
    $("body").css("overflow", "hidden");
}

function randomDice() {
    return Math.round(Math.random() * 5) + 1;
}

function number_to_letter(dice_number) {
    var numbers = ["one", "two", "three", "four", "five", "six"];
    return "<i class='fa-solid fa-dice-" + numbers[dice_number - 1] + "'></i>";
}
