import puppeteer from 'puppeteer';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

async function runTests(url) {
  const sampleText = "This is a simple test to check if LangChain's text splitter is working correctly.";
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 30,  // maximum chunk size
    chunkOverlap: 5 
  });
  
  const chunks = await splitter.splitText(sampleText);
  console.log("LangChain Text Splitter Output:");
  console.log(chunks);

  // Test Puppeteer
  const browser = await puppeteer.launch({
    headless: false, 
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  
  const page = await browser.newPage();
  // Set a realistic user agent
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
  
  await page.goto(url, { waitUntil: "domcontentloaded" });
  const title = await page.title();
  console.log("Puppeteer Page Title:");
  console.log(title);
  
  await browser.close();
}

// Example usage: replace the URL with one you want to test
runTests("https://docs.rocket.chat/docs/deploy-rocketchat").catch(err => console.error(err));
