const search=(contents,string)=>{
  const keywords=string.split(' ');
  const result=contents.filter(content=>{
    const stringified=JSON.stringify(content);
    for(let keyword of keywords){
      if(stringified.toLowerCase().includes(keyword.toLowerCase())){
        return true;
      }
    }
  });
  // analytics write in database
  return result;
};

module.exports=search;