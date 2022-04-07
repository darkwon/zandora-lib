import module from '../../module.js';

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
        tooltip.dataset.tooltipContainer = 'true'
        
        tooltip.innerHTML = html;
        
        let pos = mousePosition();
        //console.log(pos[0], pos[1])
        //tooltip.setAttribute('style','top: '+ Math.round(obj._boundsRect.y - offset) +'px; left:  '+ Math.round(obj._boundsRect.x + 100) +'px;')
        tooltip.setAttribute('style','top: '+ pos[0] +'; left:  '+ pos[1] +';')
        document.body.appendChild(tooltip); 
        return tooltip;
    };

    /**
     * @param {string} css -   CSS Class of our tooltip to dispose of
     */
    static delete(css){
        $('.'+ css).remove();
    };
}

function mousePosition(mouseEvent){
    var w = window.innerWidth;
    var h = window.innerHeight;
    //console.log('Width: '+ w + ' Height: ' + h)
    var xpos = window.event.x
    var ypos = window.event.y
    let posX, posY;
    if ((w / 2) > xpos){
        if ((h/2) > ypos){
            posY  = ypos + 25 + 'px';
            posX = xpos + 13 +'px';                       
        }
        else if ((h/2) < ypos){
            posY = ypos - 13 + 'px';
            posX = xpos + 13 +'px'; 
        }
    }
    else if ((w / 2) < xpos) {
        if ((h/2) > ypos) {
            posY = ypos + 25 + 'px';
            posX = xpos - 335 + 'px';  
        }
        else if ((h/2) < ypos){
            posY = ypos  + 'px';
            posX = xpos - 335 + 'px'; 
        }

    }
    let pos = [posY,posX]
    return pos
}