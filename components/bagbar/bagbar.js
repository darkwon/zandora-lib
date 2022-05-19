import Module from '../../module.js';
export class bagbar extends Hotbar {

init(){
    let myTemplate = 'modules/zandora-lib/templates/ui/ui-bag-bar.hbs';
    let css = 'za-utilityBar-default'
    const template = Handlebars.compile('{{>"'+ myTemplate +'"}}');
    let html = '';
    html = template();
    const bagbar = document.createElement('div');
    bagbar.classList.add(css);
    bagbar.classList.add('flexrow')
    bagbar.innerHTML = html;
    const element = document.getElementById('ui-bottom');
    //find our hot bar div within the footer element
    const inject = element.querySelector('div');
    inject.appendChild(bagbar);
  }

  async _onClickMacro(event) {
    const {slot, bagId} = event.currentTarget.dataset;
    console.log({slot, bagId});
  }
  _onHoverMacro(event) {
    console.log(event);
  }
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "backpack-hotbar",
      template: "modules/zl-bag-management/templates/backpackHotbar.hbs",
      popOut: false,
      dragDrop: [/*{dragSelector: ".macro", dropSelector: ".backpack-macro-list"}, {dragSelector: "#backpack-hotbar-directory-controls" }*/],
    });
  }
}