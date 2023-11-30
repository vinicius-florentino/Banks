import ProjectForm from '../project/ProjectForm'
import styles from '../styles/NewProject.module.css'
import { useNavigate } from 'react-router-dom';
function NewProject(){
    const navigate = useNavigate(); // Obtém a função navigate
    //fazer redirects
    // Função para fazer o POST do projeto
    function createPost(project) {
        // Inicialize banks e services
        project.banks = 0;
        project.services = [];

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Corrija 'Content-type' para 'Content-Type'
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            // Redirecionar
            navigate('/projects', { state: { message: "Projeto criado com sucesso!" } });
        })
        .catch(err => console.log(err));
    }

    return(
        <div className={styles.newproject_container}>
            <h1>
                Criar Projeto   
            </h1>
            <p>
                Crie seu projeto para depois adicionar os serviços
            </p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}
export default NewProject