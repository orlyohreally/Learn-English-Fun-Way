(function(){
	$(document).ready(function(){
	
	MenuItem = {};
	MenuItem.ctx = document.getElementById("MainMenuCanvas").getContext("2d");
	MenuItem.height = 400;
	MenuItem.width = 1364;
	MenuItem.itemsCount = 5;
	MenuItem.display = 3;
	MenuItem.size = 300;
	MenuItem.firstItem = 0;
	MenuItem.ItemList = ["alphabet", "animals", "numbers", "sport", "toys"]
	
	Title = {};
	Title.ctx = document.getElementById("TitleCanvas").getContext("2d");
	Title.width = MenuItem.width * 0.6;
	Title.height = MenuItem.height / 2;
	
	
	Rewards = {};
	Rewards.ctx = document.getElementById("RewardsCanvas").getContext("2d");
	Rewards.width = MenuItem.width;
	Rewards.height = MenuItem.height / 5;
	
	
	Profile = {};
	Profile.ctx = document.getElementById("ProfileCanvas").getContext("2d");
	Profile.width = MenuItem.width * 0.3;
	Profile.height = MenuItem.height / 2;
	
	MenuItem.ctx.fillRect(10, 10, 50, 50)
	Title.ctx.fillRect(10, 10, 50, 50)
	Rewards.ctx.fillRect(10, 10, 50, 50)
	console.log("hi")
	/************************************Resizing*******************************************************/
	/*	
	var c = $('#MainMenuCanvas');
    var ct = c.get(0).getContext('2d');
    var container = $(c).parent();
	$(window).resize(respondCanvas);

    function respondCanvas(){ 
        c.attr('width', $(container).width() ); //max width
        c.attr('height', $(container).height() ); //max height
		Screen.width = $(container).width();
		Screen.height = $(container).height();
		MenuItem.rwidth = Screen.width;
		MenuItem.rheight = Screen.height * 0.6;
		MenuItem.k_width = MenuItem.rwidth / MenuItem.width;
		MenuItem.k_height =  MenuItem.rheight / MenuItem.height;
		
		Rewards.rwidth = Screen.width;
		Rewards.rheight = 0.1 * Screen.height;
		Rewards.k_width = Rewards.rwidth / Rewards.width;
		Rewards.k_height =  Rewards.rheight / Rewards.height;
		MenuItem.margin = (MenuItem.rwidth / Math.min(MenuItem.k_width, MenuItem.k_height) - 2*100*koef - MenuItem.display*368 - 68)/2;
		//Title.margin = (Title.rwidth / Math.min(Title.k_width, Title.k_height) - 2*100*koef - MenuItem.display*368 - 68)/2;
		Profile.rwidth = Screen.width * 0.3;
		Profile.rheight = Screen.height * 0.3;
		Profile.k_width = Profile.rwidth / Profile.width;
		Profile.k_height =  Profile.rheight / Profile.height;
		initMenu();
		//MenuItem.ctx.fillRect(MenuItem.margin*Math.min(MenuItem.k_width, MenuItem.k_height), 0, 1, MenuItem.rheight/0.6)
		//Rewards.ctx.fillRect(Rewards.margin*Math.min(MenuItem.k_width, MenuItem.k_height), 0, 1, Rewards.rheight/0.1)
		//Rewards.ctx.fillRect(MenuItem.margin*Math.min(Rewards.k_width, Rewards.k_height), 0, 10, Rewards.rheight/0.1)
		//MenuItem.ctx.fillRect(MenuItem.margin* Math.min(MenuItem.k_width, MenuItem.k_height), 0, 1, MenuItem.height* Math.min(MenuItem.k_width, MenuItem.k_height));
		//MenuItem.ctx.fillRect((MenuItem.margin + MenuItem.rspace + 368 * 0)*Math.min(MenuItem.k_width, MenuItem.k_height), 0, 1, MenuItem.height* Math.min(MenuItem.k_width, MenuItem.k_height));
		//MenuItem.ctx.fillRect((MenuItem.rwidth / Math.min(MenuItem.k_width, MenuItem.k_height) - MenuItem.margin)*Math.min(MenuItem.k_width, MenuItem.k_height), 0, 1, MenuItem.height* Math.min(MenuItem.k_width, MenuItem.k_height));
		//Call a function to redraw other content (texts, images etc)
		
    }

    //Initial call 
    respondCanvas();
	*/
	});
})();


// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
