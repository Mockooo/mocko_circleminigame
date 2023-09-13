// Mady by Mocko
$("body").fadeOut("fast")

// All Variables
let Hardest = 1450;
let Easyest = 1250;
let minspeed = 0;
let maxspeed = 0;

let waitbeforeStart = 0;
let waitinbetweeenround = 0;
let OnGoing = false;

let speed = 0;
let rounds = 0;
let trys = 0;

let MinRotation = 0;
let MaxRotation = 0;
let PlayerRotation = 0;
let CenterRotation = 359;
let Playing = null;

// Message Listener
window.addEventListener("message", (event) => {

    let data = event.data;
    let action = data.action;

    switch(action){
        case "setup": 
            minspeed = data.minspeed;
            maxspeed = data.maxspeed;
            Hardest = data.Hardest;
            Easyest = data.Easyest;
            break;
        case "start":
            rounds = data.rounds;
            trys = data.trys;
            waitbeforeStart = data.wait1;
            waitinbetweeenround = data.wait2;
            OnGoing = data.ongoing;
            Start();
            break;
        case "stop":
            End(false);
            break;
    }
})

// OnCLick and on KeyDown Event
document.onclick = function (data) {
    if (Playing == null) { return; }
    if (SeeifWin()) {
        if (rounds > 0) {
            rounds--;
            Spot();
            if (OnGoing) {
                CenterRotation = PlayerRotation-1;
                clearInterval(Playing);
                Playing = null;
                setTimeout(() => {
                    if (!Playing) {
                        Playing = setInterval(Player, speed);
                    }
                } , waitinbetweeenround);
            } else {
                PlayerRotation = 0;
                $("#Player").css("rotate", PlayerRotation+"deg");
                clearInterval(Playing);
                Playing = null;
                setTimeout(() => {
                if (!Playing) {
                    Playing = setInterval(Player, speed);
                }
                } , waitinbetweeenround);
            }
        } else {
            End(true);
        }
    } else {
        if (trys > 0) {
            trys--;
            Spot();
            PlayerRotation = 0;
            $("#Player").css("rotate", PlayerRotation+"deg");
            clearInterval(Playing);
            Playing = null;
            setTimeout(() => {
                if (!Playing) {
                    Playing = setInterval(Player, speed);
                }
            }, waitinbetweeenround);
        } else {
           End(false);
        }
    }
    return;
}

document.onkeydown = function (data) {
    if (Playing == null) { return; }
    if (data.which == 32) { // Space
        if (SeeifWin()) {
            if (rounds > 0) {
                rounds--;
                Spot();
                if (OnGoing) {
                    CenterRotation = PlayerRotation-1;
                    clearInterval(Playing);
                    Playing = null;
                    setTimeout(() => {
                        if (!Playing) {
                            Playing = setInterval(Player, speed);
                        }
                    } , waitinbetweeenround);
                } else {
                    PlayerRotation = 0;
                    $("#Player").css("rotate", PlayerRotation+"deg");
                    clearInterval(Playing);
                    Playing = null;
                    setTimeout(() => {
                    if (!Playing) {
                        Playing = setInterval(Player, speed);
                    }
                    } , waitinbetweeenround);
                }
            } else {
                End(true);
            }
        } else {
            if (trys > 0) {
                trys--;
                Spot();
                PlayerRotation = 0;
                $("#Player").css("rotate", PlayerRotation+"deg");
                clearInterval(Playing);
                Playing = null;
                setTimeout(() => {
                    if (!Playing) {
                        Playing = setInterval(Player, speed);
                    }
                }, waitinbetweeenround);
            } else {
                End(false);
            }
        }
        return;
    }
    if (data.which == 27) { // ESC
        End()
        return
    }
};

// Functions
function Start() {
    $("#container").append(`
        <div class="Texts">
            <div class="Wraper">
                <div class="Rounds">5</div>
                <div class="Description">Rounds</div>
            </div>
            <div class="Wraper">
                <div class="Speed">10</div>
                <div class="Description">SPD</div>
            </div>
            <div class="Wraper">
                <div class="Fails">3</div>
                <div class="Description">Fails</div>
            </div>
        </div>
        <svg viewBox="0 0 500 500">
            <circle r="225" cx="250" cy="250" id="background" ></circle>
            <circle r="225" cx="250" cy="250" id="Spot" ></circle>
            <circle r="225" cx="250" cy="250" id="Player" ></circle>
        </svg>
    `);
    $("body").fadeIn("fast")
    Spot();
    setTimeout(() => {
        if (!Playing) {
            Playing = setInterval(Player, speed);
        }
    }, waitinbetweeenround);
}

function End(Win) {
    clearInterval(Playing);
    Playing = null;

    waitbeforeStart = 0;
    waitinbetweeenround = 0;
    OnGoing = false;

    speed = 0;
    rounds = 0;
    trys = 0;

    MinRotation = 0;
    MaxRotation = 0;
    PlayerRotation = 0;
    CenterRotation = 359;
    
    $("#container").empty();
    $("body").fadeOut("fast")
    $.post("http://ls_circleminigame/exit", JSON.stringify({Win: Win}));
}

function Spot() {
    var diffuculty = Math.round(Math.random()*(Hardest-Easyest)+Easyest);
    var Rotation =  Math.round(Math.random()*320);
    MinRotation = Rotation-5;
    MaxRotation = Rotation+GetMaxRotation(diffuculty);
    speed = Math.floor(Math.random()*(maxspeed-minspeed)+minspeed);
    $("#Spot").css("stroke-dashoffset", diffuculty);
    $("#Spot").css("rotate", Rotation+"deg");
    if (MaxRotation > CenterRotation) { CenterRotation = MaxRotation+5; }

    $(".Rounds").text(rounds);
    $(".Speed").text((speed-10)*(-1));
    $(".Fails").text(trys);
}

function Player() {
    PlayerRotation++;
    if (OnGoing) {
        if (PlayerRotation === 360) {
            PlayerRotation = 0;
        }
        if (PlayerRotation === CenterRotation) {
            if (trys > 0) {
                trys--;
            } else {
                End(false);
            }
        }
    } else {
        if (PlayerRotation === 360) {
            if (trys > 0) {
                trys--;
                Spot();
                PlayerRotation = 0;
                clearInterval(Playing);
                Playing = null;
                setTimeout(() => {
                    if (!Playing) {
                        Playing = setInterval(Player, speed);
                    }
                }, waitbeforeStart);
            } else {
                End(false);
            }
        }
    }
    $(".Fails").text(trys);
    $(".Rounds").text(rounds);
    $("#Player").css("rotate", PlayerRotation+"deg");
}

function SeeifWin() {
    if (PlayerRotation-MinRotation > 0) {
        if (PlayerRotation-MinRotation < MaxRotation-MinRotation) {
            return true;
        }
    }
    return false;
}

function GetMaxRotation(diffuculty) {
    let dummy = (Hardest-diffuculty);
    let dummy2 = 0;
    if (dummy > 150) {
        dummy2 -= 5;
    }
    if (dummy < 100) {
        dummy2 += 5;
    }
    if (dummy < 60) {
        dummy2 += 5;
    }
    if (dummy < 10) {
        dummy2 -= 1;
    }
    while (dummy >= 10) {
        dummy = dummy-10;
        dummy2 += 3.5;
    }
    while (dummy > 0) {
        dummy = dummy-1;
        dummy2 += 0.5;
    }
    return dummy2;
}
