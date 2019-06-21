import React from 'react';

import './home.sass';

import svgAbout from '../assets/about.svg';
import svgList from '../assets/list.svg';
import svgCode from '../assets/code.svg';
// import svgEducation from '../assets/education.svg';
import svgSkill from '../assets/skill.svg';
import svgTelegram from '../assets/telegram.svg';
import svgUser from '../assets/user.svg';
import svgEmail from '../assets/email.svg';
import svgSkype from '../assets/skype.svg';
import svgGithub from '../assets/github.svg';
import svgTel from '../assets/phone.svg';
import svgUrl from '../assets/url.svg';
import svgGitCode from '../assets/gitcode.svg';
import svgCircle from '../assets/circle.svg';

const renderHTML = require('react-render-html');

interface Props {
}

interface Expericene {
    name: string,
    position: (string)[],
    date: string,
    info: string,
    skills: (string)[],
    projects: (string)[]
}

interface Project {
    name: string,
    date: string,
    info: string,
    url: string,
    skills: (string)[],
    code: (string)[]
}

interface Skill {
    name: string
}

interface State {
    language: string,
    name: string,
    summary: string,
    position: string,
    experiences: (Expericene)[],
    projects: (Project)[],
    skills: (Skill)[]
}


class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            language: "",
            name: "Arthur",
            position: "Full-Stack Engineer",
            summary: "",
            experiences: [],
            projects: [],
            skills: []
        };
    }


    componentDidMount() {
        this.getData("");
    }

    getData = (language: string) => {
        if (!language) {
            language = window.location.pathname === "/cn" ? "cn" : "en";
        }
        this.setState({language: language === "cn" ? "en" : "cn"});

        let baseurl = "/api/resume?q=";
        let q = `
      query{
          me(language: "${language}"){
            name
            position
            summary
          },
          experiences(language: "${language}"){
            name
            position
            info
            skills
            projects
            date
          },
          projects(language: "${language}"){
            name
            date
            info
            url
            code
            skills
          },
          skills{
            name
          }
        }
    `;
        let url = `${baseurl}${q}`;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    let data = {
                        name: result.data.me.name,
                        position: result.data.me.position,
                        summary: result.data.me.summary,
                        experiences: result.data.experiences,
                        projects: result.data.projects,
                        skills: result.data.skills,
                    };
                    this.setState(data);
                },
                (error) => {
                    console.warn("error")
                }
            )
    };


    render() {
        let {name, position, summary, experiences, projects, skills, language} = this.state;

        return (
            <div className="main">
                <div className="content">
                    <div className="resume-title">
                        <div className="font-max title">
                            {name}
                        </div>
                        <div className="resume-position font-t2 title">
                            {position}
                        </div>
                        {
                            language === "cn" ?
                                <div className="resume-button" onClick={() => this.getData('cn')}>cn</div> :
                                <div className="resume-button" onClick={() => this.getData('en')}>en</div>
                        }
                    </div>

                    <div className="resume-content">
                        <div className="resume-left">
                            <div className="title-box title">
                                <img src={svgAbout} alt="svg" className="svg"/>
                                <div className="font-t2 text">
                                    Resume Summary
                                </div>
                            </div>
                            <div className="margin-max">
                                <div className="content">
                                    {renderHTML(summary)}
                                </div>
                            </div>

                            <div className="title-box title margin">
                                <img src={svgList} alt="svg" className="svg"/>
                                <div className="font-t2 text">
                                    Experiences
                                </div>
                            </div>

                            {
                                experiences.map((experience) =>
                                    <div key={experience.name} className="margin-max">
                                        <div className="subtitle-box title margin">
                                            <div className="date font-min">
                                                {renderHTML(experience.date)}
                                            </div>
                                            <div className="circle">
                                                <span className="item"></span>
                                            </div>
                                            <div className="text font-t3">
                                                {experience.name}
                                            </div>
                                        </div>

                                        <div className="content">
                                            <div className="font-t4 margin">
                                                {
                                                    experience.position.map((p) =>
                                                        <span key={p}>{p}</span>
                                                    )
                                                }
                                            </div>
                                            <div className="margin">
                                                {renderHTML(experience.info)}
                                            </div>
                                            <div className="font-min margin">
                                                {
                                                    experience.skills.map((s) =>
                                                        <span className="label" key={s}>{s}</span>
                                                    )
                                                }
                                            </div>
                                            <div className="font-min margin">
                                                {
                                                    experience.projects.map((p) =>
                                                        <div className="code-box" key={p}>
                                                            <img src={svgUrl} alt="svg" className="svg"/>
                                                            <a href={p}
                                                               className="text font-min">{p}</a>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            <div className="title-box title">
                                <img src={svgCode} alt="svg" className="svg"/>
                                <div className="font-t2 text">
                                    Personal Projects
                                </div>
                            </div>

                            {
                                projects.map((project) =>
                                    <div className="margin-max" key={project.name}>
                                        <div className="subtitle-box title margin">
                                            <div className="date font-min project-date">
                                                {renderHTML(project.date)}
                                            </div>
                                            <div className="circle">
                                                <span className="item"></span>
                                            </div>
                                            <div className="text font-t3">
                                                {project.name}
                                            </div>
                                        </div>

                                        <div className="margin content">
                                            {renderHTML(project.info)}
                                        </div>
                                        <div className="font-min margin content">
                                            {
                                                project.skills.map((s) =>
                                                    <span className="label" key={s}>{s}</span>
                                                )
                                            }
                                        </div>
                                        <div className="code-box content">
                                            <img src={svgUrl} alt="svg" className="svg"/>
                                            <a href={project.url}
                                               className="text font-min">{project.url}</a>
                                        </div>
                                        {
                                            project.code.map((c) =>
                                                <div className="code-box content" key={c}>
                                                    <img src={svgGitCode} alt="svg" className="svg"/>
                                                    <a href={c}
                                                       className="text font-min">{c}</a>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }

                            <div className="title-box title mobile-hidden">
                                <img src={svgCircle} alt="svg" className="svg"/>
                            </div>
                        </div>
                        <div className="resume-right">
                            <div className="rt-box">
                                <img src={svgUser} alt="svg" className="svg"/>
                                <div className="font-t2 text">
                                    Contact
                                </div>
                            </div>
                            <div className="contact-box">
                                <img src={svgEmail} alt="svg" className="svg"/>
                                <div className="text font-min">
                                    root@arthurnone.com
                                </div>
                            </div>
                            <div className="contact-box">
                                <img src={svgTelegram} alt="svg" className="svg"/>
                                <a className="text font-min" href="https://t.me/arthurnone">
                                    root@arthurnone.com
                                </a>
                            </div>
                            <div className="contact-box">
                                <img src={svgSkype} alt="svg" className="svg"/>
                                <div className="text font-min">
                                    root@arthurnone.com
                                </div>
                            </div>
                            <div className="contact-box">
                                <img src={svgGithub} alt="svg" className="svg"/>
                                <a className="text font-min" href="https://github.com/arthurnone">
                                    root@arthurnone.com
                                </a>
                            </div>
                            <div className="contact-box">
                                <img src={svgTel} alt="svg" className="svg"/>
                                <span className="text font-min">
                                    Kzg2MTM3NjE0MTcyNDA=
                                </span>
                            </div>

                            <div className="rt-box">
                                <img src={svgSkill} alt="svg" className="svg"/>
                                <div className="text font-t3">
                                    Skill
                                </div>
                            </div>
                            <div className="margin">
                                {
                                    skills.map((skill) =>
                                        <span className="label" key={skill.name}>{skill.name}</span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
