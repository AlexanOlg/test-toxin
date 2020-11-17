import "./data-picker.scss";

$(".js-data-picker__input_masked").mask("00.00.0000", {
  translation: { 0: { pattern: /[0-9*]/ } },
});