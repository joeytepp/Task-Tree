export default (setProjects, props, value) => () =>
  setProjects(oldProjects => {
    const newProjects = [...oldProjects];
    const projectIndex = newProjects.findIndex(({ id }) => id === props.id);
    newProjects[projectIndex].editable = value;

    return newProjects;
  });
