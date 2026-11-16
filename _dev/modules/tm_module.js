/* ===== what is really pending TODAY: late / due now / period still running / later ===== */
Object.assign(I18N.hi,{tmToday:"📅 आज: {d}",tmFy:"चालू वर्ष: {fy}",tm_due:"बाकी",tm_up:"आगे का",tm_notyet:"अवधि चल रही है",tmAfter:"{d} के बाद फ़ाइल होगा",upN:"आगे के {n}",fUp:"आगे के (अभी समय नहीं आया)",fDue:"अभी करने वाले (लेट + 30 दिन में)",tmLaterT:"आगे के काम (अभी समय नहीं आया)",tmLaterTxt:"इनकी अवधि अभी चल रही है या ड्यू डेट 30 दिन से दूर है — अभी कुछ नहीं करना।"});
Object.assign(I18N.en,{tmToday:"📅 Today: {d}",tmFy:"Current year: {fy}",tm_due:"Pending",tm_up:"Upcoming",tm_notyet:"Period running",tmAfter:"can be filed after {d}",upN:"{n} upcoming",fUp:"Upcoming (not due yet)",fDue:"To do now (late + next 30 days)",tmLaterT:"Upcoming work (not due yet)",tmLaterTxt:"Their period is still running or the due date is more than 30 days away — nothing to do yet."});
Object.assign(I18N.zh,{tmToday:"📅 今天：{d}",tmFy:"本财年：{fy}",tm_due:"待办",tm_up:"即将到期",tm_notyet:"期间进行中",tmAfter:"{d} 之后可申报",upN:"{n} 项未到期",fUp:"未到期（尚无需办理）",fDue:"现在要办（逾期 + 30 天内）",tmLaterT:"未到期事项",tmLaterTxt:"这些事项的期间仍在进行中，或截止日期在 30 天以后——目前无需办理。"});
const DUE_SOON=30;
const lastDay=(y,m)=>{const d=new Date(Date.UTC(y,m,0));return d.toISOString().slice(0,10)};
/* the day the period of an entry ends (a return for October can only be filed after 31 October) */
function periodEnd(i){const p=(i.period||"").trim();let r;
  if((r=/^([A-Z][a-z]{2}) (\d{4})$/.exec(p))&&MIDX[r[1]])return lastDay(+r[2],MIDX[r[1]]);
  if((r=/^Q([1-4]) FY (\d{4})-\d{2}$/.exec(p))){const ym=fyMonths(+r[2])[+r[1]*3-1];return lastDay(+ym.slice(0,4),+ym.slice(5))}
  if((r=/^(?:FY )?(\d{4})-\d{2}$/.exec(p.replace(/^FY /,"FY ")))&&/^FY /.test(p))return(+r[1]+1)+"-03-31";
  if((r=/^H1 FY (\d{4})-\d{2}$/.exec(p)))return r[1]+"-09-30";
  if((r=/^H2 FY (\d{4})-\d{2}$/.exec(p)))return(+r[1]+1)+"-03-31";
  if((r=/^Jan–Jun (\d{4})$/.exec(p)))return r[1]+"-06-30";
  if((r=/^Jul–Dec (\d{4})$/.exec(p)))return r[1]+"-12-31";
  if((r=/^CY (\d{4})$/.exec(p)))return r[1]+"-12-31";
  return null}
function timing(i){if(isFiled(i))return"done";if(!i.dueDate)return"due";const td=todayStr();if(i.dueDate<td)return"late";
  const pe=periodEnd(i);if(pe&&pe>=td&&pe<=i.dueDate)return"notyet";
  return daysLeft(i.dueDate)<=DUE_SOON?"due":"upcoming"}
const isActionable=i=>{const x=timing(i);return x==="late"||x==="due"};
const isLater=i=>{const x=timing(i);return x==="notyet"||x==="upcoming"};
function todayLabel(){const d=new Date(todayStr()+"T00:00:00");const s=d.toLocaleDateString(locale(),{weekday:"long",day:"numeric",month:"long",year:"numeric"});const y=+todayStr().slice(0,4),m=+todayStr().slice(5,7);return{d:s,fy:fyl(m>=4?y:y-1)}}
