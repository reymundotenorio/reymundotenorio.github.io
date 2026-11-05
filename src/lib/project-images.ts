import type{ImageMetadata}from'astro';
import{getImage}from'astro:assets';
const images=import.meta.glob<{default:ImageMetadata}>('/public/images/projects/*.webp',{eager:true});
const cache=new Map<string,Promise<string>>();
export function projectSrcSet(src:string):Promise<string>{
 let result=cache.get(src);
 if(!result){
  const metadata=images[`/public${src}`]?.default;
  if(!metadata)throw new Error(`Missing approved project image: ${src}`);
  result=Promise.all([160,480,960,1440].filter(width=>width<=metadata.width).map(async width=>`${(await getImage({src:metadata,width,format:'webp',quality:80})).src} ${width}w`)).then(items=>items.join(', '));
  cache.set(src,result);
 }
 return result;
}
