

var Game = function () 
{
	this.$viewport = $('#viewport');

	this.$timeline = $('section.timeline');
	this.$time = $('section.time');
	this.$modal = $('section.modal');
	this.$modalDivs = $('section.modal > div > div');
	this.$timetravelBlocks = $('.timetravel');
	this.$noTimetravelBlocks = $('.no-timetravel');

	this.$char = $('div.char');
	this.$board = $('div.board');
	this.$statsList = $('section.stats > ul');

	/* =========================================================  Reference Data  ========================= */

	/*
	this.fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
	this.fibonacci = [100, 100, 200, 300, 500, 800, 1300, 2100, 3400, 5500];
	100, 200
	*/
	
	this.monthRef = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


	/* =========================================================  Character & Game Vars  ====================== */
	this.lifeDefault = {
		"age"			: 17
		,"month"		: 0
		,"year"			: 2013
		,"technology"	: 0		// 0 to infinity
		,"wisdom"		: 0		// 0 to infinity
		,"health"		: 3		// 1-7
		,"wealth"		: 3		// 1-7
		,"social"		: 3		// 1-7
	};

	this.life = this.lifeDefault;
	this.alternateLives = [
	
	];


	// Constants
	this.timeTravelTechnology = 15; //20;
	this.advanceYears = 5;
	// Difficulty constants...
	this.difficultyNames = ["Easy", "Normal", "Hard"];
	this.timeTravelTechnologyDifficulty = [10, 15, 20];
	this.advanceYearsDifficulty = [4, 5, 6];
	
	// Could change, rarely

	// Where you are in the game
	this.wonHighScore = false;
	this.oldAge = false;
	this.shownTimeTravelTechNotice = false;
	this.shownTimeTravelNotice = false;
	// Other
	
	
	// Blank Scheme


	
	/* =========================================================  Get Calculated Values  ========================= */
	
	this.isDead = function () 
	{
		if (this.life.age > 1000) return true; // died of old age
		if ((this.life.health + this.life.wealth + this.life.social) <= 0) return true;
	}
	
	this.isTimeTravelInvented = function () {
		return (this.life.technology >= this.timeTravelTechnology) ? true : false;
	}
	


	
	/* =========================================================  Change Values  ================================= */
	
	this.increaseTime = function ()
	{
		this.life.year += this.advanceYears;
		this.life.age += this.advanceYears;
		this.life.technology += 1;
		
		if (this.life.age > 100) {
			//if (this.roll1d(2) == 1) {
				this.changeStat("health", -1);
			//}
			if (!this.oldAge) {
				this.showModal("oldAge");
				this.oldAge = true;
			}
		}
		if (this.getTotal() >= 21) {
			if (!this.wonHighScore) this.showWin();
			this.wonHighScore = true;
		}
	}
	
	this.changeStat = function (statName, changeAmount, $from) 
	{
		var o = this;
		// If we're going to subtract from a stat already at zero, then transfer the pain...
		if (this.life[statName] == 0 && changeAmount < 0) {
			if (statName == "health") {
				statName = (this.life.wealth > 0) ? "wealth" : "social";
			} else if (statName == "wealth") {
				statName = (this.life.social > 0) ? "social" : "health";
			} else if (statName == "social") {
				statName = (this.life.health > 0) ? "health" : "wealth";
			}
		}
		// Update stat value
		this.life[statName] += changeAmount;
		if (this.life[statName] < 0) 		this.life[statName] = 0;
		else if (this.life[statName] > 7) 	this.life[statName] = 7;
		
		// Do animation of stat balloon
		
		//if (typeof $from === 'undefined') 
			$from = this.$char;
		var fromPos = $from.offset();
		var toPos = $('li.' + statName).offset();
		var $statBalloon = $('<div>').addClass("statBalloon").text(statName + ((changeAmount < 0) ? ' ' : ' +') + changeAmount);
		if (changeAmount < 0) {
			$statBalloon.addClass("bad");
		}
		
		$statBalloon.css({ 
			"top" : 	fromPos.top
			,"left" : 	fromPos.left - 80
			,"opacity" : 0.0
		}).appendTo( this.$viewport )
		.animate({
			"top" : 	fromPos.top - 100 + o.rollBell(20)
			,"left" : 	fromPos.left - 50 + o.rollBell(100)
			,"opacity" : 1.0
		}, 400, function(){
			$statBalloon.animate({
				"top" : toPos.top
				,"left" : toPos.left
				,"opacity" : 0.0
			}, 2200, function(){
				$statBalloon.remove();
				o.refreshStats();
			});
		});
		
		// check for death
		if (this.isDead()) {
			this.showDeath();
		}
	}
	
	this.getTotal = function () {
		return this.life.health + this.life.wealth + this.life.social;
	}
	this.getTotalPercentage = function () {
		return (Math.round((this.getTotal() / 21) * 100));
	}
	
	
	this.refreshStats = function () 
	{	
		this.refreshValueList("health");
		this.refreshValueList("wealth");
		this.refreshValueList("social");
		this.$statsList.find('li.total span.value').text( this.getTotal() ); // + " (" + this.getTotalPercentage() + "%)" );
		this.$time.find('span.year').text( this.life.year );
		if (this.life.age > 100) {
			this.$time.find('span.age').addClass("emergency").text( "Age " + this.life.age );
		} else {
			this.$time.find('span.age').removeClass("emergency").text( "Age " + this.life.age );
		}
		if (this.isTimeTravelInvented()) {
			if (!this.shownTimeTravelTechNotice) {
				this.showModal("invention");
				this.shownTimeTravelTechNotice = true;
			}
			this.$timetravelBlocks.fadeIn();
			this.$noTimetravelBlocks.hide();
		} else {
			this.$timetravelBlocks.hide();
			this.$noTimetravelBlocks.show();
			this.$time.find('meter')
				.attr({ "value" : this.life.technology, "max" : this.timeTravelTechnology })
				.html( this.life.technology + "/" + this.timeTravelTechnology)
			;
		}
	}
	
	this.refreshValueList = function (statName) {
		var o = this;
		
		if (o.life[statName] <= 1) {
			o.$statsList.find('li.' + statName + ' span.label').addClass("emergency");
		} else {
			o.$statsList.find('li.' + statName + ' span.label').removeClass("emergency");
		}
		
		var $listElts = o.$statsList.find('li.' + statName + ' > ol > li');
		
		$listElts.each(function(i, elt) {
			if (o.life[statName] > i) $(elt).addClass("one");
			else $(elt).removeClass("one");
		});
	}
	
	this.changeDifficulty = function (diff, showAlert) 	// diff = 0,1,2
	{
		var diffName = this.difficultyNames[diff];
		$('.difficultyName').text(diffName);
		this.timeTravelTechnology 	= this.timeTravelTechnologyDifficulty[diff];
		this.advanceYears 			= this.advanceYearsDifficulty[diff];
		if (typeof showAlert === 'boolean' && showAlert) alert("Difficulty changed to " + diffName);
	}

	
	/* =========================================================  Game Loops  ==================================== */
	
	this.addChoices = function (resultValues, animateBoard) 
	{
		if (typeof resultValues === 'undefined') resultValues = this.getShuffledResultValues();
		if (typeof animateBoard === 'undefined') animateBoard = true;
		
		this.addChoiceBoardItem("health", resultValues[0]);
		this.addChoiceBoardItem("wealth", resultValues[1]);
		this.addChoiceBoardItem("social", resultValues[2]);
		
		// Animate character and board
		var nowPos = this.getNowPos();
		var charPos = this.$char.position();
		var boardPos = this.$board.position();
		
		var charHeightOffset = this.$char.height() / 1.7;
		this.$char.appendTo(this.$board).animate({
			"left" : nowPos.left
			,"top" : nowPos.top - charHeightOffset
		}, 800);
		if (animateBoard) {
			this.$board.animate({
				"left" : boardPos.left - (nowPos.left - charPos.left)
				,"top" : boardPos.top - ((nowPos.top - charHeightOffset) - charPos.top)
			}, 1100);
		}
	
	}
	
	this.addChoiceBoardItem = function (statName, resultValue)
	{
		var o  = this;
		var nowPos = o.getNowPos();
		
		var topOffset = 0;
		if (statName == "health") topOffset = -1 * (100 + o.roll1d(30));
		if (statName == "social") topOffset = 100 + o.roll1d(30);
		var leftOffset = 120 + o.roll1d(40);
		var leftPos = nowPos.left + leftOffset;
		var topPos = nowPos.top - topOffset;
		
		var nextResultValues = o.getShuffledResultValues();
		
		var thisYear = o.life.year + o.advanceYears;

		
		var $bi = $('<div>')
			.addClass("bi")
			.addClass("bi_" + statName)
			.addClass("year_" + thisYear)
			.css({
				"left" : nowPos.left 
				,"top" : nowPos.top 
			})
			.data("resultValue", resultValue)
			.data("nextResultValues", nextResultValues)
			.on("click", function(e){
				
				var $this = $(this);
				if ($this.hasClass("alternateFuture") || $this.hasClass("past")) {
					if (o.isTimeTravelInvented()) {
					
						o.life = $.extend(o.life, $this.data("life"));
						o.life.technology += 1;
						$this.addClass("now");
						
						if (!o.shownTimeTravelNotice) {
							o.showModal("backInTime");
							o.shownTimeTravelNotice = true;
						}
						o.playSound("genius");
						o.refreshStats();
						o.eraseFuture((o.life.year + 1), function(){
							o.addChoices(nextResultValues, false);
							o.refreshStats();
						});
					} else {
						$('.techYearsLeft').text( ((o.timeTravelTechnology - o.life.technology) * o.advanceYears) );
						o.showModal("past");
					}
				} else {

					var $allBi = $('div.board div.bi');
					$allBi.filter('.now').removeClass("now").addClass("past");
					$allBi.filter('.year_' + thisYear).not($this).addClass("alternateFuture").off("click");
					
					$this.addClass("now").addClass("past").text(thisYear);
					
					o.changeStat(statName, resultValue, $this);
					var h = statName + ((resultValue > 0) ? " +" : " ") + resultValue;
					if (resultValue < 0) {
						$this.addClass("bad");
						o.playSound("cloud");
					} else {
						o.playSound("eye");
					}
					//alert(h);
					
					o.increaseTime();
					o.addChoices(nextResultValues);
					o.refreshStats();
					
					var thisLife = $.extend(true, {}, o.life);
					$this.data("life", thisLife);
				}
			}).appendTo( this.$board )
		;
		
		// *** if leftPos > the width of the board, then expand the board
		// *** if top pos extends beyond the height, then adjust
		
		$bi.animate({
			"left" : leftPos
			,"top" : topPos
			//,"opacity" : 1.0
		}, 600);
	}
	
	this.eraseFuture = function (year, callback) 
	{
		var $allBi = $('div.board div.bi');
		for (var y = year; y < 3050; y++) {
			$allBi.filter('.year_' + y).remove();
		}
		if (typeof callback === 'function') callback();
	}

	
	
	this.getShuffledResultValues = function () {
		var baseResultValues = [ 
			this.roll1d(2)			// +1 or +2
			,-1						// -1
			,(-1 * this.roll1d(2))	// -1 or -2
		];
		var shuffledResultValues = [];
		var firstValueIndex = this.roll1d(3) - 1;
		shuffledResultValues.push( baseResultValues[firstValueIndex] );
		baseResultValues.splice(firstValueIndex, 1);
		var secondValueIndex = this.roll1d(2) - 1;
		shuffledResultValues.push( baseResultValues[secondValueIndex] );
		baseResultValues.splice(secondValueIndex, 1);
		shuffledResultValues.push( baseResultValues[0] );
		//console.log(shuffledResultValues);
		return shuffledResultValues;
	}
	
	this.getNowPos = function () {
		var $now = $('div.board div.bi.now');
		var nowPos = $now.position();
		return nowPos;
	}

	

	//=== Ignition!
	this.start = function () {
		var o = this;
		$(document).ready(function(){
			o.$viewport.css("opacity", 0.0);
			o.setup();
			o.refreshStats();
			
			var nowPos = o.getNowPos();
			o.$char.css({
				"left" : nowPos.left 
				,"top" : nowPos.top - 50
			});
			o.$viewport.animate({ "opacity" : 1.0 }, 500);
			o.addChoices();
			
			o.showModal("welcome");
		});
		
	}
	
	this.showWin = function () {
		this.showModal("win");
	}
	
	this.showDeath = function (deathText) {
		var $allBi = $('div.board div.bi');
		$allBi.off("click");
		this.showModal("death");
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
		this.$modalDivs.hide();
		if (whichModal == "death") {
			this.$modal.find('button.close').hide();
		} else {
			this.$modal.find('button.close').show();
		}
		this.$modalDivs.filter('.' + whichModal).show();
		this.$modal.fadeIn("fast");
	}
	this.hideModal = function () {
		this.$modal.fadeOut();
		this.$modalDivs.hide();
	}

	
	/* ========================================================= U . I. - Run Once / Setup ======================== */
	this.setup = function () {
		var o = this;
		
		o.changeDifficulty(1);
		
		// Mouse movement
		var mouseStartX = 0, mouseStartY = 0, boardStartPos;
		
		var moveBoard = function (currentX, currentY) {
			var distX = (mouseStartX - currentX);
			var distY = (mouseStartY - currentY);
				
			o.$board.css({
				"left" 	: boardStartPos.left - distX
				,"top"	: boardStartPos.top - distY
			});
		}
		
		this.$timeline.on("mousedown", function(e){
			o.$timeline.addClass("moving");
			mouseStartX = e.pageX;
			mouseStartY = e.pageY;
			boardStartPos = o.$board.position();
			//console.log("Mouse down on timeline - x: " + mouseStartX + ", y: " + mouseStartY);
			//console.log(boardStartPos);
		}).on("touchstart", function(e){
			o.$timeline.addClass("moving");
			// Thanks to http://www.devinrolsen.com/basic-jquery-touchmove-event-setup/
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
			mouseStartX = touch.pageX;
			mouseStartY = touch.pageY;
			//o.$time.html(touch.pageX + ", " + touch.pageY);
			boardStartPos = o.$board.position();
		}).on("mouseup mouseout touchend", function(e){
			o.$timeline.removeClass("moving");
		}).on("mousemove", function(e){
			e.preventDefault();
			if (o.$timeline.hasClass("moving")) {
				moveBoard(e.pageX, e.pageY);
			}
		}).on("touchmove", function(e){
			e.preventDefault();
			if (o.$timeline.hasClass("moving")) {
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				moveBoard(touch.pageX, touch.pageY);
			}
		});
		
		
		//===== splash screen
		$('section.splash').on("click",function(e){
			o.playSound("genius");
			$(this).hide();
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
		$('.easyClose, section.modal > div > button.close').on("click", function(e){
			o.hideModal();
		});
		$('button.startOver').on("click", function(e){
			o.$viewport.animate({ "opacity" : 0.0 }, 1000);
			window.location.reload();
		});

		//==== Options 
		$('.changeDifficulty').on("click", function(e){
			var $this = $(this);
			if ($this.hasClass("easyDiff")) 		o.changeDifficulty(0);
			else if ($this.hasClass("normalDiff")) 	o.changeDifficulty(1);
			else if ($this.hasClass("hardDiff")) 	o.changeDifficulty(2);
		});
		
		
		$('.toggleSound').on("click", function(e){
			o.toggleSound();
			alert("Sound is now " + ((o.isSoundOn) ? "ON" : "OFF"));
		});
		
		// Load sounds
		this.setupSounds();
	}
	

	
	
	/* =========================================================  Sound  ============================== */

	this.isSoundOn = true;
	this.sounds = {};
	
	this.setupSounds = function () {
		this.sounds = {
			"pop" 		: new Audio("sounds/pop1.wav")
			//,"laugh" 	: new Audio("sounds/laugh1.wav")
			//,"laugh1" 	: new Audio("sounds/laugh1.wav")
			//,"laugh2"	: new Audio("sounds/laugh2.wav")
			//,"money"	: new Audio("sounds/cling1.wav")
			//,"insanity" : new Audio("sounds/laugh1.wav")
			
			,"eye" 			: new Audio("sounds/ding1.wav")
			,"cloud" 		: new Audio("sounds/sadwhistle1.wav")
			//,"notoriety" 	: new Audio("sounds/whoosh1.wav")
			//,"tactic" 		: new Audio("sounds/pop2.wav")
			//,"lightbulb" 	: new Audio("sounds/pop2.wav")
			,"genius" 		: new Audio("sounds/whoosh1.wav")
		}
		//this.sounds["laugh1"].volume = 0.5;
		//this.sounds["laugh2"].volume = 0.5;
		this.sounds["cloud"].volume = 0.2;
		//this.sounds["money"].volume = 0.3;
	}

	this.toggleSound = function (forceSound) {
		if (typeof forceSound === 'boolean') 	this.isSoundOn = forceSound;
		else									this.isSoundOn = (this.isSoundOn) ? false : true;
		return this.isSound;	
	}
	
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


