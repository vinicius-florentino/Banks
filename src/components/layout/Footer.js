import {FaFacebook} from 'react-icons/fa6';
import {FaInstagram} from 'react-icons/fa6';
import {FaSquareTwitter} from 'react-icons/fa6';
import styles from '../styles/Footer.module.css';
function Footer(){
    return( 
        <footer className={styles.footer}>
            <ul className={styles.sociallist}>
                <li><FaFacebook/></li>
                <li><FaInstagram/></li>
                <li><FaSquareTwitter/></li>
            </ul>   
            <p className={styles.copyrigth}>
                <span>
                    Banks &copy; 2021
                </span>
            </p>
        </footer>
    )
}
export default Footer