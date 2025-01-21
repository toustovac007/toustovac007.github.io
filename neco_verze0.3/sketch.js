let fighterImage, rangerImage, outcastImage, greenBlobImage, greenBlobanImage,greenBlobanosImage, spiderImage, skeletonImage, juggerknightImage;
let graySqare, tutorialImage, backgroundImage, restingBackgroundImage, deathScreenImage, victoryScreen, statBoardImage, healthImage, emptyHealthImage, staminaImage, emptyStaminaImage, energyImage, emptyEnergyImage, deathImage;
let gamePhase = "tutorial"; let level = 1;
let startTime = 0;
const heroCount = 3; const enemyCount = 3;

let imagesLoaded = false;

class Shield {
  constructor(defence, blockValue, durability, minimalStrenght, minimalDexterity, minimalConstitution) {
    this.defence = defence; this.blockValue = blockValue; this.durability = durability; this.minimalStrenght = minimalStrenght; this.minimalDexterity = minimalDexterity; this.minimalConstitution = minimalConstitution;
  }
}
class Armor {
  constructor (slashingResistance, piercingResistance, bludgeoningResistance, generalResistance, durability, minimalStrenght,  minimalConstitution) {
    this.slashingResistance = slashingResistance;  this.piercingResistance = piercingResistance;  this.bludgeoningResistance = bludgeoningResistance; this.generalResistance = generalResistance; this.durability = durability; this.minimalStrenght = minimalStrenght; this.minimalConstitution = minimalConstitution;
  }
}



class Weapon {
  constructor (dmgType, secondaryDmgType, type, handed, defaultDamage, defaultAttack, defaultDefence, energyCost, minimalStrenght, minimalDexterity, minimalConstitution, minimalInteligence, minimalFaith) {
    this.dmgType = dmgType;
    this.secondaryDmgType = secondaryDmgType || "none", this.handed = handed, this.type = type;
    this.defaultDamage = defaultDamage; this.defaultAttack = defaultAttack;
    this.defaultDefence = defaultDefence; this. energyCost = energyCost; this.minimalStrenght = minimalStrenght;
    this.minimalDexterity = minimalDexterity;
    this.minimalConstitution = minimalConstitution;
    this.minimalInteligence = minimalInteligence;
    this.minimalFaith = minimalFaith;
  }
}

class PassiveArmor {
  constructor (slashingResistance, piercingResistance, bludgeoningResistance, generalResistance){
    this.slashingResistance = slashingResistance;  this.piercingResistance = piercingResistance;  this.bludgeoningResistance = bludgeoningResistance; this.generalResistance = generalResistance;
  }
}

class Enemy {
  constructor (type, profileImage, nname, dhp, defence, staminaM,dEnergy, countOfMetabolismActions, slashingResistance, piercingResistance, bludgeoningResistance, generalResistance, at1, at2, at3, at4, at5, dt1, dt2, dt3, dt4, dt5, am1, am2, am3, am4, am5, att1, att2, att3, att4, att5) {
    this.type = type; this.profileImage = profileImage;this.name = nname;
    this.staminaM = staminaM; this.countOfMetabolismActions = countOfMetabolismActions;

    this.maxHp = dhp; this.hp = this.maxHp;      this.defence = defence;      this. maxStamina = floor(this.maxHp / 2) + this.staminaM; this.stamina = this.maxStamina; this.maxEnergy = dEnergy; this.energy = this.maxEnergy;

    this.at1 = at1;this.at2 = at2;this.at3 = at3;this.at4 = at4;this.at5 = at5;this.dt1 = dt1;this.dt2 = dt2;this.dt3 = dt3;this.dt4 = dt4;this.dt5 = dt5;this.am1 = am1;this.am2 = am2;this.am3 = am3;this.am4 = am4;this.am5 = am5;this.att1 = att1;this.att2 = att2;this.att3 = att3;this.att4 = att4;this.att5 = att5;

    this.damages = [dt1, dt2, dt3, dt4, dt5];                this.attacks = [at1, at2, at3, at4, at5];
    this.attackMethods = [am1, am2, am3, am4, am5];
    this.attackTypes = [att1, att2, att3, att4, att5];
    this.armor = new PassiveArmor (slashingResistance, piercingResistance, bludgeoningResistance, generalResistance); 

  }



}

  
 class Classa {
  constructor (profileImage, name, strength, dexterity, constitution, intelligence, wisdom, charisma, faith, dHp, dEnergy) {
    this.profileImage = profileImage;
    this.name = name;
    this.strength = strength;   this.dexterity = dexterity;    this.constitution = constitution;
    this.intelligence = intelligence;   this.wisdom = wisdom;
    this.charisma = charisma;   this.faith = faith;
    this.dHp = dHp;   this.dEnergy = dEnergy;

    this.strengthM = floor((this.strength-10)/2); this.dexterityM = floor((this.dexterity-10)/2); this.constitutionM = floor((this.constitution-10)/2);
    this.intelligenceM = floor((this.intelligence-10)/2); this.wisdomM = floor((this.wisdom-10)/2);
    this.charismaM = floor((this.charisma-10)/2); this.faithM = floor((this.faith-10)/2);

    this.maxHp = this.dHp + this.constitutionM; this.hp = this.maxHp;      this.maxStamina = this.maxHp + this.constitution; this.stamina = this.maxStamina;      this.maxEnergy = this.dEnergy + this.dexterityM; this.energy = this.maxEnergy;

  }




  }

  class Hero {
    constructor (heroClass, weapon, armor, shield) {
      this.skillPoints = 0;
      this.stats = heroClass; 
      this.weapon = weapon;
      this.armor = armor;
      this.shield = shield;
      this.x = 0;
      this.y = 0;
      this.width = 0;
      this.height = 0;
      this.selected = false;
    }
    metabolism () {
      let randomVal;

      for (let i = 0; i < 5 + this.stats.constitutionM; i++) {
        randomVal = floor(random(1, 6));

        switch (randomVal) {
          case 1:
          case 2:
          case 3:
            this.stats.stamina += 1;
          break;

          case 3:
          case 4:
            this.stats.energy += 1;
          break;

          case 5:
            this.stats.hp += 2;
          break;

          default:
            //console.log(randomVal);
          break;
        }
      }
    }

    endOfTurn () {
      if (this.stats.hp > 0) {
        
      
      this.stats.stamina += this.stats.hp + this.stats.constitutionM;
      this.stats.energy = this.stats.maxEnergy;
      if (this.stats.hp > this.stats.maxHp) {
        this.stats.stamina += this.stats.hp - this.stats.maxHp;
        this.stats.hp = this.stats.maxHp;
      }
      if (this.stats.stamina > this.stats.maxStamina) {
        this.stats.energy += this.stats.stamina - this.stats.maxStamina;
        this.stats.stamina = this.stats.maxStamina;
      }
      this.metabolism();
      }
    }
    
    unselect () {
      this.selected = false;
    }

    onclick () {
      //console.log(this.stats.name);               //Vymazat console.log, tohle je co se stane po kliknutí na obrázek tohoto hrdiny.
      if (this.stats.hp > 0 ) {                         //Označení hrdiny proběhne jen pokud je naživu. Přidat zamítavé pípnutí (jestli bude čas a chuť).
              this.selected = true;

      }

    }

    drawStatBar (x, y) {
      this.x = x;
      this.y = y;
      this.width = 250;               //Jde optimalizovat
      this.height = 150;
      if (this.stats.profileImage == fighterImage) {
              image(statBoardImage, x + 170, y , this.width, this.height);
              fill(0, 0, 0);
              textSize(20);
              textStyle(BOLD);

              text(this.stats.strength,  x + 175 + 10, y + 95);
              text(this.stats.dexterity,  x + 175 + 100 + 10, y + 95);
              text(this.stats.constitution,  x + 175 + 200 + 10, y + 95);

              fill(255, 255, 255);
              textSize(30);
              
              image(graySqare, x + 170 + this.width, y + (this.height / 2) - 15 , 50, 50);
              text(this.skillPoints,  x + 437, y + (this.height / 2) + 20);
           
      }else {
              image(statBoardImage, x - 50, y + 150 , this.width, this.height);
              fill(0, 0, 0);
              textSize(20);
              textStyle(BOLD);

              text(this.stats.strength,  x + 15 - 50, y + 150 + 95);
              text(this.stats.dexterity,  x + 15 - 50 + 100, y + 150 + 95);
              text(this.stats.constitution,  x + 15 - 50 + 200, y + 150 + 95);

              fill(255, 255, 255);
              textSize(30);

              image(graySqare, x + 200, y + 1.5*this.height - 15 , 50, 50);
              text(this.skillPoints,  x + 215, y + 1.5*this.height + 20);
            
      }









    }

    draw (x, y) {
      this.x = x;
      this.y = y;
      this.width = 100;               //Jde optimalizovat
      this.height = 100; 
      this.selected ? fill(color(50, 50, 50)) : fill(color(10, 10, 10));
      stroke(0);
      strokeWeight(1);
      rect(x, y, 300, 170);

      if (this.stats.hp > 0) {
        image(this.stats.profileImage, x + 5, y + 5, 100, 100);

      }else{
        image(deathImage, x + 5, y + 5, 100, 100);

      }


                                               //Pokud tohle někdo čte, prosím, nepohrdej mnou, že jsem tyto 3 cykly nedal do funkce, zkoušel jsem to a for some reason to nefungovalo, tak jsem se na to vykašlal.
  

      if (this.stats.hp > 18 && this.stats.hp < 28) {           //Vykresleni hp.

        image(healthImage, x + 15, y + 115, 22, 20);
                                        
        for (let i = 10; i < this.stats.hp; i++) {
          image(healthImage, x + 15*(i - 8 + 1), y + 120, 11, 10);
        }
                                                  
      }else if (this.stats.hp > 28) {
                                        
        image(healthImage, x + 15, y + 115, 22, 20);
        image(healthImage, x + 50, y + 115, 22, 20);
                                        
        for (let i = 20; i < this.stats.hp; i++) {
          image(healthImage, x + 15*(i - 15 + 1), y + 120, 11, 10);
        }
                                                  
      } else {
        for (let i = 0; i < this.stats.hp; i++) {
          image(healthImage, x + 15*(i+ 1), y + 120, 11, 10);
        }
      }
                                        
                                        
                                          
      if (this.stats.stamina > 16 && this.stats.stamina < 26) {           //Vykresleni stamina.
                                        
        image(staminaImage, x + 15, y + 132, 24, 20);
                                        
        for (let i = 10; i < this.stats.stamina; i++) {
          image(staminaImage, x + 15*(i - 8 + 1), y + 135, 18, 18);
        }
                                                  
      }else if (this.stats.stamina > 26) {
                                        
        image(staminaImage, x + 15, y + 132, 24, 20);
        image(staminaImage, x + 50, y + 132, 24, 20);
                                        
        for (let i = 20; i < this.stats.stamina; i++) {
          image(staminaImage, x + 15*(i - 15 + 1), y + 135, 18, 18);
        }
                                                  
      } else {
        for (let i = 0; i < this.stats.stamina; i++) {
          image(staminaImage, x + 15*(i+ 1), y + 135, 18, 18);
        }
      }
                                        
                                              
                                        
      if (this.stats.energy > 16 && this.stats.energy < 26) {           //Vykresleni energy.
                                        
        image(energyImage, x + 15, y + 145, 22, 20);
                                          
        for (let i = 10; i < this.stats.energy; i++) {
          image(energyImage, x + 15*(i - 8 + 1), y + 150, 18, 18);
        }
                                                    
      }else if (this.stats.energy > 26) {
                                          
        image(energyImage, x + 15, y + 145, 22, 20);
        image(energyImage, x + 50, y + 145, 22, 20);
                                          
        for (let i = 20; i < this.stats.energy; i++) {
          image(energyImage, x + 15*(i - 15 + 1), y + 150, 18, 18);
        }
                                                    
      } else {
        for (let i = 0; i < this.stats.energy; i++) {
          image(energyImage, x + 15*(i+ 1), y + 150, 18, 18);
        }
      }

    }
  }



  class EnemyContainer {
    constructor (enemy) {
      this. stats = enemy;
      this.selected = false;
    }


    attack (attacker) {
      let x = floor(random(0, 5));
      let target = floor(random(0, 3));

      if (this.stats.hp > 0) {
        enemyAttack (attacker, x, target);
      }else {
        this.stats.energy = 0;
      }


    }



    metabolism () {
      let randomVal;

      for (let i = 0; i < this.stats.countOfMetabolismActions; i++) {
        randomVal = floor(random(1, 6));

        switch (randomVal) {
          case 1:
          case 2:
          case 3:
            this.stats.stamina += 1;
          break;

          case 3:
          case 4:
            this.stats.energy += 1;
          break;

          case 5:
            this.stats.hp += 2;
          break;

          default:
            //console.log(randomVal);
          break;
        }
      }
    }




    endOfTurn () {
      if (this.stats.hp > 0) {
      this.stats.energy = this.stats.maxEnergy;


      this.stats.stamina += /*this.stats.hp + */this.stats.staminaM;

      if (this.stats.hp > this.stats.maxHp) {
        this.stats.stamina += this.stats.hp - this.stats.maxHp;
        this.stats.hp = this.stats.maxHp;
      }
      if (this.stats.stamina > this.stats.maxStamina) {
        this.stats.energy += this.stats.stamina - this.stats.maxStamina;
        this.stats.stamina = this.stats.maxStamina;
      }
      this.metabolism();
      }
    }
    
    unselect () {
      this.selected = false;
    }

    onclick () {
      //console.log(this.stats.name);               //Vymazat console.log, tohle je co se stane po kliknutí na obrázek tohoto hrdiny.
      if (this.stats.hp > 0 ) {                         //Označení hrdiny proběhne jen pokud je naživu. Přidat zamítavé pípnutí (jestli bude čas a chuť).
              this.selected = true;

      }

    }


    



    draw (x, y) {
      this.x = x;
      this.y = y;
      this.width = 100;               //Jde optimalizovat
      this.height = 100;


      this.selected ? fill(color(50, 50, 50)) : fill(color(10, 10, 10));
      stroke(0);
      strokeWeight(1);
      rect(x, y, 300, 170);  

      if (this.stats.hp > 0) {
        image(this.stats.profileImage, x + 5, y + 5, 100, 100);

      }else{
        image(deathImage, x + 5, y + 5, 100, 100);

      }


      if (this.stats.maxHp > 18 && this.stats.maxHp < 28) {           //Vykresleni max hp.

        image(emptyHealthImage, x + 15, y + 115, 22, 20);

        for (let i = 10; i < this.stats.maxHp; i++) {
          image(emptyHealthImage, x + 15*(i - 8 + 1), y + 120, 11, 10);
        }
          
      }else if (this.stats.maxHp > 28) {

        image(emptyHealthImage, x + 15, y + 115, 22, 20);
        image(emptyHealthImage, x + 50, y + 115, 22, 20);

        for (let i = 20; i < this.stats.maxHp; i++) {
          image(emptyHealthImage, x + 15*(i - 15 + 1), y + 120, 11, 10);
        }
          
      } else {
        for (let i = 0; i < this.stats.maxHp; i++) {
          image(emptyHealthImage, x + 15*(i+ 1), y + 120, 11, 10);
        }
      }

                                               //Pokud tohle někdo čte, prosím, nepohrdej mnou, že jsem tyto 3 cykly nedal do funkce, zkoušel jsem to a for some reason to nefungovalo, tak jsem se na to vykašlal.
  

      if (this.stats.hp > 18 && this.stats.hp < 28) {           //Vykresleni hp.

        image(healthImage, x + 15, y + 115, 22, 20);

        for (let i = 10; i < this.stats.hp; i++) {
          image(healthImage, x + 15*(i - 8 + 1), y + 120, 11, 10);
        }
          
      }else if (this.stats.hp > 28) {

        image(healthImage, x + 15, y + 115, 22, 20);
        image(healthImage, x + 50, y + 115, 22, 20);

        for (let i = 20; i < this.stats.hp; i++) {
          image(healthImage, x + 15*(i - 15 + 1), y + 120, 11, 10);
        }
          
      } else {
        for (let i = 0; i < this.stats.hp; i++) {
          image(healthImage, x + 15*(i+ 1), y + 120, 11, 10);
        }
      }


  
      if (this.stats.stamina > 16 && this.stats.stamina < 26) {           //Vykresleni stamina.

        image(staminaImage, x + 15, y + 130, 22, 20);

        for (let i = 10; i < this.stats.stamina; i++) {
          image(staminaImage, x + 15*(i - 8 + 1), y + 135, 18, 18);
        }
          
      }else if (this.stats.stamina > 26) {

        image(staminaImage, x + 15, y + 130, 22, 20);
        image(staminaImage, x + 50, y + 130, 22, 20);

        for (let i = 20; i < this.stats.stamina; i++) {
          image(staminaImage, x + 15*(i - 15 + 1), y + 135, 18, 18);
        }
          
      } else {
        for (let i = 0; i < this.stats.stamina; i++) {
          image(staminaImage, x + 15*(i+ 1), y + 135, 18, 18);
        }
      }

      

        if (this.stats.energy > 16 && this.stats.energy < 26) {           //Vykresleni energy.

          image(energyImage, x + 15, y + 145, 22, 20);
  
          for (let i = 10; i < this.stats.energy; i++) {
            image(energyImage, x + 15*(i - 8 + 1), y + 150, 18, 18);
          }
            
        }else if (this.stats.energy > 26) {
  
          image(energyImage, x + 15, y + 145, 22, 20);
          image(energyImage, x + 50, y + 145, 22, 20);
  
          for (let i = 20; i < this.stats.energy; i++) {
            image(energyImage, x + 15*(i - 15 + 1), y + 150, 18, 18);
          }
            
        } else {
          for (let i = 0; i < this.stats.energy; i++) {
            image(energyImage, x + 15*(i+ 1), y + 150, 18, 18);
          }
        }

  
    }
  }
let heroes;
let enemies;

function preload() {
  fighterImage = loadImage ('fighter_nahledovka.jpg'), rangerImage = loadImage ('ranger-nahledovka.jpg'), outcastImage = loadImage ('outcast_nahledovka.jpg');
  greenBlobImage = loadImage ('green_blob_nahledovka.jpg'),   greenBlobanImage = loadImage('green_bloban_nahledovka.jpg'), greenBlobanosImage = loadImage('green_blobanos_nahledovka.jpg'), spiderImage = loadImage('spider_image.png'), skeletonImage = loadImage('skeleton_image.png');

  backgroundImage = loadImage ('les.jpg');
  restingBackgroundImage = loadImage('resting_background.jpg');
  tutorialImage = loadImage('tutorial.png');
  healthImage = loadImage ('health_icon.png');
  emptyHealthImage = loadImage ('empty_health_icon.png');
  deathImage = loadImage('death_image.jpg');
  statBoardImage = loadImage('stat_board.png');
  staminaImage = loadImage ('stamina_icon.jpg');
  graySqare = loadImage ('blank_gray_sqare.png');
  juggerknightImage = loadImage ('juggerknight_image.jpg');
  //emptyStaminaImage, 
  energyImage = loadImage ('energy_icon.jpg');
  deathScreenImage = loadImage ('death_screen.jpg'); 
  victoryScreen = loadImage ('victory_screen.jpg'); 
  //emptyEnergyImage
  imagesLoaded = true;

  const shield_types = {"none" : new Shield(0, 0, 10000, 0, 0, 0), "wooden_buckler" : new Shield(2, 2, 30, 2, 0, 12, 0), "heater_shield" : new Shield(2, 3, 30, 0, 0, 10, 0), "rounded_shield" : new Shield(2, 4, 35, 1, 10, 8, 8), "kite_shield" : new Shield(1, 7, 50, 1, 12, 0, 12), "scutum" : new Shield(1, 8, 60, 2, 12, 0, 14), "metal_buckler" : new Shield(2, 2, 45, 4, 10, 12, 8), "spartan_shield" : new Shield(2, 4, 55, 3, 14, 8, 10)};
  const armor_types = {"none" : new Armor(0, 0, 0, 0, 10000, 0, 0), "quilted" : new Armor(1, 0, 0, 1, 9, 0, 0), "padded" : new Armor(1, 1, 2, 0, 10, 0, 0), "leather" : new Armor(2, 1, 1, 2, 10, 10, 10), "battered_leather" : new Armor(3, 1, 2, 2, 14, 12, 12 ), "hauberk" : new Armor(4, 2, 1, 3, 20, 14, 12), "scaly" : new Armor(5, 3, 3, 3, 30, 16, 14 ), "plate" : new Armor(6, 5, 4, 4, 40, 16, 16), "knight" : new Armor(7, 5, 4, 5, 45, 18, 16)}
  const hero_classes = {"fighter" : new Classa(fighterImage, "fighter", 10, 6, 10, 5, 5, 6, 7, 15, 10), "ranger" : new Classa(rangerImage, "ranger", 6, 10, 7, 7, 9, 7, 5, 10, 10), "outcast" : new Classa(outcastImage, "outcast", 5, 11, 4, 9, 8, 9, 8, 8, 15), }
  const melee_weapon_types = {"short_fighting_stick" : new Weapon("bludgeoning", null, "stick", 1, 3, 4, 2, 4, 0, 0, 0, 0, 0), "long_fighting_stick" : new Weapon("bludgeoning", null, "stick", 2, 4, 4, 4, 4, 0, 0, 0, 0, 0), "short_sword" : new Weapon("slashing", "piercing", "sword", 1, 4, 6, 5, 5, 10, 10, 8, 0, 0), "long_sword" : new Weapon("slashing", "piercing", "sword", 2, 5, 7, 7, 5, 12, 8, 8, 0, 0), "spear" : new Weapon("piercing", null, "spear", 2, 4, 9, 4, 5, 10, 12, 6, 0, 0),
    "mace" : new Weapon("bludgeoning", null, "mace", 1, 8, 4, 2, 6, 12, 0, 14, 0, 0), "hammer" : new Weapon("piercing", "bludgeoning", "hammer", 1, 7, 5, 2, 6, 14, 0, 12, 0, 0)}
   /*const enemy_types = {"blob" : new Enemy("basic",greenBlobImage,"blob",          10,3,5,10,3,          2, 1, 3, 0,        13, 13, 12, 14, 17,        5, 4, 3, 3, 2, 'melee', 'ranged', 'ranged', 'melee', 'melee',         'slashing', 'piercing', 'piercing', 'bludgeoning', 'bludgeoning'),
                        "bloban" : new Enemy("basic",greenBlobanImage,"bloban",          20,2,3,12,4,          3, 2, 2, 1,        15, 11, 18, 14, 13,        4, 7, 3, 3, 5, 'melee', 'melee', 'melee', 'ranged', 'ranged',         'general', 'bludgeoning', 'slashing', 'piercing', 'general'),
                        "blobanos" : new Enemy("basic",greenBlobanosImage,"blobanos",          30,1,2,14,5,          3, 2, 3, 2,        18, 14, 21, 17, 16,        6, 9, 5, 5, 7, 'melee', 'melee', 'melee', 'ranged', 'ranged',         'general', 'bludgeoning', 'slashing', 'piercing', 'general')
                      }*/

  //enemies = [new EnemyContainer(enemy_types["blob"]), new EnemyContainer(enemy_types["bloban"]), new EnemyContainer(enemy_types["blobanos"])];

    levelPreparation();

  heroes = [new Hero(hero_classes["fighter"],
                     melee_weapon_types["short_sword"],
                     armor_types["battered_leather"],
                    shield_types["rounded_shield"]),
            new Hero(hero_classes["ranger"],
                    melee_weapon_types["long_fighting_stick"],
                    armor_types["leather"],
                    shield_types["none"]),
            new Hero(hero_classes["outcast"],
                    melee_weapon_types["short_fighting_stick"],
                    armor_types["quilted"],
                    shield_types["wooden_buckler"])
            ];
}

function setup() {
  createCanvas(1400, 700);
}

function draw() {   if (millis() - startTime >= 1000) {

  let aliveCheck = 1;

  for (let i = 0; i < heroCount; i++) {
    if (aliveCheck != 0) {
      aliveCheck = heroes[i].stats.hp;
    }
  }

  if (aliveCheck < 1) {
    gamePhase = "dead";
  }


    startTime = 0;


  if (gamePhase == "tutorial") {
    imageMode(CORNER);
    image(tutorialImage, 0, 0, width, height);
  }

  else if (gamePhase == "fighting") {
    if (backgroundImage) {
    imageMode(CORNER);
    image(backgroundImage, 0, 0, width, height);
  } else {
    background(20);
  }

  heroes[0].draw(100, 100);
  heroes[1].draw(100, 300);
  heroes[2].draw(100, 500);


  enemies[0].draw(1000, 100);
  enemies[1].draw(1000, 300);
  enemies[2].draw(1000, 500);


  fill(color(200, 50, 50));
  stroke(255);
  strokeWeight(0);
  rect(550, 200, 300, 300);

  fill(255, 255, 255);
  textSize(70);
  textStyle(BOLD);

  text('End turn', 550 + 5, 200 + 170);
  }  else if (gamePhase == "resting") {
    imageMode(CORNER);
    image(restingBackgroundImage, 0, 0, width, height);

    image(outcastImage, 200, 250, 150, 150);
    heroes[2].drawStatBar(200, 250);
    
    image(fighterImage, 800, 250, 150, 150);
    heroes[0].drawStatBar(800, 250);
    
    image(rangerImage, 600, 350, 150, 150);
    heroes[1].drawStatBar(600, 350);
    
  fill(color(200, 50, 50));
  stroke(255);
  strokeWeight(0);
  rect(1000, 450, 200, 200);

  fill(255, 255, 255);
  textSize(40);
  textStyle(BOLD);

  text('New fight', 1000 + 10, 460 + 100);
  }  else if (gamePhase == "win") {
    imageMode(CORNER);
    image(victoryScreen, 0, 0, width, height);
    fill(color(200, 50, 50));
    stroke(255);
    strokeWeight(0);
    rect(1000, 450, 200, 200);
  
    fill(255, 255, 255);
    textSize(40);
    textStyle(BOLD);
  
    text('New Game', 1000 + 10, 460 + 100);

  }  else if (gamePhase == "dead") {
    imageMode(CORNER);
    image(deathScreenImage, 0, 0, width, height);
    fill(color(200, 50, 50));
    stroke(255);
    strokeWeight(0);
    rect(1000, 450, 200, 200);
  
    fill(255, 255, 255);
    textSize(40);
    textStyle(BOLD);
  
    text('New Game', 1000 + 10, 460 + 100);
    
  }
  }  
  }

  function levelPreparation () {

    const enemy_types = {"blob" : new Enemy("basic",greenBlobImage,"blob",          10,3,5,10,3,          2, 1, 3, 0,        13, 13, 12, 14, 17,        5, 4, 3, 3, 2, 'melee', 'ranged', 'ranged', 'melee', 'melee',         'slashing', 'piercing', 'piercing', 'bludgeoning', 'bludgeoning'),
      "bloban" : new Enemy("basic",greenBlobanImage,"bloban",                       20,2,3,12,4,          3, 2, 2, 1,        16, 12, 19, 15, 14,        4, 7, 3, 3, 5, 'melee', 'melee', 'melee', 'ranged', 'ranged',         'slashing', 'bludgeoning', 'slashing', 'piercing', 'general'),
      "blobanos" : new Enemy("basic",greenBlobanosImage,"blobanos",                 30,1,2,14,5,          3, 2, 3, 2,        18, 14, 21, 17, 16,        7, 10, 6, 6, 8, 'melee', 'melee', 'melee', 'ranged', 'ranged',         'bludgeoning', 'bludgeoning', 'slashing', 'piercing', 'general'),                             //Upravit at a dt staty pro skeleton a spider.
      "spider" : new Enemy("basic",spiderImage,"spider",                            20,2,2,12,5,          2, 1, 3, 2,        19, 15, 22, 18, 17,        7, 10, 6, 6, 8, 'melee', 'melee', 'melee', 'ranged', 'ranged',         'general', 'bludgeoning', 'slashing', 'slashing', 'general'),
      "skeleton" : new Enemy("basic",skeletonImage,"skeleton",                      25,0,5,14,7,          4, 3, 2, 3,        20, 16, 23, 19, 18,        7, 10, 6, 6, 8, 'melee', 'melee', 'melee', 'ranged', 'ranged',         'bludgeoning', 'bludgeoning', 'slashing', 'piercing', 'piercing'),
      "juggerknight" : new Enemy("basic",juggerknightImage,"juggerknight",          40,0,8,20,4,          4, 3, 2, 3,        23, 19, 27, 22, 21,        9, 10, 8, 6, 9, 'melee', 'melee', 'melee', 'ranged', 'ranged',         'bludgeoning', 'bludgeoning', 'slashing', 'piercing', 'piercing')
    }



    switch (level) {
      case 1:
      enemies = [new EnemyContainer(enemy_types["blob"]), new EnemyContainer(enemy_types["bloban"]), new EnemyContainer(enemy_types["blobanos"])];
        break;

      case 2:
        enemies = [new EnemyContainer(enemy_types["spider"]), new EnemyContainer(enemy_types["bloban"]), new EnemyContainer(enemy_types["blobanos"])];
        break;

      case 3:
        enemies = [new EnemyContainer(enemy_types["skeleton"]), new EnemyContainer(enemy_types["spider"]), new EnemyContainer(enemy_types["blob"])];
        break;

      case 4:
        enemies = [new EnemyContainer(enemy_types["skeleton"]), new EnemyContainer(enemy_types["spider"]), new EnemyContainer(enemy_types["juggerknight"])];
        break;

      default:
        break;
    }

    /*for (let i = 0; i < heroCount; i++) {
      heroes[i].stats.hp = heroes[i].stats.maxHp;
      heroes[i].stats.stamina = heroes[i].stats.maxStamina;
      heroes[i].stats.energy = heroes[i].stats.maxEnergy;
      
    }*/
  }

function rng () {
  let randomVal;
  randomVal = floor(random(17));
  let returnVar;
  switch (randomVal) {
    case 1:
        returnVar = -3;
      break;
  
    case 2:
    case 3:
      returnVar = -2;
    break;

    case 4:
    case 5:
    case 6:
      returnVar = -1;
    break;

    case 7:
    case 8:
    case 9:
    case 10:
      returnVar = 0;
    break;

    case 11:
    case 12:
    case 13:
    
      returnVar = 1;
    break;

    case 14:
    case 15:
    
      returnVar = 2;
    break;

    default:
      returnVar = 3;
    break;
  }
  return returnVar;
}

function slashingDamage (damage, armor, crit, defendingMonster, targetSide) {         //V této funkci vyjadřuje proměnná defendingMonster obránce celkově, nemusí jen monstrum.

  let arrayObjects = {
    "enemies" : enemies,
    "heroes" : heroes
  };


  if (crit = true) {
    damage = damage * 2 ;
  }
  if (damage > armor) {
    arrayObjects[targetSide] [defendingMonster].stats.hp -= (damage - armor);
  }
  arrayObjects[targetSide] [defendingMonster].stats.stamina -= (level - 1)
}
function piercingDamage (damage, armor, crit, defendingMonster, targetSide) {
  
  let arrayObjects = {
    "enemies" : enemies,
    "heroes" : heroes
  };


  if (crit = true) {
    damage = damage * 2 ;
  }
   if (damage > armor) {
    arrayObjects[targetSide] [defendingMonster].stats.hp -= damage;
  }else if (damage = armor) {
    arrayObjects[targetSide] [defendingMonster].stats.stamina -= floor(damage/2);
  }else {
    arrayObjects[targetSide] [defendingMonster].stats.stamina -= 1;
  }
  arrayObjects[targetSide] [defendingMonster].stats.stamina -= (level - 1)
}
function bludgeoningDamage (damage, armor, crit, defendingMonster, targetSide) {
  
  let arrayObjects = {
    "enemies" : enemies,
    "heroes" : heroes
  };


  if (crit = true) {
    damage = damage * 2 ;
  }
  if (damage > armor) {
    arrayObjects[targetSide] [defendingMonster].stats.hp -= (damage - armor);
    arrayObjects[targetSide] [defendingMonster].stats.stamina -= armor; 
  }else if (damage < armor) {
    arrayObjects[targetSide] [defendingMonster].stats.stamina -= damage;
  }
  arrayObjects[targetSide] [defendingMonster].stats.stamina -= (level - 1)
}


function hitEvaluation (damage, armor, damageType, crit, defendingMonster, targetSide) {
  switch (damageType) {
    case "slashing":
      slashingDamage (damage, armor, crit, defendingMonster, targetSide);
    break;

    case "piercing":
      piercingDamage (damage, armor, crit, defendingMonster, targetSide);
    break;

    case "bludgeoning":
      bludgeoningDamage (damage, armor, crit, defendingMonster, targetSide);
    break;

    default:
      slashingDamage (damage, armor, crit, defendingMonster, targetSide);
    break;
  }
}

function attack (attackingHero, defendingMonster) {

  if (heroes[attackingHero].stats.energy > heroes[attackingHero].weapon.energyCost) {
    
  

  let damage = heroes[attackingHero].weapon.defaultDamage + rng();
  let attack = heroes[attackingHero].weapon.defaultAttack + heroes[attackingHero].stats.dexterityM + rng();
  let defence = enemies[defendingMonster].stats.defence  + level - 1;               //Ať potvory nechcípají tak snadno v pozdějších levelech.
  let damageType = heroes[attackingHero].weapon.dmgType;
  let armor = 0;
  let crit = false;
  let extraStaminaCost = 0;
  let targetSide = "enemies";

  let defX = 1020; let defY = ((defendingMonster + 1) * 200) - 35;
  let sizeOfTextPleaseDoNotBlockThisName = 50;
  

  switch (damageType) {
      case "slashing":
        armor = enemies[defendingMonster].stats.armor.slashingResistance + level - 1;
      break;

      case "piercing":
        armor = enemies[defendingMonster].stats.armor.piercingResistance + level - 1;
      break;
      
      case "bludgeoning":
        armor = enemies[defendingMonster].stats.armor.bludgeoningResistance + level - 1;
      break;

      default:
        armor = enemies[defendingMonster].stats.armor.generalResistance + level - 1;
      break;
  }

  if (heroes[attackingHero].weapon.minimalStrenght > heroes[attackingHero].stats.strength) {
    damage -= heroes[attackingHero].weapon.minimalStrenght - heroes[attackingHero].stats.strength;
  }

  if (heroes[attackingHero].weapon.minimalDexterity > heroes[attackingHero].stats.dexterity) {
    attack -= heroes[attackingHero].weapon.minimalDexterity - heroes[attackingHero].stats.dexterity;
  }


  if (heroes[attackingHero].stats.stamina <= 0) {
    damage -= 1;
  }else if (heroes[attackingHero].stats.stamina >= 15) {
    damage += floor(heroes[attackingHero].stats.stamina / 15);
  }
  
  if (heroes[attackingHero].stats.stamina <= 5) {
    attack -= 1;
  } else if (heroes[attackingHero].stats.stamina >= 10) {
    attack += floor(heroes[attackingHero].stats.stamina / 10);
  }




    
 
    if (attack > defence && (attack - defence) > 3) {
      //console.log("Critical hit");
      crit = true;
      hitEvaluation (damage, armor, damageType, crit, defendingMonster, targetSide);


      startTime = millis();

      fill(153, 0, 0);
      textSize(sizeOfTextPleaseDoNotBlockThisName);
      textStyle(BOLD);
  
      text('Critical hit!', defX, defY);



    }
    else if (attack > defence) {
    //console.log("Hit");
      hitEvaluation (damage, armor, damageType, crit, defendingMonster, targetSide);

      startTime = millis();

      fill(153, 0, 0);
      textSize(sizeOfTextPleaseDoNotBlockThisName);
      textStyle(BOLD);
  
      text('Hit!', defX, defY);

      

    }
    else {
      //console.log("Miss");

      startTime = millis();

      fill(153, 0, 0);
      textSize(sizeOfTextPleaseDoNotBlockThisName);
      textStyle(BOLD);
  
      text('Miss', defX, defY);

    }

    if (heroes[attackingHero].weapon.minimalConstitution > heroes[attackingHero].stats.constitution) {
      extraStaminaCost += heroes[attackingHero].weapon.minimalConstitution - heroes[attackingHero].stats.constitution;
    }


heroes[attackingHero].stats.stamina -= (2 + extraStaminaCost + level - 1);
heroes[attackingHero].stats.energy -= heroes[attackingHero].weapon.energyCost;



  } else {
    //console.log("Exhausted");

    let atX = 120; let atY = ((attackingHero + 1) * 200) - 35;
    let promennaNazvanaNevohnymNazvemZHloubiDuseAZVeskerehoMehoZoufalstvi = 50;
    
    startTime = millis();

    fill(0, 153, 70);
    textSize(promennaNazvanaNevohnymNazvemZHloubiDuseAZVeskerehoMehoZoufalstvi);
    textStyle(BOLD);

    text('Exhausted', atX, atY);

  }

  if (heroes[attackingHero].stats.stamina < 0) {
    heroes[attackingHero].stats.hp += heroes[attackingHero].stats.stamina;
  }

  //heroes[attackingHero].unselect();                       //Zakomentováno pro lepší hratelnost a příjemnější zážitek.
  enemies[defendingMonster].unselect();

}




function enemyAttack (attacker, x, target) {
  let sizeOfTextPleaseDoNotBlockThisName = 50;
  let targetSide = "heroes";
 let damage = enemies[attacker].stats.damages[x];
 let attack = enemies[attacker].stats.attacks[x] + level - 1;         //Ať se potvory zlepšují s novým levelem.
  let damageType = enemies[attacker].stats.attackTypes[x];
  let defX = 120; let defY = ((target + 1) * 200) - 35;
  let crit = false, armor = 0, defence = heroes[target].stats.dexterity + heroes[target].weapon.defaultDefence + heroes[target].shield.defence;                  // přidat další věci (štít, zbraň)
  

 let attackMethod = enemies[attacker].stats.attackMethods[x];       //Zatím úplně zbytečné, protože není backline/frontline mechanika

 switch (damageType) {
  case "slashing":
    armor = heroes[target].armor.slashingResistance;
  break;

  case "piercing":
    armor = heroes[target].armor.piercingResistance;
  break;
  
  case "bludgeoning":
    armor = heroes[target].armor.bludgeoningResistance;
  break;

  default:
    armor = heroes[target].armor.generalResistance;
  break;
}



if (enemies[attacker].stats.stamina <= 0) {
  damage -= 1;
}else if (enemies[attacker].stats.stamina >= 15) {
  damage += floor(enemies[attacker].stats.stamina / 15);
}

if (enemies[attacker].stats.stamina <= 5) {
  attack -= 1;
} else if (enemies[attacker].stats.stamina >= 10) {
  attack += floor(enemies[attacker].stats.stamina / 10);
}




if (attack > defence && (attack - defence) > 3) {
  console.log("Critical hit");
  crit = true;
  hitEvaluation (damage, armor, damageType, crit, target, targetSide);


  startTime = millis();

  fill(153, 0, 0);
  textSize(sizeOfTextPleaseDoNotBlockThisName);
  textStyle(BOLD);

  text('Critical hit!', defX, defY);



}
else if (attack > defence) {
console.log("Hit");
  hitEvaluation (damage, armor, damageType, crit, target, targetSide);

  startTime = millis();

  fill(153, 0, 0);
  textSize(sizeOfTextPleaseDoNotBlockThisName);
  textStyle(BOLD);

  text('Hit!', defX, defY);

  

}
else {
  console.log("Miss");

  startTime = millis();

  fill(153, 0, 0);
  textSize(sizeOfTextPleaseDoNotBlockThisName);
  textStyle(BOLD);

  text('Miss', defX, defY);

}

enemies[attacker].stats.stamina -= 4;
enemies[attacker].stats.energy -= 5;

}

function gameLoop () {
  let countOfSelectedHeroes = 0;                        //Počítá kolik je označených hrdinů.
  for (let i = 0; i < heroCount; i++) {                          
    if (heroes[i].selected == true) {
      countOfSelectedHeroes++;
    }
  }

  if (countOfSelectedHeroes > 1) {                        //Vyhazuje nesmyslné označení (hrdina neútočí na kamaráda).
    for (let i = 0; i < heroCount; i++) {                          
      heroes[i].unselect();
    }
  }




  let countOfSelectedEnemies = 0;                        //Počítá kolik je označených hrdinů.
  for (let i = 0; i < heroCount; i++) {                          
    if (enemies[i].selected == true) {
      countOfSelectedEnemies++;
    }
  }

  if (countOfSelectedEnemies > 1) {                        //Vyhazuje nesmyslné označení (hrdina neútočí na kamaráda).
    for (let i = 0; i < heroCount; i++) {                          
      enemies[i].unselect();
    }
  }



  let seĺectedHeroIndex = 10;                        
  for (let i = 0; i < heroCount; i++) {                         
    if (heroes[i].selected == true) {
          seĺectedHeroIndex = i;    
        }
  }


  let seĺectedEnemyIndex = 10;                        
  for (let i = 0; i < heroCount; i++) {                         
    if (enemies[i].selected == true) {
          seĺectedEnemyIndex = i;    
        }
  }

  
  if (seĺectedHeroIndex != 10 && seĺectedEnemyIndex != 10) {
  attack(seĺectedHeroIndex, seĺectedEnemyIndex);
  }

  let deathEnemies = 0;
  for (let i = 0; i < enemyCount; i++) {
    if (enemies[i].stats.hp <= 0) {
      deathEnemies +=1;
    }
    
  }
      
  if (deathEnemies >= enemyCount) {                       //>= pro potenciální chyby.
    gamePhase = "resting";
    for (let i = 0; i < heroCount; i++) {
      heroes[i].skillPoints += 5;
    }
    level += 1;
    deathEnemies = 0;
  }

}

function enemyTurn() {
  for (let i = 0; i < enemyCount; i++) {

    while (enemies[i].stats.energy >= 5) {
       enemies[i].attack(i);   
    }
    enemies[i].endOfTurn();

  }

}


function statsIncrease () {
  if (heroes[1].skillPoints > 0) {

  if (mouseX >= 550 && mouseX <= 550 + 50 &&       //Ranger staty
    mouseY >= 500 + 20 && mouseY <= 500 + 50 + 15) {
    //console.log("Klik 1");
    heroes[1].skillPoints -= 1;
    heroes[1].stats.strength += 1;

  }
  if (mouseX >= 550 + 100 && mouseX <= 550 + 100 + 50 &&        
    mouseY >= 500 + 20 && mouseY <= 500 + 50 + 15) {
    //console.log("Klik 2");
    heroes[1].skillPoints -= 1;
    heroes[1].stats.dexterity += 1;
  }
  if (mouseX >= 550 + 200 && mouseX <= 550 + 200 + 50 &&        
    mouseY >= 500 + 20 && mouseY <= 500 + 50 + 15) {
    //console.log("Klik 3");
    heroes[1].skillPoints -= 1;
    heroes[1].stats.constitution += 1;
  }
  if (mouseX >= 550 && mouseX <= 550 + 200 + 50 &&       
    mouseY >= 600 + 10 && mouseY <= 600 + 50) {
    //console.log("Just kiding, you cannotlower your stats. :-)");

    startTime = millis();
    fill(255, 100, 100);
    textSize(80);
    textStyle(BOLD);
  
    text('Just kiding, \n you cannotlower your stats. :-)', 100, height/4);
  }

}

if (heroes[2].skillPoints > 0) {
  if (mouseX >= 150 && mouseX <= 150 + 50 &&       //Outcast staty
    mouseY >= 400 + 20 && mouseY <= 400 + 50 + 15) {
    //console.log("Klik 1");
    heroes[2].skillPoints -= 1;
    heroes[2].stats.strength += 1;
  }
  if (mouseX >= 150 + 100 && mouseX <= 150 + 100 + 50 &&        
    mouseY >= 400 + 20 && mouseY <= 400 + 50 + 15) {
    //console.log("Klik 2");
    heroes[2].skillPoints -= 1;
    heroes[2].stats.dexterity += 1;
  }
  if (mouseX >= 150 + 200 && mouseX <= 150 + 200 + 50 &&        
    mouseY >= 400 + 20 && mouseY <= 400 + 50 + 15) {
    //console.log("Klik 3");
    heroes[2].skillPoints -= 1;
    heroes[2].stats.constitution += 1;
  }
  if (mouseX >= 150 && mouseX <= 150 + 200 + 50 &&       
    mouseY >= 500 + 10 && mouseY <= 500 + 50) {
    //console.log("Just kiding, you cannotlower your stats. :-)");
    startTime = millis();
    fill(255, 100, 100);
    textSize(80);
    textStyle(BOLD);
  
    text('Just kiding, \n you cannotlower your stats. :-)', 100, height/4);
  }
}

if (heroes[0].skillPoints > 0) {

    if (mouseX >= 970 && mouseX <= 970 + 50 &&       //Fighter staty
      mouseY >= 250 + 20 && mouseY <= 250 + 50 + 15) {
      //console.log("Klik 1");
      heroes[0].skillPoints -= 1;
      heroes[0].stats.strength += 1;
    }
    if (mouseX >= 970 + 100 && mouseX <= 970 + 100 + 50 &&        
      mouseY >= 250 + 20 && mouseY <= 250 + 50 + 15) {
      //console.log("Klik 2");
      heroes[0].skillPoints -= 1;
      heroes[0].stats.dexterity += 1;
    }
    if (mouseX >= 970 + 200 && mouseX <= 970 + 200 + 50 &&        
      mouseY >= 250 + 20 && mouseY <= 250 + 50 + 15) {
      //console.log("Klik 3");
      heroes[0].skillPoints -= 1;
      heroes[0].stats.constitution += 1;
    }
    if (mouseX >= 970 && mouseX <= 970 + 200 + 50 &&       
      mouseY >= 350 + 10 && mouseY <= 350 + 50) {
      //console.log("Just kiding, you cannotlower your stats. :-)");
      startTime = millis();
      fill(255, 100, 100);
      textSize(80);
      textStyle(BOLD);
    
      text('Just kiding, \n you cannotlower your stats. :-)', 100, height/4);
    }
  }
}


function mouseClicked() {

  if (gamePhase == "tutorial") {
    gamePhase = "fighting";
  }

  else if (gamePhase == "fighting") {

    for (let i = 0; i < heroCount; i++) {                          
      const object = heroes[i];
      if (mouseX >= object.x && mouseX <= (object.x + 300 /*object.width*/) &&            //Na přání testera rozšiřuji oblast pro označení.
          mouseY >= object.y && mouseY <= (object.y + 170 /*object.height*/)) {
        
            heroes[i].onclick();
      }
    }

    for (let i = 0; i < heroCount; i++) {                          
      const object = enemies[i];
      if (mouseX >= object.x && mouseX <= (object.x + 300 /*object.width*/) && 
          mouseY >= object.y && mouseY <= (object.y + 170 /*object.height*/)) {
        
            enemies[i].onclick();
      }
    }



    if (mouseX >= 550 && mouseX <= 550 + 300 && 
    mouseY >= 200 && mouseY <= 200 + 300) {
      //console.log("Turn ended");
      for (let i = 0; i < heroCount; i++) { 
        heroes[i].endOfTurn();
      }

      enemyTurn();
    }


    gameLoop();
} else if (gamePhase == "resting") {




statsIncrease ();




  if (mouseX >= 1000 && mouseX <= 1000 + 200 && 
          mouseY >= 450 && mouseY <= 450 + 200) {
 // rect(1000, 450, 200, 200);
      for (let i = 0; i < heroCount; i++) {
      heroes[i].stats.hp = heroes[i].stats.maxHp;
      heroes[i].stats.stamina = heroes[i].stats.maxStamina;
      heroes[i].stats.energy = heroes[i].stats.maxEnergy;
    }


  levelPreparation();
  gamePhase = "fighting";
  if (level == 5) {
    gamePhase = "win";
  }
  draw();
  }
}else if (gamePhase = "win") {
  if (mouseX >= 1000 && mouseX <= 1000 + 200 && 
    mouseY >= 450 && mouseY <= 450 + 200) {
      location.reload(true);
}
}else if (gamePhase = "win") {
  if (mouseX >= 1000 && mouseX <= 1000 + 200 && 
    mouseY >= 450 && mouseY <= 450 + 200) {
      location.reload(true);
}
}
}

