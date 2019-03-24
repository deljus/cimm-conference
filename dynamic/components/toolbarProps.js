export const toolbar = (uploadImageCallBack) => ({
  inline: { inDropdown: true },
  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  link: { inDropdown: true },
  history: { inDropdown: true },
  image: {
    previewImage: true,
    uploadCallback: uploadImageCallBack,
      className: 'image',
    defaultSize: {
      height: '200px'
    }
  }
});
