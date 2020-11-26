# tinG

tinG can mean "this is not Genially". Is a javascript library to create interactive labels that you can insert in your webpages, or LMSs like Moodle.

Here is an example of how to use it in Moodle. You need to insert the following code in any element that admits HTML. You also need to include the tinG function which is in tinG.js. You can either insert the function just after calling the function, or if you are using Moodle include it in the common header, at site level.
            
   
<p><canvas id="mycanvas"> Sorry. Your browser does not support HTML5 canvas element. </canvas></p>
<script type="text/javascript">// <![CDATA[
tinG("mycanvas", 
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
// ]]></script>

