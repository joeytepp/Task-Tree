import React from "react";

import styles from "./About.scss";
import taskList from "../../../assets/img/taskList.svg";
import projects from "../../../assets/img/projects.svg";
import openSource from "../../../assets/img/openSource.svg";

export default () => (
  <div className={styles.root} id="about">
    <div>
      <h1 className={styles.heading}>A new way to organize tasks</h1>
      <p className={styles.summary}>
        Task Tree lets you seperate the high level from the low level to get a
        bird’s eye view of what you want to accomplish. Organize your tasks
        faster and better.
      </p>
    </div>
    <div className={styles.sellingPoints}>
      <div className={styles.sellingPoint}>
        <img src={taskList} />
        <p className={styles.title}>Break it down</p>
        <p className={styles.subtitle}>
          Break any large task into smaller ones with sub tasks
        </p>
      </div>
      <div className={styles.sellingPoint}>
        <img src={projects} />
        <p className={styles.title}>Make your own projects</p>
        <p className={styles.subtitle}>
          Distribute your tasks across an unlimited amount of projects
        </p>
      </div>
      <div className={styles.sellingPoint}>
        <img src={openSource} />
        <p className={styles.title}>Free and open source</p>
        <p className={styles.subtitle}>
          At Task Tree we have nothing to hide. See for yourself on{" "}
          <a
            className={styles.githubLink}
            href="https://github.com/joeytepp/Task-tree"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  </div>
);
