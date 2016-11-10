/** 
 * Task 1
 * -Реализовать классы Hero и Monster
 * -дать возможность создавать героев 
 *		new Hero(name, heroClass)
 * -дать возможность создавать монстров 
 * 		new Monster(monsterClass)
 * -и герои и монстры могут быть только определенных классов, см спецификацию. 
 * В случае создания персонажа несуществующего класса - вернуть исключение "Incorrect character class provided" 
 * -свойства и методы героев и монстров так же указыны в спецификации
 */

/**
 * Task 2 Advanced
 * -Реализовать класс Game, согласно спецификации
 * -Реализовать удобный механизм наполнение игры героями и монстрами
 * -Реалтзовать управление состоянием игры, и переходы между состояниями
 */
function Hero(name, heroClass) {
    if (!heroClasses[heroClass]) {
        throw new Error('Incorrect character class provided');
    }

    this.name = name;
    this.life = heroClasses[heroClass].life;
    this.damage = heroClasses[heroClass].damage;
    this.charClass = heroClass[0].toUpperCase() + heroClass.slice(1);
}
/** 
 * @Hero
 * @.name {string}
 * @.charClass {string}  
 * @.life {number}
 * @.damage {number}
 * @.getName() {function} - returning name
 * @.getCharClass() {function} - returning character class
 *
 * accepts - target - instance of Monster
 * returns:
 * 		"I will attack only monsters" - in not monster was passed as target
 * 		"Hero attacked, " + GENERAL_ATTACK_MESSAGE
 * @.attack(target) {function}
 */
Hero.prototype.getName = function() {
    return this.name;
}

Hero.prototype.getCharClass = function() {
    return this.charClass || 'Incorrect character class provided';
}

Hero.prototype.attack = function(target) {
    var GENERAL_ATTACK_MESSAGE;
    var result;
    if (target instanceof Hero) {
        result = 'I will attack only monsters';
    }

    target.life -= this.damage;
    if (target.life < 0) {
        target.life = 0;
        GENERAL_ATTACK_MESSAGE = target.charClass + ' killed'
    } else {
        GENERAL_ATTACK_MESSAGE = 'done ' + this.damage +' damage to ' + target.charClass;
    }
    result = 'Hero attacked, ' + GENERAL_ATTACK_MESSAGE;
    return result;
}


/** 
 * @Monster {function}
 * @.charClass {string}  
 * @.life {number}
 * @.damage {number}
 * @.getName() {function} - returning "I am MONSTER_CHARACTER_CLASS I don`t have name"
 * @.getCharClass() {function} - returning character class
 *
 * accepts - target - instance of Hero
 * returns:
 * 		"I will attack only Hero" - in not hero was passed as target
 * 		"Monster attacked, " + GENERAL_ATTACK_MESSAGE
 * @.attack(target) {function}
 */
function Monster(monsterClass) {
    if (!monsterClasses[monsterClass]) {
        throw new Error('Incorrect character class provided');
    }

    this.life = monsterClasses[monsterClass].life;
    this.damage = monsterClasses[monsterClass].damage;
    this.charClass = monsterClass[0].toUpperCase() + monsterClass.slice(1);
}

Monster.prototype.getName = function() {
    return 'I am ' + this.charClass + ' I don`t have name';
}

Monster.prototype.getCharClass = function(charClass) {
    return this.charClass || 'Incorrect character class provided';
}

Monster.prototype.attack = function(target) {
    var GENERAL_ATTACK_MESSAGE;
    var result;
    if (target instanceof Monster) {
        result = 'I will attack only Hero';
    }

    target.life -= this.damage;

    if (target.life < 0) {
        target.life = 0;
        GENERAL_ATTACK_MESSAGE = target.charClass + ' killed'
    } else {
        GENERAL_ATTACK_MESSAGE = 'done ' + this.damage +' damage to ' + target.charClass;
    }
    GENERAL_ATTACK_MESSAGE = 'done ' + this.damage +' damage to ' + target.charClass;
    result = 'Monster attacked, ' + GENERAL_ATTACK_MESSAGE;
    return result;
}

//Game data
var heroClasses = {
    warrior: {
        charClass: "Warrior",
        life: 30,
        damage: 4
    },
    rogue: {
        charClass: "Rogue",
        life: 25,
        damage: 3
    },
    sorcerer: {
        charClass: "Sorcerer",
        life: 20,
        damage: 5
    }
};
var monsterClasses = {
    zombie: {
        charClass: "Zombie",
        life: 8,
        damage: 4
    },
    skeleton: {
        charClass: "Skeleton",
        life: 10,
        damage: 6
    },
    holem: {
        charClass: "Holem",
        life: 15,
        damage: 6
    }
};
var statuses = {
    idle      : "Idle",
    progress  : "In progress",
    finished  : "Finished"
};

/**
 * maxMonsters {number}
 */
var maxMonsters = 2;


/**
 * Game {fuction}
 * status {string} - current game status, "Idle" is the initial one
 * hero {object} - hero object that is in game
 * monsters {array} - of monsters in game
 */
function Game () {
    this.status = 'Idle';
    this.monsters = [];
}

/*
 * @beginJourney {function}
 * Change game status from "Idle" to "In progress", should be possible only if hero and monsters are defined
 * returns:
 *		"Your journey has started, fight monsters"- if ok 
 * throw new Error(
 * 		"Cannot start journey, populate the world with hero and monsters first") - if smth went wrong
 */
Game.prototype.beginJourney = function () {
    if (!this.hero && !this.monsters.length) {
        throw new Error("Cannot start journey, populate the world with hero and monsters first");
    }
    if (this.status === statuses.idle) {
        this.status = statuses.progress;
        return 'Your journey has started, fight monsters';
    }

}

/**
 * Change game status from "In progress" to "Finished", possible only if hero or both monsters are dead(their life equals 0)
 * retures:
 * 		"The Game is finished. Monstrs are dead. Congratulations" - if both monsters are dead
 * 		"The Game is finished. Hero is dead :(" - if hero is dead
 * 		"Don`t stop. Some monsters are still alive. Kill`em all" - if its not time yet
 */
Game.prototype.finishJourney = function () {
    var status = this.status,
        deadHero = this.hero.life <= 0,
        deadMonsters;

    var monstersAlive = this.monsters.filter(function(monster) {
        return monster.life > 0;
    });

    if (!monstersAlive.length) {
        deadMonsters = true;
    }

    if (deadHero || deadMonsters) {
        status = statuses.finished;
        return !deadHero ? 'The Game is finished. Monsters are dead. Congratulations' : 'The Game is finished. Hero is dead :(';
    } else {
        return 'Don`t stop. Some monsters are still alive. Kill`em all';
    }
}

/**
 * set game.hero to hero instance
 * accepts: instance of Hero class
 * throw:    
 * 		"Only one hero can exist" - if hero is already defined
 * 		"Only hero instance can be hero" - if not hero was passed to function
 * returns: 
 * 		"Hero created, welcome HERO_NAME" - if ok
 */
Game.prototype.addHero = function (hero) {

    if (!(hero instanceof Hero)) {
        throw new Error('Only hero instance can be hero');
    }
    if (!this.hero) {
        this.hero = hero;
        return 'Hero created, welcome ' + hero.name;
    } else {
        throw new Error('Only one hero can exist');
    }
}

/**
 * adds monster to game.monsters array
 * accepts: instance of Monster class
 * throw:
 * 		"Only 2 monsters can exist" - if there are already 2 monsters defined
 * 		"Only monster Instances can become monsters" - if not monster was passed to function
 * returns: 
 * 		"Monster Created, MONSTER_CHARACTER_CLASS appeared in the world" - if ok
 */
Game.prototype.addMonster = function (monster) {
    this.monsters = this.monsters || [];

    if (!(monster instanceof Monster)) {
        throw new Error('Only monster Instances can become monsters');
    }
    if (this.monsters.length < maxMonsters) {
        this.monsters.push(monster);
        return 'Monster Created, ' + monster.charClass + ' appeared in the world ';
    } else {
        throw new Error('Only 2 monsters can exist');
    }
}

/**
 * Initiate a battle between hero and monster, one after another, they should attack each other, starting from hero,
 * and until someone life is not 0
 * returns string 'Hero win' or 'Monster win', depending on who has life points left
 */
Game.prototype.fight = function() {
    var hero = this.hero;
    var monsters = this.monsters;
    var result;

    if (this.status !== statuses.progress) {
        throw new Error('Begin your journey to start fighting monsters');
    }

    if (hero.life > 0) {
        for (var i = 0; i < monsters.length; i++) {
            var monsterLifeAfterHit = hero.attack(monsters[i]);
            if (monsterLifeAfterHit > 0) {
                monsters[i].attack(hero);

                this.fight();
            }
        }
        result = 'Hero win';
    } else {
        result = 'Monster win';
    }

    return result;
}
