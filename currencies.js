const axios= require(`axios`);

async function getAllCurrencies() {
    const iso4217 = (await axios.get('https://pkgstore.datahub.io/core/currency-codes/codes-all_json/data/029be9faf6547aba93d64384f7444774/codes-all_json.json')).data;
    const response = await axios.get('https://api.monobank.ua/bank/currency', {
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
    }});
   const result = [];
    for (let item of response.data) {
        const currencyA = iso4217.find((i) => i.NumericCode === item.currencyCodeA);
        const currencyB = iso4217.find((i) => i.NumericCode === item.currencyCodeB);
        // const line = currencyA.AlphabeticCode + ';' + currencyB.AlphabeticCode + ';' + (item.rateBuy || `-`) + ';' + (item.rateSell || `-`) + ';' + (item.rateCross || `-`);
        // console.log(line);
        //
        //lines.push(line);
        result.push({
        currencyA: currencyA.AlphabeticCode,
        currencyB: currencyB.AlphabeticCode,
        rateBuy: item.rateBuy || undefined,
        rateSell: item.rateSell || undefined,
        rateCross: item.rateCross || undefined,
    });}
        return result;
    }



    module.exports = {getAllCurrencies};
