import {seedTemplates,id,now} from './logic.js';

const KEY='sbc.demo.v3',AUTHKEY='sbc.session.v1';
const config=window.SBC_CONFIG||{};
export const cloudConfigured=Boolean(config.supabaseUrl&&config.supabaseAnonKey);
export const allowDemo=config.allowDemo!==false;
const base=(config.supabaseUrl||'').replace(/\/$/,'');
const apiKey=config.supabaseAnonKey||'';
export function demoStart() {
  const entries=[
    {amount:20,title:'Premium-Routenplanung',reason:'Schöne Strecke, wenig Verkehr, gute Aussicht und passender Zwischenstopp.',category:'Radsport'},
    {amount:15,title:'Magischer Filmabend',reason:'Angemessene Verpflegung und störungsfreie Harry-Potter-Vorführung sichergestellt.',category:'Magie'},
    {amount:-8,title:'Vorzeitige Popcorn-Vernichtung',reason:'Vorräte bereits vor Beginn des Hauptfilms aufgebraucht.',category:'Kino'},
    {amount:12,title:'Vorbildliche Pace-Anpassung',reason:'Die Geschäftsführung bestätigt die Einhaltung des Wohlfühltempos.',category:'Laufsport'},
    {amount:10,title:'Matcha von bemerkenswerter Qualität',reason:'Vorbildliche gastronomische Eigeninitiative.',category:'Kulinarik'},
    {amount:-7,title:'Abspannflucht',reason:'Post-Credit-Szene nicht geprüft. Die Behörde ermittelt.',category:'Kino'}
  ].map((e,i)=>({id:id(),...e,source:'direct',created_by:'demo-sophie',created_at:new Date(Date.now()-(entriesOffset(i))*86400000).toISOString(),linked_entry_id:null}));
  return {entries,templates:seedTemplates(),appeals:[],claims:[{id:id(),title:'Freiwilliger Windschattendienst',description:'Vorbildlicher Einsatz zum Schutz der Geschäftsführung vor Gegenwind.',category:'Radsport',proposed_amount:10,status:'pending',created_by:'demo-member',created_at:now(),decision_note:null}],verdicts:[],version:3};
}
function entriesOffset(i){return 9-i;}
function readDemo(){try {let data=JSON.parse(localStorage.getItem(KEY));if(data?.version===3)return data;}catch{}const data=demoStart();localStorage.setItem(KEY,JSON.stringify(data));return data;}
function writeDemo(data){localStorage.setItem(KEY,JSON.stringify(data));return data;}

export const demoDB = {
  async load(){return structuredClone(readDemo());},
  async reset(){const data=demoStart();writeDemo(data);return data;},
  async createEntry(payload){const d=readDemo();d.entries.push({id:id(),...payload,created_by:'demo-sophie',created_at:now()});writeDemo(d);},
  async createClaim(payload){const d=readDemo();d.claims.push({id:id(),...payload,status:'pending',created_by:'demo-member',created_at:now()});writeDemo(d);},
  async resolveClaim(claimId,action,amount,note){const d=readDemo(),c=d.claims.find(x=>x.id===claimId);if(!c||c.status!=='pending')throw Error('Antrag wurde bereits bearbeitet.');c.status=action==='approve'?'approved':'rejected';c.decision_note=note;c.granted_amount=action==='approve'?Number(amount):null;c.reviewed_by='demo-sophie';c.resolved_at=now();if(action==='approve')d.entries.push({id:id(),title:c.title,reason:note||c.description,amount:Number(amount),category:c.category,source:'claim',created_by:'demo-sophie',created_at:now(),linked_entry_id:null});writeDemo(d);},
  async fileAppeal(entryId,reason){const d=readDemo();if(d.appeals.some(a=>a.entry_id===entryId&&a.status==='pending'))throw Error('Dazu läuft bereits ein Einspruch.');if(d.verdicts.some(v=>v.entry_id===entryId))throw Error('Dieses Urteil wurde bereits hingenommen.');d.appeals.push({id:id(),entry_id:entryId,reason,status:'pending',adjustment:0,response:null,created_at:now(),created_by:'demo-member'});writeDemo(d);},
  async acceptVerdict(entryId){const d=readDemo();if(d.appeals.some(a=>a.entry_id===entryId&&a.status==='pending'))throw Error('Der Einspruch ist noch offen.');if(!d.verdicts.some(v=>v.entry_id===entryId))d.verdicts.push({entry_id:entryId,accepted_by:'demo-member',accepted_at:now()});writeDemo(d);},
  async resolveAppeal(appealId,decision,adjustment,comment){const d=readDemo(),a=d.appeals.find(x=>x.id===appealId);if(!a||a.status!=='pending')throw Error('Einspruch wurde bereits bearbeitet.');const entry=d.entries.find(e=>e.id===a.entry_id);if(!entry)throw Error('Buchung fehlt.');let delta=0;
    if(decision==='accepted')delta=-Number(entry.amount);
    else if(decision==='adjusted')delta=Number(adjustment);
    else if(decision==='escalated')delta=-Math.abs(Number(adjustment));
    if(delta&&!Number.isInteger(delta))throw Error('Punkte müssen ganzzahlig sein.');
    a.status=decision;a.adjustment=delta;a.response=comment;a.resolved_at=now();a.handled_by='demo-sophie';
    if(delta)d.entries.push({id:id(),amount:delta,title:decision==='escalated'?'Strafverschärfung wegen Uneinsichtigkeit':decision==='accepted'?'Aufhebung nach Einspruch':'Neubewertung nach Einspruch',reason:comment||'Beschluss der obersten Beschwerdestelle',category:'Sonstiges',source:'appeal',created_by:'demo-sophie',created_at:now(),linked_entry_id:entry.id});writeDemo(d);
  },
  async saveTemplate(payload){const d=readDemo();if(payload.id){const idx=d.templates.findIndex(t=>t.id===payload.id);if(idx<0)throw Error('Vorlage nicht gefunden.');d.templates[idx]={...d.templates[idx],...payload};}else{d.templates.push({id:id(),...payload,is_active:true});}writeDemo(d);},
  async archiveTemplate(templateId){const d=readDemo();const t=d.templates.find(t=>t.id===templateId);if(t)t.is_active=false;writeDemo(d);},
  async correctEntry(entryId,amount,reason){const d=readDemo();const entry=d.entries.find(e=>e.id===entryId);if(!entry)throw Error('Bescheid nicht gefunden.');if(!Number.isInteger(amount)||!amount||Math.abs(amount)>100000)throw Error('Ungültige Punktzahl.');d.entries.push({id:id(),amount,title:'Amtliche Korrekturbuchung',reason,category:entry.category,source:'correction',linked_entry_id:entryId,created_by:'demo-sophie',created_at:now()});writeDemo(d);},
};

let session=null;
export function sessionInfo(){return session;}
function persistSession(s){session=s;if(s)localStorage.setItem(AUTHKEY,JSON.stringify(s));else localStorage.removeItem(AUTHKEY);}
export async function initializeSession(){
  if(!cloudConfigured)return null;
  try{
    // Implicit magic-link support as well as password login.
    const hash=new URLSearchParams(location.hash.replace(/^#/,''));
    if(hash.has('access_token')&&hash.has('refresh_token')){
      const s={access_token:hash.get('access_token'),refresh_token:hash.get('refresh_token'),expires_at:Math.floor(Date.now()/1000)+Number(hash.get('expires_in')||3600)};
      persistSession(s);history.replaceState(null,'',location.pathname+location.search);
    }else if(localStorage.getItem(AUTHKEY)) session=JSON.parse(localStorage.getItem(AUTHKEY));
    if(!session)return null;
    if(session.expires_at && Date.now()/1000>session.expires_at-60)await refreshSession();
    const user=await authFetch('/auth/v1/user');
    const profiles=await dbGet('sbc_profiles',`select=role&user_id=eq.${encodeURIComponent(user.id)}`);
    if(!profiles.length){persistSession(null);throw Error('Dieses Konto ist für den Sophie Bonus Club nicht freigeschaltet.');}
    return {id:user.id,email:user.email,role:profiles[0].role};
  }catch(err){if(err.message?.includes('freigeschaltet'))throw err;persistSession(null);return null;}
}
async function authFetch(path,options={}){
  let response;try{response=await fetch(base+path,{...options,headers:{'apikey':apiKey,'Content-Type':'application/json',...(session?{'Authorization':'Bearer '+session.access_token}:{}),...options.headers}});}catch{throw Error('Keine Verbindung zum Server. Bitte Internetverbindung prüfen.');}
  let data;try{data=await response.json();}catch{data={};}
  if(!response.ok){throw Error(data.msg||data.error_description||data.message||data.error||`Serverfehler ${response.status}`);}return data;
}
export async function login(email,password){
  const result=await authFetch('/auth/v1/token?grant_type=password',{method:'POST',body:JSON.stringify({email,password})});
  persistSession({...result,expires_at:Math.floor(Date.now()/1000)+Number(result.expires_in||3600)});
  const user=await initializeSession();if(!user)throw Error('Anmeldung fehlgeschlagen.');return user;
}
export function logout(){persistSession(null);}
export async function updatePassword(newPassword){if(!session)throw Error('Bitte zuerst anmelden.');if(newPassword.length<10)throw Error('Bitte mindestens 10 Zeichen verwenden.');if(Date.now()/1000>(session.expires_at||0)-60)await refreshSession();await authFetch('/auth/v1/user',{method:'PUT',body:JSON.stringify({password:newPassword})});}
export async function refreshSession(){
  if(!session?.refresh_token)throw Error('Sitzung abgelaufen. Bitte neu anmelden.');
  const result=await authFetch('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:JSON.stringify({refresh_token:session.refresh_token})});
  persistSession({...result,expires_at:Math.floor(Date.now()/1000)+Number(result.expires_in||3600)});
}
async function dbRequest(path,options={}){
  if(!session)throw Error('Bitte zuerst anmelden.');
  if(Date.now()/1000>(session.expires_at||0)-60) await refreshSession();
  const fetchCall=async()=>{
    let res;try{res=await fetch(base+'/rest/v1/'+path,{...options,headers:{'apikey':apiKey,'Authorization':'Bearer '+session.access_token,'Content-Type':'application/json','Prefer':'return=minimal',...options.headers}});}catch{throw Error('Server momentan nicht erreichbar. Versuche es mit einer stabilen Internetverbindung.');}
    if(res.status===401){await refreshSession();throw Error('Die Sitzung wurde erneuert. Bitte erneut versuchen.');}
    if(!res.ok){let e={};try{e=await res.json()}catch{}throw Error(e.message||`Datenbankfehler ${res.status}`);}
    if(res.status===204)return null;
    const str=await res.text();return str?JSON.parse(str):null;
  };
  return fetchCall();
}
const dbGet=(table,query)=>dbRequest(table+'?'+query,{headers:{Prefer:'return=representation'}});
const dbPost=(table,data)=>dbRequest(table,{method:'POST',body:JSON.stringify(data)});
const dbPatch=(table,id,data)=>dbRequest(`${table}?id=eq.${encodeURIComponent(id)}`,{method:'PATCH',body:JSON.stringify(data)});
const dbRpc=(name,args)=>dbRequest('rpc/'+name,{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(args)});
export const cloudDB={
  async load(){const [entries,templates,claims,appeals,verdicts,summary]=await Promise.all([
    dbGet('sbc_entries','select=*&order=created_at.desc&limit=600'),dbGet('sbc_templates','select=*&order=created_at.asc&limit=300'),
    dbGet('sbc_claims','select=*&order=created_at.desc&limit=300'),dbGet('sbc_appeals','select=*&order=created_at.desc&limit=300'),dbGet('sbc_verdicts','select=*&limit=600'),dbRpc('sbc_get_stats',{})
  ]);return{entries,templates,claims,appeals,verdicts,summary,version:3};},
  async createEntry(payload){return dbPost('sbc_entries',payload);},
  async createClaim(payload){return dbPost('sbc_claims',payload);},
  async resolveClaim(claimId,action,amount,note){return dbRpc('sbc_resolve_claim',{p_claim_id:claimId,p_action:action,p_amount:Number(amount),p_note:note});},
  async fileAppeal(entryId,reason){return dbPost('sbc_appeals',{entry_id:entryId,reason});},
  async acceptVerdict(entryId){return dbPost('sbc_verdicts',{entry_id:entryId});},
  async resolveAppeal(appealId,decision,adjustment,comment){return dbRpc('sbc_resolve_appeal',{p_appeal_id:appealId,p_decision:decision,p_adjustment:Number(adjustment)||0,p_comment:comment});},
  async saveTemplate(payload){if(payload.id){const {id,...rest}=payload;return dbPatch('sbc_templates',id,rest);}else return dbPost('sbc_templates',payload);},
  async archiveTemplate(templateId){return dbPatch('sbc_templates',templateId,{is_active:false});},
  async correctEntry(entryId,amount,reason){return dbRpc('sbc_correct_entry',{p_entry_id:entryId,p_amount:Number(amount),p_reason:reason});}
};
