$(document).ready(function(){

	chrome.storage.local.get('status', function(status_obj){
		if(status_obj.status == null){
			chrome.storage.local.set({'status': true});
			blockSpoilers($('div._1dwg._1w_m'));
		}else if ( status_obj.status ){
			// hide all spoilers
			blockSpoilers($('div._1dwg._1w_m'));
		}else if( !status_obj.status ){
			// show all spoilers
			$('div._1dwg._1w_m').show();
		}
	});

	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var observer = new MutationObserver(function(mutations, observer) {
		chrome.storage.local.get('status',function(status_obj){
			if( status_obj.status ){
				blockSpoilers($('div._1dwg._1w_m'));
			} else if( !status_obj.status ){
				$('div._1dwg._1w_m').show();
			}
		});
	    
	});
	observer.observe(document, {
	  subtree: true,
	  attributes: true
	});

	chrome.storage.onChanged.addListener(function(changes, namespace) {
      var status = changes.status;
      if(status){
      	blockSpoilers($('div._1dwg._1w_m'));
      }else if(!status){
      	$('div._1dwg._1w_m').show();
      }
      

    });
});

function isSpoiler(text){
	console.log(text);
	return true;	
}

function blockSpoilers ( container ){
	return container.children('div').children('.userContent').children('p').each(function(){
		if( isSpoiler( $(this).text() ) ){
			$(this).parent().parent().parent().hide();
		}
	});
}