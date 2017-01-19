(function(){
	$(document).ready(function(){
	Screen.ctx = document.getElementById("MainCanvas").getContext("2d");
	var video = document.getElementById('video');
		
	Mode = {};
	Mode.MenuItem  = true;
	Mode.Tasks = false;
	Mode.LogIn = false;
	Mode.SignIn = false;
	Mode.Exercise = false;
	Mode.Alphabet = false;
	MenuItem = {};
	MenuItem.height = 600;
	MenuItem.width = 1800;
	MenuItem.itemsCount = 5;
	MenuItem.display = 3;
	MenuItem.firstItem = 0;
	MenuItem.size = 400;
	MenuItem.ItemList = ["alphabet", "animals", "numbers", "sport", "toys"];
	MenuItem.clicked = -1;
	MenuItem.chosen = MenuItem.clicked;
	
	Task = {};
	Task.display = 4;
	Task.itemsCount = [5, 5, 5, 0, 0];
	Task.firstTask = 0;
	
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
	
	
	
	k1 = -1;
		
	function DrawMenuItem(i, j, pX, pY, pW, pH){
		X = 368 * i;
		Y = 0;
		W = 368;
		H = 368;
		Screen.ctx.drawImage(atlasMenuItem, X, Y, W, H, pX * Math.min(Screen.k_width, Screen.k_height), pY * Math.min(Screen.k_width, Screen.k_height), pW * Math.min(Screen.k_width, Screen.k_height), pH * Math.min(Screen.k_width, Screen.k_height));
		//Screen.ctx.fillRect(pX * Math.min(Screen.k_width, Screen.k_height), pY * Math.min(Screen.k_width, Screen.k_height), pW * Math.min(Screen.k_width, Screen.k_height), pH * Math.min(Screen.k_width, Screen.k_height));
		delete X, Y, W, H, pX, pY, pW, pH;
	}
	var atlasMenuItem = new Image();
	function drawMenuItems(){
		i = MenuItem.firstItem; //порядок в спрайте
		j = 0; // первая на экране
		while(j < MenuItem.display){
			if(j != MenuItem.clicked - MenuItem.firstItem){
			pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j + 1) + MenuItem.size * j - 68;
			pY =  MenuItem.topSpace;
			pW = MenuItem.size;
			pH = MenuItem.size;
			DrawMenuItem(i, j, pX, pY, pW, pH);
			}
			i = i + 1;
			j = j + 1;
		}
		delete i, j;
		delete pX, pY, pW, pH;
		delete pX, pY, pW, pH;
	}
	MenuItem.loadedMenuItems;
	function loadMenuItems(){
		// Load image and the json that defines locations
		atlasMenuItem.src = 'client/img/Menu-Items/menu_items.png';
		atlasMenuItem.addEventListener("load", function() {
			MenuItem.loadedMenuItems = true;
			drawMenuItems();
		}, false);	
	}
			
	function clearMenuItemRect(x, y, width, height) {
		Screen.ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height) , width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
		delete x, y, width, height;
	}
	function clearScreenRect(x, y, width, height) {
		Screen.ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height) , width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
		delete x, y, width, height;
	}
	var atlasButtons = new Image();
	
	function drawLeftArrow(x, y, width, height) {
		Screen.ctx.drawImage(atlasButtons, 54, 0, 151, 225, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));
	}
	
	function drawRightArrow(x, y, width, height){
		Screen.ctx.drawImage(atlasButtons, 205, 0, 151, 226, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height));		
	}
	function drawTitle(x, y, width, height){
		Screen.ctx.drawImage(atlasButtons, 0, 1692, 470, 130, x * Math.min(Screen.k_width, Screen.k_height) , y * Math.min(Screen.k_width, Screen.k_height) , width * Math.min(Screen.k_width, Screen.k_height) , height * Math.min(Screen.k_width, Screen.k_height) );			
	}
	
	function drawRewardsButton(x, y, width, height){
		Screen.ctx.drawImage(atlasButtons, 0, 880, 228, 75, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawProgressButton(x, y, width, height){
		Screen.ctx.drawImage(atlasButtons, 228, 730, 228, 75, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function clearRewardsRect(x, y, width, height){
		Screen.ctx.clearRect(x * Math.min(Rewards.k_width, Rewards.k_height), y * Math.min(Rewards.k_width, Rewards.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawPhrasesButton(x, y, width, height){
		Screen.ctx.drawImage(atlasButtons, 228, 805, 228, 75, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawQuizButton(x, y, width, height){
		Screen.ctx.drawImage(atlasButtons, 228, 880, 228, 75, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function clearProfileRect(x, y, width, height){
		Screen.ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height) , y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height) , height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawLogInButton(x, y, width,height){
		Screen.ctx.drawImage(atlasButtons, 0, 805, 228, 75, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawSignInButton(x, y, width,height){
		Screen.ctx.drawImage(atlasButtons, 0, 730, 228, 75, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawSoundOnButton(x, y, width,height){
		Screen.ctx.drawImage(atlasButtons, 168, 226, 168, 168, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawSoundOffButton(x, y, width,height){
		Screen.ctx.drawImage(atlasButtons, 0, 226, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawPlayButton(x, y, width,height){
		Screen.ctx.drawImage(atlasButtons, 336, 226, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawStopButton(x, y, width,height){
		Screen.ctx.drawImage(atlasButtons, 168, 562, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawPauseButton(x, y, width,height){
		Screen.ctx.drawImage(atlasButtons, 336, 562, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawExitButton(x, y, width,height){
		Screen.ctx.drawImage(atlasButtons, 0, 394, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawRestartButton(x, y, width,height){
		Screen.ctx.drawImage(atlasButtons, 0, 562, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawHelpButton(x, y, width,height){
		Screen.ctx.drawImage(atlasButtons, 168, 394, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawInfoButton(x, y, width,height){
		Screen.ctx.drawImage(atlasButtons, 336, 394, 168, 168,  x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawSignInForm(x, y, width, height) {
		drawMenuItems()
		Screen.ctx.drawImage(atlasForms, 0, 239, 368, 368, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawLogInForm(x, y, width, height) {
		Screen.ctx.drawImage(atlasForms, 0, 0, 368, 202, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawLogInCancelButton(x, y, width, height) {
		Screen.ctx.drawImage(atlasForms, 0, 202, 156, 37, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawLogInLogInButton(x, y, width, height) {
		Screen.ctx.drawImage(atlasForms, 156, 202, 156, 37, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawSignInSignInButton(x, y, width, height) {
		Screen.ctx.drawImage(atlasForms, 156, 607, 156, 37, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function drawSignInCancelButton(x, y, width, height) {
		Screen.ctx.drawImage(atlasForms, 0, 607, 156, 37, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	
	function fillRect(x, y, width, height) {
		Screen.ctx.fillRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function clearRect(x, y, width, height) {
		Screen.ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function fillRectYellow(x, y, width, height) {
		Screen.ctx.fillStyle="#F7FE2E";
		Screen.ctx.fillRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function fillRectGreen(x, y, width, height) {
		Screen.ctx.fillStyle="#7cc576";
		Screen.ctx.clearRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
		Screen.ctx.fillRect(x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	function mouseInRect(x, y, width, height) {
		if(mouseX >= x* Math.min(Screen.k_width, Screen.k_height) && mouseX < (x + width)* Math.min(Screen.k_width, Screen.k_height) && mouseY > y* Math.min(Screen.k_width, Screen.k_height) && mouseY < (y + height)* Math.min(Screen.k_width, Screen.k_height))
			return true
		return false;
	}
	function drawProfilePicture(x, y, width, height) {
		Screen.ctx.drawImage(atlasButtons, 0, 955, 368, 368, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}
	var Animals_loaded = false;
	var atlasAnimals = new Image();
	function loadAnimals(){
		atlasAnimals.src = 'assets/Animals/animals.png';
		atlasAnimals.addEventListener("load", function() {
			Animals_loaded = true;
		}, false);	
	}
	
	/*function drawAnimal(index, x, y, width, height) {
		var framedata = AnimalsJSON[index]
		Screen.ctx.draw(atlasAnimals, framedata.x, framedata.y, framedata.w, framedata.h, x * Math.min(Screen.k_width, Screen.k_height), y * Math.min(Screen.k_width, Screen.k_height), width * Math.min(Screen.k_width, Screen.k_height), height * Math.min(Screen.k_width, Screen.k_height))
	}*/
	var Forms_loaded = false;
	var atlasForms = new Image();
	function loadForms(){
		atlasForms.src = 'assets/Forms/forms.png';
		atlasForms.addEventListener("load", function() {
			Forms_loaded = true;
		}, false);	
	}
	var loadedButtons;
	function loadButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height){
		atlasButtons.src = 'assets/Menu-Items/buttons.png';
		atlasButtons.addEventListener("load", function() {
				/*l_a_x = MenuItem.leftSpace;
				l_a_width = 100*koef;
				l_a_height = koef*100*226/152;
				l_a_y =  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2;
				r_a_height = koef*100*226/152;
				r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
				r_a_width = koef*100;
				//правильноr_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
				r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
				*/
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
		drawSoundOnButton((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, (20 + 5) + Profile.size_btn*75/228 + Profile.size_btn*75/228 + 5, (Profile.size_btn - 2*5) / 3, (Profile.size_btn - 2*5) / 3);
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
	function initMenu() {
		l_a_x = MenuItem.leftSpace;
		l_a_width = 100*koef;
		l_a_height = koef*100*226/152;
		l_a_y =  MenuItem.topSpace + MenuItem.size / 2 - l_a_height / 2;
		
		r_a_height = koef*100*226/152;
		r_a_y =  MenuItem.topSpace + MenuItem.size / 2 - r_a_height / 2;
		r_a_width = koef*100;
		r_a_x = MenuItem.rwidth / Math.min(Screen.k_width, Screen.k_height) - MenuItem.leftSpace - r_a_width;
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
		if(loadedButtons) {
			console.log("drawing buttons")
			drawButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
			//title
			drawTitle(Title.leftSpace, 20, Title.size, Title.size*130/470);
		}
		else
			loadButtons(l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height);
		readyToShowForms()
		
		if(Profile.LoggedIn) {
			clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
			clearScreenRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
			fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
			fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace - 2, (20 + 5) + Profile.size_btn*75/228 - 2, Profile.size_btn + 4, Profile.size_btn*75/228 + 4)
			
			
			drawProfilePicture(((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) + Profile.size_btn * 1/ 6, 20, Profile.size_btn * 2/3, Profile.size_btn * 2/ 3)
			
		}
		
		delete l_a_x, l_a_y, l_a_width, l_a_height, r_a_x, r_a_y, r_a_width, r_a_height;
	}
	//initMenu();
	
	/************************************Resizing*******************************************************/
		
	var c = $('#MainCanvas');
    var ct = c.get(0).getContext('2d');
    var container = $(c).parent();
	$(window).resize(respondCanvas);
	
	/*$(window).load(function() {

		$(window).resize(function() {
           respondCanvas()
        });
	});*/
    function respondCanvas(){ 
        MenuItem.display = 3;
		MenuItem.itemsCount = 5;
		c.attr('width', $(container).width() ); //max width
        c.attr('height', $(container).height() ); //max height
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
		//Screen.ctx.fillRect(0, (0.2 * Screen.height/ Math.min(Screen.k_width, Screen.k_height) + 20)*Math.min(Screen.k_width, Screen.k_height), 1000, 1)
		
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
		Screen.ctx.fillStyle="#F7FE2E";
		Screen.ctx.fillRect(0, 0, Screen.width, MenuItem.starts * Math.min(Screen.k_width, Screen.k_height))
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
		if(!Mode.Exercise)
			Screen.ctx.fillRect(0, Screen.height * 0.8, Screen.width, 1000)
		Profile.rwidth = Screen.width * 0.3;
		Profile.rheight = Screen.height * 0.3;
		Profile.k_width = Profile.rwidth / Profile.width;
		Profile.k_height =  Profile.rheight / Profile.height;
		if((Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) - 2 * 20)/137*470 > Screen.width * 0.5 / Math.min(Screen.k_width, Screen.k_height)) {
			Profile.size_btn = 75/(228 + 6 * 75) * (3 * (Title.size *130/479) - 3 * 2 * 5 + 2 * 5)*228/75;
		} else {
			Profile.size_btn = 75/(228 + 6 * 75) * (3 * Screen.height * 0.2 / Math.min(Screen.k_width, Screen.k_height) - 3 * 2 * 20 - 3 * 2 * 5 + 2 * 5)*228/75;
		}
		
		/*Screen.ctx.fillStyle="#F7FE2E";
		Screen.ctx.fillRect(0, 0, Screen.width, (MenuItem.starts) * Math.min(Screen.k_width, Screen.k_height));
		Screen.ctx.fillRect(0, (MenuItem.ends) * Math.min(Screen.k_width, Screen.k_height), Screen.width, Screen.height);
		Screen.ctx.fillStyle="#000000";*/
		initMenu();
		
		Screen.ctx.fillStyle="#000000";
		
    }

    //Initial call 
    responsiveVoice.OnVoiceReady = function() {
		respondCanvas();
	};
	
	

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
	function checkProfileData() {
		if(Profile.Password != "" && Profile.UserName != "" && Profile.Password != "Password" && Profile.UserName != "Username" )
			return true;
		return false;
	}
	var k = -1;
	var k1 = -1;
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
					Screen.ctx.clearRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY  + (55 / 368 * MenuItem.size + 10) * i + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height), (MenuItem.size)*Math.min(Screen.k_width, Screen.k_height), (55/ 368 * MenuItem.size)*Math.min(Screen.k_width, Screen.k_height));
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
				Screen.ctx.clearRect((pX-3)*Math.min(Screen.k_width, Screen.k_height), (pY  + (55 / 368 * MenuItem.size + 10) * k1 + t_a_width + Task.topSpace - 3)*Math.min(Screen.k_width, Screen.k_height), (MenuItem.size + 6)*Math.min(Screen.k_width, Screen.k_height), (55/ 368 * MenuItem.size + 6)*Math.min(Screen.k_width, Screen.k_height));
				//Screen.ctx.fillRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY+ t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height), MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height));
				drawTask(MenuItem.clicked, Task.firstTask + k1, pX, pY + (55 / 368 * MenuItem.size + 10) * k1  + t_a_width + Task.topSpace,  MenuItem.size, 55/368*MenuItem.size)
				//Screen.ctx.fillRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY + (55/368*MenuItem.size + 10)*k1 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
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
				Screen.ctx.clearRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY)*Math.min(Screen.k_width, Screen.k_height), (t_a_width)*Math.min(Screen.k_width, Screen.k_height), (t_a_height)*Math.min(Screen.k_width, Screen.k_height));
				t_a_ch = true;
				
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace;
				//Screen.ctx.fillRect((pX + MenuItem.size / 2)*Math.min(Screen.k_width, Screen.k_height), 0, 1, 10000)
				Screen.ctx.save();
				Screen.ctx.translate((pX + MenuItem.size / 2 + 3/4*t_a_height)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
				Screen.ctx.rotate(Math.PI / 2);
				drawLeftArrow(0 - 3, 0 - 3, t_a_height + 6, t_a_width + 6)
				Screen.ctx.restore();
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2;
				pY =  MenuItem.topSpace;
				delete pX, pY;
				delete t_a_height, t_a_width;
			
			
			}
			else if (Mode.Tasks && t_a_ch && !(mouseX >= (2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2)*Math.min(Screen.k_width, Screen.k_height) && mouseX <= (2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2 + t_a_width + 3)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (MenuItem.topSpace - 3)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (MenuItem.topSpace + t_a_height + 3)*Math.min(Screen.k_width, Screen.k_height))){
				t_a_ch = false;
				Screen.ctx.clearRect((pX - 3)*Math.min(Screen.k_width, Screen.k_height), (pY - 3)*Math.min(Screen.k_width, Screen.k_height), (t_a_width + 6)*Math.min(Screen.k_width, Screen.k_height), (t_a_height + 6)*Math.min(Screen.k_width, Screen.k_height))
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace;
				//Screen.ctx.fillRect((pX + MenuItem.size / 2)*Math.min(Screen.k_width, Screen.k_height), 0, 1, 10000)
				Screen.ctx.save();
				Screen.ctx.translate((pX + MenuItem.size / 2 + 3/4*t_a_height)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
				Screen.ctx.rotate(Math.PI / 2);
				drawLeftArrow(0, 0, t_a_height, t_a_width)
				Screen.ctx.restore();
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
				Screen.ctx.clearRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY)*Math.min(Screen.k_width, Screen.k_height), (b_a_width)*Math.min(Screen.k_width, Screen.k_height), (b_a_height)*Math.min(Screen.k_width, Screen.k_height));
				//Screen.ctx.fillRect(pX*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height), b_a_width*Math.min(Screen.k_width, Screen.k_height), b_a_height*Math.min(Screen.k_width, Screen.k_height))
				b_a_ch = true;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace + MenuItem.size;
				Screen.ctx.save();
				Screen.ctx.translate((pX + MenuItem.size / 2 - 3/4*b_a_height)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
				Screen.ctx.rotate(-Math.PI / 2);
				drawLeftArrow(0 - 3, 0 - 3, b_a_height + 6, b_a_width + 6)
				Screen.ctx.restore();
				
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2;
				pY = Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height;
			}
			else if (Mode.Tasks && b_a_ch && !(mouseX >= (2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2 - 3)*Math.min(Screen.k_width, Screen.k_height) && mouseX <= (2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2 + b_a_width + 3)*Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height - 3)*Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height + b_a_height + 3)*Math.min(Screen.k_width, Screen.k_height))){
				b_a_ch = false;
				Screen.ctx.clearRect((pX - 5)*Math.min(Screen.k_width, Screen.k_height), (pY - 5)*Math.min(Screen.k_width, Screen.k_height), (b_a_width + 10)*Math.min(Screen.k_width, Screen.k_height), (b_a_height + 10)*Math.min(Screen.k_width, Screen.k_height))
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace + MenuItem.size;
				Screen.ctx.save();
				Screen.ctx.translate((pX + MenuItem.size / 2 - 3/4*b_a_height)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
				Screen.ctx.rotate(-Math.PI / 2);
				drawLeftArrow(0, 0, b_a_height, b_a_width)
				Screen.ctx.restore();
			}
			delete pX, pY;
			delete b_a_height, b_a_width;
		}
		}
		//Menuitems hovered
		var i = 0;
		while (Mode.MenuItem && (i < MenuItem.display)) {
			//X_l = MenuItem.leftSpace + 100*koef + 68 * (i + 1) + MenuItem.size * i;
			X_l = 2 * MenuItem.leftSpace + 100*koef + 68 * (i + 1) + MenuItem.size * i - 68;
			//X_r = MenuItem.leftSpace + 100*koef + 68 * (i + 1) + MenuItem.size * (i + 1)
			X_r = 2 * MenuItem.leftSpace + 100*koef + 68 * (i + 1) + MenuItem.size * (i + 1) - 68;
			if((k == -1) && mouseY >= Math.min(Screen.k_width, Screen.k_height) * MenuItem.topSpace   && mouseY <= Math.min(Screen.k_width, Screen.k_height) * (MenuItem.size + MenuItem.topSpace) && (mouseX >= Math.min(Screen.k_width, Screen.k_height) * X_l && mouseX <= Math.min(Screen.k_width, Screen.k_height) * X_r)){
				if(MenuItem.clicked - MenuItem.firstItem != i){
				clearMenuItemRect(X_l, MenuItem.topSpace, MenuItem.size, MenuItem.size);
				X = 368 * i;
				Y = 0;
				W = 368;
				H = 368;
				pX = X_l - 10;
				pY =  MenuItem.topSpace - 10;
				pW = MenuItem.size + 20;
				pH = MenuItem.size + 20;
				k = i;
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
				DrawMenuItem(k + MenuItem.firstItem, k + MenuItem.firstItem, pX, pY, pW, pH);
				//Screen.ctx.fillRect(Math.min(Screen.k_width, Screen.k_height) * (MenuItem.leftSpace + 100*koef + 68 * (k + 1) + MenuItem.size * k ), Math.min(Screen.k_width, Screen.k_height) * MenuItem.topSpace,Math.min(Screen.k_width, Screen.k_height) * (MenuItem.size),  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.size))
				//Screen.ctx.fillRect(Math.min(Screen.k_width, Screen.k_height) * (pX), Math.min(Screen.k_width, Screen.k_height) * pY, Math.min(Screen.k_width, Screen.k_height) * (MenuItem.size),  Math.min(Screen.k_width, Screen.k_height) * ( MenuItem.size))
				k = -1;
				delete X_l, pX, pY, pW, pH;
				
			}
		//Login button hovered
		//drawLogInButton((Screen.width  - 150*75/228)/ Math.min(Screen.k_width, Screen.k_height)- MenuItem.leftSpace, 20/ Math.min(Screen.k_width, Screen.k_height), 150, 150*75/228)
		if (!Profile.LoggedIn && !Mode.LogIn && !Mode.SignIn &&!login_ch && mouseX >= ((Screen.width )/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace) * Math.min(Screen.k_width, Screen.k_height) && mouseX <= ((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace + Profile.size_btn) * Math.min(Screen.k_width, Screen.k_height) && mouseY >= (20) * Math.min(Screen.k_width, Screen.k_height) && mouseY <= (20 + Profile.size_btn*75/228) * Math.min(Screen.k_width, Screen.k_height)) {
			clearProfileRect((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
			fillRectYellow((Screen.width)/ Math.min(Screen.k_width, Screen.k_height) - Profile.size_btn - MenuItem.leftSpace, 20, Profile.size_btn, Profile.size_btn*75/228);
			
			Screen.ctx.fillStyle="#F7FE2E";
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
		if (!Mode.LogIn && !Mode.SignIn &&!rewards_ch && mouseX >= (Rewards.leftSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
			console.log("rewards")
			clearProfileRect(Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
			fillRectYellow(Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
			drawRewardsButton(Rewards.leftSpace - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
			rewards_ch = true;
		}
		else if(!Mode.LogIn && !Mode.SignIn &&rewards_ch && !(mouseX >= (Rewards.leftSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height))) {
			clearProfileRect(Rewards.leftSpace - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
			fillRectYellow(Rewards.leftSpace - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
			drawRewardsButton(Rewards.leftSpace, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
			rewards_ch = false;
		}
		//Progress button hovered
		if (!Mode.LogIn && !Mode.SignIn &&!progress_ch && mouseX >= (Rewards.leftSpace + Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
			clearScreenRect(Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
			fillRectYellow(Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
			drawProgressButton(Rewards.leftSpace + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
			progress_ch = true;
		}
		else if(!Mode.LogIn && !Mode.SignIn &&progress_ch && !(mouseX >= (Rewards.leftSpace + Rewards.size + 68 - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height))) {
			clearScreenRect(Rewards.leftSpace + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
			fillRectYellow(Rewards.leftSpace + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
			drawProgressButton(Rewards.leftSpace + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
			progress_ch = false;
		}
		
		//Phrases button hovered
		if (!Mode.LogIn && !Mode.SignIn &&!phrases_ch && mouseX >= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
			clearScreenRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
			fillRectYellow(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
			drawPhrasesButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
			phrases_ch = true;
		}
		else if(!Mode.LogIn && !Mode.SignIn &&phrases_ch && !(mouseX >= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + Rewards.size + 68 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height))) {
			clearScreenRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
			fillRectYellow(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
			drawPhrasesButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
			
			phrases_ch = false;
		}
		//Quiz button has been hovered
		//drawQuizButton(MenuItem.leftSpace + 100*koef + 68 + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228)
		if (!Mode.LogIn && !Mode.SignIn &&!quiz_ch && mouseX >= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + Rewards.size + 68+ Rewards.size + 68)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228)* Math.min(Screen.k_width, Screen.k_height)) {
			clearScreenRect(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
			fillRectYellow(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68, Rewards.topSpace, Rewards.size, Rewards.size*75/228);
			drawQuizButton(Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68+ Rewards.size + 68 - 5, Rewards.topSpace - 5, Rewards.size + 10, Rewards.size*75/228 + 10);
			quiz_ch = true;
		}
		else if(!Mode.LogIn && !Mode.SignIn &&quiz_ch && !(mouseX >= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + 68 + Rewards.size + 68 - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseX <= (Rewards.leftSpace + Rewards.size + 68 + Rewards.size + Rewards.size + 68+ Rewards.size + 68 + 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY >= (Rewards.topSpace - 5)* Math.min(Screen.k_width, Screen.k_height) && mouseY <= (Rewards.topSpace + Rewards.size*75/228 + 5)* Math.min(Screen.k_width, Screen.k_height))) {
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
			Screen.ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
			Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
			Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
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
			Screen.ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
			Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
			Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
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
			if(NewAccent == "Google US English")
					AmericanAccent()
			if(NewAccent == "Australian Female")
					AustralianAccent()
			if(NewAccent == "UK English Male")
					BritishAccent()
			drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			
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
			if(NewAccent == "Google US English")
					AmericanAccent()
			if(NewAccent == "Australian Female")
					AustralianAccent()
			if(NewAccent == "UK English Male")
					BritishAccent()
			drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			console.log("Accent = ", NewAccent)
			Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			
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
		if (Mode.Alphabet && !Mode.SignIn && !Mode.LogIn &&!pause_btn_ch && mouseInRect(pX + 20, pY + size_btn + 10, size_btn, size_btn)) {
			clearScreenRect(pX + 20, pY + size_btn + 10, size_btn, size_btn);
			drawPauseButton(pX + 20 - 3, pY + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
			pause_btn_ch = true;
		}
		else if(Mode.Alphabet && !Mode.SignIn && !Mode.LogIn && pause_btn_ch && !(mouseInRect(pX + 20 - 3, pY + size_btn + 10 - 3, size_btn + 6, size_btn + 6))) {
			clearScreenRect(pX + 20 - 3, pY + size_btn + 10 - 3, size_btn + 6, size_btn + 6);
			drawPauseButton(pX + 20, pY + size_btn + 10, size_btn, size_btn)
			pause_btn_ch = false;
			console.log("smaller", pX, pause_btn_ch)
		}
		//play button has been hovered
		if (Mode.Alphabet && !Mode.SignIn && !Mode.LogIn &&!play_btn_ch && mouseInRect(pX + 20, pY, size_btn, size_btn)) {
			clearScreenRect(pX + 20, pY, size_btn, size_btn);
			drawPlayButton(pX + 20 - 3, pY - 3, size_btn + 6, size_btn + 6)
			play_btn_ch = true;
		}
		else if(Mode.Alphabet && !Mode.SignIn && !Mode.LogIn && play_btn_ch && !(mouseInRect(pX + 20 - 3, pY - 3, size_btn + 6, size_btn + 6))) {
			clearScreenRect(pX + 20 - 3, pY - 3, size_btn + 6, size_btn + 6);
			drawPlayButton(pX + 20, pY, size_btn, size_btn)
			play_btn_ch = false;
		}
		
		//stop button has been hovered
		if (Mode.Alphabet && !Mode.SignIn && !Mode.LogIn &&!stop_btn_ch && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
			clearScreenRect(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn);
			drawStopButton(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
			stop_btn_ch = true;
		}
		else if(Mode.Alphabet && !Mode.SignIn && !Mode.LogIn && stop_btn_ch && !(mouseInRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6))) {
			clearScreenRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6);
			drawStopButton(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn)
			stop_btn_ch = false;
		}
		//restart button has been hovered
		if (Mode.Alphabet && !Mode.SignIn && !Mode.LogIn &&!restart_btn_ch && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
			clearScreenRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn);
			drawRestartButton(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
			restart_btn_ch = true;
		}
		else if(Mode.Alphabet && !Mode.SignIn && !Mode.LogIn && restart_btn_ch && !(mouseInRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6))) {
			clearScreenRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6);
			drawRestartButton(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)
			restart_btn_ch = false;
		}
		//exit button has been hovered
		if (Mode.Alphabet && !Mode.SignIn && !Mode.LogIn &&!exit_btn_ch && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
			clearScreenRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn);
			drawExitButton(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6)
			exit_btn_ch = true;
		}
		else if(Mode.Alphabet && !Mode.SignIn && !Mode.LogIn && exit_btn_ch && !(mouseInRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6))) {
			clearScreenRect(pX + 20 - 3, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10 - 3, size_btn + 6, size_btn + 6);
			drawExitButton(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)
			exit_btn_ch = false;
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
			//Screen.ctx.fillRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
			Task.firstTask = Task.firstTask + 1;
			
			drawTask(j, Task.firstTask, pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
			//Trace the letters
			//Screen.ctx.drawImage(atlasMenuItemTask, 1104, 56, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
			drawTask(j, Task.firstTask + 1, pX, (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
			//Name the letter
			//Screen.ctx.drawImage(atlasMenuItemTask, 368, 56, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
			drawTask(j, Task.firstTask + 2, pX, (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
			//Name the letter sounds
			//Screen.ctx.drawImage(atlasMenuItemTask, 736, 0, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
			drawTask(j , Task.firstTask + 3, pX, (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
			//Task.a_clicked = false;
			
			
			if(Task.firstTask > 0) {
			//top arrow
			//Screen.ctx.fillRect(0, (MenuItem.topSpace)*Math.min(Screen.k_width, Screen.k_height), 1000, 100)
			//Screen.ctx.fillRect((pX + MenuItem.size / 2)*Math.min(Screen.k_width, Screen.k_height), 0, 1, 10000)
			//Screen.ctx.fillRect((pX + MenuItem.size / 2 + t_a_width / 2)*Math.min(Screen.k_width, Screen.k_height), 0, 1, 10000)
			//Screen.ctx.fillRect(0, pY*Math.min(Screen.k_width, Screen.k_height), 1000, 1)
			Screen.ctx.save();
			Screen.ctx.translate((pX + MenuItem.size / 2 + 3/4*t_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
			Screen.ctx.rotate(Math.PI / 2);
			drawLeftArrow(0, 0, t_a_width, t_a_height)
			Screen.ctx.restore();
			}
			if(Task.firstTask + Task.display >= Task.itemsCount[MenuItem.clicked]){
				b_a_height = 100*0.5;
				b_a_width = 0.5*100*226/152;
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - b_a_width / 2;
				pY = Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - b_a_height;
				Screen.ctx.clearRect((pX-3)*Math.min(Screen.k_width, Screen.k_height), (pY-3)*Math.min(Screen.k_width, Screen.k_height), (b_a_width + 6)*Math.min(Screen.k_width, Screen.k_height), (b_a_height + 6)*Math.min(Screen.k_width, Screen.k_height));
			}
	}
	
	function topArrowClicked() {
			j = MenuItem.clicked;
			pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
			pY =  MenuItem.topSpace;
			t_a_width = 100*0.5;
			t_a_height = 0.5*100*226/152;
			//Screen.ctx.fillRect(pX*Math.min(Screen.k_width, Screen.k_height), (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
			Task.firstTask = Task.firstTask - 1;
			
			drawTask(j, Task.firstTask, pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
			//Trace the letters
			//Screen.ctx.drawImage(atlasMenuItemTask, 1104, 56, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
			drawTask(j, Task.firstTask + 1, pX, (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
			//Name the letter
			//Screen.ctx.drawImage(atlasMenuItemTask, 368, 56, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
			drawTask(j, Task.firstTask + 2, pX, (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
			//Name the letter sounds
			//Screen.ctx.drawImage(atlasMenuItemTask, 736, 0, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
			drawTask(j , Task.firstTask + 3, pX, (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
			
			if(Task.firstTask <= 0) {
			t_a_height = 100*0.5;
			t_a_width = 0.5*100*226/152;
			pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68 + MenuItem.size / 2 - t_a_width / 2;
			pY =  MenuItem.topSpace;
			Screen.ctx.clearRect((pX - 3)*Math.min(Screen.k_width, Screen.k_height), (pY - 3)*Math.min(Screen.k_width, Screen.k_height), (t_a_width + 6)*Math.min(Screen.k_width, Screen.k_height), (t_a_height + 6)*Math.min(Screen.k_width, Screen.k_height))
			}
			//draw bottom arrow
				//bottom arrow
				pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
				pY =  MenuItem.topSpace + MenuItem.size;
				b_a_width = 100*0.5;
				b_a_height = 0.5*100*226/152;
				Screen.ctx.save();
				Screen.ctx.translate((pX + MenuItem.size / 2 - 3/4*b_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
				Screen.ctx.rotate(-Math.PI / 2);
				drawLeftArrow(0, 0, b_a_width, b_a_height)
				Screen.ctx.restore();
			
	}
	
	var atlasMenuItemTask = new Image();
	MenuItem.loadedMenuItemTasks = false;
	function loadMenuItemsTasks(j){
		// Load image and the json that defines locations
		atlasMenuItemTask.src = 'assets/Menu-Items/Tasks.png';
		atlasMenuItemTask.addEventListener("load", function() {
			MenuItem.loadMenuItemsTasks = true;
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
					Screen.ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
					drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
					drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
					Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
					Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
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
					Screen.ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
					drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
					drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
					Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
					Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
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
					Screen.ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
					Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
					size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
					X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (size_))/2
					
					//mouseInRect(X_ + 35 / 368 * size_, Y_ + 57 / 368 * size_, 298 / 368 * size_, 36 / 368 * size_)
		
					drawSignInForm(X_, Y_, size_, size_);
					if(NewAccent == "Google US English")
						AmericanAccent()
					if(NewAccent == "Australian Female")
							AustralianAccent()
					if(NewAccent == "UK English Male")
							BritishAccent()
					drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
					drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
					Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
					Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
					
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
					Screen.ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
					if(NewAccent == "Google US English")
						AmericanAccent()
					if(NewAccent == "Australian Female")
							AustralianAccent()
					if(NewAccent == "UK English Male")
							BritishAccent()
					drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
					drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
					Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
					Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
					delete key
				}
			});
		return str
		delete x, y, str
	}
	
	function drawTask(j, i, x, y, width, height) {
		switch(j) {
			case 0:
				switch(i) {
				case 0:
				//Alphabet song
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 0, 368, 55, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				break;
				case 1:
				//Trace the letters
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 716, 368, 55, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				break;
				case 2:
				//Name the letter
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 551, 368, 55, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				break;
				case 3:
				//Learning the letter sounds
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 330, 368, 55, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				break;
				case 4:
				//Reading
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 606, 368, 55, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				break;
				}
				break;
			case 1:
				switch(i) {
				case 0:
				//Name the animal
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 496, 368, 55, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				break;
				case 1:
				//Find the animal
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 110, 368, 55, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				break;
				case 2:
				//Unscramble animal names
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 771, 368, 55, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				break;
				case 3:
				//Match the animals with their names
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 385, 368, 55, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				break;
				case 4:
				//Memory game
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 441, 368, 55, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				break;
				}
				break;
			case 2:
				switch(i) {
				case 0:
				//Learning Numbers From 0 To 10
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 220, 368, 55, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				break;
				case 1:
				//Learning Numbers From 11 To 100
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 275, 368, 55, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				break;
				case 2:
				//Learning Numbers after 100
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 165, 368, 55, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				break;
				case 3:
				//Count Animals
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 55, 368, 55, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				break;
				case 4:
				//Telling time
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 661, 368, 55, x*Math.min(Screen.k_width, Screen.k_height), y*Math.min(Screen.k_width, Screen.k_height) , width*Math.min(Screen.k_width, Screen.k_height), height*Math.min(Screen.k_width, Screen.k_height))
				break;
				}
				break;
			default:
				console.log("Not done yet")
			break;			
		
		}
	}
	
	function drawMenuItemsTasks(j){
		console.log("drawing tasks")
		//console.log(Task.firstTask)
		pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem) - 68;
		pY =  MenuItem.topSpace;
		t_a_width = 100*0.5;
		t_a_height = 0.5*100*226/152;
		clearMenuItemRect(pX - 10, pY - 10, MenuItem.size + 20, MenuItem.size + 20);
		Task.topSpace = (Screen.height/Math.min(Screen.k_width, Screen.k_height) - 2 * MenuItem.topSpace - 2 * t_a_width - (Task.display) * (55/368*MenuItem.size + 10) + 10) / 2;
		if(Task.firstTask > 0) {
		//top arrow
		//Screen.ctx.fillRect(0, (MenuItem.topSpace)*Math.min(Screen.k_width, Screen.k_height), 1000, 100)
		//pX = MenuItem.leftSpace + 100*koef + 68 * (j - MenuItem.firstItem + 1) + MenuItem.size * (j - MenuItem.firstItem);
		//Screen.ctx.fillRect((pX + MenuItem.size / 2)*Math.min(Screen.k_width, Screen.k_height), 0, 1, 10000)
		//Screen.ctx.fillRect((pX + MenuItem.size / 2 + t_a_width / 2)*Math.min(Screen.k_width, Screen.k_height), 0, 1, 10000)
		//Screen.ctx.fillRect(0, pY*Math.min(Screen.k_width, Screen.k_height), 1000, 1)
		Screen.ctx.save();
		Screen.ctx.translate((pX + MenuItem.size / 2 + 3/4*t_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
		Screen.ctx.rotate(Math.PI / 2);
		drawLeftArrow(0, 0, t_a_width, t_a_height)
		Screen.ctx.restore();
		}
		/*switch(j) {
			case 0:
				//Alphabet song
				//Screen.ctx.drawImage(atlasMenuItemTask, 0, 0, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY+ t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				drawTask(j, 0, pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Trace the letters
				drawTask(j, 1, pX, (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Name the letter
				drawTask(j, 2, pX, (pY + (55/368*MenuItem.size + 10) * 2+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				//Name the letter sounds
				drawTask(j, 3, pX, (pY + (55/368*MenuItem.size + 10) * 3+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
				
				//Reading
				//Screen.ctx.drawImage(atlasMenuItemTask, 736, 56, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + (55/368*MenuItem.size + 10) * 4+ t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				
				Screen.ctx.fillRect(0, (Task.topSpace + MenuItem.topSpace + t_a_width)*Math.min(Screen.k_width, Screen.k_height), 1000, 1)
				Screen.ctx.fillRect(0, (Screen.height/Math.min(Screen.k_width, Screen.k_height) - MenuItem.topSpace - t_a_width - Task.topSpace)*Math.min(Screen.k_width, Screen.k_height), 1000, 1)
				//Screen.ctx.fillRect(0, (MenuItem.topSpace + MenuItem.size - t_a_width - Task.topSpace)*Math.min(Screen.k_width, Screen.k_height), 1000, 1)
			break;
			case 1:
				//Name the animal
				Screen.ctx.drawImage(atlasMenuItemTask, 0, 56, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY+ t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				//Find the animal
				Screen.ctx.drawImage(atlasMenuItemTask, 368, 0, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + 55/368*MenuItem.size + 10 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				//Unscramble animal names
				Screen.ctx.drawImage(atlasMenuItemTask, 1472,56, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + (55/368*MenuItem.size + 10) * 2 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				//Match the animals with their names
				Screen.ctx.drawImage(atlasMenuItemTask, 1101, 0, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + (55/368*MenuItem.size + 10) * 3 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				
				//Memory game
				//Screen.ctx.drawImage(atlasMenuItemTask, 1469, 0, 368, 55, pX*Math.min(Screen.k_width, Screen.k_height), (pY + (55/368*MenuItem.size + 10) * 4 + t_a_width + Task.topSpace)*Math.min(Screen.k_width, Screen.k_height) , MenuItem.size*Math.min(Screen.k_width, Screen.k_height), 55/368*MenuItem.size*Math.min(Screen.k_width, Screen.k_height) )
				
			break;
			default:
			console.log("Not done yet")
			break;			
		
		}
		*/
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
		Screen.ctx.save();
		Screen.ctx.translate((pX + MenuItem.size / 2 - 3/4*t_a_width)*Math.min(Screen.k_width, Screen.k_height), pY*Math.min(Screen.k_width, Screen.k_height));
		Screen.ctx.rotate(-Math.PI / 2);
		drawLeftArrow(0, 0, t_a_width, t_a_height)
		Screen.ctx.restore();
		}
		
		
		delete pX, pY;
		delete t_a_width, t_a_height;
		
	}
	function MenuItemClicked(j) {
		//var pronun = new Audio("assets/Menu-Items/" + MenuItem.ItemList[j + MenuItem.firstItem]);
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
			//Screen.ctx.globalAlpha=0.3;// opacity at 0.5
			//Screen.ctx.fillStyle='#D8D8D8';
			//Screen.ctx.fillRect(0, MenuItem.starts * Math.min(Screen.k_width, Screen.k_height), MenuItem.width, 0.8 * Screen.height - MenuItem.starts * Math.min(Screen.k_width, Screen.k_height))
			//Screen.ctx.fillRect(0, 0, MenuItem.width, Screen.height)
			//Screen.ctx.globalAlpha=1;
			
			var iter = 0;
			if(Forms_loaded){
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (MenuItem.size) / 202 * 368)/2
				Y_ = 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height) + (0.6* Screen.height / Math.min(Screen.k_width, Screen.k_height) - MenuItem.size) / 2;
				//##это лучше значение Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
				//##этот размер лучше size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
				drawLogInForm(X_, Y_, (MenuItem.size) / 202 * 368, MenuItem.size);
				//##этот размер лучше drawLogInForm(X_, Y_, size_ / 202 * 368, size_);
				drawLogInLogInButton(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
				drawLogInCancelButton(X_ + 49 + (MenuItem.size) / 202 * 156 + 35, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202)
				Screen.ctx.fillStyle='#000000';
				Screen.ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
				Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
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
			//Screen.ctx.globalAlpha=0.3;// opacity at 0.5
			//Screen.ctx.fillStyle='#D8D8D8';
			//Screen.ctx.fillRect(0, 0, MenuItem.width, Screen.height)
			//Screen.ctx.globalAlpha=1;
			var iter = 0;
			if(Forms_loaded){
				Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
				size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
				X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - (size_))/2
				drawSignInForm(X_, Y_, size_, size_);
				BritishAccent()
				drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				Screen.ctx.fillStyle='#000000';
				Screen.ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
				Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
				Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
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
		Screen.ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
		if(NewAccent == "Google US English")
				AmericanAccent()
		if(NewAccent == "Australian Female")
				AustralianAccent()
		if(NewAccent == "UK English Male")
				BritishAccent()
				
					
		if(pressedUserNameSignIn != 0)
			Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
		else
			Profile.UserName = ""
		if(pressedPasswordSignIn != 0)
			Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
		else
			Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
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
			Screen.ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
			if(pressedUserNameLogIn != 0)
				Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
			else
				Profile.UserName = ""
			if(pressedPasswordLogIn != 0)
				Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
			else
				Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
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
			Screen.ctx.font = 40 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
			if(pressedUserNameLogIn != 0)
				Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
			else
				Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 80 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
				//Profile.UserName = ""
			if(pressedPasswordLogIn != 0)
				Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 138 / 368 * (MenuItem.size) / 202 * 368) * Math.min(Screen.k_width, Screen.k_height))
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
			if(NewAccent == "Google US English")
				AmericanAccent()
			if(NewAccent == "Australian Female")
				AustralianAccent()
			if(NewAccent == "UK English Male")
				BritishAccent()
			drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			Screen.ctx.font = 35 * Math.min(Screen.k_width, Screen.k_height) + "px Ariel"
			//Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			//Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
		
			if(pressedUserNameSignIn != 0)
				Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			else
				Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			if(pressedPasswordSignIn != 0)
				Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
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
		Screen.ctx.fillStyle = "#000000"
		fillRect(X_ + (35 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
		fillRect(X_ + (35 - 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
		fillRect(X_ + (35 - 4) / 368 * size_, Y_ + 177 / 368 * size_ + (23 + 4) / 368 * size_, (36 + 8) / 368 * size_, 2)
		fillRect(X_ + 35 / 368 * size_ + (36 + 4) / 368 * size_, Y_ + (177 - 4) / 368 * size_, 2, (23 + 8) / 368 * size_)
		//fillRect(X_ + 35 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)
		NewAccent = "Google US English"
	}
	function AustralianAccent() {
		//fillRect(X_ + 80 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)
		drawSignInForm(X_, Y_, size_, size_);
		//drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
		//drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
		Screen.ctx.fillStyle = "#000000"
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
		Screen.ctx.fillStyle = "#000000"
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
		if (Mode.Exercise && Mode.Alphabet) {
			clearScreenRect(0, MenuItem.starts, Screen.width/  Math.min(Screen.k_width, Screen.k_height), 0.8 * MenuItem.height/  Math.min(Screen.k_width, Screen.k_height))	
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
			if($this.src.indexOf("assets/Alphabet/abc%20song.mp4") !== -1) {
				pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2
				//console.log(2 * pX + 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) == (Screen.width /  Math.min(Screen.k_width, Screen.k_height) ))
				Screen.ctx.drawImage($this, pX * Math.min(Screen.k_width, Screen.k_height), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
				Screen.ctx.clearRect(pX * Math.min(Screen.k_width, Screen.k_height), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 300 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
				Screen.ctx.clearRect(pX * Math.min(Screen.k_width, Screen.k_height) + 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)) - 1066 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
				
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
				setTimeout(loop, 1000 / 30); // drawing at 30fps
			}
      }
    })();
  }, 0);
	function AlphabetSongPlay() {
		video.src = "assets/Alphabet/abc song.mp4"
		console.log("play!")
		if(!sound_on)
			video.muted = true;
		video.play()
	}
	function AlphabetSongEx() {
		AlphabetSongPlay()
		
	}
	function drawVideoFrame() {
		if(video.currentTime == 0) {
			console.log("first", video)
			video = document.getElementById('video')
			pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2
			//Screen.ctx.fillRect(pX * Math.min(Screen.k_width, Screen.k_height), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
			//Screen.ctx.drawImage(video, pX * Math.min(Screen.k_width, Screen.k_height), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
			Screen.ctx.drawImage(video, pX * Math.min(Screen.k_width, Screen.k_height), (MenuItem.starts + 20)*Math.min(Screen.k_width, Screen.k_height), 1366 / 768 * (0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height)), 0.6 * Screen.height - 40 * Math.min(Screen.k_width, Screen.k_height));
				
		}
		else {
			setTimeout(function(){
				drawVideoFrame();
			}, 1);
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
					console.log("background")
					//Task.a_clicked = false;
					//task_ch = false;
					if(!mouseInRect(X_l, MenuItem.topSpace, MenuItem.size, MenuItem.size)) {
						console.log("look")
						pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
						pY =  MenuItem.topSpace;
						pW = MenuItem.size;
						pH = MenuItem.size;
						MenuItem.chosen = MenuItem.clicked;
						clearMenuItemRect(pX, pY, pW, pH);
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
				Mode.Tasks = true;
				Task.firstTask = 0;
				//console.log(j + MenuItem.firstItem)
				MenuItem.audio_played = false;
				MenuItem.clicked = j + MenuItem.firstItem;
				MenuItemClicked(MenuItem.clicked);
				j = MenuItem.display + 1;		
				Mode.Tasks = true;
				
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
			//Screen.ctx.fillRect(100, 150, 100, 100)
			
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
		if(Mode.Login && mouseInRect(X_ + 47, Y_ + MenuItem.size - MenuItem.size * 37 / 202 / 2 - 40, (MenuItem.size) / 202 * 156, MenuItem.size * 37 / 202))
		{
			if(checkProfileData()) {
				Profile.LoggedIn = true;
				Mode.LogIn = false;
				Mode.MenuItem = true;
				Profile.storeUserNameLogIn = false;
				Profile.storePasswordLogIn = false;
				console.log(Profile.UserName, Profile.Password)
				clearScreenRect(0, 0, Screen.width/ Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
				respondCanvas()
			}
		}
		//background has been clicked during LogIn Mode
		if(Mode.LogIn && !(mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 115 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size) || mouseInRect(X_ + 35 / 368 * (MenuItem.size) / 202 * 368, Y_ + 57 / 202 * MenuItem.size, 297 / 368 * (MenuItem.size) / 202 * 368, 35 / 202 * MenuItem.size))) {
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
			Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
				
		}
		//Australian accent
		Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
		size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
		X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
		if(Mode.SignIn && mouseInRect(X_ + 80 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)) {
			AustralianAccent()
			Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			drawSignInSignInButton(X_ + 20 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			drawSignInCancelButton(X_ + 190 / 368 * size_, Y_ + 318 / 368 * size_, 157 / 368 * size_, 157 / 368 * size_ * 37 / 156)
			
		}
		//British accent
		Y_ = (MenuItem.topSpace + 0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) / 2
		size_ = 2*(Y_ -  0.2* Screen.height / Math.min(Screen.k_width, Screen.k_height)) + MenuItem.size;
		X_ = (Screen.width / Math.min(Screen.k_width, Screen.k_height) - size_)/2
		if(Mode.SignIn && mouseInRect(X_ + 124 / 368 * size_, Y_ + 177 / 368 * size_, 36 / 368 * size_, 23 / 368 * size_)) {
			BritishAccent()
			Screen.ctx.fillText(Profile.Password, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), ( Y_ + 115 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
			Screen.ctx.fillText(Profile.UserName, (X_ + (35 + 20) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height), (Y_ + 57 / 368 * size_ + (36 - 11) / 368 * size_) * Math.min(Screen.k_width, Screen.k_height))
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
			if(checkProfileData()) {
				Profile.LoggedIn = true;
				Mode.SignIn = false;
				Mode.MenuItem = true;
				Profile.storeUserNameSignIn = false;
				Profile.storePasswordSignIn = false;
				Profile.Accent = NewAccent;
				console.log(Profile.UserName, Profile.Password, Profile.Accent)
				clearScreenRect(0, 0, Screen.width / Math.min(Screen.k_width, Screen.k_height), Screen.height / Math.min(Screen.k_width, Screen.k_height) )
				respondCanvas()
			}
		}
		
		//Alphabet song Task has been clicked
		//drawTask(j, 0, pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)
		j = MenuItem.clicked
		if(j == 0) {
			console.log("WTF", MenuItem.clicked)
			pX = 2 * MenuItem.leftSpace + 100*koef + 68 * (MenuItem.clicked - MenuItem.firstItem + 1) + MenuItem.size * (MenuItem.clicked - MenuItem.firstItem) - 68;
			pY =  MenuItem.topSpace;
			t_a_width = 100*0.5;
			t_a_height = 0.5*100*226/152;
			if(Mode.Tasks && Task.firstTask == 0 && mouseInRect(pX, (pY+ t_a_width + Task.topSpace), MenuItem.size, 55/368*MenuItem.size)) {
				Mode.Exercise = true;
				clearRect(0, MenuItem.starts, Screen.width/ Math.min(Screen.k_width, Screen.k_height), 0.8 * Screen.height / Math.min(Screen.k_width, Screen.k_height))
				Mode.Tasks = false;
				Mode.MenuItem = false;
				
				Mode.Alphabet = true;
				AlphabetSongEx()
			}
		}
		
		
		
		
		//AlphabetSong play button has been clicked
		//pause button has been clicked
		pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
		pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
		size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
		
		if (Mode.Alphabet && !Mode.SignIn && !Mode.LogIn && mouseInRect(pX + 20, pY + size_btn + 10, size_btn, size_btn)) {
			video.pause()
		}
		//play button has been clicked
		pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
		pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
		size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
		
		if (Mode.Alphabet && !Mode.SignIn && !Mode.LogIn && mouseInRect(pX + 20, pY, size_btn, size_btn)) {
			video.play()
		}
		//stop button has been clicked
		pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
		pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
		size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
		if (Mode.Alphabet && !Mode.SignIn && !Mode.LogIn && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
			console.log(video.currentTime)
			video.load()
			console.log(video.currentTime)
			drawVideoFrame()
			//0 кадр
		}
		
		//restart button has been clicked
		pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
		pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
		size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
		if (Mode.Alphabet && !Mode.SignIn && !Mode.LogIn && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
			video.load()
			video.play()
		}
		//exit button has been clicked
		pX = (Screen.width /  Math.min(Screen.k_width, Screen.k_height) - 1366 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40)) / 2 + 1066 / 768 * (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height)- 40)
		pY = MenuItem.starts + 20 + (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 1/5
		size_btn = ((0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) - 4 * 10 - (0.6 * Screen.height / Math.min(Screen.k_width, Screen.k_height) - 40) * 2/5) / 5
		if (Mode.Alphabet && !Mode.SignIn && !Mode.LogIn && mouseInRect(pX + 20, pY + size_btn + 10 + size_btn + 10 + size_btn + 10 + size_btn + 10, size_btn, size_btn)) {
			console.log("exit")
			Mode.MenuItem = true;
			Mode.Exercise = false;
			Mode.Alphabet = false;
			video.load()
			Screen.ctx.clearRect(0, 0.2 * Screen.height, Screen.width, 0.6 * Screen.height)
			MenuItem.clicked = -1;
			MenuItem.chosen = MenuItem.clicked;
			initMenu()
			delete mouseX
			delete mouseY
		}
		
		
		
		
	}
	
	});
})();




/*
(function(){
	$(document).ready(function(){
		var game = {};
		game.width = 550;
		game.height = 650;
		game.icons = [];
		game.requiredIcons = 0;
		game.loadedIcons = 0;
		var keyboard = {};
		keyboard.keys = [];
		keyboard.width = game.width;
		keyboard.height = 100;
		keyboard.letters = []; 
		keyboard.doneletters = 0;
		keyboard.requiredletters = 0;
		keyboard.selected = [];
		keyboard.loaded = 0;
		game.mainMenuItem = document.getElementById("mainMenuItem").getContext("2d");
		keyboard.letterMenuItem = document.getElementById("letterMenuItem").getContext("2d");
		function getKey(){
		$(document).keydown(function(e){
			keyboard.keys[e.keyCode? e.keyCode : e.which] = true;
		});
		$(document).keyup(function(e){
			delete keyboard.keys[e.keyCode? e.keyCode : e.which];
		});
		}
		function iconclicked(){
			
		}
		function init(){
			drawMenu();
			for (i in keyboard.letters) {
				keyboard.letterMenuItem.drawImage(keyboard.letters[i],6*(i + 1),10);
			}
			getKey();
			loop();
		}
		function drawMenu(){
			for (i in game.icons) {
				game.mainMenuItem.drawImage(game.icons[i],20*(i + 1),100, 150, 150);
			}
		}
		function show_letter(){
			var selected = keyboard.selected;
			//console.log(selected.length);
			game.mainMenuItem.drawImage(keyboard.selected[selected.length - 1],100*(selected.length),100);
		}
		function update(){
			if(keyboard.keys[65]){
				new_selected("/assets/Alphabet/a.png");
				check_new_selected();
				
			}
			else if(keyboard.keys[66]){
				new_selected("/assets/Alphabet/b.png");
				check_new_selected();
				
			}
			else if(keyboard.keys[67]){
				new_selected("/assets/Alphabet/c.png");
				check_new_selected();
				
			}
		}
		function render(){
			//game.mainMenuItem.clearRect(0, 0, game.width, game.height);
		}
		function loop(){
			requestAnimFrame(function(){
				loop();
			});
			update();
			render();
		}
		
		function initletters(paths){
			keyboard.requiredletters = paths.length;
			for (i in paths){
				var img = new Image;
				img.src = paths[i];
				keyboard.letters[i] = img;
				keyboard.letters[i].onload = function(){
					keyboard.doneletters++;
				}
			}
			
			
		}
		function new_selected(path){
			keyboard.loaded = 0;
			var img = new Image;
			img.src = path;
			i = keyboard.selected.length;
			keyboard.selected[i] = img;
			keyboard.selected[i].onload = function(){
				keyboard.loaded++;
			}
			
			
		}
		function check_new_selected(){
			if(keyboard.loaded >= 1){
				show_letter();
			}
			else {
				setTimeout(function(){
					check_new_selected();
				}, 1);
			}
		}
		function checkletters(){
			if(keyboard.doneletters >= keyboard.requiredletters){
				init();
			}
			else {
				setTimeout(function(){
					checkletters();
				}, 1);
			}
		}
		function checkloading(){
			if(game.loadedIcons >= game.requiredIcons){
				init();
			}
			else {
				setTimeout(function(){
					checkloading();
				}, 1);
			}
		}
		function letter_game(){
		initletters(["a.png", "b.png", "c.png"]);
		checkletters();
		}
		function modIcons(X, Y){
			if (X > 20 && X < 170 && Y > 100 && Y < 250) {
				game.mainMenuItem.clearRect(0, 0 , game.width, game.height);
				game.mainMenuItem.drawImage(game.icons[0],20,100, 170, 170);
				game.mainMenuItem.drawImage(game.icons[i],220, 100, 150, 150);
			}else{
				game.mainMenuItem.clearRect(0, 0 , game.width, game.height);
				drawMenu();
			}
		}
		var mouseX;
		var mouseY;
		mainMenuItem.addEventListener("mousemove", checkPosMenuItem);
		function checkPosMenuItem(mouseEvent){
			mouseX = mouseEvent.pageX - this.offsetLeft;
			mouseY = mouseEvent.pageY - this.offsetTop;
			modIcons(mouseX, mouseY);
			if(mouseEvent.pageX || mouseEvent.pageY == 0){
				mouseX = mouseEvent.pageX - this.offsetLeft;
				mouseY = mouseEvent.pageY - this.offsetTop;
			}else if(mouseEvent.offsetX || mouseEvent.offsetY == 0){
				mouseX = mouseEvent.offsetX;
				mouseY = mouseEvent.offsetY;
			}
			
		}
		
		mainMenuItem.addEventListener("mouseup", checkClick);
		function checkClick(mouseEvent){
			//for(i = 0; i < game.icons.length; i++){
				if(mouseX > 20 && mouseX < 170){
					if(mouseY > 100 && mouseY < 250){
						game.mainMenuItem.clearRect(0, 0 , game.width, game.height);
						setTimeout(function(){
						mainMenu();
						checkloading(); 
						}, 1000)
					}
				} else if(mouseX > 190 && mouseX < 340){
					if(mouseY > 100 && mouseY < 250){
						game.mainMenuItem.clearRect(0, 0 , game.width, game.height);
						setTimeout(function(){
						mainMenu();
						checkloading(); 
						}, 500)
					}
				}
			//}
		}
		mainMenu();
		checkloading();
		iconclicked();
	});
	
})();
*/
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();