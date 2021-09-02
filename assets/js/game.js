// Game States
// "WIN" - P;ayer robot has defeated all enemy robots
//  * Fight all enemy robots
//  * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less
var playerName = window.prompt("What is your robot's name?");
var  playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// you can also log multiple values at once like this 
console.log(playerName, playerAttack, playerHealth, playerMoney);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
  while(playerHealth > 0 && enemyHealth > 0) {
    // Ask player if they would like to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");

    //if player chose skip
    if (promptFight === "SKIP" || promptFight === "skip") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you want to skip?");

      //if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        //subtract money for skipping
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney);
        break;
      }
    }

    // log the players choice
    console.log(playerName + " chose to " + promptFight);
    // if player chose fight
    if (promptFight === "FIGHT" || promptFight === "fight") {
      //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
      enemyHealth = enemyHealth - playerAttack;
      // Log a resulting message to the console so we know that it worked.
      console.log(
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
      );
    
      // check enemy's health 
      if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");

        // award player money for winning
        playerMoney = playerMoney + 20;
        console.log(playerName, playerAttack, playerHealth, playerMoney);
        break;
      } else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
      }
      
      // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
      playerHealth = playerHealth - enemyAttack;
      // Log a resulting message to the console so we know that it worked.
      console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
      );

      //check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
        break;
      } else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
      }
    }
  }
};

for(var i = 0; i < enemyNames.length; i++) {
  if (playerHealth > 0) {
    window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
  }
  else {
    window.alert("You have lost your robot in battle! Game over!");
    break;
  }
};