import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
// import VueWebComponent from './components/HelloWorld';



const Component = {
  // any component options
};

const CustomElement = wrap(Vue, Component);

window.customElements.define('my-custom-element', CustomElement);
