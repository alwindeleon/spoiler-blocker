$(document).ready(function(){
	chrome.storage.local.get('status', function(status_obj){
		if(status_obj.status){
			$('#click').text('turn off');
		}
		else if( !status_obj.status ){
			$('#click').text('turn on')
		}
	});

	$('#click').click(function(){
		chrome.storage.local.get('status', function(status_obj){
			if ( status_obj.status ){
				// hide all spoilers
				chrome.storage.local.set({'status': false}, function(){
					console.log('status is now false');
					$('#click').text('turn on');
				});

			}else if( !status_obj.status ){
				// show all spoilers
				chrome.storage.local.set({'status': true}, function(){
					console.log('status is now true');
					$('#click').text('turn off');
				});
			}
		});
	});
});