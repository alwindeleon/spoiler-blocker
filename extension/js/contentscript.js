var d, doc;

$(document).ready(function(){

	d = {'true':{'total':0}, 'false':{'total':0}};
	var sizeVocab = 0;
	doc = {'true':0, 'false':0};

	$.getJSON('https://extension-server.herokuapp.com/dictionary',function(res){
		d = res;
	})
	$.getJSON('https://extension-server.herokuapp.com/doc',function(res){
		doc = res;
	})

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



function isSpoiler(inputText){
	var guess = false;
	console.log(inputText.split(" "));
	inputText = String(inputText);
	var trueProb = 1 * doc.true
	var falseProb = 1 * doc.false
	var inputText = String(inputText.replace(/[^A-Za-z0-9 ]/g, ''));
	console.log(inputText)
	var words = inputText.split(" ").map(function(x){return x.toLowerCase()}).filter(function(x,i,a){ return a.indexOf(x)==i});
	console.log(words);
	for(var i = 0; i < words.length ;i++){
		if( words[i] != "" && d['true'].hasOwnProperty(words[i]) && d['false'].hasOwnProperty(words[i]) ){
			trueProb = trueProb * d['true'][words[i]]
			falseProb = falseProb * d['false'][words[i]]
		}
	}
	console.log( trueProb, falseProb)
	if (trueProb > falseProb){
		guess = true;
	}
	else{
		guess = false;
	}
		
	return guess
}

function blockSpoilers ( container ){
	return container.children('div').children('.userContent').children('p').each(function(){
		if( isSpoiler( $(this).text()) ){
			$(this).parent().parent().parent().hide();
		}
	});
}

