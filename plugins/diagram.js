import Diagram from 'diagram-js';
export default (context, inject) => {
  // Injecter Diagram dans le contexte Nuxt
  inject('Diagram', Diagram);
};
