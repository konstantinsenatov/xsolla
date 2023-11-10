$(document).ready(function() {
	$('.faq__item-title').click(function(event) {
		if($('.faq__content').hasClass('one')){
			$('.faq__item-title').not($(this)).removeClass('active');
			$('.faq__item-text').not($(this).next()).slideUp(300);
		}
		$(this).toggleClass('active').next().slideToggle(300);
	});
}); 