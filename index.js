const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
	});

	const page = await browser.newPage();

	try {
		await page.setUserAgent(
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
		);
		await page.goto(
			'https://finance.yahoo.com/quote/LBS=F?p=LBS=F&.tsrc=fin-srch',
			{
				waitUntil: 'domcontentloaded',
				timeout: 0,
			}
		);

		const selector =
			'fin-streamer[data-field="regularMarketPrice"][data-symbol="LBS=F"]';

		const lumberPriceValue = await page.$eval(selector, (el) => el.textContent);

		console.log(lumberPriceValue);

		// const getText = (parent, selector) => {
		// 	return parent.$eval(selector, (el) => el.innerText);
		// };

		// const price = await getText(
		// 	lumberPrice,
		// 	'.symbol-page-header__pricing-price'
		// );

		// const dayChange = await getText(
		// 	lumberPrice,
		// 	'.symbol-page-header__pricing-changes .symbol-page-header__pricing-percent'
		// );
		// const timeStamp = await getText(
		// 	lumberPrice,
		// 	'.symbol-page-header__timestamp'
		// );

		// console.log(
		// 	`Latest lumber price is: ${price} ${dayChange}\n${' '}${timeStamp}`
		// );

		await browser.close();
	} catch (e) {
		console.log(e);
		await browser.close();
	}
})();
