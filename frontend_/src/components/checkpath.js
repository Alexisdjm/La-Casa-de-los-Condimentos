import { Link as Scroll } from "react-scroll";
import { HashLink } from 'react-router-hash-link';

const Checkpath = ({path, optional, id, children, css}) => {
    const loc = window.location.pathname
    if (loc === path || loc === optional) {
        return(
            <Scroll className={css} to={id} spy={true} smooth={true} offset={-120} duration={250}>{children}</Scroll>
        )
    } else {
        return(
            <HashLink className={css} to={path + '#' + id}>{children}</HashLink>
        )
    }
}

export default Checkpath