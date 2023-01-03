jQuery(document).ready(function () {
    diceSound = new Audio('./src/audio/dice_roll.wav');
    diceSound.muted = true;
    lucky_vid = document.getElementById('luck');
    versus_vid = document.getElementById('duel');
    poisse = "";

    $("#roll_versus").on("click", function() {
        $("#roll_versus").addClass("hidden");
        result1vs = 0;
        result2vs = 0;
        roll1vs = 0;
        roll2vs = 0;
        v = 0;

        function throwDiceVersus(v) {
            if (roll1vs == 0 || roll2vs == 0) {
                diceSound.play();
                if (roll1vs == 0) {
                    result1vs = randomDice();
                    // lancement du dés 1
                    throwDices("dice_1", result1vs);
                }
                if (roll2vs == 0) {
                    result2vs = randomDice();
                    // lancement du dés 2
                    throwDices("dice_2", result2vs);
                }
            }
            
            if (result1vs == 1 || result1vs == 2) {
                roll1vs = result1vs;
            }
            if (result2vs == 1 || result2vs == 2) {
                roll2vs = result2vs;
            }

            if (roll1vs > 0 && roll2vs > 0 && roll1vs !== roll2vs) {
                setTimeout(function () { $("#message").html("<span class='title'>" + selectedPlayer + "</span> ton duel a été remporté, c'est <span class='title'>" + oldPlayer + "</span> qui vas prendre ce cul sec !<br>La partie reprend avec <span class='title'>" + selectedPlayer + "</span>"); }, 1000);
                $("#roll").removeClass("hidden");
                v = 2;
            } else if (roll1vs > 0 || roll2vs > 0) {
                if (roll1vs > 0) {
                    if (roll1vs == 1) {
                        lastrollvs = 2;
                    } else {
                        lastrollvs = 1;
                    }
                }
                if (roll2vs > 0) {
                    if (roll2vs == 1) {
                        lastrollvs = 2;
                    } else {
                        lastrollvs = 1;
                    }
                }
                setTimeout(function () { $("#message").html("<span class='title'>" + selectedPlayer + "</span> plus qu'un " + lastrollvs); }, 1000);
            } else {
                setTimeout(function () { $("#message").html("<span class='title'>" + selectedPlayer + "</span> tu le sens arriver ton cul sec ?"); }, 1000);
            }
        }

        function repeatThrowVersus() {
            throwDiceVersus(v);
            v++;
            setTimeout(function() {
              if (v < 3) {
                if (roll1vs > 0 && roll2vs > 0 && roll1vs !== roll2vs) {
                    // do nothing
                } else {
                    if (roll1vs > 0 && roll2vs > 0 && roll1vs == roll2vs) {
                        roll2vs = 0;
                    }
                    repeatThrowVersus();
                }
              } else {
                if (roll1vs == 0 || roll2vs == 0 || roll2vs == roll1vs) {
                    $("#message").html("<span class='title'>" + selectedPlayer + "</span> ton duel est perdu, tu vas pouvoir remercier <span class='title'>" + oldPlayer + "</span> pour ce cul sec !<br>La partie reprend avec <span class='title'>" + selectedPlayer + "</span>"); 
                    $("#roll").removeClass("hidden");
                }
              }
            }, 2000);
        }
        
        repeatThrowVersus();        
    });

    $("#roll").on("click", function() {
        $("#message").html("");
        diceSound.play();
        // lancement du dés 1
        result1 = randomDice(); 
        throwDices("dice_1", result1);
        // lancement du dés 2
        result2 = randomDice();
        throwDices("dice_2", result2);

        if ($("#player").html() == "") {
            actualPlayer = Math.floor(Math.random() * array_player.length);
            selectedPlayer = array_player[actualPlayer];
            setTimeout(function () { $("#message").html("C'est <span class='title'>" + selectedPlayer + "</span> qui commence la partie !"); $("#player").html(selectedPlayer); }, 1000);
        } else {
            $("#result_dice").html(result1 + " " + result2);
            if (result1 == 6 && result2 == 6) {
                setTimeout(function () { $("#message").html("Distribues " + result1 + " gorgées,<br>inventes une nouvelle règle et on change de sens"); }, 1000);
                array_player.reverse();
                actualPlayer = array_player.indexOf(selectedPlayer);
                setTimeout(function () { $("#luck").css("display", "block"); lucky_vid.play(); lucky_vid.onended = function () { $("#luck").css("display", "none"); }; }, 1000);
            } else if (result1 == result2) {
                if (result1 == 5) {
                    setTimeout(function () { $("#message").html("Bois une gorgée et distribues " + result1 + " gorgées"); }, 1000);
                } else if (result1 == 3) {
                    if (poisse == "") {
                        setTimeout(function () { $("#message").html("Distribue " + result1 + " gorgées"); }, 1000);
                    } else if (poisse == selectedPlayer) {
                        setTimeout(function () { $("#message").html("Distribue " + result1 + " gorgées, mais tu gardes la poisse !!"); }, 1000);
                    } else {
                        setTimeout(function () { $("#message").html("Distribue " + result1 + " gorgées,<br><span class='title'>" + poisse + "</span> alias la poisse tu bois 2 gorgées !!"); }, 1000);
                    }
                } else {
                    setTimeout(function () { $("#message").html("Distribue " + result1 + " gorgées"); }, 1000);
                }
            } else if (result1 == 1 && result2 == 2 || result2 == 1 && result1 == 2) {
                setTimeout(function () { $("#duel").css("display", "block"); versus_vid.play(); $("#message").html("Duel"); versus_vid.onended = function () { $("#duel").css("display", "none"); duelTime(selectedPlayer, array_player); }; }, 1000);
            } else if (result1 + result2 == 7) {
                if (result1 == 3 || result2 == 3) {
                    if (poisse == "") {
                        poisse = selectedPlayer;
                        setTimeout(function () { $("#message").html("<span class='popular-title'>BISKIT !</span> Le dernier joueur qui dit Biskit boit,<br> <span class='title'>" + selectedPlayer + "</span> tu deviens la poisse !!"); }, 1000);
                    } else if (poisse == selectedPlayer) {
                        poisse = "";
                        setTimeout(function () { $("#message").html("<span class='popular-title'>BISKIT !</span> Le dernier joueur qui dit Biskit boit,<br> <span class='title'>" + selectedPlayer + "</span> tu n'es plus la poisse !!"); }, 1000);
                    } else {
                        setTimeout(function () { $("#message").html("<span class='popular-title'>BISKIT !</span> Le dernier joueur qui dit Biskit boit,<br> <span class='title'>" + poisse + "</span> alias la poisse tu bois 1 gorgée !!"); }, 1000);
                    }
                } else {
                    setTimeout(function () { $("#message").html("<span class='popular-title'>BISKIT !</span> Le dernier joueur qui dit Biskit boit"); }, 1000);
                }
            } else if (result1 + result2 == 9) {
                if (result1 == 3 || result2 == 3) {
                    if (poisse == "") {
                        poisse = selectedPlayer;
                        setTimeout(function () { $("#message").html("<span class='title'>" + previousPlayerName(array_player, nb_player, actualPlayer) + "</span> tu précèdes donc tu bois,<br> <span class='title'>" + selectedPlayer + "</span> tu deviens la poisse !!"); }, 1000);
                    } else if (poisse == selectedPlayer) {
                        poisse = "";
                        setTimeout(function () { $("#message").html("<span class='title'>" + previousPlayerName(array_player, nb_player, actualPlayer) + "</span> tu précèdes donc tu bois,<br> <span class='title'>" + selectedPlayer + "</span> tu n'es plus la poisse !!"); }, 1000);
                    } else {
                        setTimeout(function () { $("#message").html("<span class='title'>" + previousPlayerName(array_player, nb_player, actualPlayer) + "</span> tu précèdes donc tu bois,<br> <span class='title'>" + poisse + "</span> alias la poisse tu bois 1 gorgée !!"); }, 1000);
                    }
                } else {
                    setTimeout(function () { $("#message").html("<span class='title'>" + previousPlayerName(array_player, nb_player, actualPlayer) + "</span> tu précèdes donc tu bois"); }, 1000);
                }
            } else if (result1 + result2 == 10) {
                setTimeout(function () { $("#message").html("Bois une gorgée"); }, 1000);
            } else if (result1 + result2 == 11) {
                setTimeout(function () { $("#message").html("<span class='title'>" + nextPlayerName(array_player, nb_player, actualPlayer) + "</span> tu suis donc tu bois"); }, 1000);
            } else {
                if (result1 == 3 || result2 == 3) {
                    setTimeout(function () { $("#message").html("LA POISSE TU BOIS !!"); }, 1000);
                    if (poisse == "") {
                        poisse = selectedPlayer;
                        setTimeout(function () { 
                            $("#message").html("<span class='title'>" + selectedPlayer + "</span> tu deviens la poisse !!");
                            nextPlayer(array_player, nb_player, actualPlayer);
                            $("#message").append("<br>C'est au tour de <span class='title'>" + selectedPlayer + "</span>");
                            $("#player").html(selectedPlayer);
                        }, 1000);
                    } else if (poisse == selectedPlayer) {
                        poisse = "";
                        setTimeout(function () { 
                            $("#message").html("<span class='title'>" + selectedPlayer + "</span> tu n'es plus la poisse !!");
                            nextPlayer(array_player, nb_player, actualPlayer);
                            $("#message").append("<br>C'est au tour de <span class='title'>" + selectedPlayer + "</span>");
                            $("#player").html(selectedPlayer);
                        }, 1000);
                    } else {
                        setTimeout(function () { $("#message").html("<span class='title'>" + poisse + "</span> alias la poisse tu bois 1 gorgée !!"); }, 1000);
                    }
                } else {
                    nextPlayer(array_player, nb_player, actualPlayer);
                    setTimeout(function () { $("#message").html("C'est au tour de <span class='title'>" + selectedPlayer + "</span>"); $("#player").html(selectedPlayer); }, 1000);
                }
            }
        }
    });

    // Pour fermer la modal
    $(".modal-content span.close").on("click", function() {
        closeModal();
    });
});
// Ajout de joueurs hors jeu
function addPlayer() {
    player_number = $(".biskit-player").length + 1;
    $("#add_player").before("<p class='biskit-player'><i class='fa-solid fa-user-pen mr-2'></i> <input type='text' placeholder='Joueur " + player_number + "'> <span class='ml-2 delete-icon' onclick=\"$(this).closest('p').remove();\"><i class='fa-regular fa-trash-can'></i></span></p>");
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
// gestion du volume
function toggleVolume() {
    $("#volume_up, #volume_mute").toggleClass("hidden");
    if (diceSound.muted == false) {
        diceSound.muted = true;
        lucky_vid.muted = true;
        versus_vid.muted = true;
    } else {
        diceSound.muted = false;
        lucky_vid.muted = false;
        versus_vid.muted = false;
    }
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
        players_list += "<p id='player_" + a + "'><span class='update-player' onclick='$(\"#inputplayer_" + a + "\").prop(\"disabled\", false); $(\"#player_" + a + " .valid-icon\").removeClass(\"hidden\");'><i class='fa-solid fa-user-pen mr-2'></i></span> <input id='inputplayer_" + a + "' disabled placeholder='Joueur " + (a + 1) + "' type='text' value='" + array_player[a] + "'> <span class='valid-icon ml-2 hidden' onclick='input_value = $(\"#inputplayer_" + a + "\")[0].value; updatePlayer(array_player, " + a + ", input_value);'><i class='fa-regular fa-circle-check'></i></span>" + poisse_icon + " <span class='delete-icon' onclick='deletePlayer(array_player, " + a + ")'><i class='ml-2 fa-regular fa-trash-can'></i></span></p>";
        a++;
    }
    $("#player_list").html(players_list);
    $("#biskit_players").removeClass("hidden fade-out").addClass("fade-in");
    $("#biskit_players .modal-content").removeClass("move-down").addClass("move-up");
    $("body").css("overflow", "hidden");
}
// Ajout de joueurs hors jeu
function addPlayerInGame() {
    $("#add_player_in_game").addClass("hidden");
    new_line_player = "<p id='player_" + nb_player + "'><span class='update-player' onclick='$(\"#inputplayer_" + nb_player + "\").prop(\"disabled\", false);'><i class='fa-solid fa-user-pen mr-2'></i></span> <input id='inputplayer_" + nb_player + "' type='text' placeholder='Joueur " + (nb_player + 1) + "'> <span class='valid-icon ml-2' onclick='input_value = $(\"#inputplayer_" + nb_player + "\")[0].value; updatePlayer(array_player, " + nb_player + ", input_value);'><i class='fa-regular fa-circle-check'></i></span> <span class='delete-icon' onclick='deletePlayer(array_player, " + nb_player + ")'><i class='ml-2 fa-regular fa-trash-can'></i></span></p>";
    $("#player_list").append(new_line_player);
}
// modification d'un joueur en jeu
function updatePlayer(arrayP, indexP, new_name) {
    if (new_name == "") {
        alert("Veuillez saisir un nom");
    } else {
        if (indexP == nb_player) {
            arrayP.push(new_name);
            array_player = arrayP;
            nb_player = arrayP.length;
            $("#add_player_in_game").removeClass("hidden");
        } else {
            if (poisse == arrayP[indexP]) {
                poisse = new_name;
            }
            arrayP[indexP] = new_name;
            array_player = arrayP;
            if (indexP == actualPlayer) {
                selectedPlayer = new_name;
                $("#player").html(new_name);
            }
        }
        $("#player_" + indexP + " .valid-icon").addClass("hidden");
        $("#inputplayer_" + indexP).prop("disabled", true);
    }
}
// suppression d'un joueur en jeu
function deletePlayer(arrayP, indexP) {
    if (arrayP.length > 2) {
        $("#player_" + indexP).remove();
        message_poisse = "";
        if (arrayP[indexP] == poisse) {
            poisse = "";
            message_poisse = "<br>La poisse est de nouveau en jeu !";
        }
        arrayP.splice(indexP, 1);
        array_player = arrayP;
        nb_player = arrayP.length;
        if (indexP == actualPlayer) {
            if (indexP > arrayP.length - 1) {
                actualPlayer = indexP - 1;
            }
            nextPlayer(arrayP, arrayP.length, actualPlayer);
            $("#player").html(arrayP[actualPlayer]);
            $("#message").html("La partie reprend avec <span class='title'>" + arrayP[actualPlayer] + "</span>" + message_poisse);
        } else {
            $("#message").append(message_poisse);
        }
    } else {
        alert("Vous ne pouvez plus supprimer de joueur (Minimum 2 joueurs)");
    }
}
// Affichage du duel
function duelTime(selectedP, arrayP) {
    a = 0;
    players_duel = "";
    while (a < nb_player) {
        if (arrayP[a] !== selectedP) {
            players_duel += "<button id='player_"+a+"' class='btn' onclick='versus(this.id)'>" + arrayP[a] + "</button>";
        }
        a++;
    }
    $("#message").html("Choisis ta cible<br>" + players_duel);
    $("#roll").addClass("hidden");
}
// Lancement du duel et changement de joueur
function versus(player_id) {
    oldPlayer = selectedPlayer;
    actualPlayer = parseInt(player_id.split("_")[1]);
    selectedPlayer = array_player[actualPlayer];
    $("#player").html(selectedPlayer);
    $("#message").html("<span class='title'>" + selectedPlayer + "</span> tu as 3 essais pour obtenir un 1 et un 2<br>Si tu échoues tu bois 1 cul sec sinon c'est <span class='title'>" + oldPlayer + "</span> qui le boit !");
    $("#roll_versus").removeClass("hidden");
}
// numéro random de 1 à 6
function randomDice() {
    return Math.round(Math.random() * 5) + 1;
}
// Affichage du lancer de dès
function throwDices(id_dice, dice_number) {
    setTimeout(function () { $("#" + id_dice).html(number_to_letter(randomDice())); }, 200);
    setTimeout(function () { $("#" + id_dice).html(number_to_letter(randomDice())); }, 400);
    setTimeout(function () { $("#" + id_dice).html(number_to_letter(randomDice())); }, 600);
    setTimeout(function () { $("#" + id_dice).html(number_to_letter(dice_number)); }, 800);
}
// affichage du dès avec fontawesome && traduction du nombre en lettre
function number_to_letter(dice_number) {
    var numbers = ["one", "two", "three", "four", "five", "six"];
    return "<i class='fa-solid fa-dice-" + numbers[dice_number - 1] + "'></i>";
}
// on passe au joueur suivant
function nextPlayer(arrayP, nb_player, actualP) {
    actualPlayer = actualP + 1;
    if (actualPlayer == nb_player) {
        actualPlayer = 0;
    }
    selectedPlayer = arrayP[actualPlayer];
}
// on affiche le nom du joueur suivant
function nextPlayerName(arrayP, nb_player, actualP) {
    var next_player = 0;
    if (actualP + 1 == nb_player) {
        next_player = 0;
    } else {
        next_player = actualP + 1;
    }
    return arrayP[next_player];
}
// on passe au joueur précédent
function previousPlayer(arrayP, nb_player, actualP) {
    actualPlayer = actualP - 1;
    if (actualPlayer < 0) {
        actualPlayer = nb_player - 1;
    }
    selectedPlayer = arrayP[actualPlayer];
}
// on affiche le nom du joueur précédent
function previousPlayerName(arrayP, nb_player, actualP) {
    var previous_player = actualP - 1;
    if (previous_player < 0) {
        previous_player = nb_player - 1;
    }
    return arrayP[previous_player];
}
