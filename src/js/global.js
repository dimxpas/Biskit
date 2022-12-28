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

// Ajout de joueurs
function addPlayer() {
    $(".add_player").before("<p class='biskit-player'><i class='fa-solid fa-user-pen mr-2'></i> <input type='text'> <i onclick=\"$(this).closest('p').remove();\" class='ml-2 fa-regular fa-trash-can'></i></p>");
}
// sélection des joueurs
function checkPlayer() {
    nb_player = $(".biskit-player").length;
    error = false;
    if (nb_player < 2) {
        alert("Il faut 2 joueurs minimum !");
    } else {
        i = 0;
        array_player = [];
        while (i < nb_player) {
            name_player = $(".biskit-player")[i].children[1].value;
            array_player.push(name_player);
            if (name_player == "") {
                error = true;
            }
            i++;
        }
        if (error == true) {
            alert("Veuillez choisir un nom pour tout les joueurs.");
        } else {
            $("#nb_person").addClass("hidden");
            $("#dices_block, #players_btn").removeClass("hidden");
            $("#roll").trigger("click");
        }
    }
}
// suppression d'un joueur
function removePlayer() {
    $(this).closest('p').remove();
}
// fermeture de la modal
function closeModal() {
    $(".modal-content").removeClass("move-up").addClass("move-down");
    $(".modal").removeClass("fade-in").addClass("fade-out");
    $("body").css("overflow", "auto");
    setTimeout(() => {
        $(".modal").addClass("hidden");
    }, 500);
}
window.onclick = function (event) {
    if (event.target.classList[0] == "modal") {
        closeModal();
    }
}
// affichage des règles
function show_rules() {
    $("#biskit_rules").removeClass("hidden fade-out").addClass("fade-in");
    $("#biskit_rules .modal-content").removeClass("move-down").addClass("move-up");
    $("body").css("overflow", "hidden");
}
// affichage des joueurs
function show_players() {
    a = 0;
    poisse_icon = "";
    players_list = "";
    while (a < nb_player) {
        if (poisse == array_player[a]) {
            poisse_icon = "<span title='La poisse'><i class='ml-2 fa-solid fa-wine-glass'></i></span>";
        } else {
            poisse_icon = "";
        }
        players_list += "<p><i class='fa-solid fa-user-pen mr-2'></i> <input disabled type='text' value='" + array_player[a] + "'>" + poisse_icon + "</p>";
        a++;
    }
    $("#player_list").html(players_list);
    $("#biskit_players").removeClass("hidden fade-out").addClass("fade-in");
    $("#biskit_players .modal-content").removeClass("move-down").addClass("move-up");
    $("body").css("overflow", "hidden");
}
// numéro random de 1 à 6
function randomDice() {
    return Math.round(Math.random() * 5) + 1;
}
// affichage du dès avec fontawesome && traduction du nombre en lettre
function number_to_letter(dice_number) {
    var numbers = ["one", "two", "three", "four", "five", "six"];
    return "<i class='fa-solid fa-dice-" + numbers[dice_number - 1] + "'></i>";
}
