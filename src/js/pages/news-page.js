// init Isotope
var initial_items = 9;
var next_items = 3;
var $grid = $('#news-page__row').isotope({
	itemSelector: '.news-page__item',
	layoutMode: 'masonry',
});


// bind filter button click
$('.news-page__buttons').on('click', 'button', function () {
	var filterValue = $(this).attr('data-filter');
	// use filterFn if matches value
	$grid.isotope({filter: filterValue});
	updateFilterCounts();
});
function updateFilterCounts() {
	// get filtered item elements
	var itemElems = $grid.isotope('getFilteredItemElements');
	var count_items = $(itemElems).length;
	
	if (count_items > initial_items) {
		$('#news-page__btn').show();
	}
	else {
		$('#news-page__btn').hide();
	}
	if ($('.news-page__item').hasClass('visible_item')) {
		$('.news-page__item').removeClass('visible_item');
	}
	var index = 0;

	$(itemElems).each(function () {
		if (index >= initial_items) {
				$(this).addClass('visible_item');
		}
		index++;
	});
	$grid.isotope('layout');
}
// change is-checked class on buttons
$('.news-page__buttons').each(function (i, buttonGroup) {
	var $buttonGroup = $(buttonGroup);
	$buttonGroup.on('click', 'button', function () {
		$buttonGroup.find('.is-checked').removeClass('is-checked');
		$(this).addClass('is-checked');
	});
});

function showNextItems(pagination) {
	var itemsMax = $('.visible_item').length;
	var itemsCount = 0;
	$('.visible_item').each(function () {
		if (itemsCount < pagination) {
				$(this).removeClass('visible_item');
				itemsCount++;
		}
	});
	if (itemsCount >= itemsMax) {
		$('#news-page__btn').hide();
	}
	$grid.isotope('layout');
}
// function that hides items when page is loaded
function hideItems(pagination) {
	var itemsMax = $('.news-page__item').length;
	var itemsCount = 0;
	$('.news-page__item').each(function () {
		if (itemsCount >= pagination) {
				$(this).addClass('visible_item');
		}
		itemsCount++;
	});
	if (itemsCount < itemsMax || initial_items >= itemsMax) {
		$('#news-page__btn').hide();
	}
	$grid.isotope('layout');
}
$('#news-page__btn').on('click', function (e) {
	e.preventDefault();
	showNextItems(next_items);
});
hideItems(initial_items);
