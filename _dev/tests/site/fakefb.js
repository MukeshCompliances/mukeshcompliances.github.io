(function(){
if(window.firebase)return;
const store=JSON.parse(sessionStorage.getItem('__fakestore')||'{}');const L=[];// listeners {path,kind,cb}
const parts=p=>p.split("/").filter(Boolean);
const collOf=p=>parts(p).slice(0,-1).join("/");
const notify=()=>{try{sessionStorage.setItem('__fakestore',JSON.stringify(store))}catch(e){};_n()};const _n=()=>L.forEach(l=>{try{l.fire()}catch(e){console.error(e)}});
const deep=(a,b)=>{for(const k in b){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k]&&typeof a[k]==='object'&&!Array.isArray(a[k]))deep(a[k],b[k]);else a[k]=b[k]}return a};
let nid=0;const newId=()=>"id"+(++nid)+Math.random().toString(36).slice(2,6);
function DocSnap(path){const d=store[path];return{id:parts(path).pop(),exists:!!d,data:()=>d?JSON.parse(JSON.stringify(d)):undefined,ref:docRef(path)}}
function docRef(path){return{id:parts(path).pop(),path,
  get:async()=>DocSnap(path),
  set:async(data,opt)=>{const clean=JSON.parse(JSON.stringify(data));store[path]=opt&&opt.merge?deep(JSON.parse(JSON.stringify(store[path]||{})),clean):clean;notify()},
  update:async data=>{if(!store[path])throw Object.assign(new Error("not-found"),{code:"not-found"});Object.assign(store[path],JSON.parse(JSON.stringify(data)));notify()},
  delete:async()=>{delete store[path];notify()},
  collection:c=>collRef(path+"/"+c),
  onSnapshot:(cb,err)=>{const l={fire:()=>cb(DocSnap(path))};L.push(l);setTimeout(l.fire,0);return()=>{L.splice(L.indexOf(l),1)}}}}
function collRef(path,W){W=W||[];const q=()=>Object.keys(store).filter(k=>collOf(k)===path&&W.every(w=>w[1]!=="=="||(store[k]||{})[w[0]]===w[2])).map(k=>DocSnap(k));
  const self={};Object.assign(self,{orderBy:()=>self,limit:()=>self,where:(f,op,v)=>collRef(path,W.concat([[f,op,v]]))});
  return Object.assign(self,{path,doc:id=>docRef(path+"/"+(id||newId())),add:async d=>{const r=docRef(path+"/"+newId());await r.set(d);return r},
   get:async()=>({docs:q(),metadata:{fromCache:false}}),
   onSnapshot:(cb,err)=>{const l={fire:()=>cb({docs:q(),metadata:{fromCache:false}})};L.push(l);setTimeout(l.fire,0);return()=>{L.splice(L.indexOf(l),1)}}})}
const fs={settings(){},enablePersistence:async()=>{},collection:p=>collRef(p),doc:p=>docRef(p)};
let user=(()=>{try{return sessionStorage.getItem('fakeAuto')?window.__fakeUser:null}catch(e){return null}})(),cbs=[];const tok=u=>{if(u&&!u.getIdToken){u.getIdToken=async f=>{if(f)window.__tokRefresh=(window.__tokRefresh||0)+1;return 't'};u.getIdTokenResult=async()=>({claims:{email_verified:!!u.__tokVer}})}return u};
const auth={setPersistence:async()=>{},onAuthStateChanged:cb=>{const w=u=>cb(tok(u));cbs.push(w);setTimeout(()=>w(user),0)},signInWithPopup:async()=>{user=window.__fakeUser;cbs.forEach(c=>c(user))},signInWithRedirect:async()=>{},signInWithEmailAndPassword:async(e,p)=>{const a=(window.__accts=window.__accts||{})[e];if(!a||a.pw!==p){const x=new Error('bad');x.code='auth/invalid-credential';throw x}user=a.u;cbs.forEach(c=>c(user))},createUserWithEmailAndPassword:async(e,p)=>{const A=(window.__accts=window.__accts||{});if(A[e]){const x=new Error('dup');x.code='auth/email-already-in-use';throw x}const u={uid:'PW_'+e,email:e,displayName:'',emailVerified:false,reload:async()=>{},updateProfile:async function(o){this.displayName=o.displayName},sendEmailVerification:async()=>{window.__verSent=(window.__verSent||0)+1}};A[e]={pw:p,u};user=u;cbs.forEach(c=>c(user));return{user:u}},sendPasswordResetEmail:async e=>{window.__reset=e},get currentUser(){if(user&&!user.updatePassword){user.providerData=user.providerData||[{providerId:'google.com'}];user.updatePassword=async v=>{window.__newpw=v}}return user},getRedirectResult:async()=>null,signOut:async()=>{user=null;try{sessionStorage.removeItem('fakeAuto')}catch(e){}cbs.forEach(c=>c(null))}};
function GoogleAuthProvider(){this.setCustomParameters=()=>{}}
window.firebase={initializeApp(){},auth:Object.assign(()=>auth,{GoogleAuthProvider,Auth:{Persistence:{SESSION:'session'}}}),firestore:()=>fs};
window.__store=store;
})();
