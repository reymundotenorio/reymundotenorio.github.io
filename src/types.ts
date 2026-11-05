export type Lang = 'en' | 'es';
export interface Fact { title: string; meta: string; detail?: string; url?: string }
export interface Media { src: string; width: number; height: number; alt: string; label: string; type: string }
export interface Project { id: string; name: string; summary: string; contribution: string; details: string[]; category: string; stack: string[]; year: string; url?: string; media: Media[] }
export interface Profile { skillGroups: { title: string; items: string[] }[]; certifications: Fact[]; awards: Fact[]; courses: Fact[]; education: Fact[]; languages: Fact[] }
export interface Data { lang: Lang; profile: Profile; timeline: { company: string; role: string; period: string; summary: string; signal: string }[]; recognitionKinds: string[]; projects: Project[]; publicCode: { name: string; url: string; language: string }[]; links: { linkedin: string; github: string } }
