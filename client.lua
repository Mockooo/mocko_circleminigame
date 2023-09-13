-- // Made by Mocko With Love

-- // Variables
local Playing = false
local Win = nil

-- // For the Setup
Citizen.CreateThread(function()
    SendNUIMessage({
        action = "setup",
        minspeed = Config.MinSpeed,
        maxspeed = Config.MaxSpeed,
        Hardest = Config.Hardest,
        Easyest = Config.Easyest
    })
end)

-- // Command for testing it
RegisterCommand("testcircleminigame", function(source, args, raw)
    if (Start(5, 3, 1000, 500, false)) then
        print("You Have Won the Minigame")
    else
        print("You Have Lost the Minigame")
    end
end)

-- // Start Function that starts the game and recalls if the game was won or not
function Start(rounds, trys, waitbeforeStart, waitinbetweeenround, OnGoing)
    if (Playing) then return end
    Playing = true
    Win = nil
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "start",
        rounds = rounds,
        trys = trys,
        wait1 = waitbeforeStart,
        wait2 = waitinbetweeenround,
        ongoing = OnGoing,
    })
    while (Playing) do Wait(100) end
    return Win
end

-- // Stop Function wich end the Game
function Stop()
    SendNUIMessage({
        action = "stop",
    })
end

-- // NuiCallBack to Catch the Exit out of the Game
RegisterNUICallback("exit", function(data)
    SetNuiFocus(false, false)
    Win = data.Win
    Playing = false
end)