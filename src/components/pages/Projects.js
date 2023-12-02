import styles from "../styles/Container.module.css"
import Message from "../layout/Message"
import { useLocation } from "react-router-dom"
function Projects(){

    const location = useLocation()
    let message = ''
    if(location.state){
    //verifica se a location atual vem com algum state que é algum atributo algo assim
        message = location.state.message
    //se sim atribui esse valor a message
    }

    return( 
        <div className={styles.minH}>
            <h1>
                Meus projetos
            </h1>
            {message && <Message msg={message} type="success" />}
        </div>
    )
}
export default Projects