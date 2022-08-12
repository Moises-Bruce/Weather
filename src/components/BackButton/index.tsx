import { ButtonHTMLAttributes } from 'react'

import arrowLeft from '../../assets/arrow-left.svg'
import styles from './styles.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function BackButton({ ...rest }: Props) {
  return (
    <button
      className={styles.backButton}
      { ...rest }
    >
      <img src={arrowLeft} />
    </button>
  )
}