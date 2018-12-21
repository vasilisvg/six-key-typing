// Choose your keyboard layout, or make your own
var k = ['1','2','3','4','5','6'];
	k = ['[',']',';',"'",'\\','/'];
	k = ['a','s','d',"j",'k','l']; // for peet!
	k = ['u','i','o',"j",'k','l'];

// Option to change keyboard layout with the "keys" querystring
(function(){
	var r = 0;
	var urlParams = new URLSearchParams(window.location.search);
	if(urlParams.get('keys')) {
		var l =  urlParams.get('keys').toLowerCase();
	}
	if(l && l.length > 5){
		// check to see if there are no doubles
		var text = l.split("");
		text.some(function(v,i,a){
			if(a.lastIndexOf(v)!=i) {
				r = 1;	
			}
		});
		if(r == 0) {
			k[0] = l[0];
			k[1] = l[1];
			k[2] = l[2];
			k[3] = l[3];
			k[4] = l[4];
			k[5] = l[5];
		}
	}
})();

// add chosem keyboard layout to HTML
(function(){
	// add to each thead th
	var thTh = document.querySelectorAll('thead th');
	var i = 0;
	while ( i < thTh.length - 1) {
		thTh[i + 1].innerHTML = k[i];
		i++;
	}
	// add to each tbody th
	var thTh = document.querySelectorAll('tbody th');
	var i = 0;
	while ( i < thTh.length) {
		thTh[i].innerHTML = k[i];
		i++;
	}
	document.querySelector('label span').innerHTML = k[0] + ', ' + k[1] + ', ' + k[2] + ', ' + k[3] + ', ' + k[4] + ', and ' + k[5];
})();


// This is where the typing happens
(function(){
	var inp = document.querySelector('input');
	inp.value = '';
	inp.onkeydown = function(e) {
		var theKey = e.key.toLowerCase();
		// You can only type the sixth character once, and only as the first character
		if(theKey == k[5] && inp.value.length == 1) {
			return false;
		}
		// These are the only character allowed + Backspace
		if(theKey !== k[0] && theKey !== k[1] && theKey !== k[2] && theKey !== k[3] && theKey !== k[4] && theKey !== k[5] && e.key !== 'Backspace' && e.key !== 'Enter' && e.key !== 'Tab' && e.key !== 'ArrowDown'){
			//console.log(e.key);
			return false;
		}
		if (e.key == 'Backspace') {
			if(this.value.length == 0) {
				var val = document.querySelector('textarea').value;
				var newVal = val.substring(0, val.length-1);
				document.querySelector('textarea').value = newVal;
			}
		}
		if (e.key == 'ArrowDown') {
			document.querySelector('textarea').focus();
		}
	}
	// If this is triggered it means one of the allowed keys is typed
	inp.onkeyup = function(e) {
		// Remove table classes when the exist
		// When the class exist it simply means the second character is typed, 
		// or a Backspace is typed. In both cases we don’t want the classes
		if(document.querySelector('.thisone')){
			document.querySelector('.thisone').classList.remove('thisone');
			document.querySelector('table').classList.remove('typing');
		}
		
		// If it’s the first character that’s been typed
		if(this.value.length == 1) {
			highlightRow(e.key);
		}
		// if it’s the second
		if(this.value.length == 2) {
			addToOutput(this, this.value);
		}
	}
	// onsubmit, copy to clipboard
	document.querySelector('form').onsubmit = function(){
		window.setTimeout(function() {
			document.querySelector('textarea').select();
			try {
				var successful = document.execCommand('copy');
				var msg = successful ? 'successful' : 'unsuccessful';
				//console.log('Copying text command was ' + msg);
			  } catch (err) {
				//console.log('Oops, unable to copy');
			  }
		}, 1);
		return false;
	}
})();

// Add a few classes on clever places so we can do some explanatory styling
function highlightRow(e) {
	var trs = document.querySelectorAll('tbody th');
	var i = 0;
	while( i < trs.length ) {
		if (trs[i].innerHTML == e) {
			trs[i].parentElement.classList.add('thisone');
			document.querySelector('table').classList.add('typing');
		}
		i++;
	}
}

// Turn keycombo into character, and send to output
function addToOutput(a, v) {
	a.value = '';
	var tt = [];
	tt[k[0] + k[0]] = 'a';
	tt[k[0] + k[1]] = 'b';
	tt[k[0] + k[2]] = 'c';
	tt[k[0] + k[3]] = 'd';
	tt[k[0] + k[4]] = 'e';
	tt[k[1] + k[0]] = 'f';
	tt[k[1] + k[1]] = 'g';
	tt[k[1] + k[2]] = 'h';
	tt[k[1] + k[3]] = 'i';
	tt[k[1] + k[4]] = 'j';
	tt[k[2] + k[0]] = 'k';
	tt[k[2] + k[1]] = 'l';
	tt[k[2] + k[2]] = 'm';
	tt[k[2] + k[3]] = 'n';
	tt[k[2] + k[4]] = 'o';
	tt[k[3] + k[0]] = 'p';
	tt[k[3] + k[1]] = 'q';
	tt[k[3] + k[2]] = 'r';
	tt[k[3] + k[3]] = 's';
	tt[k[3] + k[4]] = 't';
	tt[k[4] + k[0]] = 'u';
	tt[k[4] + k[1]] = 'v';
	tt[k[4] + k[2]] = 'w';
	tt[k[4] + k[3]] = 'x';
	tt[k[4] + k[4]] = 'y';
	tt[k[5] + k[0]] = 'z';
	tt[k[5] + k[1]] = ' ';
	tt[k[5] + k[2]] = ',';
	tt[k[5] + k[3]] = '.';
	tt[k[5] + k[4]] = '?';
	var newVal = '';
	// A simple check for uppercase
	if (v !== v.toLowerCase()) {
		newVal = tt[v.toLowerCase()].toUpperCase();
	}
	else {
		newVal = tt[v.toLowerCase()];
	}
	var oVal = document.querySelector('textarea').value;
	document.querySelector('textarea').value = oVal + newVal;
}
