// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "prismjs/themes/prism.css"
import ReactGA from 'react-ga';

ReactGA.initialize('UA-58685561-1');

export const onRouteUpdate = (state) => {
  ReactGA.pageview(state.pathname);
};
