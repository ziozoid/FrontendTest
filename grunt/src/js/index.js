function jsonpCallback(data){
	if(!!pp.retrieveForm){
		ProntoProntoGeneralClass.prototype._resetForm(data);			
	}else{
		pp._drawAutocomplete(data);
	}
}

function ProntoProntoGeneralClass (options) {

	var defaults = {
		url : null,
		mainInput: null
	}

	var self = $.extend(this, defaults, options);
	
}

ProntoProntoGeneralClass.prototype._init = function() {
		
	var self = this;

	self._retrieveAutocomplete();
};

ProntoProntoGeneralClass.prototype._retrieveAutocomplete = function(obj) {
	
	var self = obj ? obj : this;
	window.pp = obj ? obj : window.pp;
	$.ajax({
	    type: 'GET',
	    dataType: 'jsonp', 
	    crossDomain: true,
	    url: self.url,
	    success: function (responseData, textStatus, jqXHR) {
       
	    },
	    error: function (responseData, textStatus, errorThrown) {
	       console.log(errorThrown);
	    }
	});

};

ProntoProntoGeneralClass.prototype._drawForm = function(data) {
	var self = this;

	var mainForm = $("<form>")	

	for(o in data){

		var inputCont = $("<div>")
						.addClass("form-group");

		var label = $("<label>")
					.attr({
						for: data[o].label
					})
					.text(data[o].label);

		var input = $("<input>")
					.attr({
						type: data[o].type,
						placeholder: data[o].label,
						id : "PP_" + data[o].label
					})
					.addClass("form-control")
					.data(data[o].rules.length>0 ? data[o].rules : {})
					.off("focus")
					.on("focus", function(){
						var _form_group = $(this).closest(".form-group");

						_form_group.removeClass("has-error has-feedback")
								   .find(".form-control-feedback")
								   .remove();

						_form_group.find(".errorSpan").remove();
					});

		inputCont.append(label, input);

		mainForm.append(inputCont);
	}

	var btn = $("<button>")
			  .attr({
			  	type: "submit"
			  })
			  .addClass("btn btn-default PP_button")
			  .text("INVIA")
			  .off("click")
			  .on("click", function(e){
			  		e.preventDefault(e);
			   		if (self._formValidation()) {
			   			self._form = $(this).closest("form");
			   			self._submitForm();
			   		}
			  });
	
	mainForm.append(btn);	

	$("#formContainer")
						.append(mainForm)
						.addClass("animated bounceInLeft");

};

ProntoProntoGeneralClass.prototype._formValidation = function() {
	
	var self = this;

	var errors = 0;

	$("form div.form-group").each(function(){
		var cont = $(this);
		var input = cont.find("input");
		var rules = input.data();

		if (!!rules) {
			for(i in rules){
				if(!self._validate(input, rules[i])){

					input.parent().addClass("has-error has-feedback");

					var span = $("<span>")
							   .addClass("glyphicon glyphicon-remove form-control-feedback");

					var errorspan = $("<span>")
									.addClass("errorSpan")
									.text(rules[i].msg);

					cont.append(span, errorspan); 			
					errors++;
					break;

				}
			}
		}
	});

	if (errors == 0) 
		return true;
	else
		return false;
};

ProntoProntoGeneralClass.prototype._validate = function(el, rule) {
	var self = this;

	switch(rule.type){
		
		case "required":
			if(el.val()=="")
				return false;
		break;

		case "min_len":
			if(el.val().length < rule.options.val){
				return false;
			}

		break;

		case "max_len":
			if(el.val().length > rule.options.val){
				return false;
			}
		break;

		case "email":
			var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(el.val());
		break;

		case "pattern":
			var re =  /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/; //new RegExp(rule.options.pattern);
			return re.test(el.val());

		case "min":
			if(parseInt(el.val()) < rule.options.val){
				return false;
			}
		break;

		case "max":
			if(parseInt(el.val()) > rule.options.val){
				return false;
			}
		break;

		default:

		break;
	
	}

	return true;
};

ProntoProntoGeneralClass.prototype._submitForm = function() {
	var self = this;

	self._drawAsideEntry();

};

ProntoProntoGeneralClass.prototype._drawAutocomplete = function(data) {
	var self = this;

	var ulList = $("<ul>")
				 .attr("id", "autocompleteList");

	for(o in data){

		var liList = $("<li>")
					 .data({
					 	url: data[o].url,
					 	label: data[o].label
					 })
					 .text(data[o].label);

		ulList.append(liList);
	}

	ulList.insertAfter("#"+self.mainInput);

	self._initAutoComplete();
};

ProntoProntoGeneralClass.prototype._initAutoComplete = function() {
	var self = this;
	var input = document.getElementById(self.mainInput);
	new Awesomplete(input, {list: document.querySelector("#autocompleteList")});
};

ProntoProntoGeneralClass.prototype._resetForm = function(data) {
	var formContainer = $("#formContainer");
	
	if(formContainer.children().length > 0){
		formContainer.removeClass().addClass("animated bounceOutLeft");

		formContainer.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			formContainer.removeClass().html("");
			pp._drawForm(data);
		});
	}else{
		pp._drawForm(data);
	}
	
	
};

ProntoProntoGeneralClass.prototype._drawAsideEntry = function() {
	
	var self = this;

	var _entry = $("<div>")
				 .addClass("_entry");

	entryCounter = $("._entry").length + 1;

	var title = $("<h4>")
				.append("#Sumbission n.<span class='_count'>" + entryCounter+"</span>");
	var close = $("<button>")
				.addClass("close")
				.attr({
					type : "button",
					"aria-label" : "Close"
				})
				.append('<span aria-hidden="true">&times;</span>')
				.off("click")
				.on("click", function(){
					$(this).closest("._entry")
						   .removeClass("fadeInUp")
						   .addClass("bounceOutRight")
						   .on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						   		$(this).slideDown(400, function(){
						   			$(this).remove();
						   			self._recount();
						   		});
						   })
				})
	_entry.append(title, close);

	self._form.find("div.form-group").each(function(){

		var span = $(this).find("input").attr("placeholder");
		var txt = $(this).find("input").val();

		_entry.append("<p><span>"+ span+": </span>"+txt+"<p>");

	});

	$("aside").append(_entry.addClass("animated fadeInUp"));
};

ProntoProntoGeneralClass.prototype._recount = function() {
	$("._entry").each(function(){
		var i = $(this).index();
		$(this).find("._count").text(i+1);
	})
};

/*Initialize the class in document ready*/
$(document).ready(function(){

	window.pp = new ProntoProntoGeneralClass({
		url: "http://prontoproit.github.io/FrontendTest/autocomplete?callback=jsonpCallback",
		mainInput: "mainSearch"
	});

	window.pp._init();

})