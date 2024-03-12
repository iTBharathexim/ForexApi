const formateCurrency = (number, currencyType) => {

    try {
        return number.toLocaleString('en-US', { style: 'currency', currency: currencyType });
    }
    catch (error) {
        var nf = Intl.NumberFormat();
        return nf.format(number)
    }
}

module.exports = {
    formateCurrency,
}