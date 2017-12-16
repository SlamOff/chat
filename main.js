$(document).ready(function() {
	var container = $('.chat_container');
	$('.start').click(function(){
		container.show();
	});
	// Контейнер
	

	// Содержимое чата (ВСЕ)
	var chatAll = $('.chat_main');
	chatAll.mCustomScrollbar();
	// Содержимое чата (По отдельности)
	var chatReg = $('.chat_main_reg');
	var chatMessage = $('.chat_main_message');
	var chatRating = $('.chat_main_rating');

	var chatDialog = $('.chat_dialog');

	$(container).on('click', '.mute', function(){
		$(this).toggleClass('muted');
	});
	$(container).on('click', '.close', function(){
		container.removeClass('rolled');
		$('.chat_quit_black').show();
	});
	$(container).on('click', '.quit', function(){
		container.hide();
	});
	$(container).on('click', '.no_quit', function(){
		$('.chat_quit_black').hide();
	});
	$(container).on('click', '#mail', function(){
		$('.chat_mail_black').show();
	});
	$(container).on('click', '.no_mail', function(){
		$('.chat_mail_black').hide();
	});
	autosize($('.textarea_size'));
	$(container).on('click', '.chat_main_reg .submit', function(e){
		e.preventDefault();
		if( $('.form').valid() ){
			chatAll.mCustomScrollbar('destroy');
			chatReg.hide();
			chatMessage.show();
		}
	});
	chatDialog.mCustomScrollbar();
	$('.roll').click(function(){
		container.removeClass('resizable');
		container.toggleClass('rolled');
		//container.style.height = 'auto';
		if(container.hasClass('rolled')){
			//$('star br').hide();
			$(this).css('border', '0');
			this.innerHTML = '<img src="img/unroll.png">';
			container.height('auto');
		}
		else{
			//checkHeight();
			$(this).css('border-bottom', '1px solid #fff');
			this.innerHTML = '';
			if($(window).width() < 576){
				container.height('100%');
			}
		}
	});
		// завершение/возобновление чата
	$('.chat_end').click(function(){
		
		//checkHeight();
		var thanks = $('.thanks');
		thanks.toggle();
		var messageInput = $('.chat_user_message input');
		messageInput.attr('placeholder', 'Чат завершен');
		messageInput.attr('disabled', 'disabled');
		this.textContent = 'Возобновить чат';
		$('.chat_user_message .send').css('border-left-color', '#cdcdcd');
		if($('.thanks').is(':hidden')){
			messageInput.removeAttr('disabled');
			$('.chat_user_message .send').css('border-left-color', '#e50000');
			messageInput.attr('placeholder', 'Введите Ваше сообщение');
			this.textContent = 'Завершить чат';
			messageInput.focus();
		}
		else{
			//checkHeight();
		}
	});
	// следующие шаги
	var rating = $('.first_rating');
	var ratingNext = $('.next_rating');
	var rating2 = $('.rating2');
	var rating3 = $('.rating3');
	var rating4 = $('.rating4');
	var rating5 = $('.rating5');
	var ratingFinal = $('.final_rating');
	var rateWrapper = $('.dialog');
	function newContent(contentHide, contentShow){
		chatAll.mCustomScrollbar('destroy');
		contentHide.hide();
		contentShow.show();
		chatAll.mCustomScrollbar();
	};
	$('#rate').click(function(){
		newContent(chatMessage, chatRating);
	});

	container.on('click', '#next_rate', function(){
		newContent(rating, rating2);
	});
	container.on('click', '.rate_2', function(){
		newContent(rating2, rating3);
	});
	container.on('click', '.rate_3', function(){
		newContent(rating3, rating4);
	});
	container.on('click', '.rate_4', function(){
		newContent(rating4, ratingFinal);
	});
	container.on('click', '.done', function(){
		switch (this.textContent) {
			case '1':
				$(this).closest('.rating').hide();
				rating.show();
				break;
			case '2':
				$(this).closest('.rating').hide();
				rating2.show();
				break;
			case '3':
				$(this).closest('.rating').hide();
				rating3.show();
				break;
			case '4':
				$(this).closest('.rating').hide();
				rating4.show();
				break;
		}
	});

	// оценка оператора
		var stars = document.querySelectorAll('.star');
		var stars2 = Array.prototype.slice.call(stars);
		var cancel = false;
		function changeColor(pict, index){
			for(var l = 0; l < stars.length; l++){
				stars[l].style.backgroundImage = 'url(' + 'img/unranked.png' + ')';
			}
			for(var m = 0; m <= index; m++){
				stars[m].style.backgroundImage = 'url(' +  pict + ')';
			}
		}
		stars2.map(function(el, ind){
			el.onmouseover = function(){
				if(!cancel){
					changeColor('img/ranked.png', ind);
				}
			}
			el.onclick = function(){
				cancel = true;
				changeColor('img/ranked.png', ind);
			}
			
			el.onmouseout = function(){
				if(!cancel){
					changeColor('img/unranked.png', ind);
				}
			}
		});
			//$('.chat_wrapper_main').css('display', 'flex');
		$('.smile').click(function(e){
			e.preventDefault();
		});
		$('body').on('click', function(e){
			$('.smile_container').removeClass('shown');
			if(e.target.classList.contains('chat_smiles') || e.target.classList.contains('smile_container')){
				$('.smile_container').addClass('shown');
			}
		});
	

	

	// валидация
	var locationURL = window.location.pathname;
	if ( locationURL == "/ua" ) {
		var validationName = "Це поле обов'язкого для заповнення";
		var validationNameMax = "Від 2 до 16 літер";
		var validationPhone = "Невірний формат номеру";
		var validationEmail = "Введите вірний E-mail";
	}
	else {
		var validationName = "Это поле обязательно для заполнения";
		var validationNameMax = "От 2 до 16 букв";
		var validationPhone = "Неправильный формат номера";
		var validationEmail = "Введите корректный E-mail";
	}
	$('.form').validate({
		errorPlacement: function(error, element) {
			if (element.attr("name") == "name" ){
				error.insertAfter(".form #name p");
			}
			else if (element.attr('name') == 'phone' ){
				error.insertAfter('.form #tel p');
			}
		},
		rules: {
			name: {
				required: true,
				minlength: 2,
				maxlength: 16
			},
			phone: {
				required: true,
				digits: true
			},
			email: {
				required: true,
				email: true
			},
			checkbox: {
				required: true
			}
		},
		messages: {
			name: {
				required: validationName,
				minlength: validationNameMax,
				maxlength: validationNameMax
			},
			email: {
				required: validationNameMax,
				email: validationEmail
			},
			phone: {
				required: validationName,
				digits: validationPhone
			}
		}
	});
	
	var checkBox = $('#checkbox input');

	$('#checkbox').click(function(){
		if(checkBox.is(':checked')){
			$(this).find('.mask').css('background-color', '#afafaf');
		}
		else {
			$(this).find('.mask').css('background-color', '#fff');
		}
	});

	
	$('body').on('click', '.smile_container', function(e){
		if(e.target.classList.contains('smile')){
			this.classList.remove('shown');
		}
		else if (e.target == this){
			this.classList.add('shown');
		}
		else if (!e.target){
			this.classList.remove('shown');
		}
		else {
			this.classList.remove('shown');
		}
	});

	// var chat = document.querySelector('.chat_main');
	var chatContainer = document.querySelector('.chat_container');
	var chatMain = document.querySelector('.chat_main');
	// var chatLast = document.querySelector('.chat_last');
	//var chatLast;
	//console.log(chatMain);
	
	var chatHeigth = container.height();
	var resizer = document.querySelector('.resizer');
	resizer.addEventListener('mousedown', initDrag, false);
	//resizer.addEventListener('mousedown', doDrag, false);
	var startX, startY, startWidth, startHeight;
	var containerHeight;

	// function getHeight(){
	// 	containerHeight = parseInt(getComputedStyle(container).height);
	// 	return containerHeight;
	// }
	// var variableHeight = getHeight();
	//$('.resizer').click(getHeight);
	// отцентровка контейнера, если его высота не больше высоты окна
	function checkHeight(){
		if(window.innerHeight <= containerHeight){
			//wrap.css('align-items', 'stretch');
		}
		else {
			//wrap.css('align-items', 'center');
		}
	}
	checkHeight();
	$('.submit').click(function(){
		checkHeight();
		$('.chat_wrapper').css('align-items', 'stretch');
	});
	// ресайзер чата
	function initDrag(e) {
		startX = e.clientX;
		startY = e.clientY;
		startWidth = parseInt(getComputedStyle(chatContainer).width, 10);
		startHeight = parseInt(getComputedStyle(chatContainer).height, 10);
		//console.log(getComputedStyle(chatContainer).width);
		document.documentElement.addEventListener('mousemove', doDrag, false);
		document.documentElement.addEventListener('mouseup', stopDrag, false);
		//checkHeight();
		chatContainer.classList.add('resizable');
	}

	function doDrag(e) {
		//console.log(chatLast);
		chatContainer.style.width = (startWidth + startX - e.clientX) + 'px';
		chatContainer.style.height = (startHeight + startY - e.clientY) + 'px';
		//console.log('CX :' + e.clientX + '// SX:' + startX);
		startHeight2 = parseInt(getComputedStyle(chatMain).height);
		chatMain.style.height = startHeight2 + startY - e.clientY + 'px';
		//console.log(startY - e.clientY + 'px');
		console.log(chatMain.style.height);
		//console.log('startW: ' + startWidth + '/n w: ' + getComputedStyle(chatContainer).width);
		// if(chatMain){
		// 	//chatMain.style.height = (startHeight + e.clientY - startY) + 'px';
		// }
		// else{
		// 	//document.querySelector('.chat_last').style.height = (startHeight + e.clientY - startY) + 'px';
		// }
		checkHeight();
	}

	function stopDrag(e) {
		document.documentElement.removeEventListener('mousemove', doDrag, false);
		document.documentElement.removeEventListener('mouseup', stopDrag, false);
		checkHeight();
	}







});






















































































	
/*
				$('.roll').click(function(){
			$('.chat_container').removeClass('resizable');
			//chatContainer.style.width = "auto";
			chatContainer.style.height = 'auto';
			wrap.toggleClass('closed_chat');
			if(wrap.hasClass('closed_chat')){
				$(chat).hide();
				wrap.css('align-items', 'flex-end');
				$('.chat_user_message, .chat_user_footer').hide();
				//$('.chat_container .chat_main, .chat_container .chat_user_message, .chat_container .chat_user_footer').hide();
				// $('.chat_container .chat_header *, .chat_container .chat_header').show();
				$('star br').hide();
				$(this).css('border', '0');
				this.innerHTML = '<img src="img/unroll.png">';
			}
			else{
				$(chat).show();
				$('.chat_container').addClass('resizable');
				$('.chat_user_message, .chat_user_footer').show();
				$('.no_message').css('align-items', 'center');
				checkHeight();
				getHeight();
				$('.chat_quit_black').hide();
				$(this).css('border-bottom', '1px solid #fff');
				this.innerHTML = '';
				//$('.chat_main').height('auto');
			}
		});
		// завершение/возобновление чата
		$('.chat_end').click(function(){
			checkHeight();
			$('.message_container').css('height', containerHeight);
			var thanks = $('.thanks');
			thanks.toggle();
			var messageInput = $('.chat_user_message input');
			messageInput.attr('placeholder', 'Чат завершен');
			messageInput.attr('disabled', 'disabled');
			this.textContent = 'Возобновить чат';
			$('.chat_user_message .send').css('border-left-color', '#cdcdcd');
			if($('.thanks').is(':hidden')){
				messageInput.removeAttr('disabled');
				$('.chat_user_message .send').css('border-left-color', '#e50000');
				messageInput.attr('placeholder', 'Введите Ваше сообщение');
				this.textContent = 'Завершить чат';
				messageInput.focus();
			}
			else{
				checkHeight();
			}
		});
		// следующие шаги
		var rating = $('.first_rating');
		var ratingNext = $('.next_rating');
		var rating2 = $('.rating2');
		var rating3 = $('.rating3');
		var rating4 = $('.rating4');
		var rating5 = $('.rating5');
		var ratingFinal = $('.final_rating');
		var rateWrapper = $('.dialog');
		function newContent(content){
			$('.chat_main').mCustomScrollbar('destroy');
			rateWrapper.empty();
			chatContainer.append(resizer);
			content.show();
			rateWrapper.append(content);
			
			$('.chat_main').mCustomScrollbar();
		};
		$('#rate').click(function(){
			$('.chat_main').addClass('chat_last');
			rateWrapper.addClass('no_message');
			$('.dialog').height('auto');
			checkHeight();
			getHeight();
			
			//chatLast = document.querySelector('.chat_last');
			$('.message_container').css('height', 'auto');
			wrap.css('align-items', 'center');
			$('.chat_user_message').remove();
			$('.chat_user_footer').remove();
			rateWrapper.css({
				'backgroundColor' : '#fff',
				'paddingBottom' : '40px',
				//'minHeight' : '1px',
				'border' : 'none'
			});
			$('.chat_main').mCustomScrollbar('destroy');
			newContent(rating);
		});

		$('#next_rate').click(function(){
			newContent(rating2);
		});
		$('.rate_2').click(function(){
			newContent(rating3);
		});
		$('.rate_3').click(function(){
			newContent(rating4);
		});
		$('.rate_4').click(function(){
			newContent(rating5);
		});
		$('.rate_5').click(function(){
			newContent(ratingFinal);
		});

		$('.chat_main').mCustomScrollbar();
			}
			var chat = document.querySelector('.chat_main');
		var chatContainer = document.querySelector('.chat_container');
		var chatMain = document.querySelector('.chat_start .chat_main');
		var chatLast = document.querySelector('.chat_last');
		//var chatLast;
		//console.log(chatMain);
		
		var chatHeigth = $('.chat_container').height();
		var resizer = document.querySelector('.resizer');
		resizer.addEventListener('mousedown', initDrag, false);
		//resizer.addEventListener('mousedown', doDrag, false);
		var startX, startY, startWidth, startHeight;
		var containerHeight;

		function getHeight(){
			containerHeight = parseInt(getComputedStyle(chatContainer).height);
			return containerHeight;
		}
		var variableHeight = getHeight();
		//$('.resizer').click(getHeight);
		// отцентровка контейнера, если его высота не больше высоты окна
		function checkHeight(){
			if(window.innerHeight <= containerHeight){
				wrap.css('align-items', 'stretch');
			}
			else {
				wrap.css('align-items', 'center');
			}
		}
		checkHeight();
		$('.submit').click(function(){
			checkHeight();
			getHeight();
			$('.chat_wrapper').css('align-items', 'stretch');
		});
		// ресайзер чата
		function initDrag(e) {
			startX = e.clientX;
			startY = e.clientY;
			chatContainer.classList.add('resizable');
			startWidth = parseInt(document.defaultView.getComputedStyle(chatContainer).width, 10);
			startHeight = parseInt(document.defaultView.getComputedStyle(chatContainer).height, 10);
			document.documentElement.addEventListener('mousemove', doDrag, false);
			document.documentElement.addEventListener('mouseup', stopDrag, false);
			checkHeight();
			getHeight();
		}

		function doDrag(e) {
			//console.log(chatLast);
			chatContainer.style.width = (startWidth + e.clientX - startX) + 'px';
			chatContainer.style.height = (startHeight + e.clientY - startY) + 'px';
			if(chatMain){
				//chatMain.style.height = (startHeight + e.clientY - startY) + 'px';
			}
			else{
				//document.querySelector('.chat_last').style.height = (startHeight + e.clientY - startY) + 'px';
			}
			checkHeight();
			getHeight();
		}

		function stopDrag(e) {
			document.documentElement.removeEventListener('mousemove', doDrag, false);
			document.documentElement.removeEventListener('mouseup', stopDrag, false);
			checkHeight();
			getHeight();
		}
		
		
		
		// оценка оператора
		var stars = document.querySelectorAll('.star');
		var stars2 = Array.prototype.slice.call(stars);
		var cancel = false;
		function changeColor(pict, index){
			for(var l = 0; l < stars.length; l++){
				stars[l].style.backgroundImage = 'url(' + 'img/unranked.png' + ')';
			}
			for(var m = 0; m <= index; m++){
				stars[m].style.backgroundImage = 'url(' +  pict + ')';
			}
		}
		stars2.map(function(el, ind){
			el.onmouseover = function(){
				if(!cancel){
					changeColor('img/ranked.png', ind);
				}
			}
			el.onclick = function(){
				cancel = true;
				changeColor('img/ranked.png', ind);
			}
			
			el.onmouseout = function(){
				if(!cancel){
					changeColor('img/unranked.png', ind);
				}
			}
		});
			//$('.chat_wrapper_main').css('display', 'flex');
			$('.smile').click(function(e){
			e.preventDefault();
		});
		$('body').on('click', function(e){
			$('.smile_container').removeClass('shown');
			if(e.target.classList.contains('chat_smiles') || e.target.classList.contains('smile_container')){
				$('.smile_container').addClass('shown');
			}
		});
	});
	

	

	// валидация
	var locationURL = window.location.pathname;
	if ( locationURL == "/ua" ) {
		var validationName = "Це поле обов'язкого для заповнення";
		var validationNameMax = "Від 2 до 16 літер";
		var validationPhone = "Невірний формат номеру";
		var validationEmail = "Введите вірний E-mail";
	}
	else {
		var validationName = "Это поле обязательно для заполнения";
		var validationNameMax = "От 2 до 16 букв";
		var validationPhone = "Неправильный формат номера";
		var validationEmail = "Введите корректный E-mail";
	}
	$('.form').validate({
		errorPlacement: function(error, element) {
			if (element.attr("name") == "name" ){
				error.insertAfter(".form #name p");
			}
			else if (element.attr('name') == 'phone' ){
				error.insertAfter('.form #tel p');
			}
		},
		rules: {
			name: {
				required: true,
				minlength: 2,
				maxlength: 16
			},
			phone: {
				required: true,
				digits: true
			},
			email: {
				required: true,
				email: true
			},
			checkbox: {
				required: true
			}
		},
		messages: {
			name: {
				required: validationName,
				minlength: validationNameMax,
				maxlength: validationNameMax
			},
			email: {
				required: validationNameMax,
				email: validationEmail
			},
			phone: {
				required: validationName,
				digits: validationPhone
			}
		}
	});
	
	var checkBox = $('#checkbox input');

	$('#checkbox').click(function(){
		//console.log(checkBox.is(':checked'));
		if(checkBox.is(':checked')){
			$(this).find('.mask').css('background-color', '#afafaf');
		}
		else {
			$(this).find('.mask').css('background-color', '#fff');
		}
	});
	
	$('.frame').resize(function(){
		console.log(1);
	});
	// ресайз текстареа
	autosize($('.textarea2'));

	
	// $('.smile_container').click(function(e){
	// 	//console.log(e.relatedTarget);
	// 	if(e.target.classList.contains('smile')){
	// 		this.classList.remove('shown');
	// 	}
	// 	else if (e.target == this){
	// 		this.classList.add('shown');
	// 	}
	// 	else if (!e.target){
	// 		this.classList.remove('shown');
	// 	}
	// 	else {
	// 		this.classList.remove('shown');
	// 	}

	// });

});


*/