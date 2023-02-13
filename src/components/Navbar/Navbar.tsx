import style from './Navbar.module.scss'
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

type NavLinkType = {
    to: string;
    children: string;
}

const Navbar = ({ onClick }: () => void) => {
  return (
    <nav className={ style.nav }>
        <div className={ style.items }>
            <div className={ style.subitems }>
                <NavLnk to="/">
                    Home
                </NavLnk>
                <NavLnk to="/blog">
                    Blog
                </NavLnk>
            </div>
            <a 
                href=''
                className={ style.item }
                onClick={(event) => {
                    event.preventDefault()
                    onClick()
                }}
            >
                Add new post
            </a>
        </div>
    </nav>
  )
};

function NavLnk({to, children}: NavLinkType) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname })

    return (
        <Link 
            to={ to } 
            className={ `${ style.item } ${isActive ? style.active : ''}` }
        >
            { children }
        </Link>
    )
}

export default Navbar;
