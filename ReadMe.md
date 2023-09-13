# Mocko-CIRCLEMINIGAME
```lua

███╗░░░███╗░█████╗░░█████╗░██╗░░██╗░█████╗░  ░██████╗░█████╗░██████╗░██╗██████╗░████████╗░██████╗
████╗░████║██╔══██╗██╔══██╗██║░██╔╝██╔══██╗  ██╔════╝██╔══██╗██╔══██╗██║██╔══██╗╚══██╔══╝██╔════╝
██╔████╔██║██║░░██║██║░░╚═╝█████═╝░██║░░██║  ╚█████╗░██║░░╚═╝██████╔╝██║██████╔╝░░░██║░░░╚█████╗░
██║╚██╔╝██║██║░░██║██║░░██╗██╔═██╗░██║░░██║  ░╚═══██╗██║░░██╗██╔══██╗██║██╔═══╝░░░░██║░░░░╚═══██╗
██║░╚═╝░██║╚█████╔╝╚█████╔╝██║░╚██╗╚█████╔╝  ██████╔╝╚█████╔╝██║░░██║██║██║░░░░░░░░██║░░░██████╔╝
╚═╝░░░░░╚═╝░╚════╝░░╚════╝░╚═╝░░╚═╝░╚════╝░  ╚═════╝░░╚════╝░╚═╝░░╚═╝╚═╝╚═╝░░░░░░░░╚═╝░░░╚═════╝░

```
## INSTALLATION

Step 1: rename Folder to "mocko_circleminigame"
Step 2: drag into "resources" Folder
Step 3: edit youre server.cfg and add ensure mocko_circleminigame somewhere after esx has been started
Step 4: Configurate the Colors in the index.css so it looks like youre Server
Step 5: Configurate the config.lua for youre Server
Step 6: Restart the Server and Enjoy the Script!
Step 7: Report any Bugs you find to my Discord @mockoo or Under the post!
Step 8: Have Fun!

## Usage

### Exports
```lua
-- BSP1.1               | Desprection                                                                               | BSP1.2    | Datatype
-----------------------------------------------------------------------------------------------------------------------------------
-- rounds               | The ammount of Rounds the Player has to Complete.                                         | 5         | int (1-inf)
-- trys                 | The ammount of Fails/Trys the Player has.                                                 | 3         | int (1-inf)
-- waitbeforeStart      | The ammount of Time the Game Waits before it Starts to Rotate the Player.                 | 1000      | int (msec)
-- waitinbetweeenround  | The ammount of Time the Game Waits inbetween Rounds.                                      | 500       | int (msec)
-- OnGoing              | Declears if the Player gets Teleported back to the begining at the Start of each Round.   | false     | boolean
-----------------------------------------------------------------------------------------------------------------------------------
-- BSP2      | Desprection
-----------------------------------------------------------------------------------------------------------------------------------
-- Stops the Minigame Completly this is if you want the game to stop if the player dies or maybe he leaves 
-- the car or something else.
-----------------------------------------------------------------------------------------------------------------------------------

-- BSP1.1
exports.mocko_circleminigame:Start(rounds, trys, waitbeforeStart, waitinbetweeenround, OnGoing)
-- BSP1.2
exports.mocko_circleminigame:Start(5, 3, 1000, 500, false)

-- BSP2
exports.mocko_circleminigame:Stop()

### Commands
Command: /testcircleminigame
What is does: Starts a Minigame with the Values of BSP1.2 and then Prints if Won or Not
```