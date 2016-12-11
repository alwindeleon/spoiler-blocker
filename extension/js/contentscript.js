$(document).ready(function(){
	$('div._1dwg._1w_m').hide();
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var observer = new MutationObserver(function(mutations, observer) {
	    console.log(mutations, observer);
	    $('div._1dwg._1w_m').hide();
	});
	observer.observe(document, {
	  subtree: true,
	  attributes: true
	});
});