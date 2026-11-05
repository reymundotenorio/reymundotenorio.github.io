if(document.body.dataset.page!=='home'){
  import('./project');
}else{
  const redirectLegacyProject=()=>{
    if(!location.hash.startsWith('#project-'))return false;
    const id=location.hash.slice('#project-'.length);
    const link=[...document.querySelectorAll<HTMLAnchorElement>('[data-project-link]')].find(anchor=>anchor.dataset.projectId===id);
    if(!link)return false;
    const url=new URL(link.href);url.search='';location.replace(url.href);return true;
  };
  if(!redirectLegacyProject()){
    import('./intro').catch(()=>document.dispatchEvent(new CustomEvent('portfolio:intro-complete')));
    import('./story');
  }
  window.addEventListener('hashchange',redirectLegacyProject);
}
export{};
