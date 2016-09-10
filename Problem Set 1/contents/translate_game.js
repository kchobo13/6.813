// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	

	// Your code here
	var key_array = Object.keys(current_dict);
	var english_key = key_array[Math.floor(key_array.length * Math.random())];
	var random_word = current_dict[english_key];
	
	//Sets html for sections in part 2
	$('#spanish').html(lang_from);
	$('#english').html(lang_to);
	$('#word').html(random_word);
	$('#input').focus();
	
	//Click listener for the submit button
	$('#submit').click( function() {click_function()});
	
	//Autocomplete widget for the user input
	$('#input').autocomplete({
		source: key_array,
		minLength: 2,
		select: function( event, ui ) {
			var terms = split( this.value );
			terms.pop();
			terms.push(String(ui.item.value));
			this.value = terms;
			click_function();
			return false;
		}
	});
	
	//Enter key default of submitting the form
	$('#input').keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			click_function();
			$('#input').autocomplete("close");
		}
	});
	
	//Helper functions used in the JQuery code
	//Split function used from jQuerty UI from the Autocomplete Wdiget page
	function split( val ) {
      return val.split( /,\s*/ );
    }
	
	//actual click function for the submit button
	function click_function() {
		var answer = $('#input').val();
		
		if (answer == english_key) {
			$('#entry').after(
			"<tr class=\"correct\"> <td>" + random_word + "</td>" + 
			"<td>" + answer + "</td>" +
			"<td> <span class=\"ui-icon ui-icon-check\"></span> </td>" );			
		} else {
			$('#entry').after	(
			"<tr class=\"incorrect\"> <td>" + random_word + "</td>" + 
			"<td>" + answer + "</td>"+
			"<td>" + english_key + "</td>" );
		};
		
		english_key = key_array[Math.floor(key_array.length * Math.random())];
		random_word = current_dict[english_key];
		$('#word').html(random_word);
		$('#input').val('');
		$('#input').focus();
	};
});
