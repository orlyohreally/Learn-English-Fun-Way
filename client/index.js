(function(){
	socket = io();
	/*var Topic_count = 0;
	var topicPropertiesRecieved = false;
	socket.on('TopicCount', function(data){
		Topic_count = data.msg;
		var T_i = 0;
		while(T_i < Topic_count) {
			if(!topicPropertiesRecieved) {
				getTopicProperties(T_i);
				T_i++;
			}
			else
				break;
		}
	});
	console.log("Topic count = ", Topic_count);
	function getTopicProperties(T_i) {
		if(typeof (Properties.Topics[T_i]) == "undefined") {
			socket.emit('needTopicProperties', 
				{
					name:"menu_items",
					T_index:T_i
					});
			checkPropertiesTopic();
			console.log("topicPropertiesRecieved now is", topicPropertiesRecieved);
			if(!topicPropertiesRecieved) {
			setTimeout(function(){
				socket.on('getTopicProperties' + T_i, function(data){
				console.log('getTopicProperties' + T_i);
				Properties.Topics[T_i] = data.msg;
				console.log(Properties.Topics)
				
				//console.log("drawing ", i)
				//clearMenuItemRect(pX - 10, pY-10, pW + 20, pH + 20);
				//ctx.drawImage(atlasMenuItem, frame.x, frame.y, frame.w, frame.h, pX * Math.min(Screen.k_width, Screen.k_height), pY * Math.min(Screen.k_width, Screen.k_height), pW * Math.min(Screen.k_width, Screen.k_height), pH * Math.min(Screen.k_width, Screen.k_height));
			});}, 0.5);
			}
			//getTopicProperties(T_i);
			
		}
	}
	function checkPropertiesTopic() {
		topicPropertiesRecieved = true;
		if((Properties.Topics).length == Topic_count)
			topicPropertiesRecieved = false;
		else {
			var i = 0;
			while(i < Topic_count) {
				console.log("checking ", i);
				if(typeof (Properties.Topics[i]) == "undefined"){
					topicPropertiesRecieved = false;
					break;
				}
				i++;
				console.log("topicPropertiesRecieved", topicPropertiesRecieved)
			}
		}
		console.log("topicPropertiesRecieved", topicPropertiesRecieved)
	}
	console.log("topicPropertiesRecieved", topicPropertiesRecieved)
	console.log(Properties.Topics);
	console.log("trying to load everything")*/
	
	$(document).ready(function(){
	
		var ctx = document.getElementById("MainCanvas").getContext("2d");
		var video = document.getElementById('video');
		Mode = {};
		Mode.MenuItem  = true;
		Mode.Tasks = false;
		Mode.LogIn = false;
		Mode.SignIn = false;
		Mode.Exercise = false;
		Mode.AlphabetSong = false;
		MenuItem = {};
		MenuItem.height = 600;
		MenuItem.width = 1800;
		MenuItem.display = 3;
		MenuItem.firstItem = 0;
		MenuItem.size = 400;
		MenuItem.ItemList = {};
		//MenuItem.ItemList = ["alphabet", "animals", "numbers", "sport", "toys"];
		MenuItem.clicked = -1;
		MenuItem.chosen = MenuItem.clicked;

		Task = {};
		Task.display = 4;
		Task.firstTask = 0;
		Task.test = [];
		Task.toTest = [];
		Task.asked = {};
		Title = {};
		Title.width = 1800;
		Title.height = 180;

		sound_on = true;

		Rewards = {};
		Rewards.width = MenuItem.width;
		Rewards.height = MenuItem.height / 5;
		Rewards.size = 300;

		Profile = {};
		Profile.width = 540;
		Profile.height = 180;
		Profile.UserName = "Userdbname";
		Profile.Accent = "UK English Male";
		NewAccent = Profile.Accent
		//Profile.storeUserNameLogIn = false;
		//Profile.storePasswordLogIn = false;
		//delete Profile.storePasswordLogIn;
		//delete Profile.storePasswordLogIn;
		Profile.LoggedIn = false;
		koef = 0.75;
		
		Thumbnails = [];
		
		function loadThumbnail(name){
			Thumbnails[name] = new Image;
			Thumbnails[name].src = '/client/img/Alphabet/'+ name + ' thumbnail.png';
			Thumbnails[name].addEventListener("load", function() {
				thumbnailLoaded = true;
			}, false);	
		}
		name = 'abc song';
		loadThumbnail(name);
		k1 = -1;
		function DrawMenuItem(i, j, pX, pY, pW, pH){
			
			//drawAnimal(0, 0, 100, 1000, 1000)
			var X = 368 * i;
			var Y = 0;
			var W = 368;
			var H = 368;
			//console.log("Properties.Topics[i]", Properties.Topics[i])
			var frame = Properties.Topics[i].Frame;
			//var frame = Properties[i].Properties[0].frame;
			//console.log(frame)
			//ctx.drawImage(atlasMenuItem, X, Y, W, H, pX * Math.min(Screen.k_width, Screen.k_height), pY * Math.min(Screen.k_width, Screen.k_height), pW * Math.min(Screen.k_width, Screen.k_height), pH * Math.min(Screen.k_width, Screen.k_height));
			ctx.drawImage(atlasMenuItem, frame.x, frame.y, frame.w, frame.h, pX * Math.min(Screen.k_width, Screen.k_height), pY * Math.min(Screen.k_width, Screen.k_height), pW * Math.min(Screen.k_width, Screen.k_height), pH * Math.min(Screen.k_width, Screen.k_height));
			
			/*console.log("drawing", i, "menuitem", Properties.Topics)
			
			*///##draw here
			delete X, Y, W, H, pX, pY, pW, pH;
		}
		var atlasMenuItem = new Image();
		function drawMenuItems(){
			var i = MenuItem.firstItem; //порядок в спрайте
			var j = 0; // первая на экране
			while(j < MenuItem.display){
				if(j != MenuItem.clicked - MenuItem.firstItem){
					var pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j + 1) + MenuItem.size * j - 68;
					var pY =  MenuItem.topSpace;
					pW = MenuItem.size;
					pH = MenuItem.size;
					//console.log("calling drawMenuItem")
					DrawMenuItem(i, j, pX, pY, pW, pH);
				}
				i = i + 1;
				j = j + 1;
			}
			
			delete i, j;
			delete pX, pY, pW, pH;
		}
		MenuItem.loadedMenuItems;
		function loadMenuItems(){
			// Load image and the json that defines locations
			atlasMenuItem.src = 'client/img/Menu-Items/menu-items.png';
			atlasMenuItem.addEventListener("load", function() {
				MenuItem.loadedMenuItems = true;
				drawMenuItems();
			})
		}
		var atlasAnimals = new Image();
		Task.loadedAnimals;
		function loadAnimals(){
			// Load image and the json that defines locations
			console.log("loading animals");
			atlasAnimals.src = 'client/img/Animals/animals.png';
			atlasAnimals.addEventListener("load", function() {
				Task.loadedAnimals = true;
			})
		}
		var atlasAnimalsWords = new Image();
		Task.loadedAnimalsWords;
		function loadAnimalsWords(){
			// Load image and the json that defines locations
			atlasAnimalsWords.src = 'client/img/Animals/animal-words.png';
			atlasAnimalsWords.addEventListener("load", function() {
				Task.loadedAnimalsWords = true;
			})
		}
		function clearMenuItemRect(x, y, width, height) {
			ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height) , width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
			delete x, y, width, height;
		}
		function clearScreenRect(x, y, width, height) {
			ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height) , width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
			delete x, y, width, height;
		}
		var atlasButtons = new Image();

		function drawLeftArrow(x, y, width, height) {
			ctx.drawImage(atlasButtons, 54, 0, 151, 225, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
		}

		function drawRightArrow(x, y, width, height){
			ctx.drawImage(atlasButtons, 205, 0, 151, 226, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));		
		}
		function drawTitle(x, y, width, height){
			//console.log("drawing title");
			//console.log(x, y, width, height);
			//ctx.drawImage(atlasMenuItem, 0, 0);
			ctx.drawImage(atlasButtons, 0, 1692, 470, 130, x * Math.min(Screen.k_width, Screen.k_height) , y * Math.min(Screen.k_width, Screen.k_height) , width * Math.min(Screen.k_width, Screen.k_height) , height * Math.min(Screen.k_width, Screen.k_height) );			
		}

		function drawRewardsButton(x, y, width, height){
			ctx.drawImage(atlasButtons, 0, 880, 228, 75, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawProgressButton(x, y, width, height){
			ctx.drawImage(atlasButtons, 228, 730, 228, 75, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function clearRewardsRect(x, y, width, height){
			ctx.clearRect(x * Math.min(Rewards.k_width, Rewards.k_height), y * Math.min(Rewards.k_width, Rewards.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawPhrasesButton(x, y, width, height){
			ctx.drawImage(atlasButtons, 228, 805, 228, 75, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawQuizButton(x, y, width, height){
			ctx.drawImage(atlasButtons, 228, 880, 228, 75, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function clearProfileRect(x, y, width, height){
			ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height) , y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height) , height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawLogInButton(x, y, width,height){
			ctx.drawImage(atlasButtons, 0, 805, 228, 75, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSignInButton(x, y, width,height){
			ctx.drawImage(atlasButtons, 0, 730, 228, 75, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSoundOnButton(x, y, width,height){
			ctx.drawImage(atlasButtons, 168, 226, 168, 168, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSoundOffButton(x, y, width,height){
			ctx.drawImage(atlasButtons, 0, 226, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawPlayButton(x, y, width,height){
			ctx.drawImage(atlasButtons, 336, 226, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawStopButton(x, y, width,height){
			ctx.drawImage(atlasButtons, 168, 562, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawPauseButton(x, y, width,height){
			ctx.drawImage(atlasButtons, 336, 562, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawExitButton(x, y, width,height){
			ctx.drawImage(atlasButtons, 0, 394, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawRestartButton(x, y, width,height){
			ctx.drawImage(atlasButtons, 0, 562, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawHelpButton(x, y, width,height){
			ctx.drawImage(atlasButtons, 168, 394, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawInfoButton(x, y, width,height){
			ctx.drawImage(atlasButtons, 336, 394, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSignInForm(x, y, width, height) {
			drawMenuItems()
			ctx.drawImage(atlasForms, 0, 239, 368, 368, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawLogInForm(x, y, width, height) {
			ctx.drawImage(atlasForms, 0, 0, 368, 202, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawLogInCancelButton(x, y, width, height) {
			ctx.drawImage(atlasForms, 0, 202, 156, 37, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawLogInLogInButton(x, y, width, height) {
			ctx.drawImage(atlasForms, 156, 202, 156, 37, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSignInSignInButton(x, y, width, height) {
			ctx.drawImage(atlasForms, 312, 607, 156, 37, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSignInSaveButton(x, y, width, height) {
			ctx.drawImage(atlasForms, 156, 607, 156, 37, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function drawSignInCancelButton(x, y, width, height) {
			ctx.drawImage(atlasForms, 0, 607, 156, 37, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}

		function fillRect(x, y, width, height) {
			ctx.fillRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function clearRect(x, y, width, height) {
			ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function fillRectYellow(x, y, width, height) {
			ctx.fillStyle="#F7FE2E";
			ctx.fillRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function fillRectGreen(x, y, width, height) {
			ctx.fillStyle="#7cc576";
			ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
			ctx.fillRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		function PointInRect(Point, Rect) {
			if(Point.x >= Rect.x* Math.min(Screen.k_width, Screen.k_height) && Point.x <= (Rect.x + Rect.w)* Math.min(Screen.k_width, Screen.k_height) && Point.y >= Rect.y * Math.min(Screen.k_width, Screen.k_height) && Point.y <= (Rect.y + Rect.h)* Math.min(Screen.k_width, Screen.k_height))
				return true
			return false;
		}
		function mouseInRect(x, y, width, height) {
			if(mouseX >= x* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (x + width)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= y* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (y + height)* Math.min(Screen.k_width, Screen.k_height))
				return true
			return false;
		}
		function drawProfilePicture(x, y, width, height) {
			ctx.drawImage(atlasButtons, 0, 955, 368, 368, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		}
		
		function getProperties(spreadsheet, image) {
			//var query = db.SpreadSheets.find({"Name": spreadsheet});
			//return query;
		}
		var Forms_loaded = false;
		var atlasForms = new Image();
		function loadForms(){
			atlasForms.src = '/client/img/Forms/forms.png';
			atlasForms.addEventListener("load", function() {
				Forms_loaded = true;
			}, false);	
		}
		var loadedButtons;
		function loadButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height){
			atlasButtons.src = '/client/img/Menu-Items/buttons.png';
			atlasButtons.addEventListener("load", function() {
					drawButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
					//title
					drawTitle(Title.leftSpace, 20, Title.size, Title.size * 130/470);	
					delete l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height;
					loadedButtons  = true;
					
			}, false);	
		}
				
		function drawButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height) {
			if(Mode.MenuItem) {
				//left arrow
				if(MenuItem.firstItem) {
					drawLeftArrow(l_a_x, l_a_y, l_a_width, l_a_height);
				}
				//right arrow
				if(MenuItem.firstItem + MenuItem.display < MenuItem.itemsCount) {
					drawRightArrow(r_a_x, r_a_y, r_a_width, r_a_height);
				}
			}
			if(!Mode.Exercise) {
				fillRectYellow(0, Screen.height/ Math.min(Screen.k_width, Screen.k_height) * 0.8, Screen.width/ Math.min(Screen.k_width, Screen.k_height), 1000)
				//Rewards
				drawRewardsButton(Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228)
				//Progress button
				drawProgressButton(Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228)
				//Phrases button
				drawPhrasesButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228)
				//Quiz button
				drawQuizButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228)
				drawQuizButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228)
			}
			if(!Profile.LoggedIn) {
			//Log in button
			//drawLogInButton((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - 150 - MenuItem.leftSpace, 20, 150, 150*75/228)
			drawLogInButton((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228)
			//Sign in button
			drawSignInButton((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) -  Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228, Profile.size_btn, Profile.size_btn*75/228)
			}
			//Sound on button
			if(sound_on)
				drawSoundOnButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
			else
				drawSoundOffButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
			//Help button
			drawHelpButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2 * 5) / 3, (Profile.size_btn - 2 * 5) / 3)		
			//Info button
			drawInfoButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + 5 + (Profile.size_btn - 2 * 5)/3 + (Profile.size_btn - 2 * 5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
			
			delete l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height;
		}
		/************************************Starting*******************************************************/
		
		//loadMenuItems();
		//loadButtons();
		function showForms() {
			if(Mode.LogIn){
				showLogInForm()
			}
			else if(Mode.SignIn) {
				showSignInForm()
			}
		}
		function readyToShowForms() {
			if(MenuItem.loadedMenuItems && loadedButtons) {
				showForms()
			}
			else
			{
				setTimeout(function(){
					readyToShowForms()
				}, 1);
			}
		}
		function drawHeader() {
			ctx.fillStyle="#F7FE2E";
			ctx.fillRect(0, 0, Screen.width, MenuItem.starts * Math.min(Screen.k_width, Screen.k_height));
			if(!Mode.Exercise)
				ctx.fillRect(0, Screen.height * 0.8, Screen.width, 1000);
			
			var l_a_x = MenuItem.leftSpace;
			var l_a_width = 100*koef;
			var l_a_height = koef*100*226/152;
			var l_a_y =  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2;
			
			var r_a_height = koef*100*226/152;
			var r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
			var r_a_width = koef*100;
			var r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
			if(loadedButtons) {
				drawButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
				//title
				drawTitle(Title.leftSpace, 20, Title.size, Title.size*130/470);
			}
			else {
				loadButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
			}
			
			if(Profile.LoggedIn) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
				
				
				drawProfilePicture(((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) + Profile.size_btn * 1/ 6, 20, Profile.size_btn * 2/3, Profile.size_btn * 2/ 3)
				
			}
		}
		function initMenu() {
			if(!Mode.Exercise) {
				if(MenuItem.loadedMenuItems) {
					drawMenuItems();
				}
				else {
					loadMenuItems();
				}
				if(MenuItem.clicked > -1) {
					MenuItem.audio_played = true;
					Task.firstTask = 0;
					MenuItemClicked(MenuItem.clicked);
				}
			}
			drawHeader();
			readyToShowForms();
			
		}
		//initMenu();

		/************************************Resizing*******************************************************/
			
		/*var c = $('#MainCanvas');
		var ct = c.get(0).getContext('2d');
		var container = $(c).parent();
		$(window).resize(respondCanvas);*/

		/*$(window).load(function() {

			$(window).resize(function() {
			   respondCanvas()
			});
		});*/
		var c = $('#MainCanvas');
		var ct = c.get(0).getContext('2d');
		var container = $(c).parent();
		$(window).resize(respondCanvas);
		/*$(window).resize(getDBData);
		function getDBData() {
			checkPropertiesTopic();
			if(topicPropertiesRecieved)
				respondCanvas();
			else
				{
					setTimeout(function(){
						getDBData();
					}, 1);
				}
		}*/
		function respondCanvas(){ 
			MenuItem.display = 3;
			MenuItem.itemsCount = 5;
			c.attr('width', $(container).width()); //max width
			c.attr('height', $(container).height() ); //max height
			Screen = {};
			Screen.width = $(container).width();
			Screen.height = $(container).height();
			//##Screen.height = document.getElementById('MainCanvas').clientHeight;
			//Screen.width = document.getElementById('MainCanvas').clientWidth;
			clearScreenRect(0, 0, Screen.width/Math.min(Screen.k_width, Screen.k_height), Screen.height/Math.min(Screen.k_width, Screen.k_height))
			MenuItem.rwidth = Screen.width;
			MenuItem.rheight = Screen.height * 0.6;
			Screen.k_width = MenuItem.rwidth / MenuItem.width;
			Screen.k_height =  MenuItem.rheight / MenuItem.height;
			
			//выравнивание по вертикали
			A = ((0.6 * Screen.height ) / Math.min(Screen.k_width, Screen.k_height)) - 2 * 40;
			//выравнивание по горизонтали 
			B = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 2 * 40 - 2 * koef*100 - (MenuItem.display - 1) * 68) / (MenuItem.display);
			//ctx.fillRect(0, (0.2 * Screen.height/ Math.min(Screen.k_width, Screen.k_height) + 20)*Math.min(Screen.k_width, Screen.k_height), 1000, 1)
			
			if(A < B){
				console.log("A")
				MenuItem.size = A;
			}
			else {
				console.log("B")
				MenuItem.size = B;
			}
			
			Title.rwidth = Screen.width * 0.6;
			Title.rheight = Screen.height * 0.3;
			Title.k_width = Title.rwidth / Title.width;
			Title.k_height =  Title.rheight / Title.height;
			if((Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) - 2 * 20)/130*470 > Screen.width * 0.5 / Math.min(Screen.k_width, Screen.k_height)) {
				Title.size = Screen.width * 0.5 / Math.min(Screen.k_width, Screen.k_height);
			}
			else {
				Title.size = (Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) - 2 * 20)/130*470;
			}
			
			
			MenuItem.leftSpace = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - MenuItem.display * MenuItem.size - (MenuItem.display - 1) * 68 - 2 * 100*koef) / 4;
			if(!Math.floor(2 * MenuItem.topSpace / MenuItem.size) > 0 && Math.floor(2 * MenuItem.leftSpace / MenuItem.size) > 0) {
				MenuItem.display = MenuItem.display + Math.floor( 2 * MenuItem.leftSpace / MenuItem.size);
				if(MenuItem.display > MenuItem.itemsCount) {
					MenuItem.display = MenuItem.itemsCount;
				}
				MenuItem.leftSpace = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - MenuItem.display * MenuItem.size - (MenuItem.display - 1) * 68 - 2 * 100*koef) / 4;
			
			}
			if(MenuItem.firstItem + MenuItem.display > MenuItem.itemsCount) {
				MenuItem.firstItem = MenuItem.itemsCount - MenuItem.display;
			}
			//here
			MenuItem.starts = 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height);
			/*if(0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) > 1.6 * Title.size*130/470) {
				MenuItem.starts = Title.size*130/470 + 2 * 20;
				console.log("bad")
			}*/
			MenuItem.topSpace = 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + (Screen.height * 0.6 / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			if(MenuItem.starts != 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height)) {
				MenuItem.topSpace = MenuItem.starts + 2 * 20;
			}
				
			Title.leftSpace = MenuItem.leftSpace;
			Rewards.rwidth = Screen.width;
			Rewards.rheight = 0.1 * Screen.height;
			Rewards.k_width = Rewards.rwidth / Rewards.width;
			Rewards.k_height =  Rewards.rheight / Rewards.height;
			if(Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) < Rewards.size){
				Rewards.topSpace = Screen.height * 0.8 / Math.min(Screen.k_width, Screen.k_height) + (Rewards.size - Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) ) / 2;
			}
			else {
				Rewards.topSpace = Screen.height * 0.8 / Math.min(Screen.k_width, Screen.k_height) + (Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) - Rewards.size) / 2;
				
			}
			if(MenuItem.starts != 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height)) {
				Rewards.topSpace = MenuItem.topSpace + MenuItem.size + 20;
			}
			
			//##Rewards.leftSpace = MenuItem.leftSpace;
			Rewards.leftSpace = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - 4 * Rewards.size - 3 * 68) / 2
			console.log(Rewards.leftSpace, Screen.width / Math.min(Screen.k_width, Screen.k_height) - (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68 + Rewards.size))
			Profile.rwidth = Screen.width * 0.3;
			Profile.rheight = Screen.height * 0.3;
			Profile.k_width = Profile.rwidth / Profile.width;
			Profile.k_height =  Profile.rheight / Profile.height;
			if((Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) - 2 * 20)/137*470 > Screen.width * 0.5 / Math.min(Screen.k_width, Screen.k_height)) {
				Profile.size_btn = 75/(228 + 6 * 75) * (3 * (Title.size *130/479) - 3 * 2 * 5 + 2 * 5)*228/75;
			} else {
				Profile.size_btn = 75/(228 + 6 * 75) * (3 * Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) - 3 * 2 * 20 - 3 * 2 * 5 + 2 * 5)*228/75;
			}
			
			/*ctx.fillStyle="#F7FE2E";
			ctx.fillRect(0, 0, Screen.width, (MenuItem.starts) * Math.min(Screen.k_width, Screen.k_height));
			ctx.fillRect(0, (MenuItem.ends) * Math.min(Screen.k_width, Screen.k_height), Screen.width, Screen.height);
			ctx.fillStyle="#000000";*/
			
			initMenu();
			
			ctx.fillStyle="#000000";
			
		}
		//Initial call 
		
		
		


		/************************************Resizing ended***********************************************/

		//var audio_MainMenu = new Audio('audio_main_menu.wav');
		//audio_MainMenu.play();

		var mouseX;
		var mouseY;
			
		MainCanvas.addEventListener("mousemove", checkPosMenuItem);
		function checkPosMenuItem(mouseEvent){
			
			var rect = MainCanvas.getBoundingClientRect(),
				scaleX = MainCanvas.width / rect.width;
				scaleY = MainCanvas.height / rect.height;
				mouseX = (mouseEvent.clientX - rect.left) * scaleX;   // scale mouse coordinates after they have
				mouseY = (mouseEvent.clientY - rect.top) * scaleY;
				//MenuItem.ctx.fillText([mouseX, mouseY], mouseX, mouseY);
				HoverMenuItem(mouseX, mouseY);
			
		}
		function SignInNewUser(Profile) {
			socket.emit('newUser', {
				User: Profile
			})
			socket.on('newUser', function(data){
				console.log(data);
				console.log("new user:", data.res);
				return data.res;
			})
			return false;
		}
		function checkProfileData() {
			console.log("checking data", Profile);
			
			if(Profile.Password != "" && Profile.UserName != "" && Profile.Password != "Password" && Profile.UserName != "Username" )
				return true;
			return false;
		}
		function checkPoint(Point, Array) {
			var i = 0;
			while(i < Array.length) {
				//fillRect(Array[i].x, Array[i].y, Array[i].w, Array[i].h);
				if(PointInRect(Point, Array[i])) {
					return i;
					i = Array.length + 1;
				}
				else {
					i++;
				}
			}
			return i;
		}
		var k = -1;
		var k1 = -1;
		var k2 = -1; // hovering what word
		var k3 = -1; //pressing what word
		var Pressed = {}; //for coordinates of clicked point
		var l_a_ch = false;
		var r_a_ch = false;
		var login_ch = false;
		var signin_ch = false;
		var rewards_ch = false;
		var progress_ch = false;
		var phrases_ch = false;
		var quiz_ch = false;
		var sound_ch = false;
		var help_ch = false;
		var task_ch = false;
		var b_a_ch = false;
		var t_a_ch = false;
		var info_ch = false;
		var log_in_btn = false;
		var cancel_btn = false;
		var info_ch = false;
		var sign_in_btn = false;
		var cancel_btn = false;
		var play_btn_ch = false;
		var pause_btn_ch = false;
		var stop_btn_ch = false;
		var restart_btn_ch = false;
		var exit_btn_ch = false;
		var word_ch = false;
		function HoverMenuItem(mouseX, mouseY){
			if(Mode.MenuItem && MenuItem.firstItem > 0) {
			if (!(l_a_ch) && mouseX >= Math.min(Screen.k_width, Screen.k_height) * MenuItem.leftSpace && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.leftSpace + koef*100) && mouseY >=  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 + koef*100*226/152) ) {	
				l_a_x = MenuItem.leftSpace;
				l_a_width = 100*koef;
				l_a_height = koef*100*226/152;
				l_a_y =  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2;
				
				clearMenuItemRect(l_a_x, l_a_y , l_a_width, l_a_height);
				//clearMenuItemRect((MenuItem.rspace - koef*100) / 2 , 125 , koef*100, koef*100*226/152);
				dx = -5;
				dy = -5;
				dw = 10;
				dh = 10;
				drawLeftArrow(l_a_x + dx, l_a_y + dy, l_a_width + dw, l_a_height + dh);
				l_a_ch = true;
				delete l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height;
				delete dx, dy, dw, dh;
				//document.body.style.cursor = "hand";
			}else if ((l_a_ch) && !(mouseX >= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.leftSpace - 5) && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.leftSpace + koef*100 + 5) && mouseY >=  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 - 5)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 + koef*100*226/152 + 5) )) {	
				dx = -5;
				dy = -5;
				dw = 10;
				dh = 10;
				clearMenuItemRect((MenuItem.leftSpace + dx),  (MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 + dy) , (koef*100 + dw), (koef*100*226/152 + dh));
				drawLeftArrow(MenuItem.leftSpace ,  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 , koef*100, koef*100*226/152);
				l_a_ch = false;
				delete dx, dy, dw, dh;
			}
			}
			//right arrow is hovered
			if(Mode.MenuItem && (MenuItem.firstItem + MenuItem.display < MenuItem.itemsCount)){
			if (!(r_a_ch) && mouseX >= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef) && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef + koef*100) && mouseY >=  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 + koef*100*226/152) ) {	
				clearMenuItemRect(MenuItem.rwidth / Math.min(Screen.k_width,  Screen.k_height) - MenuItem.leftSpace - koef*100, MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 , koef*100, koef*100*226/152);dx = -5;
				dy = -5;
				dw = 10;
				dh = 10;
				drawRightArrow(Screen.width / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width + dx,  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 + dy, koef*100 + dw, koef*100*226/152 + dh);
				r_a_ch = true;
				delete dx, dy, dw, dh;
			}else if ((r_a_ch) && !(mouseX >= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef - 5) && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef + koef*100 + 5) && mouseY >=  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 - 5)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 + koef*100*226/152 + 5) )) {
				dx = -5;
				dy = -5;
				dw = 10;
				dh = 10;
				clearMenuItemRect(MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef + dx, MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 + dy, koef*100 + dw, koef*100*226/152 + dh);
				drawRightArrow(MenuItem.rwidth / Math.min(Screen.k_width,  Screen.k_height) - MenuItem.leftSpace - koef*100, MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 , koef*100, koef*100*226/152);
				r_a_ch = false;
				delete dx, dy, dw, dh;
			}
			}
			// menu tasks are hovered
			if(Mode.Tasks && (MenuItem.clicked > -1) && (mouseY >= MenuItem.topSpace * Math.min(Screen.k_width, Screen.k_height) && mouseY <= (MenuItem.topSpace + MenuItem.size) * Math.min(Screen.k_width, Screen.k_height))) {
				//console.log("reacting1", k1)
				i = 0;
				t_a_width = 100*0.5;
				//pX = MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem - MenuItem.firstItem);
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace;
				while (i < Task.display) {
					//console.log("reacting2", "i =", i, MenuItem.clicked, task_ch, mouseInRect(pX, pY + (55/ 368 * MenuItem.size + 10) * i + t_a_width + Task.topSpace, MenuItem.size, 55/368*MenuItem.size))
					//if(k1 == -1 && !(task_ch) && mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + MenuItem.size)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY + (55/ 368 * MenuItem.size + 10) * i + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + (55/ 368 * MenuItem.size + 10) * i + t_a_width + Task.topSpace + 55/368*MenuItem.size)*Math.min(Screen.k_width, Screen.k_height)){
					if(k1 == -1 && !(task_ch) && mouseInRect(pX, pY + (55/ 368 * MenuItem.size + 10) * i + t_a_width + Task.topSpace, MenuItem.size, 55/368*MenuItem.size)){
						//console.log("reacting3", k1)
						ctx.clearRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY  + (55 / 368 * MenuItem.size + 10) * i + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height), (MenuItem.size)*Math.min(Screen.k_width, Screen.k_height), (55/ 368 * MenuItem.size)*Math.min(Screen.k_width, Screen.k_height));
						drawTask(MenuItem.clicked, Task.firstTask + i, pX - 3, pY + (55 / 368 * MenuItem.size + 10) * i  + t_a_width + Task.topSpace - 3,  MenuItem.size + 6, 55/368*MenuItem.size + 6)
						k1 = i;
						i = Task.display + 1;
						task_ch = true;
					}
					else{
						i = i + 1;
					}
				}
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace;
				if((Mode.Tasks && (MenuItem.clicked > -1) && !(mouseY >= pY  + (55 / 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace * Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY  + (55 / 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace + MenuItem.size) * Math.min(Screen.k_width, Screen.k_height)))&& (k1 > -1 && task_ch && !(mouseX >= (pX - 3)*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + MenuItem.size + 6)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY + (55/ 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace - 3)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY  + (55 / 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace + 55/368*MenuItem.size + 6)*Math.min(Screen.k_width, Screen.k_height)))){
					ctx.clearRect((pX-3)*Math.min(Screen.k_width, Screen.k_height), (pY  + (55 / 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace - 3)*Math.min(Screen.k_width, Screen.k_height), (MenuItem.size + 6)*Math.min(Screen.k_width, Screen.k_height), (55/ 368 * MenuItem.size + 6)*Math.min(Screen.k_width, Screen.k_height));
					//ctx.fillRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY+ t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height), MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height));
					drawTask(MenuItem.clicked, Task.firstTask + k1, pX, pY + (55 / 368 * MenuItem.size + 10) * k1  + t_a_width + Task.topSpace,  MenuItem.size, 55/368*MenuItem.size)
					//ctx.fillRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY + (55/368*MenuItem.size + 10)*k1 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
					k1 = -1;
					task_ch = false;
				}
			}
			
			//top arrow
			if(Mode.Tasks && (Task.firstTask > 0)) {
			if(MenuItem.clicked > -1) {
				t_a_height = 100*0.5;
				t_a_width = 0.5*100*226/152;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2;
				pY =  MenuItem.topSpace;
				if(!(t_a_ch) && mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + t_a_width)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + t_a_height)*Math.min(Screen.k_width, Screen.k_height)){
					ctx.clearRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY)*Math.min(Screen.k_width, Screen.k_height), (t_a_width)*Math.min(Screen.k_width, Screen.k_height), (t_a_height)*Math.min(Screen.k_width, Screen.k_height));
					t_a_ch = true;
					
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
					pY =  MenuItem.topSpace;
					//ctx.fillRect((pX + MenuItem.size / 2)*Math.min(Screen.k_width, Screen.k_height), 0, 1, 10000)
					ctx.save();
					ctx.translate((pX + MenuItem.size / 2 + 3/4*t_a_height)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
					ctx.rotate(Math.PI / 2);
					drawLeftArrow(0 - 3, 0 - 3, t_a_height + 6, t_a_width + 6)
					ctx.restore();
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2;
					pY =  MenuItem.topSpace;
					delete pX, pY;
					delete t_a_height, t_a_width;
				
				
				}
				else if (Mode.Tasks && t_a_ch && !(mouseX >= (2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2)*Math.min(Screen.k_width, Screen.k_height) && mouseX <= (2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2 + t_a_width + 3)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (MenuItem.topSpace - 3)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (MenuItem.topSpace + t_a_height + 3)*Math.min(Screen.k_width, Screen.k_height))){
					t_a_ch = false;
					ctx.clearRect((pX - 3)*Math.min(Screen.k_width, Screen.k_height), (pY - 3)*Math.min(Screen.k_width, Screen.k_height), (t_a_width + 6)*Math.min(Screen.k_width, Screen.k_height), (t_a_height + 6)*Math.min(Screen.k_width, Screen.k_height))
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
					pY =  MenuItem.topSpace;
					//ctx.fillRect((pX + MenuItem.size / 2)*Math.min(Screen.k_width, Screen.k_height), 0, 1, 10000)
					ctx.save();
					ctx.translate((pX + MenuItem.size / 2 + 3/4*t_a_height)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
					ctx.rotate(Math.PI / 2);
					drawLeftArrow(0, 0, t_a_height, t_a_width)
					ctx.restore();
					delete pX, pY;
					delete t_a_height, t_a_width;
				}
				
			}
			}
			if(Mode.Tasks && (Task.firstTask + Task.display < Task.itemsCount[MenuItem.clicked])) {
			//bottom arrow hovered
			if(MenuItem.clicked > -1) {
				b_a_height = 100*0.5;
				b_a_width = 0.5*100*226/152;
				t_a_height = b_a_width;
				t_a_width = b_a_height;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2;
				pY = Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height;
				if(!(b_a_ch) && mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + b_a_width)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + b_a_height)*Math.min(Screen.k_width, Screen.k_height)){
					ctx.clearRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY)*Math.min(Screen.k_width, Screen.k_height), (b_a_width)*Math.min(Screen.k_width, Screen.k_height), (b_a_height)*Math.min(Screen.k_width, Screen.k_height));
					//ctx.fillRect(pX*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height), b_a_width*Math.min(Screen.k_width, Screen.k_height), b_a_height*Math.min(Screen.k_width, Screen.k_height))
					b_a_ch = true;
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
					pY =  MenuItem.topSpace + MenuItem.size;
					ctx.save();
					ctx.translate((pX + MenuItem.size / 2 - 3/4*b_a_height)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
					ctx.rotate(-Math.PI / 2);
					drawLeftArrow(0 - 3, 0 - 3, b_a_height + 6, b_a_width + 6)
					ctx.restore();
					
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2;
					pY = Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height;
				}
				else if (Mode.Tasks && b_a_ch && !(mouseX >= (2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2 - 3)*Math.min(Screen.k_width, Screen.k_height) && mouseX <= (2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2 + b_a_width + 3)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height - 3)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height + b_a_height + 3)*Math.min(Screen.k_width, Screen.k_height))){
					b_a_ch = false;
					ctx.clearRect((pX - 5)*Math.min(Screen.k_width, Screen.k_height), (pY - 5)*Math.min(Screen.k_width, Screen.k_height), (b_a_width + 10)*Math.min(Screen.k_width, Screen.k_height), (b_a_height + 10)*Math.min(Screen.k_width, Screen.k_height))
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
					pY =  MenuItem.topSpace + MenuItem.size;
					ctx.save();
					ctx.translate((pX + MenuItem.size / 2 - 3/4*b_a_height)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
					ctx.rotate(-Math.PI / 2);
					drawLeftArrow(0, 0, b_a_height, b_a_width)
					ctx.restore();
				}
				delete pX, pY;
				delete b_a_height, b_a_width;
			}
			}
			//Menuitems hovered
			var i = 0;
			while (Mode.MenuItem && (i < MenuItem.display)) {
				X_l = 2 * MenuItem.leftSpace + 100*koef + 68 * (i + 1) + MenuItem.size * i - 68;
				X_r = 2 * MenuItem.leftSpace + 100*koef + 68 * (i + 1) + MenuItem.size * (i + 1) - 68;
				if((k == -1) && mouseY >= Math.min(Screen.k_width, Screen.k_height) * MenuItem.topSpace   && mouseY <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.size + MenuItem.topSpace) && (mouseX >= Math.min(Screen.k_width, Screen.k_height) * X_l && mouseX <= Math.min(Screen.k_width, Screen.k_height) * X_r)){
					if(MenuItem.clicked - MenuItem.firstItem != i){
					//clearMenuItemRect(X_l, MenuItem.topSpace, MenuItem.size, MenuItem.size);
					X = 368 * i;
					Y = 0;
					W = 368;
					H = 368;
					pX = X_l - 10;
					pY =  MenuItem.topSpace - 10;
					pW = MenuItem.size + 20;
					pH = MenuItem.size + 20;
					k = i;
					console.log("hovering", i, "item")
					DrawMenuItem(i + MenuItem.firstItem, i + MenuItem.firstItem, pX, pY, pW, pH);
					i = MenuItem.display + 1;
					}
					else{
						i = MenuItem.display + 1;
					}
				}
				else {
					i++;
				}
				delete X_l, X_r;
			}
			
			//if ((k > -1) && !(mouseY >= Math.min(Screen.k_width, Screen.k_height) * MenuItem.topSpace  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.size + MenuItem.topSpace)  && (mouseX >= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k ) && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * (k + 1))))){
				if (Mode.MenuItem && (k > -1) && !(mouseY >= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.topSpace - 10)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.size + MenuItem.topSpace + 10)  && (mouseX >= Math.min(Screen.k_width, Screen.k_height) * (2 * MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k - 68 - 10) && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (2 * MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * (k + 1) - 68 + 10)))){
					//pX = MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k - 10;
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k - 68 - 10;
					pY =  MenuItem.topSpace - 10;
					pW = MenuItem.size + 20;
					pH = MenuItem.size + 20;
					//MenuItem.ctx.clearRect(pX, pY, pW, pH);
					clearMenuItemRect(pX, pY, pW, pH);
					
					//pX = MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k - 68;
					pY =  MenuItem.topSpace;
					pW = MenuItem.size;
					pH = MenuItem.size;
					X_l = 2 * MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k - 68;
					//X_r = MenuItem.leftSpace + 100*koef + 68 * (i + 1) + MenuItem.size * (i + 1)
					X_r = 2 * MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * (k + 1) - 68;
					//clearMenuItemRect(X_l - 10, MenuItem.topSpace-10, MenuItem.size + 20, MenuItem.size + 20);
					console.log("hovering ", k, "item")
					DrawMenuItem(k + MenuItem.firstItem, k + MenuItem.firstItem, pX, pY, pW, pH);
					//ctx.fillRect(pX, pY, pW, pH)
					//ctx.fillRect(Math.min(Screen.k_width, Screen.k_height) * (MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k ), Math.min(Screen.k_width, Screen.k_height) * MenuItem.topSpace,Math.min(Screen.k_width, Screen.k_height) * (MenuItem.size),  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.size))
					//ctx.fillRect(Math.min(Screen.k_width, Screen.k_height) * (pX), Math.min(Screen.k_width, Screen.k_height) * pY, Math.min(Screen.k_width, Screen.k_height) * (MenuItem.size),  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.size))
					k = -1;
					delete X_l, pX, pY, pW, pH;
					
				}
			//Login button hovered
			//drawLogInButton((Screen.width  - 150*75/228)/ Math.min(Screen.k_width, Screen.k_height)- MenuItem.leftSpace, 20/ Math.min(Screen.k_width, Screen.k_height), 150, 150*75/228)
			if (!Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn &&!login_ch && mouseX >= ((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= (20) * Math.min(Screen.k_width, Screen.k_height) && mouseY <= (20 + Profile.size_btn*75/228) * Math.min(Screen.k_width, Screen.k_height)) {
				clearProfileRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
				
				ctx.fillStyle="#F7FE2E";
				fillRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
				
				drawLogInButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, 20 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4);
				login_ch = true;
			}
			else if(!Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn &&login_ch && !(mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn- MenuItem.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= (20) * Math.min(Screen.k_width, Screen.k_height) && mouseY <= (20 + Profile.size_btn*75/228) * Math.min(Screen.k_width, Screen.k_height))) {
				if(!Profile.LoggedIn) {
					clearProfileRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, 20 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4);;
					fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, 20 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4);;
					drawLogInButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn- MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228)
				}
				login_ch = false;
			}
			//Sign in button hovered
			//drawSignInButton((Screen.width - 150*75/228)/ Math.min(Screen.k_width, Screen.k_height)- MenuItem.leftSpace, (20 + 5)/ Math.min(Screen.k_width, Screen.k_height) + 150*75/228 + 3, 150, 150*75/228)
			if (!Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn && !signin_ch && mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
				clearProfileRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + 3, Profile.size_btn, Profile.size_btn*75/228);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + 3, Profile.size_btn, Profile.size_btn*75/228);
				drawSignInButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
				signin_ch = true;
			}
			else if(!Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn &&signin_ch && !(mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height))) {
				clearProfileRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
				drawSignInButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) -Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228, Profile.size_btn, Profile.size_btn*75/228);
				signin_ch = false;
			}
			//rewards button
			if (!Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&!rewards_ch && mouseX >= (Rewards.leftSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
				console.log("rewards")
				clearProfileRect(Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				fillRectYellow(Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				drawRewardsButton(Rewards.leftSpace - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				rewards_ch = true;
			}
			else if(!Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&rewards_ch && !(mouseX >= (Rewards.leftSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height))) {
				clearProfileRect(Rewards.leftSpace - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				fillRectYellow(Rewards.leftSpace - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				drawRewardsButton(Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				rewards_ch = false;
			}
			//Progress button hovered
			if (!Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&!progress_ch && mouseX >= (Rewards.leftSpace + Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				drawProgressButton(Rewards.leftSpace + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				progress_ch = true;
			}
			else if(!Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&progress_ch && !(mouseX >= (Rewards.leftSpace + Rewards.size + 68 - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				drawProgressButton(Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				progress_ch = false;
			}
			
			//Phrases button hovered
			if (!Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&!phrases_ch && mouseX >= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				drawPhrasesButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				phrases_ch = true;
			}
			else if(!Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&phrases_ch && !(mouseX >= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + Rewards.size + 68 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				drawPhrasesButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				
				phrases_ch = false;
			}
			//Quiz button has been hovered
			//drawQuizButton(MenuItem.leftSpace + 100*koef + 68 + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228)
			if (!Mode.Exercise && !Mode.LogIn && !Mode.SignIn &&!quiz_ch && mouseX >= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + Rewards.size + 68+ Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				drawQuizButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				quiz_ch = true;
			}
			else if(!Mode.Exercise &&!Mode.LogIn && !Mode.SignIn &&quiz_ch && !(mouseX >= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68 - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + Rewards.size + 68+ Rewards.size + 68 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				fillRectYellow(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
				drawQuizButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
				quiz_ch = false;
			}
			//sound button hovered
			//drawSoundOnButton((Screen.width - 150*75/228)/ Math.min(Screen.k_width, Screen.k_height)- MenuItem.leftSpace, (20 + 5) + 150*75/228 + 3 + 150*75/228 + 5, 150 / 3, 150 / 3)
			if (!Mode.LogIn && !Mode.SignIn &&!sound_ch && mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				fillRectYellow((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				if(sound_on) {
					drawSoundOnButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				}
				else {
					drawSoundOffButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height)- Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				}
				
				sound_ch = true;
			}
			else if(!Mode.LogIn && !Mode.SignIn &&sound_ch && !(mouseX >= ((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				fillRectYellow((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				if(sound_on) {
					drawSoundOnButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				}
				else {
					drawSoundOffButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				}
				sound_ch = false;
			}
			//help button has been hovered
			//drawHelpButton((Screen.width - 150*75/228)/ Math.min(Screen.k_width, Screen.k_height)- MenuItem.leftSpace + 150/3 + 5, (20 + 5) + 150*75/228 + 3 + 150*75/228 + 5, 150 / 3, 150 / 3)		
			if (!Mode.LogIn && !Mode.SignIn &&!help_ch && mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn- MenuItem.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				drawHelpButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				help_ch = true;
			}
			else if(!Mode.LogIn && !Mode.SignIn &&help_ch && !(mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height)- Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				drawHelpButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn-2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				help_ch = false;
			}
			//Info button has been hovered
			//drawInfoButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + 5 + (Profile.size_btn - 2 * 5)/3 + (Profile.size_btn - 2 * 5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
			if (!Mode.LogIn && !Mode.SignIn &&!info_ch&& mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5+ (Profile.size_btn - 2 * 5)/3 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn- MenuItem.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5 + (Profile.size_btn - 2*5) / 3+ (Profile.size_btn - 2 * 5)/3 + 5 )* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height)) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				drawInfoButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace+ (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				info_ch = true;
			}
			else if(!Mode.LogIn && !Mode.SignIn &&info_ch && !(mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5+ (Profile.size_btn - 2 * 5)/3 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn- MenuItem.leftSpace + (Profile.size_btn - 2 * 5)/3 + 5 + (Profile.size_btn - 2*5) / 3+ (Profile.size_btn - 2 * 5)/3 + 5 )* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2*5) / 3)* Math.min(Screen.k_width, Screen.k_height))) {
				clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace+ (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace+ (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn - 2*5)/3 + 5 - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				drawInfoButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace+ (Profile.size_btn - 2*5)/3 + 5 + (Profile.size_btn-2*5)/3 + 5, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
				info_ch = false;
			}
				
			if(Mode.LogIn && mouseInRect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size *4/3) / 205 * 368)/2, 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size * 4/3) / 2, (MenuItem.size *4/3) / 205 * 368, MenuItem.size * 4/3)) {
				//log in area
			}
					
			if(Mode.SignIn && mouseInRect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size *3/2))/2, 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size * 3/2) / 2, (MenuItem.size *6/4), MenuItem.size * 6/4)) {
				//sign in area
			}
			//Login form cancel button has been hovered
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			if (Mode.LogIn && !log_in_btn && mouseInRect(X_ + 49, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)) {
				clearScreenRect(X_ + 49, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202);
				drawLogInLogInButton(X_ + 47 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4)
				log_in_btn = true;
			}
			else if(Mode.LogIn && log_in_btn && !(mouseInRect(X_ + 49, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202))) {
				clearScreenRect(X_ + 49 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4);
				log_in_btn = false;
				X_1 = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_1 = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
				drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
				ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
				ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
				drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
			}
			//Login form log in button has been hovered
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			if (Mode.LogIn && !cancel_btn && mouseInRect(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)) {
				clearScreenRect(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202);
				drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4)
				cancel_btn = true;
			}
			else if(Mode.LogIn && cancel_btn && !(mouseInRect(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202))) {
				clearScreenRect(X_ + 49 + (MenuItem.size) / 202 * 156 + 35 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4);
				cancel_btn = false;
				X_1 = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_1 = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
				
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
				drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
				//console.log("retyping", Profile.UserName)
				ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
				ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
				drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
			}
			
			//Signin button hovered SignIn mode
			//drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if (Mode.SignIn && !sign_in_btn && mouseInRect(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)) {
				clearScreenRect(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156);
				drawSignInSignInButton(X_ + 20 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4)
				sign_in_btn = true;
			}
			else if(Mode.SignIn && sign_in_btn && !(mouseInRect(X_ + 20 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4))) {
				clearScreenRect(X_ + 20 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4);
				sign_in_btn = false;
				Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
				size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
				drawSignInForm(X_, Y_, size_, size_);
				if(NewAccent == "US English Female")
						AmericanAccent()
				if(NewAccent == "Australian Female")
						AustralianAccent()
				if(NewAccent == "UK English Male")
						BritishAccent()
				drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				
			}
			
			//Cancel button hovered SignIn mode
			//drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if (Mode.SignIn && !cancel_btn && mouseInRect(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)) {
				clearScreenRect(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156);
				drawSignInCancelButton(X_ + 190 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4)
				cancel_btn = true;
				console.log(NewAccent)
			}
			else if(Mode.SignIn && cancel_btn && !(mouseInRect(X_ + 190 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4))) {
				clearScreenRect(X_ + 20 / 368 * size_ - 2, Y_ + 318 / 368 * size_ - 2, 157 / 368 * size_ + 4, 157 / 368 * size_ * 37 / 156 + 4);
				cancel_btn = false;
				Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
				size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
				drawSignInForm(X_, Y_, size_, size_);
				if(NewAccent == "US English Female")
						AmericanAccent()
				if(NewAccent == "Australian Female")
						AustralianAccent()
				if(NewAccent == "UK English Male")
						BritishAccent()
				drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				console.log("Accent = ", NewAccent)
				ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				
			}
			/*
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			drawPlayButton(pX + 20, pY, size_btn, size_btn)
			drawPauseButton(pX + 20, pY + size_btn + 10, size_btn, size_btn)
			drawStopButton(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn)
			drawRestartButton(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)
			drawExitButton(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)
					
			*/
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			
			//pause button has been hovered
			//fillRect(pX + 20 - 3, pY + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
			if (Mode.AlphabetSong && !Mode.SignIn && !Mode.LogIn &&!pause_btn_ch && mouseInRect(pX + 20, pY + size_btn + 10, size_btn, size_btn)) {
				clearScreenRect(pX + 20, pY + size_btn + 10, size_btn, size_btn);
				drawPauseButton(pX + 20 - 3, pY + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
				pause_btn_ch = true;
			}
			else if(Mode.AlphabetSong && !Mode.SignIn && !Mode.LogIn && pause_btn_ch && !(mouseInRect(pX + 20 - 3, pY + size_btn + 10 - 3, size_btn + 6, size_btn + 6))) {
				clearScreenRect(pX + 20 - 3, pY + size_btn + 10 - 3, size_btn + 6, size_btn + 6);
				drawPauseButton(pX + 20, pY + size_btn + 10, size_btn, size_btn)
				pause_btn_ch = false;
			}
			//play button has been hovered
			if (Mode.AlphabetSong && !Mode.SignIn && !Mode.LogIn &&!play_btn_ch && mouseInRect(pX + 20, pY, size_btn, size_btn)) {
				clearScreenRect(pX + 20, pY, size_btn, size_btn);
				drawPlayButton(pX + 20 - 3, pY - 3, size_btn + 6, size_btn + 6)
				play_btn_ch = true;
			}
			else if(Mode.AlphabetSong && !Mode.SignIn && !Mode.LogIn && play_btn_ch && !(mouseInRect(pX + 20 - 3, pY - 3, size_btn + 6, size_btn + 6))) {
				clearScreenRect(pX + 20 - 3, pY - 3, size_btn + 6, size_btn + 6);
				drawPlayButton(pX + 20, pY, size_btn, size_btn)
				play_btn_ch = false;
			}
			
			//stop button has been hovered
			if (Mode.AlphabetSong && !Mode.SignIn && !Mode.LogIn &&!stop_btn_ch && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
				clearScreenRect(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn);
				drawStopButton(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
				stop_btn_ch = true;
			}
			else if(Mode.AlphabetSong && !Mode.SignIn && !Mode.LogIn && stop_btn_ch && !(mouseInRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6))) {
				clearScreenRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6);
				drawStopButton(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn)
				stop_btn_ch = false;
			}
			//restart button has been hovered
			if (Mode.AlphabetSong && !Mode.SignIn && !Mode.LogIn &&!restart_btn_ch && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
				clearScreenRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn);
				drawRestartButton(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
				restart_btn_ch = true;
			}
			else if(Mode.AlphabetSong && !Mode.SignIn && !Mode.LogIn && restart_btn_ch && !(mouseInRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6))) {
				clearScreenRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6);
				drawRestartButton(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)
				restart_btn_ch = false;
			}
			//exit button has been hovered
			if (Mode.AlphabetSong && !Mode.SignIn && !Mode.LogIn &&!exit_btn_ch && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
				clearScreenRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn);
				drawExitButton(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
				exit_btn_ch = true;
			}
			else if(Mode.AlphabetSong && !Mode.SignIn && !Mode.LogIn && exit_btn_ch && !(mouseInRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6))) {
				clearScreenRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6);
				drawExitButton(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)
				exit_btn_ch = false;
			}
			
			//MatchTheAnimalsWithTheirNames exit button has been hovered
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			if (Mode.MatchTheAnimalsWithTheirNames && !Mode.SignIn && !Mode.LogIn &&!exit_btn_ch && mouseInRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn)) {
				clearRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn);
				drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 - size_btn - 3, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20 - 3, size_btn + 6, size_btn + 6);
				exit_btn_ch = true;
			}
			else if(Mode.MatchTheAnimalsWithTheirNames && !Mode.SignIn && !Mode.LogIn && exit_btn_ch && !(mouseInRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 - size_btn - 3, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20 - 3, size_btn + 6, size_btn + 6))) {
				clearRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 - size_btn - 3, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20 - 3, size_btn + 6, size_btn + 6);
				drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn);
				exit_btn_ch = false;
			}
			//MatchTheAnimalsWithTheirNames word has been hovered
			if (Mode.MatchTheAnimalsWithTheirNames && !Mode.SignIn && !Mode.LogIn &&!word_ch) {
				var Array = [];
				var animal_height = 400;
				var word_width = (Screen.width - (Task.test.length + 1) * 20)/ 5;
				var word_height = 80;
				var edge = 0;
				var center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
				var top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + animal_height + 20 + word_height + 20;
				for(var i = 0; i < Task.test.length; i++) {
					var wordFrame = (Task.test.concat())[i].Wordsframe;
					Array[i] = {};
					Array[i].x = (edge + center/2-wordFrame.w*word_height/wordFrame.h/2);
					Array[i].y = top;
					Array[i].w = wordFrame.w*word_height/wordFrame.h;
					Array[i].h = word_height;
					if(i % 2){
						top = top + word_height + 30;
						edge = 0;
					}
					else edge = center;
				}
				var i = checkPoint({x:mouseX, y:mouseY}, Array);
				k2 = i;
				if(i < Array.length) {
					console.log("in", i, "rect");
					wordFrame = (Task.test.concat())[i].Wordsframe;
					ctx.clearRect((Array[i]).x*Math.min(Screen.k_width, Screen.k_height), (Array[i].y)*Math.min(Screen.k_width, Screen.k_height), (Array[i].w)*Math.min(Screen.k_width, Screen.k_height), (Array[i].h)*Math.min(Screen.k_width, Screen.k_height));ctx.drawImage(atlasAnimalsWords, wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[i] - 6).x*Math.min(Screen.k_width, Screen.k_height), (Array[i].y)*Math.min(Screen.k_width, Screen.k_height), (Array[i].w)*Math.min(Screen.k_width, Screen.k_height), (Array[i].h)*Math.min(Screen.k_width, Screen.k_height));
					ctx.drawImage(atlasAnimalsWords, wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[i].x - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[i].y - 3)*Math.min(Screen.k_width, Screen.k_height), (Array[i].w + 6)*Math.min(Screen.k_width, Screen.k_height), (Array[i].h + 6)*Math.min(Screen.k_width, Screen.k_height));ctx.drawImage(atlasAnimalsWords, wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[i] - 6).x*Math.min(Screen.k_width, Screen.k_height), (Array[i].y - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[i].w + 12)*Math.min(Screen.k_width, Screen.k_height), (Array[i].h + 12)*Math.min(Screen.k_width, Screen.k_height));
					word_ch = true;
				}
			}
			else if(Mode.MatchTheAnimalsWithTheirNames && !Mode.SignIn && !Mode.LogIn && word_ch) {
				Array = [];
				var animal_height = 400;
				var word_width = (Screen.width - (Task.test.length + 1) * 20)/ 5;
				var word_height = 80;
				var edge = 0;
				var center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
				var top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + animal_height + 20 + word_height + 20;
				
				for(var i = 0; i < Task.test.length; i++) {
					var wordFrame = Task.test[i].Wordsframe;
					Array[i] = {};
					Array[i].x = (edge + center/2-wordFrame.w*word_height/wordFrame.h/2);
					Array[i].y = top;
					Array[i].w = wordFrame.w*word_height/wordFrame.h;
					Array[i].h = word_height;
					if(i % 2){
						top = top + word_height + 30;
						edge = 0;
					}
					else edge = center;
				}
				var i = k2;
				if(k3 == -1 && !PointInRect({x:mouseX, y:mouseY}, Array[i])) {
					//console.log("left the rect");
					wordFrame = Task.test[i].Wordsframe;
					ctx.clearRect((Array[i].x - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[i].y - 3)*Math.min(Screen.k_width, Screen.k_height), (Array[i].w + 6)*Math.min(Screen.k_width, Screen.k_height), (Array[i].h + 6)*Math.min(Screen.k_width, Screen.k_height));ctx.drawImage(atlasAnimalsWords, wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[i] - 6).x*Math.min(Screen.k_width, Screen.k_height), (Array[i].y - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[i].w + 12)*Math.min(Screen.k_width, Screen.k_height), (Array[i].h + 12)*Math.min(Screen.k_width, Screen.k_height));
					ctx.clearRect(0, 0.2 * Screen.height, Screen.width, Screen.height);
					size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5;
					drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn);
					drawTestAnimals();
					ctx.drawImage(atlasAnimalsWords, wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[i]).x*Math.min(Screen.k_width, Screen.k_height), (Array[i].y)*Math.min(Screen.k_width, Screen.k_height), (Array[i].w)*Math.min(Screen.k_width, Screen.k_height), (Array[i].h)*Math.min(Screen.k_width, Screen.k_height));ctx.drawImage(atlasAnimalsWords, wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[i] - 6).x*Math.min(Screen.k_width, Screen.k_height), (Array[i].y)*Math.min(Screen.k_width, Screen.k_height), (Array[i].w)*Math.min(Screen.k_width, Screen.k_height), (Array[i].h)*Math.min(Screen.k_width, Screen.k_height));
					word_ch = false;
					k2 = -1;
				}
				if(k3 != -1){
					//console.log("dragging");
					drawHeader();
					wordFrame = Task.test[k2].Wordsframe;
					Array[k2].x = Array[k2].x + mouseX/Math.min(Screen.k_width, Screen.k_height) - Pressed.x/Math.min(Screen.k_width, Screen.k_height);
					Array[k2].y = Array[k2].y + mouseY/Math.min(Screen.k_width, Screen.k_height) - Pressed.y/Math.min(Screen.k_width, Screen.k_height);
					var Point = {x:Array[k2].x*Math.min(Screen.k_width, Screen.k_height), y:Array[k2].y*Math.min(Screen.k_width, Screen.k_height)};
					var Rect = {x:0, y:0, w:Screen.width/Math.min(Screen.k_width, Screen.k_height), h:0.2*Screen.height/Math.min(Screen.k_width, Screen.k_height) + 20};
					console.log(top);
					//console.log(Point.x >= Rect.x* Math.min(Screen.k_width, Screen.k_height), Point.x <= (Rect.x + Rect.w)* Math.min(Screen.k_width, Screen.k_height),Point.y >= Rect.y * Math.min(Screen.k_width, Screen.k_height), Point.y <= (Rect.y + Rect.h)* Math.min(Screen.k_width, Screen.k_height));
					/*if(PointInRect(Point, Rect)){
						k3 = -1;
						console.log("im here");
						
					
					}*/
					ctx.clearRect((Array[k2].x - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].y - 3)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].w + 6)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].h + 6)*Math.min(Screen.k_width, Screen.k_height));ctx.drawImage(atlasAnimalsWords, wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[k2] - 6).x*Math.min(Screen.k_width, Screen.k_height), (Array[k2].y - 6)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].w + 12)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].h + 12)*Math.min(Screen.k_width, Screen.k_height));
					ctx.clearRect(0, 0.2 * Screen.height, Screen.width, Screen.height);
					size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5;
					drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn);
					drawTestAnimals();
					ctx.drawImage(atlasAnimalsWords, wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[k2]).x*Math.min(Screen.k_width, Screen.k_height), (Array[k2].y)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].w)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].h)*Math.min(Screen.k_width, Screen.k_height));ctx.drawImage(atlasAnimalsWords, wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h, (Array[k2] - 6).x*Math.min(Screen.k_width, Screen.k_height), (Array[k2].y)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].w)*Math.min(Screen.k_width, Screen.k_height), (Array[k2].h)*Math.min(Screen.k_width, Screen.k_height));
					
				}
			}
			
		}
		function leftArrowClicked() {
			MenuItem.clicked = -1;
			MenuItem.chosen = MenuItem.clicked;
			if(MenuItem.firstItem > 0) {
				MenuItem.firstItem = MenuItem.firstItem - 1;
				clearMenuItemRect((MenuItem.leftSpace - 5), ( MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 - 5) , (koef*100 + 10), (koef*100*226/152 + 10));
				drawMenuItems()
				l_a_x = MenuItem.leftSpace;
				l_a_width = 100*koef;
				l_a_height = koef*100*226/152;
				l_a_y =  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2;
				if(MenuItem.firstItem) {
					drawLeftArrow(l_a_x, l_a_y , l_a_width, l_a_height);
				}
				if(MenuItem.firstItem + MenuItem.display < MenuItem.itemsCount) {
					r_a_height = koef*100*226/152;
					r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
					r_a_width = koef*100;
					r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
					drawRightArrow(Screen.width / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width,  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2, koef*100, koef*100*226/152);
				}
			}
			delete l_a_x, l_a_y , l_a_width, l_a_height
		}
		function rightArrowClicked() {
			MenuItem.clicked = -1;
			MenuItem.chosen = MenuItem.clicked;
			MenuItem.firstItem = MenuItem.firstItem + 1;
			l_a_x = MenuItem.leftSpace;
			l_a_width = 100*koef;
			l_a_height = koef*100*226/152;
			l_a_y =  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2;
			if(MenuItem.firstItem + MenuItem.display >= MenuItem.itemsCount) {
				clearMenuItemRect(MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef - 5, MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2 - 5, koef*100 + 10, koef*100*226/152 + 10);
			}
			drawLeftArrow(l_a_x, l_a_y, l_a_width, l_a_height);
			drawMenuItems()
			delete l_a_x, l_a_y , l_a_width, l_a_height
		}

		function bottomArrowClicked() {
				j = MenuItem.clicked;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace;
				t_a_width = 100*0.5;
				t_a_height = 0.5*100*226/152;
				//ctx.fillRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				Task.firstTask = Task.firstTask + 1;
				
				drawTask(j, Task.firstTask, pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Trace the letters
				//ctx.drawImage(atlasMenuItemTask, 1104, 56, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				drawTask(j, Task.firstTask + 1, pX, (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Name the letter
				//ctx.drawImage(atlasMenuItemTask, 368, 56, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				drawTask(j, Task.firstTask + 2, pX, (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Name the letter sounds
				//ctx.drawImage(atlasMenuItemTask, 736, 0, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				drawTask(j , Task.firstTask + 3, pX, (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Task.a_clicked = false;
				
				
				if(Task.firstTask > 0) {
				//top arrow
				//ctx.fillRect(0, (MenuItem.topSpace)*Math.min(Screen.k_width, Screen.k_height), 1000, 100)
				//ctx.fillRect((pX + MenuItem.size / 2)*Math.min(Screen.k_width, Screen.k_height), 0, 1, 10000)
				//ctx.fillRect((pX + MenuItem.size / 2 + t_a_width / 2)*Math.min(Screen.k_width, Screen.k_height), 0, 1, 10000)
				//ctx.fillRect(0, pY*Math.min(Screen.k_width, Screen.k_height), 1000, 1)
				ctx.save();
				ctx.translate((pX + MenuItem.size / 2 + 3/4*t_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
				ctx.rotate(Math.PI / 2);
				drawLeftArrow(0, 0, t_a_width, t_a_height)
				ctx.restore();
				}
				if(Task.firstTask + Task.display >= Task.itemsCount[MenuItem.clicked]){
					b_a_height = 100*0.5;
					b_a_width = 0.5*100*226/152;
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2;
					pY = Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height;
					ctx.clearRect((pX-3)*Math.min(Screen.k_width, Screen.k_height), (pY-3)*Math.min(Screen.k_width, Screen.k_height), (b_a_width + 6)*Math.min(Screen.k_width, Screen.k_height), (b_a_height + 6)*Math.min(Screen.k_width, Screen.k_height));
				}
		}

		function topArrowClicked() {
				j = MenuItem.clicked;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace;
				t_a_width = 100*0.5;
				t_a_height = 0.5*100*226/152;
				//ctx.fillRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				Task.firstTask = Task.firstTask - 1;
				
				drawTask(j, Task.firstTask, pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Trace the letters
				//ctx.drawImage(atlasMenuItemTask, 1104, 56, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				drawTask(j, Task.firstTask + 1, pX, (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Name the letter
				//ctx.drawImage(atlasMenuItemTask, 368, 56, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				drawTask(j, Task.firstTask + 2, pX, (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Name the letter sounds
				//ctx.drawImage(atlasMenuItemTask, 736, 0, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				drawTask(j , Task.firstTask + 3, pX, (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				
				if(Task.firstTask <= 0) {
				t_a_height = 100*0.5;
				t_a_width = 0.5*100*226/152;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2;
				pY =  MenuItem.topSpace;
				ctx.clearRect((pX - 3)*Math.min(Screen.k_width, Screen.k_height), (pY - 3)*Math.min(Screen.k_width, Screen.k_height), (t_a_width + 6)*Math.min(Screen.k_width, Screen.k_height), (t_a_height + 6)*Math.min(Screen.k_width, Screen.k_height))
				}
				//draw bottom arrow
					//bottom arrow
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
					pY =  MenuItem.topSpace + MenuItem.size;
					b_a_width = 100*0.5;
					b_a_height = 0.5*100*226/152;
					ctx.save();
					ctx.translate((pX + MenuItem.size / 2 - 3/4*b_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
					ctx.rotate(-Math.PI / 2);
					drawLeftArrow(0, 0, b_a_width, b_a_height)
					ctx.restore();
				
		}

		var atlasMenuItemTask = new Image();
		MenuItem.loadedMenuItemTasks = false;
		function loadMenuItemsTasks(j){
			// Load image and the json that defines locations
			atlasMenuItemTask.src = '/client/img/Menu-Items/Tasks.png';
			atlasMenuItemTask.addEventListener("load", function() {
				MenuItem.loadMenuItemsTasks = true;
				console.log("drawing loaded sprites")
				drawMenuItemsTasks(j);
			}, false);	
		}
		function getUserNameLogIn(str, x, y){
			$(document).keydown(function(e){
					if(Profile.storeUserNameLogIn == true) {
					key = e.which || e.keyCode;
					if(key >= 48 && key <= 105) {
						if(Profile.UserName != "Username")
							Profile.UserName = Profile.UserName + String.fromCharCode(key);
						else
							Profile.UserName = String.fromCharCode(key)
					}
					else if(key == 32) {
							Profile.UserName = Profile.UserName = Profile.UserName + " "
						}
					else if(key == 8)
						Profile.UserName = Profile.UserName.substring(0, Profile.UserName.length-1);
					delete key, e
					}
					
				});
				$(document).keyup(function(e){
					if(Profile.storeUserNameLogIn == true) {
						clearScreenRect((X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size));
						X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
						Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
						drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
						ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
						drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
						drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
						ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
						ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
						delete key, e
					}
				});
			
			return str
			delete x, y, str
		}

		function getPasswordLogIn(str, x, y){
			$(document).keydown(function(e){
					if(Profile.storePasswordLogIn == true) {
					key = e.which || e.keyCode;
					if(key >= 48 && key <= 105) {
						if(Profile.Password != "Password")
							Profile.Password = Profile.Password + String.fromCharCode(key);
						else
							Profile.Password = String.fromCharCode(key)
					}
					else if(key == 32) {
							Profile.Password = Profile.Password = Profile.Password + " "
						}
					else if(key == 8)
						Profile.Password = Profile.Password.substring(0, Profile.Password.length-1);
					delete key
					}
					
				});
				$(document).keyup(function(e){
					if(Profile.storePasswordLogIn == true) {
						clearScreenRect((X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size));
						X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
						Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
						drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
						ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
						drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
						drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
						ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
						ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
						delete key
					}
				});
			return str
			delete x, y, str
		}

		function getUserNameSignIn(str, x, y){
			$(document).keydown(function(e){
					if(Profile.storeUserNameSignIn == true) {
					key = e.which || e.keyCode;
					if(key >= 48 && key <= 105) {
						if(Profile.UserName != "Username")
							Profile.UserName = Profile.UserName + String.fromCharCode(key);
						else
							Profile.UserName = String.fromCharCode(key)
					}
					else if(key == 32) {
							Profile.UserName = Profile.UserName = Profile.UserName + " "
						}
					else if(key == 8)
						Profile.UserName = Profile.UserName.substring(0, Profile.UserName.length-1);
					delete key, e
					}
					
				});
				$(document).keyup(function(e){
					if(Profile.storeUserNameSignIn == true) {
						ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
						Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
						size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
						X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (size_))/2
						
						//mouseInRect(X_ + 35 / 368 * size_, Y_ + 57 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_)
			
						drawSignInForm(X_, Y_, size_, size_);
						if(NewAccent == "US English Female")
							AmericanAccent()
						if(NewAccent == "Australian Female")
								AustralianAccent()
						if(NewAccent == "UK English Male")
								BritishAccent()
						drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						
					delete key, e
					}
				});
			
			return str
			delete x, y, str
		}

		function getPasswordSignIn(str, x, y){
			$(document).keydown(function(e){
					if(Profile.storePasswordSignIn == true) {
					key = e.which || e.keyCode;
					if(key >= 48 && key <= 105) {
						if(Profile.Password != "Password")
							Profile.Password = Profile.Password + String.fromCharCode(key);
						else
							Profile.Password = String.fromCharCode(key)
					}
					else if(key == 32) {
							Profile.Password = Profile.Password = Profile.Password + " "
						}
					else if(key == 8)
						Profile.Password = Profile.Password.substring(0, Profile.Password.length-1);
					delete key
					}
					
				});
				$(document).keyup(function(e){
					if(Profile.storePasswordSignIn == true) {
						Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
						size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
						X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (size_))/2
						drawSignInForm(X_, Y_, size_, size_);
						ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
						if(NewAccent == "US English Female")
							AmericanAccent()
						if(NewAccent == "Australian Female")
								AustralianAccent()
						if(NewAccent == "UK English Male")
								BritishAccent()
						drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
						ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						delete key
					}
				});
			return str
			delete x, y, str
		}

		function drawTask(j, i, x, y, width, height) {
			try{
			var frame = Properties.Tasks[j][i].Frame;
			ctx.drawImage(atlasMenuItemTask, frame.x, frame.y, frame.w, frame.h, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
			}
			catch(e){
				console.log("no frame given");
			}
		}

		function drawMenuItemsTasks(j){
			//console.log("drawing tasks")
			//console.log(Task.firstTask)
			pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
			pY =  MenuItem.topSpace;
			t_a_width = 100*0.5;
			t_a_height = 0.5*100*226/152;
			clearMenuItemRect(pX - 10, pY - 10, MenuItem.size + 20, MenuItem.size + 20);
			Task.topSpace = (Screen.height/Math.min(Screen.k_width, Screen.k_height) - 2 * MenuItem.topSpace - 2 * t_a_width - (Task.display) * (55/368*MenuItem.size + 10) + 10) / 2;
			if(Task.firstTask > 0) {
			//top arrow
			ctx.save();
			ctx.translate((pX + MenuItem.size / 2 + 3/4*t_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
			ctx.rotate(Math.PI / 2);
			drawLeftArrow(0, 0, t_a_width, t_a_height)
			ctx.restore();
			}
			
			if(Task.itemsCount[j] >= 0){
				drawTask(j, 0, pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				if(Task.itemsCount[j] >= 1){
					drawTask(j, 1, pX, (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
					if(Task.itemsCount[j] >= 2){
						drawTask(j, 2, pX, (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
						if(Task.itemsCount[j] >= 3){
							drawTask(j, 3, pX, (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
						}
					}
				}
			}
			if(Task.firstTask + Task.display < Task.itemsCount[MenuItem.clicked]) {
			//bottom arrow
			pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
			pY =  MenuItem.topSpace + MenuItem.size;
			ctx.save();
			ctx.translate((pX + MenuItem.size / 2 - 3/4*t_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
			ctx.rotate(-Math.PI / 2);
			drawLeftArrow(0, 0, t_a_width, t_a_height)
			ctx.restore();
			}
			
			
			delete pX, pY;
			delete t_a_width, t_a_height;
			
		}
		function MenuItemClicked(j) {
			//var pronun = new Audio("/client/img/Menu-Items/" + MenuItem.ItemList[j + MenuItem.firstItem]);
			//pronun.play();
			//delete pronun;
			k = -1;
			k1 = -1;
			task_ch = false;
			console.log(MenuItem.clicked)
			setTimeout(function(){
			if(sound_on && !Mode.Exercise) {
				if(MenuItem.chosen != j)
					responsiveVoice.speak(MenuItem.ItemList[j], Profile.Accent);
				MenuItem.chosen = MenuItem.clicked;
				
				MenuItem.audio_played = true;
			}},0.01)
			if(!MenuItem.loadMenuItemsTasks) {
				loadMenuItemsTasks(j);
			}
			else {
				drawMenuItemsTasks(j)
			}
			
		}

		function showLogInForm(){
				//ctx.globalAlpha=0.3;// opacity at 0.5
				//ctx.fillStyle='#D8D8D8';
				//ctx.fillRect(0, MenuItem.starts * Math.min(Screen.k_width, Screen.k_height), MenuItem.width, 0.8 * Screen.height - MenuItem.starts * Math.min(Screen.k_width, Screen.k_height))
				//ctx.fillRect(0, 0, MenuItem.width, Screen.height)
				//ctx.globalAlpha=1;
				
				var iter = 0;
				if(Forms_loaded){
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
					Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
					drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
					drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
					drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
					ctx.fillStyle='#000000';
					ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
					ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
					ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
					pressedUserNameLogIn = 0;
					pressedPasswordLogIn = 0;
					delete X_, Y_
					Mode.MenuItem  = false;
					Mode.Tasks = false;
					Mode.LogIn = true;	
					Mode.SignIn= false;
				}
				else {
					setTimeout(function(){
						showLogInForm();
					}, 1);
				}
		}
		function showSignInForm(){
				//ctx.globalAlpha=0.3;// opacity at 0.5
				//ctx.fillStyle='#D8D8D8';
				//ctx.fillRect(0, 0, MenuItem.width, Screen.height)
				//ctx.globalAlpha=1;
				var iter = 0;
				if(Forms_loaded){
					Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
					size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (size_))/2
					drawSignInForm(X_, Y_, size_, size_);
					BritishAccent()
					drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
					drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
					ctx.fillStyle='#000000';
					ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
					ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
					ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
					pressedUserNameSignIn = 0;
					pressedPasswordSignIn = 0;
					
					delete X_, Y_, size_
					Mode.MenuItem  = false;
					Mode.Tasks = false;
					Mode.LogIn = false;
					Mode.SignIn = true;			
				}
				else {
					setTimeout(function(){
						showSignInForm();
					}, 1);
				}
				
		}

		function UserNameAreaClickedSignIn() {
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			drawSignInForm(X_, Y_, size_, size_);
			ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
			if(NewAccent == "US English Female")
					AmericanAccent()
			if(NewAccent == "Australian Female")
					AustralianAccent()
			if(NewAccent == "UK English Male")
					BritishAccent()
			var input = document.getElementById("hiddenInput");
				input.style.position = "absolute";
				input.style.top =  (Y_ + 57 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
				console.log(X_, Y_);
				input.style.left = (X_ + 35 / 368 * size_) * Math.min(Screen.k_width, Screen.k_height);
				input.style.display = "block";
				//input.style.autofocus = true;
				input.style.height =  36 / 368 * size_* Math.min(Screen.k_width, Screen.k_height);
				input.style.width = 298/ 368 * size_* Math.min(Screen.k_width, Screen.k_height);
				fillRect(X_, Y_, 100, input.style.height);
				console.log(36 / 368 * size_* Math.min(Screen.k_width, Screen.k_height), 298 / 368 * size_* Math.min(Screen.k_width, Screen.k_height));
				console.log(input);
			if(pressedUserNameSignIn != 0)
				ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			else
				Profile.UserName = ""
			if(pressedPasswordSignIn != 0)
				ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			else
				ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			pressedUserNameSignIn = pressedUserNameSignIn + 1;
			drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			if(Profile.storeUserNameSignIn != false && Profile.storeUserNameSignIn != true) {
				Profile.storeUserNameSignIn = true;
				if(Profile.storePasswordSignIn == true)
					Profile.storePasswordSignIn = false;
				getUserNameSignIn(Profile.UserName, X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size + 20 / 202 * MenuItem.size)
			}
			else {
				Profile.storeUserNameSignIn = true;
				if(Profile.storePasswordSignIn == true)
					Profile.storePasswordSignIn = false;
			}
		}

		function UserNameAreaClickedLogIn() {
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			clearScreenRect((X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size));
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
				drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
				ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
				if(pressedUserNameLogIn != 0)
					ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				else
					Profile.UserName = ""
				if(pressedPasswordLogIn != 0)
					ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				else
					ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
					//Profile.Password = ""
				pressedUserNameLogIn = pressedUserNameLogIn + 1;
				drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
				drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
				if(Profile.storeUserNameLogIn != false && Profile.storeUserNameLogIn != true) {
					Profile.storeUserNameLogIn = true;
					if(Profile.storePasswordLogIn == true)
						Profile.storePasswordLogIn = false;
					getUserNameLogIn(Profile.UserName, X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size + 20 / 202 * MenuItem.size)
				}
				else {
					Profile.storeUserNameLogIn = true;
					if(Profile.storePasswordLogIn == true)
						Profile.storePasswordLogIn = false;
				}
		}
		function PasswordAreaClickedLogIn() {
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			clearScreenRect((X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size));
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
				drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
				ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
				if(pressedUserNameLogIn != 0)
					ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				else
					ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
					//Profile.UserName = ""
				if(pressedPasswordLogIn != 0)
					ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				else
					Profile.Password = ""
				pressedPasswordLogIn = pressedPasswordLogIn + 1;
				drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
				drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
				console.log("password area clicked", Profile.storeUserNameLogIn, Profile.storePasswordLogIn)
				if(Profile.storePasswordLogIn != false && Profile.storePasswordLogIn != true) {
					Profile.storePasswordLogIn = true;
					getPasswordLogIn(Profile.Password, X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size + 20 / 202 * MenuItem.size)
					if(Profile.storeUserNameLogIn == true)
						Profile.storeUserNameLogIn = false;
				}
				else {
					Profile.storePasswordLogIn = true;
					if(Profile.storeUserNameLogIn == true)
						Profile.storeUserNameLogIn = false;
				}
		}
		function PasswordAreaClickedSignIn() {
				Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
				size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (size_))/2
				drawSignInForm(X_, Y_, size_, size_);
				if(NewAccent == "US English Female")
					AmericanAccent()
				if(NewAccent == "Australian Female")
					AustralianAccent()
				if(NewAccent == "UK English Male")
					BritishAccent()
				drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
				//ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				//ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			
				if(pressedUserNameSignIn != 0)
					ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				else
					ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				if(pressedPasswordSignIn != 0)
					ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				else
					Profile.Password = ""
				pressedPasswordSignIn = pressedPasswordSignIn + 1;
				console.log("password area clicked", Profile.storeUserNameLogIn, Profile.storePasswordLogIn)
				if(Profile.storePasswordSignIn != false && Profile.storePasswordSignIn != true) {
					Profile.storePasswordSignIn = true;
					getPasswordSignIn(Profile.Password, X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size + 20 / 202 * MenuItem.size)
					if(Profile.storeUserNameSignIn == true)
						Profile.storeUserNameSignIn = false;
				}
				else {
					Profile.storePasswordSignIn = true;
					if(Profile.storeUserNameSignIn == true)
						Profile.storeUserNameSignIn = false;
				}
				
		}

		function AmericanAccent() {
			console.log("AmericanAccent")
			drawSignInForm(X_, Y_, size_, size_);
			//drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			//drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			ctx.fillStyle = "#000000"
			fillRect(X_ + (35 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRect(X_ + (35 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRect(X_ + (35 - 4) / 368 * size_, Y_ + 177 / 368 * size_ + (23 + 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRect(X_ + 35 / 368 * size_ + (36 + 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			//fillRect(X_ + 35 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)
			NewAccent = "US English Female"
		}
		function AustralianAccent() {
			//fillRect(X_ + 80 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)
			drawSignInForm(X_, Y_, size_, size_);
			//drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			//drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			ctx.fillStyle = "#000000"
			fillRect(X_ + (80 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRect(X_ + (80 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRect(X_ + (80 - 4) / 368 * size_, Y_ + 177 / 368 * size_ + (23 + 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRect(X_ + 80 / 368 * size_ + (36 + 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			NewAccent = "Australian Female"
		}
		function BritishAccent() {
			drawSignInForm(X_, Y_, size_, size_);
			//drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			//drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			//fillRect(X_ + 124 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)
			ctx.fillStyle = "#000000"
			fillRect(X_ + (124 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRect(X_ + (124 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRect(X_ + (124 - 4) / 368 * size_, Y_ + 177 / 368 * size_ + (23 + 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRect(X_ + 124 / 368 * size_ + (36 + 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			NewAccent = "UK English Male"
		}
		function clearSelectedAccent() {
			fillRectGreen(X_ + (35 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRectGreen(X_ + (35 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRectGreen(X_ + (35 - 4) / 368 * size_, Y_ + 177 / 368 * size_ + (23 + 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRectGreen(X_ + 35 / 368 * size_ + (36 + 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRectGreen(X_ + (80 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRectGreen(X_ + (80 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRectGreen(X_ + (80 - 4) / 368 * size_, Y_ + 177 / 368 * size_ + (23 + 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRectGreen(X_ + 80 / 368 * size_ + (36 + 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRectGreen(X_ + (124 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			fillRectGreen(X_ + (124 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRectGreen(X_ + (124 - 4) / 368 * size_, Y_ + 177 / 368 * size_ + (23 + 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
			fillRectGreen(X_ + 124 / 368 * size_ + (36 + 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
			
			
		}
		video.addEventListener('loadstart', function() {
			console.log("loading!")
			var $this = this; //cache
			if (Mode.Exercise && Mode.AlphabetSong) {
				pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2
				drawPlayerButtons()
				pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2
				ctx.drawImage(Thumbnails['abc song'], pX * Math.min(Screen.k_width, Screen.k_height) +  300 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)) - 300 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
				//ctx.fillRect(pX * Math.min(Screen.k_width, Screen.k_height) + 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)) - 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
				//ctx.fillRect(pX * Math.min(Screen.k_width, Screen.k_height) + 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)) - 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 10000);console.log(Thumbnails['abc song'])
			}
		}, 0);
		video.addEventListener('play', function() {
		var $this = this; //cache
		(function loop() {
			if (!$this.paused && !$this.ended) {
				if(!sound_on)
					video.muted = true;
				else
					video.muted = false;
				var videoScr = $this.src
				if($this.src.indexOf("/client/img/Alphabet/abc%20song.mp4") !== -1) {
					pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2
					ctx.drawImage($this, pX * Math.min(Screen.k_width, Screen.k_height), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
					ctx.clearRect(pX * Math.min(Screen.k_width, Screen.k_height), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 300 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
					ctx.clearRect(pX * Math.min(Screen.k_width, Screen.k_height) + 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)) - 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
					//buttons were here
					setTimeout(loop, 1000 / 30); // drawing at 30fps
				}
				drawPlayerButtons();
		  }
		})();
		}, 0);
		function AlphabetSongPlay() {
			video.src = "/client/img/Alphabet/abc song.mp4"
			console.log("play!")
			if(!sound_on)
				video.muted = true;
			video.play()
		}
		function AlphabetSongEx() {
			AlphabetSongPlay()
			
		}
		function drawPlayerButtons() {
			//buttons
					pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
					pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
					//size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) / 2  - 40 - 10 * 4) / 5
					size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
					if(!play_btn_ch)
						drawPlayButton(pX + 20, pY, size_btn, size_btn)
					else
						drawPlayButton(pX + 20- 3, pY - 3, size_btn + 6, size_btn + 6)
					if(!pause_btn_ch)
						drawPauseButton(pX + 20, pY + size_btn + 10, size_btn, size_btn)
					else
						drawPauseButton(pX + 20 - 3, pY + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
					if(!stop_btn_ch)
						drawStopButton(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn)
					else
						drawStopButton(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
					if(!restart_btn_ch)
						drawRestartButton(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)
					else
						drawRestartButton(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
					if(!exit_btn_ch)
						drawExitButton(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)
					else
						drawExitButton(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
					//console.log(0.8 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - (pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn), pY - MenuItem.starts)
					delete size_btn
		}
		/*function drawVideoFrame() {
			if(video.currentTime == 0) {
				video = document.getElementById('video')
				pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2
				//ctx.fillRect(pX * Math.min(Screen.k_width, Screen.k_height), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
				//ctx.drawImage(video, pX * Math.min(Screen.k_width, Screen.k_height), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
				//ctx.drawImage(video, pX * Math.min(Screen.k_width, Screen.k_height), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
				//ctx.fillRect(video, pX * Math.min(Screen.k_width, Screen.k_height), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
			}
			else {
				setTimeout(function(){
					drawVideoFrame();
				}, 1);
			}
		}*/
		function drawTestAnimals() {
			console.log("drawTestAnimals");
			var animal_height = 400;
			var word_width = (Screen.width - (Task.test.length + 1) * 20)/ 5;
			var word_height = 80;
			var edge = 0;
			var center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
			var top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + animal_height + 20 + word_height + 20;
			//console.log(Task.toTest.length);
			ctx.drawImage(atlasAnimals,Task.asked.frame.x, Task.asked.frame.y, Task.asked.frame.w, Task.asked.frame.h, (Screen.width - Task.asked.frame.w*animal_height/Task.asked.frame.h*Math.min(Screen.k_width, Screen.k_height)) / 2, Screen.height * 0.2 + (20 + 20) * Math.min(Screen.k_width, Screen.k_height), Task.asked.frame.w*animal_height/Task.asked.frame.h*Math.min(Screen.k_width, Screen.k_height), animal_height*Math.min(Screen.k_width, Screen.k_height));
				
			for(var i = 0; i < Task.test.length; i++) {
				var wordFrame = (Task.test.concat())[i].Wordsframe;
				//console.log(wordFrame);
				//console.log("Task.toTest", Task.toTest);
				if(k3 != i)
					ctx.drawImage(atlasAnimalsWords, wordFrame.x, wordFrame.y, wordFrame.w, wordFrame.h,(edge + center/2-wordFrame.w*word_height/wordFrame.h/2)*Math.min(Screen.k_width, Screen.k_height), top*Math.min(Screen.k_width, Screen.k_height), wordFrame.w*word_height/wordFrame.h*Math.min(Screen.k_width, Screen.k_height), word_height*Math.min(Screen.k_width, Screen.k_height));
				if(i % 2){
					top = top + word_height + 30;
					edge = 0;
				}
				else edge = center;
			}
		}
		MainCanvas.addEventListener("mouseup", checkClick);
		function checkClick(mouseEvent){
			if(Mode.Tasks && MenuItem.clicked > -1) {
				//top arrow has been clicked
				t_a_height = 100*0.5;
				t_a_width = 0.5*100*226/152;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2;
				pY =  MenuItem.topSpace;
				//if(mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + t_a_width)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + t_a_height)*Math.min(Screen.k_width, Screen.k_height)){
				if(mouseInRect(pX, pY, t_a_width, t_a_height)){	
					Task.a_clicked = true;
					if(Task.firstTask > 0) {
						topArrowClicked()
					}
				}			
				//bottom arrow has been clicked
				b_a_height = 100*0.5;
				b_a_width = 0.5*100*226/152;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2;
				pY = Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height;
				
				if(mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + b_a_width)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + b_a_height)*Math.min(Screen.k_width, Screen.k_height)){
					Task.a_clicked = true;
					if(Task.firstTask + Task.display < Task.itemsCount[MenuItem.clicked]) {
						bottomArrowClicked()
					}
				}
			}
			if(Mode.MenuItem && MenuItem.clicked > -1) {
				//check background click
				//not top & bottom arrows have been clicked
				//top arrow has been clicked
				t_a_height = 100*0.5;
				t_a_width = 0.5*100*226/152;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2;
				pY =  MenuItem.topSpace;
				if(Mode.Tasks && mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + t_a_width)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + t_a_height)*Math.min(Screen.k_width, Screen.k_height)){
					
				}
				else {
					b_a_height = 100*0.5;
					b_a_width = 0.5*100*226/152;
					pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2;
					pY = Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height;
					if(Mode.Tasks && mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + b_a_width)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + b_a_height)*Math.min(Screen.k_width, Screen.k_height)){
						
					}
					//background has been clicked
					else if(((Mode.Tasks && !(mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2 * 5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + 150*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + 3 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2 * 5) / 3)* Math.min(Screen.k_width, Screen.k_height))) && !(mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + t_a_width)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + t_a_height)*Math.min(Screen.k_width, Screen.k_height)))&&!(mouseX >= pX*Math.min(Screen.k_width, Screen.k_height)&& mouseX <= (pX + b_a_width)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (pY)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (pY + b_a_height)*Math.min(Screen.k_width, Screen.k_height))) {
						X_l = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
						
						//здесь не работает not working properly
						console.log("background")
						//Task.a_clicked = false;
						//task_ch = false;
						
						if(!mouseInRect(X_l, MenuItem.topSpace, MenuItem.size, MenuItem.size)) {
							pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
							pY =  MenuItem.topSpace;
							pW = MenuItem.size;
							pH = MenuItem.size;
							MenuItem.chosen = MenuItem.clicked;
							clearMenuItemRect(pX, pY, pW, pH);
							console.log("drawing after clicked")
							DrawMenuItem(MenuItem.clicked, MenuItem.clicked - MenuItem.firstItem, pX, pY, pW, pH);
							MenuItem.clicked = -1;
							console.log(MenuItem.clicked)
							Mode.Tasks = false;
							
						}
						else {
							//MenuItem.clicked = MenuItem.chosen;
						}
						
						
					}	
				}
			}
			//MenuItem has been clicked
			var j = 0;
			if(Mode.MenuItem && MenuItem.clicked == -1) {
				while (j < MenuItem.display)  {
					
					X_l = 2 * MenuItem.leftSpace + 100*koef + 68 * (j + 1) + MenuItem.size * j - 68;
					X_r = 2 * MenuItem.leftSpace + 100*koef + 68 * (j + 1) + MenuItem.size * (j + 1) - 68;
					if(mouseY >= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.size + MenuItem.topSpace)  && (mouseX >= Math.min(Screen.k_width, Screen.k_height) * X_l && mouseX <= Math.min(Screen.k_width, Screen.k_height) * X_r)){
						console.log("taskpressed")
						//it was here
						Mode.Tasks = false;
						Task.firstTask = 0;
						MenuItem.audio_played = false;
						MenuItem.clicked = j + MenuItem.firstItem;
						setTimeout(function(){
							Mode.Tasks = true;
							Mode.Exercise = false;
						}, 5);
						
						MenuItemClicked(MenuItem.clicked);
						j = MenuItem.display + 1;		
						
						
					}
					else {
						j++;
					}
				}
			}
			
			//left arrow has been clicked
			if(Mode.MenuItem && MenuItem.firstItem >= 0) {
				if (mouseX >= Math.min(Screen.k_width, Screen.k_height) * MenuItem.leftSpace && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.leftSpace + koef*100) && mouseY >=  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 -  koef*100*226/152/ 2 ) && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 -  koef*100*226/152/ 2 + koef*100*226/152) ) {	
					leftArrowClicked();
				}
			}
			//right arrow has been clicked
			r_a_height = koef*100*226/152;
			r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
			r_a_width = koef*100;
			r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
			if(Mode.MenuItem && MenuItem.firstItem + MenuItem.display < MenuItem.itemsCount){
				if (mouseX >= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef) && mouseX <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - 100*koef + koef*100) && mouseY >=  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2)  && mouseY <= Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2 + koef*100*226/152)) {	
					rightArrowClicked();
				}
			}
			
			
			//Sound button is clicked
			if(!Mode.LogIn && !Mode.SignIn && mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + (Profile.size_btn - 2 * 5) / 3)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228 + 150*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + 3 + Profile.size_btn*75/228 + 5 + (Profile.size_btn - 2 * 5) / 3)* Math.min(Screen.k_width, Screen.k_height)) {
				fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + 3 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
				if(sound_on) {
					drawSoundOffButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
					sound_on = false;
				}
				else {
					drawSoundOnButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5 - 2, (Profile.size_btn - 2*5) / 3 + 4, (Profile.size_btn - 2*5) / 3 + 4);
					sound_on = true;
				}
				
			}
			//Login button has been clicked
			if(!Profile.LoggedIn && !Mode.SignIn && !Mode.LogIn && mouseX >= ((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= (20) * Math.min(Screen.k_width, Screen.k_height) && mouseY <= (20 + Profile.size_btn*75/228) * Math.min(Screen.k_width, Screen.k_height)) {
				if(Forms_loaded == false)
					loadForms()
				Profile.UserName = "Username"
				Profile.Password = "Password"
				//delete Profile.storePasswordLogIn;
				//delete Profile.storeUserNameLogIn;
				if(Profile.storeUserNameLogIn == true)
					Profile.storeUserNameLogIn = false;
				if(Profile.storePasswordLogIn == true)
					Profile.storePasswordLogIn = false;
				showLogInForm()
				
			}
			//Sign Up button has been clicked
			if(!Profile.LoggedIn && !Mode.LogIn && !Mode.LogIn && mouseX >= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= ((20 + 5) + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= ((20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
				if(Forms_loaded == false)
					loadForms()
				showSignInForm()
				Profile.UserName = "Username"
				Profile.Password = "Password"
			}
			delete X_l, X_r, j;
			if(Mode.LogIn && mouseInRect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size *4/3) / 205 * 368)/2, 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size * 4/3) / 2, (MenuItem.size *4/3) / 205 * 368, MenuItem.size * 4/3)) {
				//log in area clicked
			}
					
			if(Mode.SignIn && mouseInRect((Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size *3/2))/2, 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size * 3/2) / 2, (MenuItem.size *6/4), MenuItem.size * 6/4)) {
				console.log("sign in area clicked")
				//console.log(mouseX - ((Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size *3/2))/2) * Math.min(Screen.k_width, Screen.k_height))
				//ctx.fillRect(100, 150, 100, 100)
				
			}
			//cancel button has been clicked during login mode
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			if(Mode.LogIn && mouseInRect(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)) {
				Mode.LogIn = false;
				Mode.MenuItem = true;
				if(Profile.storeUserNameLogIn == true)
					Profile.storeUserNameLogIn = false;
				if(Profile.storePasswordLogIn == true)
					Profile.storePasswordLogIn = false;
				clearScreenRect(0, 0, Screen.width/ Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
				respondCanvas()
				
			}
			//username area has been clicked LogIn Mode
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			if(Mode.LogIn && mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size)){
				UserNameAreaClickedLogIn()
			}
			
			//password area has been clicked LogIn Mode
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			if(Mode.LogIn && mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 115 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size)){
				PasswordAreaClickedLogIn()
			}
			//login button clicked LogIn Mode
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
			Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
			if(Mode.LogIn && mouseInRect(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202))
			{
				if(checkProfileData()) {
					var User = {};
					User.UserName = Profile.UserName;
					User.Password = Profile.Password;
					socket.emit('auth', {
						User: User
					})
					socket.on('auth', function(data){
						if(data.res) {
							console.log("correct data")
							Profile.LoggedIn = true;
							Mode.LogIn = false;
							Mode.MenuItem = true;
							Profile.storeUserNameLogIn = false;
							Profile.storePasswordLogIn = false;
							console.log(Profile.UserName, Profile.Password)
							clearScreenRect(0, 0, Screen.width/ Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
							respondCanvas()
						}
						else {
							console.log("wrong data");
						}
					});
				}
				else {
					console.log("fill all the information");
				}
			}
			//background has been clicked during LogIn Mode
			if(Mode.LogIn && !mouseInRect(X_ + 47 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4)&& !(mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 115 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size) || mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size))) {
				//fillRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 115 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size);
				//fillRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size)
				//fillRect(X_ + 47 - 2, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40 - 2, (MenuItem.size) / 202 * 156 + 4, MenuItem.size * 37 / 202 + 4)
				console.log("background")
				if(Profile.storeUserNameLogIn == true)
					Profile.storeUserNameLogIn = false;
				if(Profile.storePasswordLogIn == true)
					Profile.storePasswordLogIn = false;
			}
			
			//username area clicked SignIn Mode
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if(Mode.SignIn && mouseInRect(X_ + 35 / 368 * size_, Y_ + 57 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_)) {
				UserNameAreaClickedSignIn()
				//fillRect(X_ + 35 / 368 * size_, Y_ + 57 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_)
				
			}
			//password area clicked SignIn Mode
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if(Mode.SignIn && mouseInRect(X_ + 35 / 368 * size_, Y_ + 115 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_)) {
				PasswordAreaClickedSignIn()
				//fillRect(X_ + 35 / 368 * size_, Y_ + 115 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_)
			}
			if(Mode.SignIn && !(mouseInRect(X_ + 35 / 368 * size_, Y_ + 57 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_) || mouseInRect(X_ + 35 / 368 * size_, Y_ + 115 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_))) {
				console.log("background")
				if(Profile.storeUserNameSignIn == true)
					Profile.storeUserNameSignIn = false;
				if(Profile.storePasswordSignIn == true)
					Profile.storePasswordSignIn = false;
			}
			
			//flag area clicked SignIn Mode
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			//American accent
			if(Mode.SignIn && mouseInRect(X_ + 35 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23/ 368 * size_)) {
				AmericanAccent()
				ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
					
			}
			//Australian accent
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if(Mode.SignIn && mouseInRect(X_ + 80 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)) {
				AustralianAccent()
				ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				
			}
			//British accent
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if(Mode.SignIn && mouseInRect(X_ + 124 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)) {
				BritishAccent()
				ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				
			}
			//Cancel button clicked SignIn Mode
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if (Mode.SignIn && mouseInRect(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)) {
				Mode.SignIn = false;
				Mode.MenuItem = true;
				NewAccent = "UK English Male";
				
				if(Profile.storeUserNameSignIn == true)
					Profile.storeUserNameSignIn = false;
				if(Profile.storePasswordSignIn == true)
					Profile.storePasswordSignIn = false;
				clearScreenRect(0, 0, Screen.width/ Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
				respondCanvas()
			}
			
			//Signin button clicked SignIn mode
			Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
			size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
			X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
			if (Mode.SignIn && mouseInRect(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)) {
				if(checkProfileData()){
					var User = {};
					User.UserName = Profile.UserName;
					User.Password = Profile.Password;
					User.Accent = NewAccent;
					socket.emit('newUser', {
						User: Profile
					})
					socket.on('newUser', function(data){
						console.log(data);
						console.log("new user:", data.res);
						
						if(data.res) {
							Profile.LoggedIn = true;
							Mode.SignIn = false;
							Mode.MenuItem = true;
							Profile.storeUserNameSignIn = false;
							Profile.storePasswordSignIn = false;
							Profile.Accent = NewAccent;
							console.log(Profile.Accent);
							console.log(Profile.UserName, Profile.Password, Profile.Accent)
							clearScreenRect(0, 0, Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
							respondCanvas()
						}
						else {
							ctx.fillText("this username is taken", (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
						}
						
					})
				}
				else {
					ctx.fillText("fill all the information", (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				}
			}
			function selectAnimal(){
				console.log("selectAnimal");
				console.log("new animal");
				var i = randomInteger(0, Task.toTest.length - 1);
				console.log("random", i);
				var animal = Task.toTest.concat()[i];
				Task.asked = Task.toTest.concat()[i];
				console.log("i", i, animal);
				ctx.fillStyle="#000000";
				size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5;
				drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn);
				drawTestAnimals();
			}
			function drawAnimals(){
				console.log("drawAnimals");
				Task.test = getRandomArray(Animals, [], 6);
				console.log("test", Task.test);
				Task.toTest = Task.test.slice(0);
				console.log("Task.toTest", Task.toTest);
				/*var i;
				for (i = 0; i < Task.test.length; i++) {
					Task.toTest[i] = {};
					Task.toTest[i].Accent = Task.test[i].Accent;
					Task.toTest[i].SS_Name = Task.test[i].SS_Name;
					Task.toTest[i].Word = Task.test[i].Word;
					Task.toTest[i].Wordsframe = Task.test[i].Wordsframe;
					Task.toTest[i].frame = Task.test[i].frame;
				}*/
				//console.log("test", Task.test, Animals.length - 1);
				var animal_height = 400;
				/*var broadest_animal = [];
				
				for(var i = 0; i < test.length; i++) {
					broadest_animal[i] = {};
					broadest_animal[i].x = test[i].frame.x;
					broadest_animal[i].y = test[i].frame.y;
					broadest_animal[i].w = test[i].frame.w;
					broadest_animal[i].h = test[i].frame.h;
					broadest_animal[i].w = broadest_animal[i].w*animal_height/broadest_animal[i].h;
				}
				
				broadest_animal = broadest_animal.sort(function(a, b){
					return a.w - b.w;
				})[broadest_animal.length - 1];
				console.log("broadest_animal", broadest_animal);
				var frame_width = broadest_animal.w + 50;
				*/
				selectAnimal();
				
			}
			function checkAnswer(answer_i) {
				console.log("checkAnswer");
				console.log("before", Task.toTest, Task.toTest.length);
							
				console.log(Task.test[answer_i].Word, Task.asked.Word, Task.test[answer_i].Word == Task.asked.Word);
				if(Task.test[answer_i].Word == Task.asked.Word) {
					return true;
					//selectAnimal();
				}
				else {
					//console.log("wrong answer");
					return false;
					//drawTestAnimals();
				}
			}
			function checkloadedAnimals() {
				if(Task.loadedAnimalsWords && Task.loadedAnimals) {
						console.log("animals are loaded")
						drawAnimals();
				}
				else {setTimeout(function(){
						console.log("animals are not loaded yet");
						console.log("waiting to load");
						checkloadedAnimals();
					}, 200)
				}
			}
			function showTask(TaskName) {
				console.log(TaskName);
				switch(TaskName) {
					case 'Alphabet song':
						Mode.AlphabetSong = true;
						name = 'abc song';
						if(!Thumbnails[name]) {
							loadThumbnail(name);
						}
						AlphabetSongEx();	
						break;
					case 'Match the animals with their names':
						Mode.MatchTheAnimalsWithTheirNames = true;
						if(!Task.loadedAnimalsWords)
							loadAnimalsWords();
						if(!Task.loadedAnimals)
							loadAnimals();
						try{
							console.log(Animals);
						}
						catch(e){
							console.log("getting Animals for the first time");
							socket.emit('getTask', {
								TaskName: TaskName
							})
							
						}
						socket.on('getTask', function(data){
								Animals = data.Content;
						})
						if(Task.loadedAnimalsWords && Task.loadedAnimals) {
							console.log("animals are loaded");
							drawAnimals();
						}
						else {
							checkloadedAnimals();							
						}
						size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5;
						drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn);
						break;
				}
			}
			//Alphabet song Task has been clicked
			//drawTask(j, 0, pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
			/*j = MenuItem.clicked;
			if(Mode.Tasks && Task.firstTask == 0 && j == 0) {
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace;
				t_a_width = 100*0.5;
				t_a_height = 0.5*100*226/152;
				if(Mode.Tasks && Task.firstTask == 0 && mouseInRect(pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)) {
					Mode.Exercise = true;
					clearRect(0, MenuItem.starts, Screen.width/ Math.min(Screen.k_width, Screen.k_height), 0.8 * Screen.height / Math.min(Screen.k_width, Screen.k_height))
					Mode.Tasks = false;
					Mode.MenuItem = false;
					console.log("Mode.Exercise", Mode.Exercise)
					Mode.AlphabetSong = true;
					name = 'abc song';
					if(!Thumbnails[name]) {
						loadThumbnail(name);
					}
					AlphabetSongEx()
				}
			}*/
			
			//AlphabetSong play button has been clicked
			//pause button has been clicked
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			
			if (Mode.AlphabetSong && !Mode.SignIn && !Mode.LogIn && mouseInRect(pX + 20, pY + size_btn + 10, size_btn, size_btn)) {
				video.pause()
			}
			//play button has been clicked
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			
			if (Mode.AlphabetSong && !Mode.SignIn && !Mode.LogIn && mouseInRect(pX + 20, pY, size_btn, size_btn)) {
				video.play()
			}
			//stop button has been clicked
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			if (Mode.AlphabetSong && !Mode.SignIn && !Mode.LogIn && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
				console.log("stop button has been clicked")
				console.log(video.currentTime);
				video.load();
				console.log(video.currentTime);
							
				//0 кадр
			}
			
			//restart button has been clicked
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			if (Mode.AlphabetSong && !Mode.SignIn && !Mode.LogIn && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
				ctx.clearRect(0, 0.2 * Screen.height, Screen.width, 0.6 * Screen.height)
				video.load()
				video.play()
			}
			//exit button has been clicked
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
			pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			if (Mode.AlphabetSong && !Mode.SignIn && !Mode.LogIn && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
				console.log("exit")
				Mode.MenuItem = true;
				Mode.Exercise = false;
				Mode.AlphabetSong = false;
				video.load()
				ctx.clearRect(0, 0.2 * Screen.height, Screen.width, 0.6 * Screen.height)
				MenuItem.clicked = -1;
				MenuItem.chosen = MenuItem.clicked;
				initMenu();
				delete mouseX
				delete mouseY
			}
			
			//task has been clicked
			if(Mode.Tasks) {
				var j = MenuItem.clicked;
				var i = 0;
				console.log("Task.itemsCount[j]", Task.itemsCount[j])
					
				while (i < Task.display)  {
					var pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
					var pY =  MenuItem.topSpace;
					var t_a_width = 100*0.5;
					var t_a_height = 0.5*100*226/152;
					//console.log("Task.firstTask", Task.firstTask, "i", i, "j", j);
					//fillRect(pX, (pY + (55/368*MenuItem.size + 10) * i + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size);
					console.log("Task.itemsCount[j]", Task.itemsCount[j])
					if(mouseInRect(pX, (pY + (55/368*MenuItem.size + 10) * i + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)){
						console.log(i, "task was clicked");
						Mode.Exercise = true;
						clearRect(0, MenuItem.starts, Screen.width/ Math.min(Screen.k_width, Screen.k_height), 0.8 * Screen.height / Math.min(Screen.k_width, Screen.k_height))
						Mode.Tasks = false;
						Mode.MenuItem = false;
						//console.log(Properties.Tasks);
						showTask(Properties.Tasks[j][i].Name);						
						i  = Task.display + 1;
					}
					else {
						i++;
					}
				}
			}
			//MatchTheAnimalsWithTheirNames exit button has been clicked
			size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
			if (Mode.MatchTheAnimalsWithTheirNames && !Mode.SignIn && !Mode.LogIn && mouseInRect(Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn)) {
				console.log("exit")
				Mode.MenuItem = true;
				Mode.Exercise = false;
				Mode.MatchTheAnimalsWithTheirNames = false;
				ctx.clearRect(0, 0.2 * Screen.height, Screen.width, 0.6 * Screen.height)
				MenuItem.clicked = -1;
				MenuItem.chosen = MenuItem.clicked;
				initMenu();
				delete mouseX
				delete mouseY
			}
			//MatchTheAnimalsWithTheirNames word has been clicked
			if (Mode.MatchTheAnimalsWithTheirNames && !Mode.SignIn && !Mode.LogIn) {
				Array = [];
				var animal_height = 400;
				var word_width = (Screen.width - (Task.test.length + 1) * 20)/ 5;
				var word_height = 80;
				var edge = 0;
				var center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
				var top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + animal_height + 20 + word_height + 20;
				
				if(k3 != -1) {
					ctx.clearRect(0, 0.2 * Screen.height, Screen.width, Screen.height);
					size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5;
					drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn);
					console.log("time to check answer");
					//fillRect((Screen.width /Math.min(Screen.k_width, Screen.k_height) - Task.asked.frame.w*animal_height/Task.asked.frame.h) / 2, Screen.height * 0.2/ Math.min(Screen.k_width, Screen.k_height) + (20 + 20), Task.asked.frame.w*animal_height/Task.asked.frame.h, animal_height)
					ctx.fillRect(mouseX, mouseY, 10, 10);
					if(mouseInRect((Screen.width /Math.min(Screen.k_width, Screen.k_height) - Task.asked.frame.w*animal_height/Task.asked.frame.h) / 2, Screen.height * 0.2/ Math.min(Screen.k_width, Screen.k_height) + (20 + 20), Task.asked.frame.w*animal_height/Task.asked.frame.h, animal_height)) {
						var correct = checkAnswer(k3);
						if(correct){
							console.log("before", Task.toTest, Task.toTest.length);
							console.log("correct answer");
							console.log("answer", k3, Task.test[k3]);
							Task.toTest.splice(Task.toTest.indexOf((Task.test.concat())[k3]), 1);
							selectAnimal();
							k3 = -1;
						}
						else {
							console.log("wrong answer");
							console.log("Task.toTest", Task.toTest, Task.toTest.length);
							console.log("answer", k3);
							k3 = -1;
							drawTestAnimals();
						}
					}
					else {
						k3 = -1;
						drawTestAnimals();
						
					}
					
					
				}
				
				for(var i = 0; i < Task.test.length; i++) {
					var wordFrame = (Task.test.concat())[i].Wordsframe;
					Array[i] = {};
					Array[i].x = (edge + center/2-wordFrame.w*word_height/wordFrame.h/2);
					Array[i].y = top;
					Array[i].w = wordFrame.w*word_height/wordFrame.h;
					Array[i].h = word_height;
					if(i % 2){
						top = top + word_height + 30;
						edge = 0;
					}
					else edge = center;
				}
				var i = checkPoint({x:mouseX, y:mouseY}, Array);
				if(i < Array.length) {
					responsiveVoice.speak(Task.test[i].Word, Profile.Accent);
				}
				else {
					ctx.clearRect(0, 0.2 * Screen.height, Screen.width, Screen.height);
					size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5;
					drawExitButton(Screen.width / Math.min(Screen.k_width, Screen.k_height) - 20 - size_btn, 0.2 * Screen.height / Math.min(Screen.k_width, Screen.k_height) + 20, size_btn, size_btn);
					k3 = -1;
					//console.log("let it go");
					drawTestAnimals();	
					
				}				
			}
		}
		MainCanvas.addEventListener("mousedown", MouseDown);
		//finished here
		function MouseDown(mouseEvent){
			if (Mode.MatchTheAnimalsWithTheirNames && !Mode.SignIn && !Mode.LogIn) {
				Array = [];
				var animal_height = 400;
				var word_width = (Screen.width - (Task.test.length + 1) * 20)/ 5;
				var word_height = 80;
				var edge = 0;
				var center = Screen.width / Math.min(Screen.k_width, Screen.k_height) / 2;
				var top = Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) + animal_height + 20 + word_height + 20;
				for(var i = 0; i < Task.test.length; i++) {
					var wordFrame = (Task.test.concat())[i].Wordsframe;
					Array[i] = {};
					Array[i].x = (edge + center/2-wordFrame.w*word_height/wordFrame.h/2);
					Array[i].y = top;
					Array[i].w = wordFrame.w*word_height/wordFrame.h;
					Array[i].h = word_height;
					if(i % 2){
						top = top + word_height + 30;
						edge = 0;
					}
					else edge = center;
				}
				console.log("Task.toTest", Task.toTest, Task.toTest.length);
							
				var i = checkPoint({x:mouseX, y:mouseY}, Array);
				if(i < Array.length) {
					k3 = i;
					
					//console.log("pressed", k3, "word", Task.test[k3]);
					Pressed.x = mouseX;
					Pressed.y = mouseY;
				}
				else {
					k3 = -1;
					
					console.log("mouseup");
					delete Pressed.x;
					delete Pressed.y;
				}
			}
		}



	
	var Properties = {};
	Properties.Topics = [];
	function getProperties() {
		socket.on('getProperties', function(data){
			console.log("getting data", data);
			Properties.Topics = data.topics;
			Properties.Tasks = data.tasks;
			
			/*if(!Properties.Topics.length || !Properties.Tasks.length) {
				console.log("not yet:(");
					getProperties();
				
				
			}
			else*/ 
			if(Properties.Tasks.length && Properties.Topics.length) {
				console.log("respondCanvas");
				//console.log("Properties", Properties);
				respondCanvas();
				MenuItem.ItemList = [];
				for (i = 0; i < MenuItem.itemsCount; i++) {
					MenuItem.ItemList[i] = Properties.Topics[i].Name;// - ".png";
				}
				Task.itemsCount = [];
				MenuItem.itemsCount = (Properties.Topics).length;
				for (q = 0; q < MenuItem.itemsCount; q++) {
					try{
						Task.itemsCount[q] = Properties.Tasks[q].length;
					}
					catch(e){
						Task.itemsCount[q] = 0;
					}
				}
				//console.log("MenuItem.ItemList", MenuItem.ItemList);
			}
		})
	}
	getProperties();
	/*function getProperties() {
		socket.on('getProperties', function(data){
			Properties.Topics = data.topics;
			Properties.Tasks = data.tasks;
			//console.log("Topics", Properties.Topics);
			
			//console.log("Tasks", Properties.Tasks);
			//Task.itemsCount = [5, 5, 5, 0, 0];
		})
	}
	getProperties();
	var propertiesLoaded = false;
	checkProperties();
	function checkProperties() {
		if(Properties.Topics != []) {
			propertiesLoaded = true;
			responsiveVoice.OnVoiceReady = function() {
				var topics = Properties.Topics;
				console.log("length", topics.length);
				console.log("length", topics.length);
				respondCanvas();
			};
		}
		else if(!propertiesLoaded) {
			setTimeout(function(){
				//getProperties();
				checkProperties();
			}, 500);
		}
	}*/
	
});
})();
