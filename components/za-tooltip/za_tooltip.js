import module from '../../module.js';
var elem, elemCSS, tooltipHeight, tooltipWidth, pos, tip;
//var elem = document.getElementById('board');
const element = {id:''};
export default class ToolTip{
    
    /**
     * @param {Object} obj -   An object to be evaluated
     * @param {string} _id - Optional id field for our tooltip
     * @param {string} css - CSS Class that should be used with the tooltip
     * @param {string} myTemplate -  Path to our handlebars template file to be rendered by the ui
     */
    static create(obj, _id, css, myTemplate){
        const template = Handlebars.compile('{{>"'+ myTemplate +'"}}');
        let html = ''
        html = template({objects : obj},{allowProtoMethodsByDefault: true,allowProtoPropertiesByDefault: true}); 
        let tooltip = document.createElement('div');
        if (_id){
            tooltip.setAttribute('id', _id)
        }
        tooltip.classList.add(css);
        tooltip.dataset.tooltipContainer = ''
        
        tooltip.innerHTML = html;
        
        // Assign variables
        tip = tooltip;
        elemCSS = css;
        if (_id !== null) { 
            elem = document.getElementById(_id);
        }
        else {
            //elem = document.getElementById(_id);
            elem = document.getElementsByClassName(css)
        }
        handleMouseOver(elem);
        document.body.appendChild(tooltip); 
        return tooltip;
    };

    /**
     * @param {string} css -   CSS Class of our tooltip to dispose of
     */
    static delete(css){
        $('.'+ css).remove();
        onMouseLeave;
    };
}

function tipPosition(x,y){
    var w = window.innerWidth;
    var h = window.innerHeight;
    //console.log('Width: '+ w + ' Height: ' + h)
    //var xpos = window.event.x
    var xpos = x;
    var ypos = y;
    //var ypos = window.event.y
    let posX, posY;
    if ((w / 2) > xpos){
        //console.log('Tooltip: Leftside of screen')
        if ((h/2) > ypos){

            posY  = ypos + 25;
            posX = xpos + 13;                      
        }
        else if ((h/2) < ypos){
            if (tooltipHeight < ypos) {
                //console.log('Tooltip: leftside/bottom first step');  
                posY  = ypos - tooltipHeight;
            }
            else {
                //console.log('Tooltip: leftside/bottom second step');  
                posY  = ypos - (h - tooltipHeight);
            }
            posX = xpos + 13; 
        }
    }
    else if ((w / 2) < xpos) {
        //console.log('Tooltip: Rightside of screen')
        if ((h/2) > ypos) {
            //console.log('Tooltip: Righside / top')
            posY  = ypos + 25;
            posX = xpos - tooltipWidth + 13;
            //console.log('Tooltip: TooltipWidth = '+ tooltipWidth)          
        }
        else if ((h/2) < ypos){
            //console.log('Tooltip: Righside / bottom')
            if (tooltipHeight < ypos){
                //console.log('Tooltip: Right/Bottom first step')
                //posY  = ypos - tooltipHeight;
                posY = ypos - 30 - tooltipHeight;
            }
            else {
                //console.log('Tooltip: Right/Bottom second step')
                posY  = ypos - (h - tooltipHeight);
            }
            posX = xpos - tooltipWidth + 13; 
        }
    }
    let pos = [posX,posY]
    //console.log('Window Size is ' + w,h)
    return pos
}

function handleMouseOver(elem, tooltip){

    elem.addEventListener('mousemove',onMouseMove, true);
    elem.addEventListener('mouseleave', onMouseLeave, true);
    elem.addEventListener('mousedown', onMouseDown);
  }

const onMouseMove = {
handleEvent(e){
    var x = e.pageX,
    y = e.pageY;
    pos = tipPosition(x,y);
    tooltipWidth = tip.offsetWidth;
    tooltipHeight = tip.offsetHeight;  
    tip.setAttribute('style','left: '+ pos[0] +'px; top: '+ pos[1] +'px;')
    }
}

const onMouseLeave ={
    handleEvent(){
        //console.log('Tooltip: Starting to remove eventListner')
        try {
        elem.removeEventListener('mousemove', onMouseMove, true);
        elem.removeEventListener('mouseleave', onMouseLeave, true);
        elem.removeEventListener('mousedown', onMouseDown);
        //console.log('Tooltip: Finshed removing eventListners')
        } catch (error) {
        //console.log('Tooltip: Cant find any eventListeners' + error);
        //console.log('Tooltip: Cant find any eventListners')
        }
    }
}

const onMouseDown ={
    handleEvent(){
        $('.'+ elemCSS).remove();
        //console.log('Tooltip: Removing our Tooltip while we drag')
    }
}