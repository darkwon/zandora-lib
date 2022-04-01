import module from '../../module.js';

// Controls the position of the tooltip

export default class ToolTip{

    static create(obj, type, myTemplate){
        const template = Handlebars.compile('{{>"modules/zandora-lib/templates/ui/ui-token-tooltip.hbs"}}');
        let html = ''

        if (type == 'Token5e'){
           html = template({Token5e: obj},{allowProtoMethodsByDefault: true,allowProtoPropertiesByDefault: true}); 
        }
        
        let tooltip = document.createElement('div');
        tooltip.setAttribute('id','za-tooltip')
        tooltip.innerHTML = html;
        tooltip.classList.add('za-tooltip');
        //console.log(obj._boundsRect.x)
        let offset = '75'
        tooltip.setAttribute('style','top: '+ Math.round(obj._boundsRect.y - offset) +'px; left:  '+ Math.round(obj._boundsRect.x + 100) +'px;')

        document.body.appendChild(tooltip);
        return tooltip;
    };

    static delete(){
        $('.za-tooltip').remove();
    };
}
export function initTooltip(html) {
    const tooltips = Array.from(document.querySelectorAll('[data-tooltip-container]'));
    var tooltipHeight, tooltipWidth

    tooltips.map(tooltip => {
        tooltip.addEventListener('mouseover', handleMouseOver);
    })

    function handleMouseOver() {
        // call the removal of a previous tooltip if they are still open.
        removeToolTipBox();
        const tooltipbox = createTooltipBox(this);

        handleMouseMove.tooltipbox = tooltipbox;
        this.addEventListener('mousemove', handleMouseMove);

        handleMouseLeave.tooltipbox = tooltipbox;
        handleMouseLeave.element = this;
        this.addEventListener('mouseleave', handleMouseLeave);
    }

    const handleMouseLeave = {
        handleEvent() {
            this.tooltipbox.remove();
            this.element.removeEventListener('mousemove', handleMouseMove);
            this.element.removeEventListener('mouseleave', handleMouseLeave);
            removeToolTipBox()
        }
    }

    const handleMouseMove = {
        handleEvent(e) {
            var w = window.innerWidth;
            var h = window.innerHeight;
            let xpos = e.clientX,
            ypos = e.clientY;

            if ((w / 2) > xpos){
                if ((h/2) > ypos){
                    this.tooltipbox.style.top = ypos + 25 + 'px';
                    this.tooltipbox.style.left = xpos + 13 +'px';                      
                }
                else if ((h/2) < ypos){
                    if (tooltipHeight < ypos) {
                        this.tooltipbox.style.top = ypos - tooltipHeight + 'px';
                    }
                    else {
                        this.tooltipbox.style.top = ypos - (h - tooltipHeight) + 'px';
                    }
                    this.tooltipbox.style.left = xpos + 13 +'px'; 
                }
            }
            else if ((w / 2) < xpos) {
                if ((h/2) > ypos) {
                    this.tooltipbox.style.top = ypos + 25 + 'px';
                    this.tooltipbox.style.left = xpos - 335 + 'px';          
                }
                else if ((h/2) < ypos){
                    if (tooltipHeight < ypos){
                        this.tooltipbox.style.top = ypos - tooltipHeight + 'px';
                    }
                    else {
                        this.tooltipbox.style.top = ypos - (h - tooltipHeight) + 'px';
                    }
                    
                    this.tooltipbox.style.left = xpos - 335 + 'px'; 
                }

            }

        }
    }

    function removeToolTipBox(){
        // Check for an existing tooltip and close if stuck open
        $('.za-tooltip').remove();
    }

    // Creates the tooltip with relationship to the mouse cursor
    function createTooltipBox(el) {
        let tooltip = document.createElement('div');
        var myHTML = document.getElementById(el.getAttribute('data-item-id'));
        tooltip.innerHTML = myHTML.innerHTML;
        tooltip.classList.add('za-tooltip');
        
        document.body.appendChild(tooltip);
        tooltipHeight = tooltip.offsetHeight;
        tooltipWidth = tooltip.offsetWidth;

        return tooltip;
    }
}

// Adds Zandora Tooltips to default 5e Actor Sheet
export async function addActorSheetTip(el, html, data) {
    var list, i;
    list = document.getElementsByClassName('item-image');
    for (i = 0; i < list.length; ++i) {
    list[i].setAttribute("data-tooltip-container", "");
    // Trying to insert handlebars into the element
    //list[i].innerHTML = '{{{> "modules/zandora-suite/templates/actors/parts/actor-inventory.html" sections=inventory}}}';
    //list[i].innerHTML = '{{> "modules/zandora-suite/templates/actors/parts/actor-inventory.html"}}';
    }
}

initTooltip();   
