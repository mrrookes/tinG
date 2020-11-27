# tinG.li

tinG.li can mean "this is not Genial.ly". Is a javascript library to create interactive labels that you can insert in your webpages, or LMSs like Moodle.

## Usage in Moodle (creating a label):

1. Open a label for editing and add all the images and audio you need.

2. Enable the HTML code. 

3. Insert the canvas element and name it. If you want to use more than one canvas give different names. For example:
   
`<p><canvas id="mycanvas"> Sorry. Your browser does not support HTML5 canvas element. </canvas></p>`

3. Call the tingli function. The arguments are:
 (background)
 - background image. Copy the link from the corresponding image that you attached on step 1.
 - vertical proportion. The label will always use all the width that is allowed, in this argument you specify the hight. For example, if it is a perfect square, the height will be 1. If it is half the size of the width, the height will be 0.5
 (first element)
 - horizontal position. This is a proportion of the width. 0.5, it will be in the center. If you write 0.25 it would be at one fourth from the left border. 0.75 will be at 1/4 of the right border. 
 - vertical position. Same as for the horizontal
 - width. As a proportion of the total width. 0.5 will be half the total size, and so forth.
 - height. The same for height
 - message: What you write here will be displayed as a message when you click on this element.
 - image: The image file for this element. Copy the link from the corresponding image that you attached on step 1.
 - link: URL to go to when you click on the element. This will only work if you leave the message empty.
 - audio: audio to play when you click. Copy here the link to the file you attached on step 1. This will only work if you leave the message and the link empty. 
 - video: video to play when you click. Insert here a youtube link. This will only work if you leave the message, the link and the audio empty.
(second and more elements)
Just repeat what you did for the first element.

Example:

`<script type="text/javascript">``// <![CDATA[`
`tingli("mycanvas", 

                       "background.png",
                       0.4,
                       0.3, 
                       0.5,
                       0.3, 
                       0.5, 
                       "This message will display when you click on the first element. Pechar[X]",
                       "firstelement.png", 
                       "", 
                       "", 
                       "", 
                      0.60, 
                      0.5, 
                      0.3, 
                      0.5, 
                      "This message will display when you click on the second element. Pechar[X]", 
                      "secondelement.png", 
                      "",
                      "",
                      "");
                      
// ]]></script>`

4. If the library is not installed for the whole system "adding to headers" in site administration, you have to include the code. You only need to do this once per page. For example, if you do some labels for the course topics, you only need to include the code in one of them.

Example:

`<script type="text/javascript">// <![CDATA[

tingli("mycanvas", 
                       "background.png",
                       0.4,
                       0.3, 
                       0.5,
                       0.3, 
                       0.5, 
                       "This message will display when you click on the first element. Pechar[X]",
                       "firstelement.png", 
                       "", 
                       "", 
                       "", 
                      0.60, 
                      0.5, 
                      0.3, 
                      0.5, 
                      "This message will display when you click on the second element. Pechar[X]", 
                      "secondelement.png", 
                      "",
                      "",
                      "");
                      
      function tingli(){

      /*La función toma como argumentos los siguientes nombre del elemento canvas, imagen de fondo, altura, en relación al ancho,
      posición horizontal, en relación al tamaño disponible, posición vertical, en relación al tamaño disponible,
      ancho, en relación al tamaño disponible, alto, en relación al tamaño disponible,
      mensaje a mostrar, sólo funciona si no se introdujo ningún link, imagen a mostrar, enlace a un link,     
      enlace a un audio, sólo funciona si no se introdujo mensaje ni link
      enlace a un video,sólo funciona si no se introdujo mensaje, ni link, ni audio
      Estos últimos elementos se repiten para mostrar otros objetos

      Copyright 2020 David González Gándara
      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.

      You should have received a copy of the GNU General Public License
      along with this program.  If not, see <https://www.gnu.org/licenses/>.
      */

        var img = new Image();
        img.src = arguments[1];
        var canvas = document.getElementById(arguments[0]);
        var ctx = canvas.getContext('2d');
        canvas.style.width = '100%';
        canvas.style.height = 600; //alto del canvas, ajustar segun a proporcion da imaxe

        canvas.width = canvas.offsetWidth; 
        canvas.heigth = canvas.offsetHeight;

        var objects=[];

        for(x=3;x<arguments.length;x+=9){
           var new_object = {topX:canvas.width*arguments[x] , 
                               topY:canvas.height*arguments[x+1], 
                               width: canvas.width*arguments[x+2], 
                               height:canvas.heigth*arguments[x+3], 
                               message:arguments[x+4], 
                               image:arguments[x+5],  
                               link:arguments[x+6], 
                               audio:arguments[x+7], 
                               video:arguments[x+8]}; 
           objects.push(new_object);
        }

        var strimg_pref = "objimg"+arguments[0];
        var straudio_pref = "objaudio"+arguments[0];
        var strdiv_pref = "objdiv"+arguments[0];

        for(var x=0;x<objects.length;x++){
          var strimg = strimg_pref+x;
          var straudio = straudio_pref+x;
          var strdiv = strdiv_pref+x;

          window[strimg] = new Image(); 
          window[strimg].src = objects[x].image;
          window[strdiv] = document.createElement("div");
          window[strdiv].style.position = "fixed";

          window[strimg].onload=function(){render();};

          window[strdiv].style.background = "white";
          window[strdiv].style.border = "solid black";  
          window[strdiv].style.color = "black";
          window[strdiv].innerHTML = objects[x].message;
          window[strdiv].style.display = "none"; 
          window[strdiv].style.borderRadius= "15px";
          window[strdiv].style.padding= "15px";
          window[strdiv].onclick=function(){this.style.display = 'none';};
          document.body.appendChild(window[strdiv]);

          if(objects[x].audio != ""){
            window[straudio] = new Audio();
            window[straudio].src = objects[x].audio;
          }
        }

        var highlighted = 100;

        render();

        document.getElementById(arguments[0]).addEventListener("click", function(){
            coords=canvas.relMouseCoords(event);

            for(var x=0;x<objects.length;x++){
              if(coords.x>objects[x].topX && coords.x<objects[x].topX+objects[x].width && coords.y>objects[x].topY && coords.y<objects[x].topY+objects[x].height)
                         {
                if(objects[x].link != "")
                   window.open(objects[x].link,"_blank");
                else if(objects[x].message != ""){
                   window[strdiv_pref+x].style.display="block";
                   window[strdiv_pref+x].style.left=event.pageX;
                   window[strdiv_pref+x].style.top="50%";
                   window[strdiv_pref+x].style.left="50%";
                   window[strdiv_pref+x].style.width="150px";
                }
                else if(objects[x].audio != ""){
                   window[straudio_pref+x].play();
                }
                else if(objects[x].video != ""){
                   window[strdiv_pref+x].style.display="block";
                   window[strdiv_pref+x].style.left=event.pageX;
                   window[strdiv_pref+x].style.top="10%";
                   window[strdiv_pref+x].style.left="10%";
                   window[strdiv_pref+x].style.width="600px";
                   window[strdiv_pref+x].style.height="400px";
   
                   window[strdiv_pref+x].innerHTML = "<iframe width='560' height='315' src='"+objects[x].video+"' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
                }
              }
            }
        }, false);
        document.getElementById(arguments[0]).addEventListener("mousemove", function(){
            coords=canvas.relMouseCoords(event);
            event.target.style.cursor = 'move';
            highlighted = 100;
            for(var x=0;x<objects.length;x++){
              if(coords.x>objects[x].topX && coords.x<objects[x].topX+objects[x].width && coords.y>objects[x].topY && coords.y<objects[x].topY+objects[x].height)
              {    
                highlighted = x;
                console.log("over area"+" "+x+", highlighted = "+highlighted);
                event.target.style.cursor = 'pointer';
              }           
            }
            render();
        }, false);
        function render(){
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          for(var x=0;x<objects.length;x++){
            if(highlighted==x){
              ctx.drawImage(window[strimg_pref+x], objects[x].topX-5,objects[x].topY-5,objects[x].width+10,objects[x].height+10);
            }
            else{
               ctx.drawImage(window[strimg_pref+x], objects[x].topX,objects[x].topY,objects[x].width,objects[x].height);
            }
          }           
        }
        function relMouseCoords(event){
         var totalOffsetX = 0;
         var totalOffsetY = 0;
         var canvasX = 0;
         var canvasY = 0;
         var currentElement = this;
         do{
          totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
          totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
         }
         while(currentElement = currentElement.offsetParent)
         canvasX = event.pageX - totalOffsetX;
         canvasY = event.pageY - totalOffsetY;
         return {x:canvasX, y:canvasY}
        }
   HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;
}

// ]]></script>`




