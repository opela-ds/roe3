const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (let seed = 74; seed <= 83; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);
    
    const values = await page.$$eval('td', tds =>
      tds.map(td => parseInt(td.textContent)).filter(n => !isNaN(n))
    );

    const pageSum = values.reduce((acc, val) => acc + val, 0);
    console.log(`Seed ${seed}: ${pageSum}`);
    totalSum += pageSum;
  }

  console.log(`✅ Total Sum: ${totalSum}`);
  await browser.close();
})();
