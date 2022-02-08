import styles from '../../styles/NavItem.module.css';

export default function NavItem(props){
    return (
      <li className={`${styles[`nav-item`]} ${props.className?.includes('navbar-brand') ? styles['navbar-brand'] : ''}`} style={props.style || null}>{props.children}</li>     
    )
}