export const LEVELS = [
  ['Digital Foundations','Introduction to Accounting','Accounting equation and business basics'],
  ['Tally Essentials','Company, Ledgers & Vouchers','Set up clean books from day one'],
  ['Daily Operations','Sales, Purchase & Inventory','Record everyday commercial activity'],
  ['Business Excellence','GST, Banking & Cost Centres','Run controlled and compliant finance'],
  ['Advanced Mastery','MIS, Payroll & Audit','Turn records into management insight'],
  ['Automation','Data Management & Intelligence','Create repeatable finance workflows'],
  ['Infinity Level','Real Business Simulations','Make decisions in practical scenarios']
];
export const BADGES = [['Explorer',25],['Ledger Master',100],['GST Warrior',250],['Inventory Champion',500],['Tally Titan',1000],['Infinity Achiever',2000]];
export function freshProgress(name=''){ return {name, currentLevel:1, unlockedLevel:1, xp:0, fragments:0, arenaScore:0, completed:{}, activities:{}}; }
export function key(level, activity){ return `${level}:${activity}`; }
export function award(state, activity){ const k=key(state.currentLevel,activity); if(state.activities[k]) return state; const rewards={practice:[50,8],quiz:[30,5],journal:[25,4]}; const [xp,fragments]=rewards[activity]; return {...state,xp:state.xp+xp,fragments:state.fragments+fragments,activities:{...state.activities,[k]:true}}; }
export function requirementsMet(state, level=state.currentLevel){ return ['practice','quiz','journal'].every(a=>state.activities[key(level,a)]); }
export function completeLevel(state){ if(!requirementsMet(state)) return {...state,error:'Complete practice, quiz, and journal first.'}; const completed={...state.completed,[state.currentLevel]:true}; if(state.currentLevel===7) return {...state,completed,graduated:true,error:null}; return {...state,completed,currentLevel:state.currentLevel+1,unlockedLevel:Math.max(state.unlockedLevel,state.currentLevel+1),error:null}; }
export function unlockedBadges(fragments){ return BADGES.filter(([,needed])=>fragments>=needed).map(([name])=>name); }
