function runScript() {
	// Hide the preloader
	$('#preloader').fadeOut('slow', function() {
	  $(this).remove();
	});
  
	// Play the audio file
	

// create an array of mp3 file names
var mp3Files = ["1.mp3", "2.mp3", "3.mp3","4.mp3"];

// choose a random mp3 file from the array
var randomIndex = Math.floor(Math.random() * mp3Files.length);
var selectedFile = mp3Files[randomIndex];

// create an Audio object and play the selected file
var audio = new Audio(selectedFile);
audio.play();

// listen for the "ended" event and play a new random file when the current one is finished
audio.addEventListener('ended', function() {
    randomIndex = Math.floor(Math.random() * mp3Files.length);
    selectedFile = mp3Files[randomIndex];
    audio.src = selectedFile;
    audio.play();
});

  }


/******************************************************************************************************************************
Learn More Page Scroll
*******************************************************************************************************************************/
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

/******************************************************************************************************************************
Menu
*******************************************************************************************************************************/ 
(function() {

	var bodyEl = document.body,
		//content = document.querySelector( '.content-wrap' ),
		openbtn = document.getElementById( 'open-button' ),
		closebtn = document.getElementById( 'close-button' ),
		isOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}

		/* close the menu element if the target it´s not the menu element or one of its descendants..
		content.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( isOpen && target !== openbtn ) {
				toggleMenu();
			}
		} );
		*/
	}

	function toggleMenu() {
		if( isOpen ) {
			classie.remove( bodyEl, 'show-menu' );
		}
		else {
			classie.add( bodyEl, 'show-menu' );
		}
		isOpen = !isOpen;
	}

	init();

})();


