import React, { useContext } from "react";

import Modal from "../../Modal/Modal";
import { ProjectsContext } from "../../../context/ProjectsContext";
import { ColorContext } from "../../../context/ColorContext";
import { COLOR_MAP } from "../../../constants";

export default props => {
  const { projects } = useContext(ProjectsContext);
  const { color } = useContext(ColorContext);
  return (
    <Modal {...props}>
      <div css={{ background: "white", borderRadius: "5px" }}>
        <div>
          <div
            css={{
              borderRadius: "5px 5px 0px 0px",
              padding: "5px 15px",
              background: COLOR_MAP[color],
              color: "white"
            }}
          >
            <h3>Choose a project...</h3>
          </div>
          <div css={{ paddingBottom: "5px" }}>
            {projects.map(project => (
              <div
                key={project.id}
                onClick={() => {
                  props.createNewTask(project);
                  props.onRequestClose();
                }}
                css={{
                  cursor: "default",
                  display: "grid",
                  padding: "5px 15px",
                  gridTemplateColumns: "min-content 1fr",
                  "&:hover": {
                    background: "#EEEEEE"
                  },
                  "&:active": {
                    background: "#D8D8D8"
                  }
                }}
              >
                <div
                  css={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    marginRight: "10px",
                    verticalAlign: "center",
                    background: COLOR_MAP[project.color]
                  }}
                />
                <div key={project.name}>{project.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
