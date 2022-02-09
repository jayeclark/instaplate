import styles from '../../styles/ui.module.css';

export default function Card({style, children}) {
  return (
    <div className={styles.card} style={style}>
      {children}
    </div>
  )
}