export default (template, base) => {
  for (const key in base) {
    template = template.replace(`:${key}`, base[key]);
  }

  return template;
};
