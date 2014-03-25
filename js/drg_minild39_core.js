

var Game = function () 
{
	this.$portal = $('#viewport');
	this.$timeline = $('section.timeline');
	this.$timelineList = $('section.timeline > ol');
	this.$character = $('section.char');
	this.$statsList = $('section.stats > ul');
	this.$modal = $('section.modal');
	this.$modalDivs = $('section.modal > div > div');
	// stats
	this.$date 		= $('span.date');
	this.$technology = $('span.technology');
	this.$age 		= $('span.age');
	this.$happiness = $('span.happiness');
	this.$smiley 	= $('span.smiley');
	this.$wisdom 	= $('span.wisdom');
	this.$health 	= $('span.health');
	this.$wealth 	= $('span.wealth');
	this.$social 	= $('span.social');
	this.$family 	= $('span.family');
	this.$creativity = $('span.creativity');
	this.$school 	= $('span.school');
	this.$education = $('span.education');
	this.$job 		= $('span.job');
	this.$career 	= $('span.career');
	this.$drug 		= $('span.drug');
	this.$addiction = $('span.addiction');
	this.$lifestyle = $('span.lifestyle');
	this.$hobby 	= $('span.hobby');
	this.$transportation = $('span.transportation');
	this.$allStats = this.$statsList.find('li > span');	

	/* =========================================================  Reference Data  ========================= */

	/*
	this.fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
	this.fibonacci = [100, 100, 200, 300, 500, 800, 1300, 2100, 3400, 5500];
	100, 200
	*/
	
	this.monthRef = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	
	this.educationRef = [
		{	"name"	: "Uneducated" }			// 0
		,{	"name"	: "Grade school" }			// 1
		,{	"name"	: "High school" }			// 2
		,{	"name"	: "Associate's Degree" }	// 3
		,{	"name"	: "Bachelor's Degree" }		// 4
		,{	"name"	: "Master's Degree" }		// 5
		,{	"name"	: "Doctorate" }				// 6
	];
	
	this.schoolRef = [
		{
			"name"			: "None"
		},
		{
			"name"			: "Early Education (K-12)"	// age 5-14   10 years ~~ 100 units
			,"educationGain"	: 1
			,"educationLevel" 	: 1
		},	
		{
			"name"			: "Sunnyvale High"	// age 15-18 ~~ 4 years ~~ 40 units
			,"educationGain"	: 2.5
			,"educationLevel" : 2
		},			
		{
			"name"			: "Happy Valley Community College"
			,"difficulty"	: 1
			,"educationLevel" : 3
		},
		{
			"name"			: "State School of Cogs"
			,"difficulty"	: 2
			,"educationLevel" : 4
		},
		{
			"name"			: "Advanced Cog College"
			,"difficulty"	: 2
			,"educationLevel" : 5
		},
		{
			"name"			: "Timetravel Institute of Technology"
			,"difficulty"	: 2
			,"educationLevel" : 6
		}
	];
	
	this.jobRef = [
		{
			"name"			: "Unemployed"
			,"salary"		: 0
		},
		{
			"name"			: "Grocery Bagger"
			,"salary"		: 5
		}
	];
	
	this.hobbyRef = [
		{
			"name"			: "Staring blankly into space"
		},
		{
			"name"			: "Thumb twidling"
		},
		{
			"name"			: "Stamp Collecting"
		}
	];
	
	this.drugRef = [
		{
			"name"			: "Being chaste and calm"
		},
		{
			"name"			: "Smoking"
		},
		{
			"name"			: "Drinking"
		},
		{
			"name"			: "Sex"
		},
		{
			"name"			: "Marijuana"
		},
		{
			"name"			: "LSD"
		},
		{
			"name"			: "Meth"
		},
		{
			"name"			: "Crack"
		},
		{
			"name"			: "Ecstasy"
		},
		{
			"name"			: "Sweets"
		}		
	];	
	
	this.lifestyleRef = [
		{
			"name"	: "Hobo"
		},
		{
			"name"	: "Meager"
		},
		{
			"name" 	: "Lowerclass"
		},
		{
			"name"	: "Middleclass"
		},
		{
			"name"	: "Comfortable"
		},
		{
			"name" 	: "Rich"
		}
	];
	
	this.transportationRef = [
		{	// 0
			"name"	: "Feet"	
		},
		{	// 1
			"name"	: "Bicycle"
		},
		{	// 2
			"name" 	: "Bus line"
		},		
		{	// 3
			"name" 	: "Scooter"
		},
		{	// 4
			"name" 	: "Motorcycle"
		},
		{	// 5
			"name"	: "Compact car"
		},
		{	// 6
			"name" 	: "Mini-van"
		},
		{	// 7
			"name"	: "Sports car"
		},
		{	// 8
			"name" 	: "Luxury sedan"
		},
		{	// 9
			"name"	: "Limo"
		}
	];
	
	
	/* 
	this.decisionRef = [
		{
			"text"	: "Go to school..."
			,"prerequisites" : {
				"educationLevel" : 1, "schoolIndex_max" : 0 
			}	
			,"choices" : [
				{
					"text" : "Go to  "
					,"prerequisites" : {
						"happiness_min" : 0
					}					
					,"outcomes" : [
						{
							"chance" : 100
							,"text"		: "Toys are a lot of fun!"
							,"statChanges" : {
								"happiness" : 20
								,"creativity" : 5
							}
						}
					]
				},
				{
					"text" : "Drawing"
					,"prerequisites" : {
						// no extra
					}					
					,"outcomes" : [
						{
							"chance" : 100
							,"text"		: "You draw a wonderful stick man with stick dog."
							,"statChanges" : {
								"happiness" : 10
								,"creativity" : 30
							}
						}
					]
				},		
		
		},
		*/
	this.decisionRef = [
		{
			"text"	: "How do you spend your classtime?"
			,"prerequisites" : {
				"educationLevel" : 0, "schoolIndex_min" : 1 
			}	
			,"choices" : [
				{
					"text" : "Playing with toys"
					,"prerequisites" : {
						"happiness_min" : 0
					}					
					,"outcomes" : [
						{
							"chance" : 100
							,"text"		: "Toys are a lot of fun!"
							,"statChanges" : {
								"happiness" : 20
								,"creativity" : 5
							}
						}
					]
				},
				{
					"text" : "Drawing"
					,"prerequisites" : {
						// no extra
					}					
					,"outcomes" : [
						{
							"chance" : 100
							,"text"		: "You draw a wonderful stick man with stick dog."
							,"statChanges" : {
								"happiness" : 10
								,"creativity" : 30
							}
						}
					]
				},
				{
					"text" : "Studying ABC's"
					,"prerequisites" : {
						"happiness_min" : 0
					}					
					,"outcomes" : [
						{
							"chance" : 100
							,"text"		: "A, B, C, D, E, F, G, H, I, K, L, N, M, O, P, Q, J, R, S, T, U, W, V, X, Y, Z"
							,"statChanges" : {
								"education" : 10
								,"social" : -1
							}
						}
					]
				},			
				{
					"text" : "Teasing other kids"
					,"prerequisites" : {
						// no extra
					}					
					,"outcomes" : [
						{
							"chance" : 100
							,"text"		: "You tease the redhead with braces, the fat boy who smells like bologna, and the slow kid with abusive parents. You feel confident that you're the best kid in the school."
							,"statChanges" : {
								"happiness" : 10
								,"social" : -50
							}
						}
					]
				}
			]
		}	
	
	/*
		{
			"text"	: "Which path will you go down?"
			,"choices" : [
				{
					"text" : "The safe path"
					,"prerequisites" : {
						"health" : 10
					}					
					,"outcomes" : [
						{
							"chance" : 90
							,"text"		: "Everything is fine."
							,"statChanges" : {
							}
						}
					]
				}

			]
		},
		{
			"text"	: "Which path will you go down?"
			,"choices" : [
				{
					"text" : "The safe path"
					,"eventIndexArray" : [0]
				},
				{
					"text" : "The risky path"
					,"eventIndexArray" : [1]
				}

			]
		},
		{
			"text" : "You play the lottery. Which numbers do you pick?"
			,"choices" : [ // 4,8,15,16,23,42 ... 108
				{
					"text" : "4, 815"
					,"eventIndexArray" : [2,2,2,2,2,2,2,2,2,2,2,3,3,3,4]
				},{
					"text" : "8, 108"
					,"eventIndexArray" : [2,2,2,2,2,2,2,2,2,2,2,3,3,3,4]
				},{
					"text" : "16, 23"
					,"eventIndexArray" : [2,2,2,2,2,2,2,2,2,2,2,3,3,3,4]
				},{
					"text" : "42, 4"
					,"eventIndexArray" : [2,2,2,2,2,2,2,2,2,2,2,3,3,3,4]
				},{
					"text" : "108, 23"
					,"eventIndexArray" : [2,2,2,2,2,2,2,2,2,2,2,3,3,3,4]
				}
			]
		}
		*/
	];
	
	this.eventRef = [
		{// 0
			"text"		: "You find a small bag of coins."
			,"statChanges" : {
				"wealth" : 10
			}
		},
		{// 1
			"text"		: "You step on a rusty nail."
			,"statChanges"	: {
				"health"	: -10
			}
		},
		{// 2
			"text"		: "You play the lottery, but win nothing."
			,"statChanges"	: {
				"wealth" 	: -1
			}
		},
		{// 3
			"text"		: "You win a small amount of money."
			,"statChanges"	: {
				"wealth" : 15
			}
		},
		{// 4
			"text"		: "Your lottery numbers are the big winner!"
			,"statChanges"	: {
				"wealth" : 1000
			}
		},
		{
			"text"		: "You attend a great party."
			,"statChanges"	: {
				"social" : 50
			}
		},
		{
			"text"		: "You suffer heartbreak."
			,"statChanges"	: {
				"social" : -100
				,"family" : -100
			}
		},
		{
			"text"		: ""
			,"statChanges"	: {

			}
		}
		
	];
	


	/* =========================================================  Character & Game Vars  ====================== */
	this.lifeDefault = {
		"age"				: 0
		,"month"			: 0
		,"year"				: 2013
		,"technology"		: 0		// 0 to infinity
		,"wisdom"			: 0		// 0 to infinity
		,"happiness"		: 0		// -100 to +100
		,"health"			: 10
		,"healthLevel"		: 8		// level (0-10)
		,"wealth"			: 0 	
		,"wealthLevel"		: 0 	// level (0-10)
		,"social"			: 0
		,"socialLevel"		: 0		// level (0-10)
		,"socialArray"		: []	// not used yet
		,"family"			: 0
		,"familyLevel"		: 0		// level (0-10)
		,"familyArray"		: []	// not used yet
		,"career"			: 0
		,"careerLevel"		: 0		// level (0-10)
		,"creativity"		: 0
		,"creativityLevel"	: 0		// level (0-10)		
		,"addiction"		: 0
		,"addictionLevel"	: 0		// level (0-10)
		,"education"		: 0
		,"educationLevel"	: 0		// level (0-6)		
		,"schoolIndex"		: 0		// FK
		,"lifestyleIndex"	: 0		// FK: 0,1,2,3,4,5
		,"jobIndex"			: 0		// FK
		,"hobbyIndex"		: 0		// FK
		,"drugIndex"		: 0		// FK
		,"transportationIndex" :  0 // FK
		,"timeline"			: []
		,"marriage"			: 0 	// 0 or 1
	};
	this.life = this.lifeDefault;
	this.alternateLives = [
	
	];


	// Constants
	this.timeTravelTechnology = 1000;
	// Could change, rarely
	this.tickTime = 50;
	this.tickCount = 0;
	this.lastDecisionTick = 0;
	// Where you are in the game
	this.tickIntervalId = 0;
	this.isPaused = true;
	// Other
	
	
	// Blank Scheme

	
	
	/* =========================================================  Events  ==================================== */
	


	
	/* =========================================================  Get Calculated Values  ========================= */
	
	this.isDead = function () 
	{
		if (this.life.age > 1000) return true; // died of old age
		if (this.life.health <= 0 && this.life.healthLevel <= 0) return true; // died of poor health
	}
	
	this.isTimeTravelInvented = function () {
		return (this.life.technology > this.timeTravelTechnology) ? true : false;
	}
	
	this.getHappinessLevel = function (){
		if (this.life.happiness > 330) return 1;
		else if (this.life.happiness < -330) return -1;
		else return 0;
	}
	this.isHappy = function() {
		return (this.getHappinessLevel() > 0) ? true : false;
	}
	this.isSad = function() {
		return (this.getHappinessLevel() < 0) ? true : false;
	}
	
	// A decision is only possible if there are at least 2 possible choices
	this.isDecisionPossible = function (decision) {
		if (this.isPrerequisitesPassed(decision.prerequisites)) {
			var choicesPassedCount = 0;
			for (var c=0; c < decision.choices.length; c++) {
				if (this.isChoicePossible(decision.choices[c])) {
					choicesPassedCount++;
				}
			}
			return (choicesPassedCount >= 2) ? true : false;
		} else {
			return false;
		}
	}
	
	// A choice is only possible if the character has met the prerequisites
	this.isChoicePossible = function (choice) {
		// if no prerequisites, then choice is always possible
		if (typeof choice.prerequisites === 'undefined') return true;
		else {
			return this.isPrerequisitesPassed(choice.prerequisites);
		}
	}
	
	this.isPrerequisitesPassed = function (prerequisites) {
		if (typeof prerequisites === 'undefined') return true;
		var prerequisiteStatCount = 0;
		var passedStatCount = 0;
		for (var statName in prerequisites) {
			if (prerequisites.hasOwnProperty(statName)) {
				prerequisiteStatCount++;
				var statNameArray = statName.split("_")
				var realStatName = statNameArray[0];
				if (typeof statNameArray[1] === 'undefined') {
					if (this.life[realStatName] >= prerequisites[statName]) passedStatCount++;
				} else if (statNameArray[1] == "min") {
					if (this.life[realStatName] >= prerequisites[statName]) passedStatCount++;
				} else if (statNameArray[1] == "max") {
					if (this.life[realStatName] <= prerequisites[statName]) passedStatCount++;
				}
			}
		}
		return (passedStatCount >= prerequisiteStatCount) ? true : false;	
	}

	
	/* =========================================================  Change Values  ================================= */
	
	this.increaseTime = function ()
	{
		this.life.month += 1;
		if (this.life.month > 12) {
			this.life.year += 1;
			this.life.month = 1;
			this.life.age += 1;
		}
		this.life.technology += 0.1;
	}
	
	this.changeStat = function (statName, changeAmount) {
		if (statName == "happiness") {
			this.changeHappiness(changeAmount);
		} else {
			this.life[statName] += changeAmount;
			if (this.life[statName] < 0) 			this.life[statName] = 0;
			else if (this.life[statName] > 1000) 	this.life[statName] = 1000;
			this.life[statName + "Level"] = Math.floor(this.life[statName] / 100);
		}
	
	}
	
	/*
	this.changeStandardStat = function (statObj, changeAmount)
	{
		if (typeof statObj === 'string') statObj = this.life[statObj];
		statObj.points += changeAmount;	// Math.round(changeAmount;	
		if (statObj.points < 0) {
			if (statObj.level <= 0) {
				statObj.points = 0;
				statObj.level = 0;
			} else {
				statObj.points = 100 + statObj.points;
				statObj.level -= 1;
			}
		} else if (statObj.points > 100) {
			if (statObj.level >= 9) {
				statObj.level = 10;
				statObj.points = 100;
			} else {
				statObj.level += 1;
				statObj.points = statObj.points - 100;
			}
		}
	}
	*/
	
	this.changeHappiness = function (changeAmount) {
		this.life.happiness += changeAmount;
		if (this.life.happiness > 1000) 			this.life.happiness = 1000;
		else if (this.life.happiness < -1000)	this.life.happiness = -1000;
	}
	
	// actually monthly change...
	this.annualChangeStats = function ()
	{
		var healthDelta = 0
			,socialDelta = 0
			,familyDelta = 0
			,careerDelta = 0
			,educationDelta = 0
			,happinessDelta = 0
		;
		// Naturally get wiser every year of life
		if (this.life.age > 20) {
			this.life.wisdom += 0.4;
		} else if (this.life.age > 10) {
			this.life.wisdom += 0.1;
		}
		// Change health if happy or sad
		if (this.isHappy()) {
			healthDelta += 1;
			socialDelta += 3;
			familyDelta += 1;
		} else if (this.isSad()) {
			healthDelta -= 1;
			socialDelta -= 4;
			familyDelta -= 1;
		}
		// Get healthier if young
		if (this.life.age < 16) {
			healthDelta += ((16 - this.life.age)/2);
		} else if (this.life.age >= 40) {
			healthDelta += -1 + (-1 * Math.round((this.life.age - 40) / 10));
		}

		// Lifestyle affects your family & health & happiness
		healthDelta += (this.life.lifestyleIndex - 2);
		familyDelta += (this.life.lifestyleIndex - 2);
		happinessDelta += (this.life.lifestyleIndex - 2);

		
		// *** increase/decrease wealth based on career, happiness, lifestyle, wisdom and transportation

		// *** if addicted, increase happiness (with wild random modifier) and decrease something else
		// *** change happiness based on health, wealth, social, family, lifestyle, wisdom, etc.
		
		// If you have a job...
		if (this.life.schoolIndex > 0) {
			if (this.isHappy()) {				careerDelta += 2; 
			} else if (this.isSad()) {			careerDelta += -3;
			} else {							careerDelta += 1;
			}
		}
		
		// If in school...
		if (this.life.schoolIndex > 0) {
			this.changeStat("social", 2);
			if (this.life.month < 7 || this.life.month > 8) {
				var school = this.schoolRef[this.life.schoolIndex];
				educationDelta += school.educationGain;
			}
		}
		
		this.changeStat("health", healthDelta);
		this.changeStat("social", socialDelta);
		this.changeStat("family", familyDelta);
		this.changeStat("education", educationDelta);
		this.changeStat("career", careerDelta);
		this.changeStat("happiness", happinessDelta);

	}

	
	/* =========================================================  Game Loops  ==================================== */
	

	
	this.startMainLoop = function ()
	{
		if (this.isPaused) {
			console.log("Cannot start main loop. Game is paused.");
		} else {
			var o = this;
			clearInterval(this.tickIntervalId);
			this.tickIntervalId = setInterval(function(){	o.tick();	}, o.tickTime);
		}
	}
	
	this.stopMainLoop = function ()
	{
		clearInterval(this.tickIntervalId);
		// *** stop any animations
	}
	
	this.tick = function ()
	{
		if (this.isDead()) {
			this.showDeath();
			this.pause(true);
			return;
		}
		this.tickCount++;
		this.increaseTime();
		
		// *** forced decision points (school, time travel, etc)
		if (this.isDead()) {
			this.showDeath();
			this.pause(true);
			return;
		}
		if (this.life.age == 5 && this.life.month == 9)
		{
			var joinSchoolLifeEvent = {
				"text" : "You join school."
				,"statChanges" : {
					"schoolIndex" : 1
				}
			};
			this.doLifeEvent(joinSchoolLifeEvent);
		} else if (this.life.schoolIndex > 0 && this.life.educationLevel >= this.schoolRef[this.life.schoolIndex].educationLevel) {
			this.showLifeEvent("You graduate from " + this.schoolRef[this.life.schoolIndex].name + ".");
			this.life.schoolIndex = 0;
		
		} else {
		
			var statsChanges = this.annualChangeStats();
			// *** add history item to timeline array
			//this.addTimelineItem("Stats changed");
		
			var rollNum = 100 - (this.tickCount - this.lastDecisionTick);
			switch (this.roll1d(rollNum)) {
				case 1 : {
					// Get a random decision (collapsed)
					var decision = this.getRandomDecision();
					this.doDecision(decision);
					this.lastDecisionTick = this.tickCount;
				
				} break;
				case 2 : {  
					//var lifeEvent = this.getRandomEvent();
					//this.doLifeEvent(lifeEvent);
				} break;				
				default : {	// Ordinary stat change or time-travel if invented
					if (this.isTimeTravelInvented()) {
						//alert("Time travel?");
					} else if (this.life.moneyLevel > this.life.lifeStyle) {
						
					}
				}break;
			}
		}
		this.refreshStats();
	}

	//=== Ignition!
	this.start = function () {
		var o = this;
		$(document).ready(function(){
			o.setup();
			//o.goToSection("intro");
			//o.goToSection("home");
			
			// *** Start variables
			o.life.month = o.roll1d(12);
			o.addTimelineItem("You are born!");
			o.pause(true);
			o.showModal("welcome");
			o.refreshStats();
			
			//o.startMainLoop();
		});
		
	}
	
	/* ===================== Game Controller / Get functions =================== */
	
	this.getRandomDecision = function () 
	{
		var randomDecisionIndex =  this.getRandomIndex(this.decisionRef);
		console.log(randomDecisionIndex);
		var collapsedDecision = this.getDecision( randomDecisionIndex );
		return collapsedDecision;
	}
	
	// collapsedDecision contains the same data as a decision, but with the event pre-selected
	this.getDecision = function (decisionIndex) 
	{
		console.log("Getting decision " + decisionIndex);
		var collapsedDecision = this.decisionRef[decisionIndex];
		// Look through all choices
		for (var c = 0; c < collapsedDecision.choices.length; c++) {
			// Each choice has an array of possible outcome events... select one
			var outcomeArray = collapsedDecision.choices[c].outcomes;
			var roll = this.roll1d(100);
			for (var o = 0; o < outcomeArray.length; o++) {
				if (roll <= outcomeArray[o].chance) {
					collapsedDecision.choices[c].fatedOutcome = outcomeArray[o];
				}
			}
		}
		return collapsedDecision;
	}
	
	this.doDecision = function (decision) {
		console.log("Do Decision..." + decision.text);
		if (this.isDecisionPossible(decision)) {
			console.log(decision);
			this.showDecision(decision);
			// *** add history item to timeline array
			this.addTimelineItem("Decision Point", decision.text);
		} else {
			console.log("X - Decision not possible");
		}
	}
	
	
	this.getRandomEvent = function () {
		var randomEventIndex =  this.getRandomIndex(this.eventRef);
		return this.eventRef[randomEventIndex];
	}
	
	this.doLifeEvent = function (lifeEvent) {
		console.log("Do Life Event..." + lifeEvent.text);
		console.log(lifeEvent);
		if (typeof lifeEvent === 'number') lifeEvent = this.eventRef[lifeEvent];
		
		var statChangeHtml = "";
		for (var statName in lifeEvent.statChanges) {
			if (lifeEvent.statChanges.hasOwnProperty(statName)) {
				this.changeStat(statName, lifeEvent.statChanges[statName]);
				statChangeHtml += "<li>" + statName + ((lifeEvent.statChanges[statName] > 0) ? " +" : " ") + lifeEvent.statChanges[statName] + "</li>";
			}
		}
		statChangeHtml = "<ul>" + statChangeHtml + "</ul>";
		this.showLifeEvent(lifeEvent, statChangeHtml);
		
		// *** add history item to timeline array
		this.addTimelineItem("Random Life Event", lifeEvent.text);
	}
	
	this.pause = function (isPaused) {
		// If argument, then use that. Otherwise toggle true/false
		if (typeof isPaused === 'boolean') 	this.isPaused = isPaused;
		else 								this.isPaused = !this.isPaused;
		if(this.isPaused) {
			$('a.pausePlayLink').text("Play");
			this.stopMainLoop();
		} else {
			$('a.pausePlayLink').text("Pause");
			this.startMainLoop();
		}
	}
	


	/* ========================================================= U . I. - Updates / Refreshes ===================== */
	

	this.addTimelineItem = function(timelineTitle, timelineText) 
	{
		var h = timelineTitle; 
		h += '<div>' + this.life.month + '/' + this.life.year + '<br />' + timelineText + '</div>'
		$('<li>').html(h).appendTo( this.$timelineList );
		this.playSound("pop");
	}
	
	this.refreshStats = function () 
	{
		

		var happinessLevel = this.getHappinessLevel();
		if (happinessLevel > 0) 		var smiley = ':)';
		else if (happinessLevel < 0) 	var smiley = ':(';
		else							var smiley = ':|';
		
		this.$date.html( this.monthRef[this.life.month-1] + ' ' + this.life.year );
		if (this.isTimeTravelInvented()) {
			this.$technology.html( "Time travel is possible!" );
		}
		this.$age.html( this.life.age );
		this.$happiness.html( Math.round(this.life.happiness) );
		this.$smiley.html( smiley );
		this.$wisdom.html( Math.round(this.life.wisdom) );
		this.$health.html( this.getHtmlLevel("health") );
		this.$wealth.html( this.getHtmlLevel("wealth") );
		this.$social.html( this.getHtmlLevel("social") );
		this.$family.html( this.getHtmlLevel("family") );
		this.$creativity.html( this.getHtmlLevel("creativity") );
		this.$school.html( this.schoolRef[this.life.schoolIndex].name );
		this.$education.html( this.getHtmlLevel("education") );
		this.$job.html( this.jobRef[this.life.jobIndex].name );
		this.$career.html( this.getHtmlLevel("career") );
		this.$drug.html( this.drugRef[this.life.drugIndex].name );
		this.$addiction.html( this.getHtmlLevel("addiction") );
		this.$lifestyle.html( this.lifestyleRef[this.life.lifestyleIndex].name );
		this.$hobby.html( this.hobbyRef[this.life.hobbyIndex].name );
		this.$transportation.html( this.transportationRef[this.life.transportationIndex].name );

		this.$allStats.removeClass("bad");
		if (this.life.educationLevel == 0) 		this.$education.addClass("bad");
		if (this.life.drugIndex > 0) 			this.$drug.addClass("bad");
		if (this.life.lifestyleIndex == 0)		this.$lifestyle.addClass("bad");
		if (this.life.jobIndex == 0)			this.$job.addClass("bad");
		if (happinessLevel < 0)					this.$happiness.addClass("bad");

		//h += '<li>' + this.tickCount + ' ' +  this.lastDecisionTick + ' ' + (100 - (this.tickCount - this.lastDecisionTick)) + '</li>';
		//this.$statsList.html(h);
	
	}
	
	this.getHtmlLevel = function (statName) {
		var level = this.life[statName + "Level"];
		var points = this.life[statName];
		if (statName == "education") maxLevels = 6; 
		else maxLevel = 10;
		var h = "";
		var displayPonts = Math.round(points - (level * 100));
		for (var u = 0; u < maxLevel; u++) {
			if (u > level) 		h += '<span class="level emptyLevel">0</span>';
			else if (u < level) h += '<span class="level">' + (u+1) + '</span>';
			else 				h += '<span class="level emptyLevel"><meter value="' + displayPonts + '" max="100">' + points + '</meter></span>';
		}
		//if (points < 1000) {
		//	h += '<meter value="' + displayPonts + '" max="100">(' + points + ')</meter>';
		//}
		h += Math.round(points);
		return h;
	}
	
	this.showDecision = function (decision) {
		var o = this;
		var $decisionDiv = this.$modalDivs.filter('.decision');
		$decisionDiv.html('<p>' + decision.text + '</p>');
		// Loop through all choices
		for (var c = 0; c < decision.choices.length; c++) { 
			$decisionDiv.append(
				this.getChoiceButton(decision.choices[c])
			);
		}
		this.showModal("decision");
	}
	
	this.getChoiceButton = function (choice) 
	{
		var o = this;
		var $button = $('<button>')
			.attr("type", "button")
			.addClass("choice")
			.text( choice.text )
		;
		if (this.isChoicePossible(choice)) {
			$button.on("click",function(e){
				//o.hideModal("decision");
				//console.log(choice.fatedOutcome.text);
				//console.log(choice.fatedOutcome);
				o.doLifeEvent(choice.fatedOutcome);
			});
		} else {
			$button.attr("disabled", "disabled").addClass("notPossible").off("click");
		}
		return $button;
	}
	
	this.showDeath = function (deathText) {
		var $lifeEventDiv = this.$modalDivs.filter('.lifeEvent');
		$lifeEventDiv.html('<h1>You\'ve Died!</h1>');
		$('<button>').attr("type", "button").text("Start Over")
			.addClass("choice")
			.on("click",function(e){
				window.location.reload();
			}).appendTo($lifeEventDiv)
		;
		this.showModal("lifeEvent");
	}
	
	this.showLifeEvent = function (lifeEvent, extraHtml) {
		var $lifeEventDiv = this.$modalDivs.filter('.lifeEvent');
		var lifeEventText = (typeof lifeEvent === 'string') ? lifeEvent : lifeEvent.text;
		if (typeof extraHtml === 'undefined') extraHtml = "";
		$lifeEventDiv.html('<p>' + lifeEventText + '</p>' + extraHtml);
		this.showModal("lifeEvent");
	}

	this.showModal = function (whichModal) {
		//console.log("Show Modal '" + whichModal + "'");
		this.stopMainLoop();
		this.$modalDivs.hide();
		if (whichModal == "decision") {
			this.$modal.find('button.close').hide();
		} else {
			this.$modal.find('button.close').show();
		}
		this.$modalDivs.filter('.' + whichModal).show();
		this.$modal.fadeIn("fast");
	}
	this.hideModal = function () {
		this.$modal.fadeOut();
		this.startMainLoop();
		this.$modalDivs.hide();
	}
	

	
	/* =========================================================  Notifications & Animation ====================== */

	
	/* ========================================================= U . I. - Run Once / Setup ======================== */
	this.setup = function () {
		var o = this;
		this.$timeline.on("mousedown", function(e){
			o.stopMainLoop();
			o.$timeline.addClass("moving");
			// *** scroll timeline left and right with mouse movement
		
		}).on("mouseup", function(e){
			o.startMainLoop();
			o.$timeline.removeClass("moving");
		}).on("mouseout",function(e){
			o.startMainLoop();
			o.$timeline.removeClass("moving");
		});
		
		
		//===== Modal Controls
		// Hide them
		o.$modal.hide();
		o.$modalDivs.hide();
		// Create open link events
		$('a.openModal').on("click", function(e){
			var href = $(this).attr("href");
			var whichModal = href.substring(href.indexOf('#') + 1);
			o.showModal(whichModal);
			e.preventDefault();
		});
		// Handle close events
		$('section.modal > div > button.close').on("click", function(e){
			o.hideModal();
		});
		
		//===== Menu
		$('a.pausePlayLink').on("click", function(e){
			var $this = $(this);
			o.pause();
		});
		
		//===== Life menu
		//$('div.lifeMenu').html( <

	}
	

	
	
	/* =========================================================  Sound  ============================== */

	this.isSoundOn = true;
	
	this.toggleSound = function (forceSound) {
		if (typeof forceSound === 'boolean') 	this.isSoundOn = forceSound;
		else									this.isSoundOn = (this.isSoundOn) ? false : true;
		return this.isSound;	
	}
	
	this.sounds = {
		"pop" 		: new Audio("sounds/pop1.wav")
		,"laugh" 	: new Audio("sounds/laugh1.wav")
		,"laugh1" 	: new Audio("sounds/laugh1.wav")
		,"laugh2"	: new Audio("sounds/laugh2.wav")
		,"money"	: new Audio("sounds/cling1.wav")
		,"insanity" : new Audio("sounds/laugh1.wav")
		
		,"eye" 			: new Audio("sounds/ding1.wav")
		,"cloud" 		: new Audio("sounds/sadwhistle1.wav")
		,"notoriety" 	: new Audio("sounds/whoosh1.wav")
		,"tactic" 		: new Audio("sounds/pop2.wav")
		,"lightbulb" 	: new Audio("sounds/pop2.wav")
		,"genius" 		: new Audio("sounds/whoosh1.wav")
	}
	this.sounds["laugh1"].volume = 0.5;
	this.sounds["laugh2"].volume = 0.5;
	this.sounds["cloud"].volume = 0.3;
	this.sounds["money"].volume = 0.3;
	
	this.playSound = function (soundName)
	{
		var o = this;
		if (o.isSoundOn) {
			if (soundName == "insanity") {
				if (o.roll1d(5) == 1) {	soundName = "laugh" }
				else { return false; }
			}		
			if (typeof o.sounds[soundName] === 'undefined') {
				console.log("Sound does not exist: " + soundName);
				return false;
			} else {

				if (soundName == "laugh") {
					soundName += o.roll1d(2);
				}
				//console.log("Playing sound " + soundName);
				o.sounds[soundName].play();
				return true;
			}
		} else {
			return false;
		}
	}
	

	/* =========================================================  Helper Functions  ============================== */
	this.getRandomIndex = function (sides) {
		if (typeof sides !== 'number') sides = sides.length;
		return (Math.floor(Math.random()*sides));
	}
	this.roll1d = function (sides) {
		return (Math.floor(Math.random()*sides) + 1);
	}
	this.rollBell = function (sides) {
		return (this.roll1d(sides) - this.roll1d(sides));
	}

}

var dg = new Game();
dg.start();


