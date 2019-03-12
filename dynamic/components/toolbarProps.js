export const toolbar = (uploadImageCallBack) => ({
  inline: { inDropdown: true },
  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  link: { inDropdown: true },
  history: { inDropdown: true },
  image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } }
});
