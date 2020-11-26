              }           

            }

            

            render();

     

        }, false);



        function render(){

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

       

          

          for(var x=0;x<objects.length;x++)

          {

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

