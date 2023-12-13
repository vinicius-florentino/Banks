import styles from '../styles/Home.module.css';
import savings from '../../img/savings.svg';
import LinkButton from '../layout/LinkButton';
import stylesContainer from "../styles/Container.module.css";
function Home(){
    return(
       <section className={`${styles.homecontainer} ${stylesContainer.minH}`}> 
            <h1>
                Bem vindo ao <span>Banks</span>
            </h1>
            <p>Comece a gerenciar os seus projetos agora mesmo</p>
            <LinkButton to="/newproject" text="Criar Projeto" />
            <img src={savings} alt="Banks"/>
       </section>
    )
}
export default Home