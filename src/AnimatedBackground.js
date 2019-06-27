export function anim(){
    var rgbToHex = function (rgb) { 
      var hex = Number(rgb).toString(16);
      if (hex.length < 2) {
           hex = "0" + hex;
      }
      return hex;
    };

    var fullColorHex = function(r,g,b) {   
      var red = rgbToHex(r);
      var green = rgbToHex(g);
      var blue = rgbToHex(b);
      return "#"+red+green+blue;
    };    

    let bud = document.getElementsByTagName("body")[0];
    bud.style.backgroundColor = "#000000";

    let b = 45;
    let r = 0;
    let g = 0;
    let step = 1;

    let setR = (s) => r += s
    let getR = () => r
    let setG = (s) => g += s
    let getG = () => g
    let set = setR
    let get = getR
    let isR = true

    setInterval(() => {
      bud.style.backgroundColor = fullColorHex(r,g,b);
      
      set(step)
      if (get() > 100) {
        step = -1;
      } else if (get() < 1) {
        step = 1;
        if (isR) {
          set = setG
          get = getG
          isR = false
        } else {
          set = setR
          get = getR
          isR = true
        }
      }
    }, 60);
  }