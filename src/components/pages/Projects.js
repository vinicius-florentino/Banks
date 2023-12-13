import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";
import stylesContainer from "../styles/Container.module.css";
import styles from "../styles/Projects.module.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
function Projects() {

  const [projects, setProjects] = useState([])
  const [loadingState, setLoading] = useState(true)
  //damos false pra remover o loader
  const [projectMessage, setProjectMessage] = useState('')

  const location = useLocation();
  let message = "";
  if (location.state) {
    //verifica se a location atual vem com algum state que é algum atributo algo assim
    message = location.state.message;
    //se sim atribui esse valor a message
  }

  function removeProject(id){
    fetch(`http://localhost:5000/projects/${id}`,{
      method: 'DELETE',
      headers:{
        'Content-type': 'application/json'
      },
    }).then(resp => resp.json())
      .then(() => {
        setProjects(projects.filter((project)=> project.id !== id))
        setProjectMessage("Projeto removido com sucesso")
      })
      .catch(err => console.log(err))
  }

  useEffect(() =>{
    setTimeout(
      () =>{
        fetch('http://localhost:5000/projects',{
      method: "GET",
      headers:{
        'Content-Type': 'application/json',
      },
    }).then(resp=>resp.json())
      .then(data=>{
        setProjects(data)
        setLoading(false)
      })
      .catch((err) => console.log(err)
      )
      }, 500)
  },[])

  return (
    <div className={`${stylesContainer.minH} ${styles.projectcontainer}`}>
        <div className={styles.titlecontainer}>
            <h1>Meus projetos</h1>
            <LinkButton to="/newproject" text="Criar Projeto" />
        </div>
        <div>
            {message && <Message msg={message} type="success" />}
            {projectMessage && <Message msg={projectMessage} type="success" />}
            <Container customClass="start">
              {projects.length>0 &&
                projects.map((project)=>(
                  <ProjectCard 
                      name={project.name} 
                      id={project.id}
                      budget={project.budget}
                      category={project.category}   
                      key={project.id}
                      handleRemove={removeProject}
                  />
                ))  
              }{loadingState && <Loading />}
              {!loadingState && projects.length === 0 &&
              (<p>
                Não há projetos cadastrados
              </p>)
              }
            </Container>
        </div>
    </div>
  );
}
export default Projects;
