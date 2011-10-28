$(document).ready(function() {

	/* Use this js doc for all application specific JS */

	/* TABS --------------------------------- */
	/* Remove if you don't need :) */
	

	$('dl.tabs dd a').live("click", function(e) {
		
		//Get Location of tab's content
		var contentLocation = $(this).attr("href")
		contentLocation = contentLocation + "Tab";
		
		//Let go if not a hashed one
		if(contentLocation.charAt(0)=="#") {
		
			e.preventDefault();
		
			//Make Tab Active
			$(this).parents("dl.tabs").find("dd a").removeClass('active');
			$(this).addClass('active');
			
			//Show Tab Content
			$(contentLocation).parent('.tabs-content').children('li').css({"display":"none"});
			$(contentLocation).css({"display":"block"});
			
		} 
	});
	
	
	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove this and jquery.placeholder.min.js if you don't need :) */
	
	$('input, textarea').placeholder();
	
});