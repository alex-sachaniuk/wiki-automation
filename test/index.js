const assert = require('assert');
global.fetch = require('node-fetch');
let {describe, it, after, before} = require('mocha');
let webdriver = require('selenium-webdriver'),
		By = webdriver.By;
		
	describe('Test Suite to verify that "Contents" headings are used as headings on the page', function() {
		let driver;
		this.timeout(30000);
		before(async () => {
			driver = await new webdriver.Builder().forBrowser('chrome').build();
			await driver.get('https://en.wikipedia.org/wiki/Metis_(mythology)');
		});

		after(async () => {
			await driver.quit();
		});
		it('Verify that "Family" heading is used as headings on the page', async () => {
			let link = await driver.findElement(By.xpath('//*[@id="toc"]/ul/li[1]/a/span[2]'));
			let heading = await driver.findElement(By.id('Family'));
			assert.equal(await link.getText(), await heading.getText());
		});

		it('Verify that "Mythology" heading is used as headings on the page', async () => {
			let link = await driver.findElement(By.xpath('//*[@id="toc"]/ul/li[2]/a/span[2]'));
			let heading = await driver.findElement(By.id('Mythology'));
			assert.equal(await link.getText(), await heading.getText());
		});

		it('Verify that "Honours" heading is used as headings on the page', async () => {
			let link = await driver.findElement(By.xpath('//*[@id="toc"]/ul/li[3]/a/span[2]'));
			let heading = await driver.findElement(By.id('Honours'));
			assert.equal(await link.getText(), await heading.getText());
		});

		it('Verify that "References" heading is used as headings on the page', async () => {
			let link = await driver.findElement(By.xpath('//*[@id="toc"]/ul/li[4]/a/span[2]'));
			let heading = await driver.findElement(By.id('References'));
			assert.equal(await link.getText(), await heading.getText());
		});

		it('Verify that "See also" heading is used as headings on the page', async () => {
			let link = await driver.findElement(By.xpath('//*[@id="toc"]/ul/li[5]/a/span[2]'));
			let heading = await driver.findElement(By.id('See_also'));
			assert.equal(await link.getText(), await heading.getText());
		});

		it('Verify that "Further reading" heading is used as headings on the page', async () => {
			let link = await driver.findElement(By.xpath('//*[@id="toc"]/ul/li[6]/a/span[2]'));
			let heading = await driver.findElement(By.id('Further_reading'));
			assert.equal(await link.getText(), await heading.getText());
		});
	});


	describe('Test Suite to verify the headings listed in the "Contents" box have functioning hyperlinks', function() {
		let driver;
		this.timeout(30000);
		before(async () => {
			driver = await new webdriver.Builder().forBrowser('chrome').build();
			await driver.get('https://en.wikipedia.org/wiki/Metis_(mythology)');
		});

		after(async () => {
			await driver.quit();
		});

		it('Verify that "Family" hyperlink works as expected', async () => {
			await driver.findElement(By.xpath('//*[@id="toc"]/ul/li[1]/a')).click();
			let currentURL = await driver.getCurrentUrl().then(async url => {
				return(await url.toString());
			});
			assert.equal(currentURL, 'https://en.wikipedia.org/wiki/Metis_(mythology)#Family');
		});

		it('Verify that "Mythology" hyperlink works as expected', async () => {
			await driver.findElement(By.xpath('//*[@id="toc"]/ul/li[2]/a')).click();
			let currentURL = await driver.getCurrentUrl().then(async url => {
				return(await url.toString());
			});
			assert.equal(currentURL, 'https://en.wikipedia.org/wiki/Metis_(mythology)#Mythology');
		});

		it('Verify that "Honours" hyperlink works as expected', async () => {
			await driver.findElement(By.xpath('//*[@id="toc"]/ul/li[3]/a')).click();
			let currentURL = await driver.getCurrentUrl().then(async url => {
				return(await url.toString());
			});
			assert.equal(currentURL, 'https://en.wikipedia.org/wiki/Metis_(mythology)#Honours');
		});

		it('Verify that "References" hyperlink works as expected', async () => {
			await driver.findElement(By.xpath('//*[@id="toc"]/ul/li[4]/a')).click();
			let currentURL = await driver.getCurrentUrl().then(async url => {
				return(await url.toString());
			});
			assert.equal(currentURL, 'https://en.wikipedia.org/wiki/Metis_(mythology)#References');
		});

		it('Verify that "See also" hyperlink works as expected', async () => {
			await driver.findElement(By.xpath('//*[@id="toc"]/ul/li[5]/a')).click();
			let currentURL = await driver.getCurrentUrl().then(async url => {
				return(await url.toString());
			});
			assert.equal(currentURL, 'https://en.wikipedia.org/wiki/Metis_(mythology)#See_also');
		});

		it('Verify that "Further reading" hyperlink works as expected', async () => {
			await driver.findElement(By.xpath('//*[@id="toc"]/ul/li[6]/a')).click();
			let currentURL = await driver.getCurrentUrl().then(async url => {
				return(await url.toString());
			});
			assert.equal(currentURL, 'https://en.wikipedia.org/wiki/Metis_(mythology)#Further_reading');
		});
	});


	describe('Test Suite to verify in the _Personified concepts_, that "Nike" has a popup that contains correct copy', function() {
		let driver;
		this.timeout(30000);
		before(async () => {
			driver = await new webdriver.Builder().forBrowser('chrome').build();
			await driver.get('https://en.wikipedia.org/wiki/Metis_(mythology)');
		});

		after(async () => {
			await driver.quit();
		});

		it('Verify that "Family" heading is used as heading on the page', async () => {
			// On mouse hover the tooltip appears that is coming from parsed URL, below is an easy way parse a response
			let response = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/Nike_(mythology)');
			let parsed = await response.json();
			// Needed copy was retrived from 'extract' part of the resonse
			assert.equal(await parsed.extract, 'In ancient Greek religion, Nike was a goddess who personified victory. Her Roman equivalent was Victoria.');
		});
	});


	describe('Test Suite to verify in the _Personified concepts_, if you click on "Nike", it will take you to a page that displays a family tree', function() {
		let driver;
		this.timeout(30000);
		before(async () => {
			driver = await new webdriver.Builder().forBrowser('chrome').build();
			await driver.get('https://en.wikipedia.org/wiki/Metis_(mythology)');
		});

		after(async () => {
			await driver.quit();
		});

		it('Verify that successfully landed on the "Family Tree" part of the page', async () => {
			// Go to _Personified concepts_ and click on Nike
			await driver.findElement(By.xpath('//*[@id="mw-content-text"]/div/table[1]/tbody/tr[6]/td/div/ul/li[13]/a')).click();
			// Click on Family_tree in Contents list
			await driver.findElement(By.xpath('//*[@id="toc"]/ul/li[7]/a')).click();
			// Get current URL
			let currentURL = await driver.getCurrentUrl().then(async url => {
				return(await url.toString());
			});
			// Verify that Current URL matches Family Tree URL
			assert.equal(currentURL, 'https://en.wikipedia.org/wiki/Nike_(mythology)#Family_tree');
		});
	});