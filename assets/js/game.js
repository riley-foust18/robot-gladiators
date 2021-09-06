// Game States
// "WIN" - P;ayer robot has defeated all enemy robots
//  * Fight all enemy robots
//  * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var fight = function(enemy) {
  while(playerInfo.health > 0 && enemy.health > 0) {
    // Ask player if they would like to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");

    //if player chose skip
    if (promptFight === "SKIP" || promptFight === "skip") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you want to skip?");

      //if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        //subtract money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money);
        break;
      }
    }

    // log the players choice
    console.log(playerInfo.name + " chose to " + promptFight);
    // if player chose fight
    if (promptFight === "FIGHT" || promptFight === "fight") {
      //Subtract the value of `playerInfo.attack` from the value of `enemy.health` and use that result to update the value in the `enemy.health` variable
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      enemy.health = Math.max(0, enemy.health - damage);
      // Log a resulting message to the console so we know that it worked.
      console.log(
        playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
      );
    
      // check enemy's health 
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
        console.log(playerInfo.name, playerInfo.attack, playerInfo.health, playerInfo.money);
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
      
      // Subtract the value of `enemyAttack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      playerInfo.health = Math.max(0, playerInfo.health - damage);
      // Log a resulting message to the console so we know that it worked.
      console.log(
        enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
      );

      //check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
  }
};

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
}

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      //increase health and decrease money
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (playerInfo.money >= 7) {
      window.alert("Upgrading player's attack by 10 for 7 dollars.");
      // increase attack and decrease money
      this.attack += 6;
      this.attack -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10,14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10,14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10,14)
  }
];

//function to start new game
var startGame = function() {
  //reset player stats
  playerInfo.reset();

  for(var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
  
      var pickedEnemyObj = enemyInfo[i];
  
      pickedEnemyObj.health = randomNumber(40, 60);

      //calls fight function above
      fight(pickedEnemyObj);

      //if player is still alive and we're not at the last enemy in the array
      // i = which enenmy we're fighting in the array (0,1,2), enemyInfo.length = 3, -1 =2...shop will not be called for last enemy
      if (playerInfo.health > 0 && i < enemyInfo.length -1) {
        //ask player if they want to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        //if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    }
    else {
      window.alert("You have lost your robot in battle! Game over!");
      break;
    }
  }
  //after th eloop ends, player is eiher out of health or enemies, so run endGame
  endGame();
};

//function to end entire game
var endGame = function() {
  //if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("You've lost your robot in battle.");
  }

  //ask player if they'd like to play again
  //call playAgain in endGame, because playAgain will only ever be called at endGame, never on its own
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    //restart the game
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function() {
  //ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );

  //use switch to carry out action
  switch (shopOptionPrompt) {
    case "REFILL":
    case "refill":
      playerInfo.refillHealth();
      break;

    case "UPGRADE":
    case "upgrade":
      playerInfo.upgradeAttack();
      break;

    case "LEAVE":
    case "leave":
      window.alert("Leaving the store.");
      // do nothing, so function will end
      break;

    default:
      window.alert("You did not pick a valid option. Try again.");
      // call shop() again to force player to pick a valid option
      shop();
      break; 
  }
};

//start the game when the page loads
startGame();