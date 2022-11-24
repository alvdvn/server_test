function format2(n, currency) {
    return  n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + currency;
}
function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

module.exports = {format2,getDaysInMonth};