import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

import styles from "../styles/Container.module.css";
import stylesProject from "../styles/Projects.module.css";

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Projects() {

  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  //damos true pra remover o loader
  const location = useLocation();
  let message = "";
  if (location.state) {
    //verifica se a location atual vem com algum state que é algum atributo algo assim
    message = location.state.message;
    //se sim atribui esse valor a message
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
        console.log(data)
        setProjects(data)
        setRemoveLoading(true)
      })
      .catch((err) => console.log(err)
      )
      }, 1500)
  },[])

  return (
    <div className={`${styles.minH} ${stylesProject.projectcontainer}`}>
        <div className={stylesProject.titlecontainer}>
            <h1>Meus projetos</h1>
            <LinkButton to="/newproject" text="Criar Projeto" />
        </div>
        <div>
            {message && <Message msg={message} type="success" />}
            <Container customClass="start">
              {projects.length>0 &&
                projects.map((project)=>(
                  <ProjectCard 
                      name={project.name} 
                      id={project.id}
                      budget={project.budget}
                      category={project.category}   
                      key={project.id}
                  />
                ))
              }{!removeLoading && <Loading />}
              {removeLoading && projects.length === 0 &&
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
