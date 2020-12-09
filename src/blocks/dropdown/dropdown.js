const maxNum = 7;
const minNum = 0;

//Функция обработки кликов по дропдауну
$('.dropdown__text').click(function (event) {
    console.log($(this));
    //   const dropdown=$(this).parent('.dropdown');
    //   $(dropdown).toggleClass('dropdown_expanded');
    //   $(dropdown).find('.dropdown__menu').toggleClass('dropdown__menu_showed');
});

//Функция обработки кликов по кнопкам плюс и минус
$('.dropdown__button').click(function (event) {
    const parent = $(this).parent('.dropdown__controls');
    const value = $(parent).find('.dropdown__quantity');
    const menu = $(parent).parent('.dropdown__item').parent('.dropdown__menu')
    const clearButton = $(menu).find('.dropdown__clear')
    item = $(parent).parent('.dropdown__item').data('item');
    type = $(parent).parent('.dropdown__item').data('type')
    val = $(value).text();
    let isCalc = false;
    if (this.textContent == '+') {
        val++;
        isCalc = true;
        $(value).text(val);//присвоение значения параметру
        $(clearButton).removeClass('dropdown__clear_disabled')//включение кнопки "очистить"
        if (val == maxNum) {
            $(this).attr('disabled', true)
        } else if (val == minVal + 1) {
            $(parent).find('#button-minus').removeAttr('disabled')
        }
    } else {
        val--;
        $(value).text(val);
        if (val == minNum) {
            $(this).attr('disabled', true)
            let sum = 0;
            $(menu).find('.dropdown__quantity').each(function () {
                sum += +$(this).text();
            });
            if (sum == 0) $(clearButton).addClass('dropdown__clear_disabled');//отключение кнопки "очистить"
        } else if (val == maxNum - 1) {
            $(parent).find('#button-plus').removeAttr('disabled')
        }
    }
    DropdownText = $(parent).parent('.dropdown__item').parent('.dropdown__menu').parent('.dropdown').find('.dropdown__text');
    dropdownTypeDistribution(DropdownText, isCalc);
});
