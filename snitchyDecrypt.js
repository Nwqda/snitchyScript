/* snitchyDecrypt.js (v1.0)
 * @author     Naqwada (RuptureFarm 1029) <naqwada@pm.me>
 * @license    MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @docs       https://github.com/Naqwa/SnitchyScript
 * @Website:   https://samy.link/
 * @Linkedin:  https://www.linkedin.com/in/samy-younsi/
 * @note       FOR EDUCATIONAL PURPOSE ONLY.
 */

const snitchyPic = document.getElementById('snitchyPic');
const snitchyCanvas = document.getElementById('snitchyCanvas');
let dctx = snitchyCanvas.getContext('2d');
snitchyPic.addEventListener('change', decryptLoot, false);

function decryptLoot(e){
    const reader = new FileReader();
    reader.onload = function(event){
        let img = new Image();
        img.onload = function(){
            console.log('img loaded');
            snitchyCanvas.width = img.width;
            snitchyCanvas.height = img.height;
            dctx.drawImage(img,0,0);
            let decodeData = dctx.getImageData(0, 0, snitchyCanvas.width, snitchyCanvas.height);
            for (let i = 0; i < decodeData.data.length; i += 4) {
                if (decodeData.data[i+1] % 10 == 7) {
                    decodeData.data[i] = 0;
                    decodeData.data[i+1] = 0;
                    decodeData.data[i+2] = 0;
                    decodeData.data[i+3] = 255;
                } else {
                    decodeData.data[i+3] = 0;
                }
            }
            dctx.putImageData(decodeData, 0, 0);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}