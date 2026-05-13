/* Braun Product Selector — Self-contained App v4
 * COMPLETE flow matching React prototype:
 * Hero → Gender → Breathing → Categories → Precision Question → Match Reveal → Results
 */
(function() {
'use strict';

// ============================================================
// FIND CONTAINER
// ============================================================
var container = null;
container = document.querySelector('.webflow-page');
if (!container) {
  try {
    if (window.parent && window.parent.document !== document) {
      container = window.parent.document.querySelector('.webflow-page');
    }
  } catch(e) {}
}
if (!container) container = document.querySelector('.page-wrapper');
if (!container) container = document.body;

container.innerHTML = '';

var ownerDoc = container.ownerDocument || document;

// ============================================================
// PRODUCT DATA
// ============================================================
var products = [
{asin:'B0CKSYY3TD',name:'Braun Series 8 Electric Shaver',category:'Electric Shaver',gender:'Men',tier:'Premium',series:'Series 8',features:['4+1 Shaving Head with Precision Trimmer','Sonic Technology 10000 micro-vibrations','100% Waterproof Wet & Dry']},
{asin:'B08M4T85GF',name:'Braun Series 7 71-N1200s',category:'Electric Shaver',gender:'Men',tier:'Premium',series:'Series 7',features:['360 Flex Head','AutoSense Technology','Rechargeable Cordless']},
{asin:'B08M4X5VZ2',name:'Braun Series 7 70-B1000s',category:'Electric Shaver',gender:'Men',tier:'Premium',series:'Series 7',features:['360 Flex Head','EasyClick Attachments','Wet & Dry']},
{asin:'B08M4W4VGH',name:'Braun Series 7 R1000s',category:'Electric Shaver',gender:'Men',tier:'Premium',series:'Series 7',features:['360 Flex Head','SmartCare Center Compatible','Rechargeable']},
{asin:'B0CKSZ3JKL',name:'Braun Series 5 51-B1000s',category:'Electric Shaver',gender:'Men',tier:'Mid-Range',series:'Series 5',features:['AutoSense Technology','EasyClick','50min Battery']},
{asin:'B0CKSZ4MNO',name:'Braun Series 5 50-B1000s',category:'Electric Shaver',gender:'Men',tier:'Mid-Range',series:'Series 5',features:['3 Flexible Blades','Wet & Dry','EasyClick Compatible']},
{asin:'B0CKSZ5PQR',name:'Braun Series 3 310s',category:'Electric Shaver',gender:'Men',tier:'Entry',series:'Series 3',features:['MicroComb Technology','Pressure Sensitive','Fully Washable']},
{asin:'B0CKSZ6STU',name:'Braun Series 3 300s',category:'Electric Shaver',gender:'Men',tier:'Entry',series:'Series 3',features:['3 Pressure-Sensitive Elements','Rechargeable','Washable']},
{asin:'B0CKSZ7VWX',name:'Braun Series 3 ProSkin 3010s',category:'Electric Shaver',gender:'Men',tier:'Entry',series:'Series 3',features:['ProSkin Trimmer','Wet & Dry','45min Battery']},
{asin:'B0CKSZ8YZA',name:'Braun Series 7 BT7421',category:'Beard Trimmer',gender:'Men',tier:'Premium',series:'Series 7',features:['AutoSense Motor','39 Length Settings','100min Battery']},
{asin:'B0CKSZ9BCD',name:'Braun Series 5 BT5420',category:'Beard Trimmer',gender:'Men',tier:'Mid-Range',series:'Series 5',features:['39 Length Settings','Precision Wheel','Lifetime Sharp Blades']},
{asin:'B0CKSZAEFG',name:'Braun All-in-One Series 7',category:'Multi Groomer',gender:'Men',tier:'Premium',series:'All-in-One 7',features:['10 Attachments','AutoSense','100min Battery']},
{asin:'B0CKSZBHIJ',name:'Braun All-in-One Series 5',category:'Multi Groomer',gender:'Men',tier:'Mid-Range',series:'All-in-One 5',features:['9 Attachments','AutoSense Motor','Wet & Dry']},
{asin:'B0CKSZCKL',name:'Braun Style XT5',category:'Multi Groomer',gender:'Men',tier:'Entry',series:'XT Series',features:['4-in-1 Styling','Metal Blade','Waterproof']},
{asin:'B0CKSZDMNO',name:'Braun Body Groomer BG5360',category:'Body Groomer',gender:'Men',tier:'Mid-Range',series:'Body Groomer',features:['SkinShield Technology','2 Comb Attachments','Wet & Dry']},
{asin:'B0CKSZEPQR',name:'Braun Body Groomer BG3350',category:'Body Groomer',gender:'Men',tier:'Entry',series:'Body Groomer',features:['SkinShield Technology','3 Attachments','Waterproof']},
{asin:'B0CKSZFSTU',name:'Braun Silk-expert Pro 5',category:'IPL Hair Removal',gender:'Women',tier:'Premium',series:'Pro 5',features:['SensoAdapt Skin Sensor','400000 Flashes','Fastest IPL Treatment']},
{asin:'B0CKSZGVWX',name:'Braun Silk-expert Pro 3',category:'IPL Hair Removal',gender:'Women',tier:'Mid-Range',series:'Pro 3',features:['SensoAdapt','300000 Flashes','Compact Design']},
{asin:'B0CKSZHYZA',name:'Braun Silk-expert Mini',category:'IPL Hair Removal',gender:'Women',tier:'Entry',series:'Mini',features:['Compact Travel Size','SensoAdapt','For Smaller Areas']},
{asin:'B0CKSZIBCD',name:'Braun Face Spa Pro SE921',category:'Facial Care',gender:'Women',tier:'Premium',series:'Face Spa',features:['Facial Epilator + Cleansing Brush','MicroOscillation','Gentle on Skin']},
{asin:'B0CKSZJEFG',name:'Braun Face Mini FS1000',category:'Facial Care',gender:'Women',tier:'Entry',series:'Face Mini',features:['Facial Hair Remover','Compact Design','Battery Powered']}
];

// ============================================================
// GOAL/CATEGORY MAPPING
// ============================================================
var MEN_GOALS = [
  {goal:'A close, comfortable shave',description:'Electric shavers from entry to flagship',category:'Electric Shaver'},
  {goal:'Shape and maintain my beard',description:'Precision trimmers with 39+ length settings',category:'Beard Trimmer'},
  {goal:'One tool for everything',description:'All-in-one groomers: face, beard, body',category:'Multi Groomer'},
  {goal:'Below-the-neck grooming',description:'Body groomers with SkinShield technology',category:'Body Groomer'}
];
var WOMEN_GOALS = [
  {goal:'Long-lasting hair removal',description:'IPL technology for permanent reduction',category:'IPL Hair Removal'},
  {goal:'Facial hair and skincare',description:'Gentle removal and cleansing devices',category:'Facial Care'}
];

// ============================================================
// PRECISION QUESTION OPTIONS
// ============================================================
function getPrecisionOptions(category) {
  switch(category) {
    case 'Electric Shaver': return [
      {id:'best',label:'The absolute best shave possible',desc:'I want zero compromise on closeness and comfort.'},
      {id:'balanced',label:'Great shave, fair price',desc:'Smart tech without the premium extras.'},
      {id:'value',label:'Reliable daily shaver',desc:'Gets the job done well. No fuss.'}
    ];
    case 'Beard Trimmer': return [
      {id:'best',label:'Maximum precision and control',desc:'Smart motor that reads my beard density.'},
      {id:'balanced',label:'Same precision, simpler package',desc:'39 settings and great battery. Just less packaging.'}
    ];
    case 'Multi Groomer': return [
      {id:'best',label:'Every attachment, every scenario',desc:'I want the full kit for head-to-toe grooming.'},
      {id:'balanced',label:'Versatile but focused',desc:'Core attachments with smart tech.'},
      {id:'value',label:'Simple and effective',desc:'Basic trimming and styling done right.'}
    ];
    case 'Body Groomer': return [
      {id:'best',label:'Maximum coverage and comfort',desc:'Full-body grooming with all attachments.'},
      {id:'balanced',label:'Essential body grooming',desc:'Effective grooming for key areas.'}
    ];
    case 'IPL Hair Removal': return [
      {id:'best',label:'Fastest, most effective results',desc:'Top performance with smart skin sensors.'},
      {id:'balanced',label:'Proven results, great value',desc:'Same technology, streamlined package.'},
      {id:'value',label:'Try IPL for the first time',desc:'Compact and affordable entry point.'}
    ];
    case 'Facial Care': return [
      {id:'best',label:'Complete facial care system',desc:'Epilation plus cleansing in one device.'},
      {id:'balanced',label:'Quick facial hair removal',desc:'Simple, compact, effective.'}
    ];
    default: return [
      {id:'best',label:'The best result possible',desc:'Top performance, regardless of price.'},
      {id:'balanced',label:'Great performance, fair price',desc:'The sweet spot of value and quality.'}
    ];
  }
}

// Map priority to tier
function priorityToTier(priority) {
  if (priority === 'best') return 'Premium';
  if (priority === 'balanced') return 'Mid-Range';
  return 'Entry';
}

// Match reveal messages
function getRevealMessage(tier, category) {
  switch(category) {
    case 'Electric Shaver':
      if (tier === 'Premium') return {headline:'Your closest shave',subline:'Series 7 & 8 \u2014 engineered for zero compromise.'};
      if (tier === 'Mid-Range') return {headline:'Your smart shave',subline:'Series 5 \u2014 same smart motor, streamlined package.'};
      return {headline:'Your daily shave',subline:'Series 3 \u2014 reliable performance, every morning.'};
    case 'Beard Trimmer':
      if (tier === 'Premium') return {headline:'Your precision trim',subline:'Series 7 \u2014 reads your beard, adjusts itself.'};
      return {headline:'Your precision trim',subline:'Series 5 \u2014 same 39 settings, great value.'};
    case 'Multi Groomer':
      if (tier === 'Premium') return {headline:'Your complete kit',subline:'All-in-One \u2014 every attachment, every scenario.'};
      if (tier === 'Mid-Range') return {headline:'Your versatile groomer',subline:'9-in-1 \u2014 smart tech, focused kit.'};
      return {headline:'Your essential groomer',subline:'XT Series \u2014 simple styling, sharp results.'};
    case 'Body Groomer':
      return {headline:'Your body groomer',subline:'SkinShield technology \u2014 gentle on skin, effective on hair.'};
    case 'IPL Hair Removal':
      if (tier === 'Premium') return {headline:'Your smoothest skin',subline:'Pro 5 \u2014 fastest treatment with smart sensors.'};
      if (tier === 'Mid-Range') return {headline:'Your IPL match',subline:'Pro 3 \u2014 proven results at a great price.'};
      return {headline:'Your IPL starter',subline:'Mini \u2014 compact, effective, affordable.'};
    case 'Facial Care':
      return {headline:'Your facial care match',subline:'Gentle removal and cleansing in one device.'};
    default:
      return {headline:'Your precision match',subline:'Tailored to what matters to you.'};
  }
}

// ============================================================
// STATE
// ============================================================
var state = {step:'hero',gender:null,category:null,priority:null,matchedTier:null,tierIndex:0,revealStage:'finding'};

// ============================================================
// INJECT STYLES
// ============================================================
var styleEl = ownerDoc.createElement('style');
styleEl.textContent = [
'* { box-sizing:border-box !important; }',
'.bps-app { font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif !important; color:#111 !important; line-height:1.5 !important; -webkit-font-smoothing:antialiased !important; overflow-x:hidden !important; }',

// Animations
'@keyframes bpsFadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }',
'@keyframes bpsPulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }',
'@keyframes bpsBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }',
'@keyframes bpsExpand { from{transform:scale(1);opacity:0.5} to{transform:scale(1.3);opacity:0.1} }',
'@keyframes bpsFadeOut { from{opacity:1} to{opacity:0} }',
'@keyframes bpsSlideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }',
'.bps-fade-in { animation:bpsFadeIn 0.6s ease-out forwards !important; }',
'.bps-fade-in-delay { animation:bpsFadeIn 0.6s 0.2s ease-out forwards !important; opacity:0 !important; }',
'.bps-fade-out { animation:bpsFadeOut 0.7s ease-out forwards !important; }',

// Hero
'.bps-hero { position:relative !important; min-height:100vh !important; display:flex !important; align-items:center !important; justify-content:center !important; background:#000 !important; overflow:hidden !important; }',
'.bps-hero-bg { position:absolute !important; inset:0 !important; }',
'.bps-shape { position:absolute !important; border-radius:50% !important; border:1px solid rgba(255,255,255,0.06) !important; }',
'.bps-shape-1 { width:600px !important; height:600px !important; top:50% !important; left:50% !important; transform:translate(-50%,-50%) !important; }',
'.bps-shape-2 { width:400px !important; height:400px !important; top:50% !important; left:50% !important; transform:translate(-50%,-50%) !important; }',
'.bps-hero-content { position:relative !important; z-index:10 !important; text-align:center !important; padding:0 1.5rem !important; max-width:600px !important; }',
'.bps-badge { display:inline-block !important; padding:0.25rem 1rem !important; border:1px solid rgba(255,255,255,0.2) !important; border-radius:100px !important; margin-bottom:1.5rem !important; }',
'.bps-badge span { font-size:0.65rem !important; font-weight:700 !important; letter-spacing:0.2em !important; color:rgba(255,255,255,0.7) !important; }',
'.bps-campaign { font-size:0.7rem !important; font-weight:500 !important; letter-spacing:0.25em !important; text-transform:uppercase !important; color:rgba(255,255,255,0.4) !important; margin-bottom:1rem !important; }',
'.bps-title { font-size:clamp(2rem,5vw,3.5rem) !important; font-weight:900 !important; color:#fff !important; line-height:1.1 !important; margin:0 0 1rem !important; }',
'.bps-title span { color:rgba(255,255,255,0.6) !important; }',
'.bps-subtitle { font-size:1rem !important; color:rgba(255,255,255,0.5) !important; margin-bottom:2.5rem !important; }',
'.bps-cta { display:inline-flex !important; align-items:center !important; gap:0.5rem !important; padding:0.875rem 2rem !important; background:#fff !important; color:#000 !important; border:none !important; border-radius:100px !important; font-size:0.875rem !important; font-weight:600 !important; cursor:pointer !important; transition:all 0.2s !important; }',
'.bps-cta:hover { transform:scale(1.03) !important; box-shadow:0 8px 30px rgba(255,255,255,0.15) !important; }',

// Gender — full viewport 50/50 split
'.bps-gender { position:relative !important; height:100vh !important; width:100% !important; overflow:hidden !important; }',
'.bps-gender-question { position:absolute !important; top:0 !important; left:0 !important; right:0 !important; z-index:20 !important; display:flex !important; justify-content:center !important; pointer-events:none !important; padding-top:15vh !important; transition:all 0.7s ease !important; }',
'.bps-gender-question.bps-hidden { opacity:0 !important; transform:translateY(-2rem) !important; }',
'.bps-gender-question p { font-size:0.7rem !important; letter-spacing:0.2em !important; text-transform:uppercase !important; color:rgba(255,255,255,0.7) !important; margin-bottom:0.5rem !important; text-shadow:0 2px 8px rgba(0,0,0,0.3) !important; }',
'.bps-gender-question h2 { font-size:clamp(1.75rem,5vw,3.5rem) !important; font-weight:900 !important; color:#fff !important; margin:0 !important; text-shadow:0 2px 12px rgba(0,0,0,0.4) !important; }',
'.bps-gender-split { display:flex !important; height:100% !important; width:100% !important; }',
'.bps-gender-panel { position:relative !important; height:100% !important; overflow:hidden !important; cursor:pointer !important; border:none !important; border-radius:0 !important; padding:0 !important; transition:width 0.7s cubic-bezier(0.4,0,0.2,1) !important; }',
'.bps-gender-panel-men { background:#1f2937 !important; }',
'.bps-gender-panel-women { background:#4b5563 !important; }',
'.bps-gender-panel:hover .bps-gender-circle { transform:scale(1.1) !important; opacity:0.4 !important; }',
'.bps-gender-panel:hover .bps-gender-label { transform:scale(1.05) !important; }',
'.bps-gender-panel:hover .bps-gender-select-pill { opacity:1 !important; transform:translateY(0) !important; }',
'.bps-gender-circle { position:absolute !important; border-radius:50% !important; transition:all 0.7s ease !important; opacity:0.2 !important; }',
'.bps-gender-circle-1 { width:20rem !important; height:20rem !important; bottom:-5rem !important; left:-5rem !important; background:#374151 !important; }',
'.bps-gender-circle-2 { width:10rem !important; height:10rem !important; top:25% !important; right:25% !important; background:#4b5563 !important; }',
'.bps-gender-circle-3 { width:20rem !important; height:20rem !important; top:-5rem !important; right:-5rem !important; background:#6b7280 !important; }',
'.bps-gender-circle-4 { width:10rem !important; height:10rem !important; bottom:25% !important; left:25% !important; background:#9ca3af !important; }',
'.bps-gender-content { position:relative !important; z-index:10 !important; height:100% !important; display:flex !important; flex-direction:column !important; align-items:center !important; justify-content:flex-end !important; padding-bottom:15vh !important; padding-left:2rem !important; padding-right:2rem !important; transition:all 0.5s ease !important; }',
'.bps-gender-icon { width:4rem !important; height:4rem !important; border-radius:50% !important; border:2px solid rgba(255,255,255,0.3) !important; display:flex !important; align-items:center !important; justify-content:center !important; margin-bottom:1.25rem !important; transition:all 0.5s ease !important; }',
'.bps-gender-panel:hover .bps-gender-icon { border-color:rgba(255,255,255,0.6) !important; transform:scale(1.1) !important; }',
'.bps-gender-label { font-size:clamp(1.5rem,3vw,2.25rem) !important; font-weight:900 !important; color:#fff !important; margin:0 0 0.5rem !important; transition:all 0.5s ease !important; }',
'.bps-gender-desc { font-size:0.85rem !important; color:rgba(255,255,255,0.6) !important; margin:0 !important; text-align:center !important; }',
'.bps-gender-count { font-size:0.75rem !important; color:rgba(255,255,255,0.4) !important; margin:0.375rem 0 0 !important; }',
'.bps-gender-select-pill { margin-top:1.5rem !important; padding:0.625rem 1.5rem !important; border:1px solid rgba(255,255,255,0.3) !important; border-radius:100px !important; opacity:0 !important; transform:translateY(1rem) !important; transition:all 0.3s ease !important; }',
'.bps-gender-select-pill span { font-size:0.85rem !important; font-weight:500 !important; color:#fff !important; }',
'.bps-gender-divider { width:1px !important; background:rgba(255,255,255,0.1) !important; transition:opacity 0.5s ease !important; }',

// Breathing
'.bps-breathing { min-height:100vh !important; display:flex !important; align-items:center !important; justify-content:center !important; background:#fafafa !important; position:relative !important; overflow:hidden !important; }',
'.bps-breathing-bg { position:absolute !important; inset:0 !important; display:flex !important; align-items:center !important; justify-content:center !important; }',
'.bps-breathing-ring { border-radius:50% !important; border:1px solid rgba(0,0,0,0.05) !important; position:absolute !important; }',
'.bps-breathing-ring-1 { width:500px !important; height:500px !important; }',
'.bps-breathing-ring-2 { width:350px !important; height:350px !important; }',
'.bps-breathing-content { position:relative !important; z-index:10 !important; text-align:center !important; padding:0 1.5rem !important; max-width:500px !important; }',
'.bps-stat { font-size:3.5rem !important; font-weight:900 !important; color:#111 !important; line-height:1 !important; margin-bottom:0.5rem !important; }',
'.bps-stat-label { font-size:0.7rem !important; font-weight:500 !important; letter-spacing:0.2em !important; text-transform:uppercase !important; color:#888 !important; margin-bottom:2rem !important; }',
'.bps-headline { font-size:1.5rem !important; font-weight:700 !important; color:#111 !important; margin:0 0 0.75rem !important; }',
'.bps-body { font-size:0.9rem !important; color:#666 !important; line-height:1.6 !important; margin:0 !important; }',

// Categories
'.bps-categories { min-height:100vh !important; display:flex !important; align-items:center !important; justify-content:center !important; background:#fff !important; padding:3rem 1.5rem !important; }',
'.bps-categories-inner { max-width:600px !important; width:100% !important; }',
'.bps-categories-inner h2 { font-size:1.75rem !important; font-weight:900 !important; color:#111 !important; text-align:center !important; margin:0 0 2rem !important; }',
'.bps-goal-card { display:flex !important; align-items:center !important; justify-content:space-between !important; width:100% !important; padding:1.25rem 1.5rem !important; background:#fafafa !important; border:1px solid #e5e5e5 !important; border-radius:0.75rem !important; cursor:pointer !important; transition:all 0.2s !important; margin-bottom:0.75rem !important; text-align:left !important; }',
'.bps-goal-card:hover { background:#111 !important; border-color:#111 !important; transform:scale(1.02) !important; }',
'.bps-goal-card:hover h3 { color:#fff !important; }',
'.bps-goal-card:hover p { color:rgba(255,255,255,0.6) !important; }',
'.bps-goal-card:hover .bps-arrow { color:#fff !important; }',
'.bps-goal-card h3 { font-size:1rem !important; font-weight:700 !important; color:#111 !important; margin:0 0 0.25rem !important; transition:color 0.2s !important; }',
'.bps-goal-card p { font-size:0.8rem !important; color:#888 !important; margin:0 !important; transition:color 0.2s !important; }',
'.bps-arrow { color:#ccc !important; transition:color 0.2s !important; flex-shrink:0 !important; }',

// Precision Question
'.bps-precision { min-height:100vh !important; display:flex !important; align-items:center !important; justify-content:center !important; background:#fff !important; padding:3rem 1.5rem !important; }',
'.bps-precision-inner { max-width:600px !important; width:100% !important; }',
'.bps-precision-step { font-size:0.7rem !important; font-weight:500 !important; letter-spacing:0.2em !important; text-transform:uppercase !important; color:#aaa !important; text-align:center !important; margin-bottom:0.75rem !important; }',
'.bps-precision-inner h2 { font-size:1.75rem !important; font-weight:900 !important; color:#111 !important; text-align:center !important; margin:0 0 0.5rem !important; }',
'.bps-precision-sub { font-size:0.85rem !important; color:#888 !important; text-align:center !important; margin:0 0 2rem !important; }',
'.bps-priority-btn { display:flex !important; align-items:center !important; justify-content:space-between !important; width:100% !important; padding:1.25rem 1.5rem !important; background:#fafafa !important; border:1px solid #e5e5e5 !important; border-radius:0.75rem !important; cursor:pointer !important; transition:all 0.3s !important; margin-bottom:0.75rem !important; text-align:left !important; }',
'.bps-priority-btn:hover { background:#111 !important; border-color:#111 !important; transform:scale(1.02) !important; box-shadow:0 10px 40px rgba(0,0,0,0.15) !important; }',
'.bps-priority-btn:hover .bps-pri-label { color:#fff !important; }',
'.bps-priority-btn:hover .bps-pri-desc { color:rgba(255,255,255,0.6) !important; }',
'.bps-priority-btn:hover .bps-pri-arrow { color:#fff !important; }',
'.bps-pri-label { font-size:1rem !important; font-weight:700 !important; color:#111 !important; margin:0 0 0.2rem !important; transition:color 0.3s !important; }',
'.bps-pri-desc { font-size:0.8rem !important; color:#888 !important; margin:0 !important; transition:color 0.3s !important; }',
'.bps-pri-arrow { width:36px !important; height:36px !important; border-radius:50% !important; border:1px solid #e5e5e5 !important; display:flex !important; align-items:center !important; justify-content:center !important; flex-shrink:0 !important; color:#ccc !important; transition:all 0.3s !important; }',

// Match Reveal
'.bps-reveal { position:fixed !important; inset:0 !important; z-index:9999 !important; display:flex !important; align-items:center !important; justify-content:center !important; background:#0a0a0a !important; overflow:hidden !important; }',
'.bps-reveal-bg { position:absolute !important; inset:0 !important; display:flex !important; align-items:center !important; justify-content:center !important; }',
'.bps-reveal-ring { border-radius:50% !important; border:1px solid rgba(255,255,255,0.1) !important; position:absolute !important; transition:all 1s ease-out !important; }',
'.bps-reveal-ring-1 { width:250px !important; height:250px !important; }',
'.bps-reveal-ring-2 { width:180px !important; height:180px !important; }',
'.bps-reveal-ring-1.bps-expanded { width:380px !important; height:380px !important; border-color:rgba(255,255,255,0.05) !important; }',
'.bps-reveal-ring-2.bps-expanded { width:500px !important; height:500px !important; border-color:rgba(255,255,255,0.03) !important; }',
'.bps-reveal-content { position:relative !important; z-index:10 !important; text-align:center !important; padding:0 1.5rem !important; max-width:500px !important; }',
'.bps-dots { display:flex !important; align-items:center !important; justify-content:center !important; gap:0.5rem !important; margin-bottom:1.5rem !important; }',
'.bps-dot { width:8px !important; height:8px !important; border-radius:50% !important; background:#fff !important; animation:bpsBounce 0.6s ease-in-out infinite !important; }',
'.bps-dot-2 { animation-delay:0.15s !important; }',
'.bps-dot-3 { animation-delay:0.3s !important; }',
'.bps-finding-text { font-size:1.25rem !important; color:rgba(255,255,255,0.7) !important; font-weight:500 !important; }',
'.bps-reveal-tag { font-size:0.65rem !important; font-weight:500 !important; letter-spacing:0.3em !important; text-transform:uppercase !important; color:rgba(255,255,255,0.4) !important; margin-bottom:1rem !important; }',
'.bps-reveal-headline { font-size:2.5rem !important; font-weight:900 !important; color:#fff !important; line-height:1.1 !important; margin:0 0 1rem !important; }',
'.bps-reveal-subline { font-size:1rem !important; color:rgba(255,255,255,0.5) !important; margin:0 0 2rem !important; }',
'.bps-reveal-check { display:inline-flex !important; align-items:center !important; justify-content:center !important; width:56px !important; height:56px !important; border-radius:50% !important; background:rgba(255,255,255,0.1) !important; border:1px solid rgba(255,255,255,0.2) !important; margin-bottom:1.5rem !important; }',
'.bps-reveal-proof { font-size:0.65rem !important; letter-spacing:0.2em !important; text-transform:uppercase !important; color:rgba(255,255,255,0.3) !important; }',

// Results
'.bps-results { background:#fff !important; padding:2rem 1.5rem 4rem !important; min-height:100vh !important; }',
'.bps-results-header { max-width:600px !important; margin:0 auto 2rem !important; text-align:center !important; padding-top:2rem !important; }',
'.bps-results-tag { font-size:0.65rem !important; font-weight:500 !important; letter-spacing:0.3em !important; text-transform:uppercase !important; color:#888 !important; margin-bottom:0.5rem !important; }',
'.bps-results-title { font-size:1.75rem !important; font-weight:900 !important; color:#111 !important; margin:0 !important; }',
'.bps-results-nav { display:flex !important; align-items:center !important; justify-content:space-between !important; max-width:900px !important; margin:0 auto 1.5rem !important; padding:0.75rem 0 !important; border-bottom:1px solid #eee !important; }',
'.bps-results-nav button { background:none !important; border:none !important; font-size:0.75rem !important; font-weight:600 !important; color:#666 !important; cursor:pointer !important; display:flex !important; align-items:center !important; gap:0.25rem !important; }',
'.bps-results-nav button:hover { color:#111 !important; }',
'.bps-tier-tabs { display:flex !important; justify-content:center !important; gap:0.5rem !important; margin-bottom:2rem !important; }',
'.bps-tier-tab { padding:0.5rem 1.25rem !important; border-radius:100px !important; border:1px solid #e5e5e5 !important; background:#fff !important; font-size:0.75rem !important; font-weight:600 !important; color:#666 !important; cursor:pointer !important; transition:all 0.2s !important; }',
'.bps-tier-tab:hover { border-color:#111 !important; color:#111 !important; }',
'.bps-tier-tab.bps-active { background:#111 !important; color:#fff !important; border-color:#111 !important; }',
'.bps-product-grid { display:grid !important; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)) !important; gap:1.5rem !important; max-width:900px !important; margin:0 auto !important; }',
'.bps-product-card { border:1px solid #e5e5e5 !important; border-radius:0.75rem !important; overflow:hidden !important; background:#fff !important; transition:box-shadow 0.2s !important; }',
'.bps-product-card:hover { box-shadow:0 8px 30px rgba(0,0,0,0.08) !important; }',
'.bps-pbadge { background:#111 !important; color:#fff !important; text-align:center !important; padding:0.4rem !important; font-size:0.6rem !important; font-weight:700 !important; letter-spacing:0.05em !important; text-transform:uppercase !important; }',
'.bps-img-area { aspect-ratio:1 !important; background:linear-gradient(135deg,#f8f8f8,#f0f0f0) !important; display:flex !important; align-items:center !important; justify-content:center !important; padding:2rem !important; }',
'.bps-img-ph { width:100% !important; height:100% !important; background:#e5e5e5 !important; border-radius:0.5rem !important; display:flex !important; align-items:center !important; justify-content:center !important; }',
'.bps-img-ph span { font-size:0.7rem !important; font-weight:700 !important; color:#999 !important; }',
'.bps-info { padding:1rem !important; }',
'.bps-series { font-size:0.6rem !important; font-weight:500 !important; text-transform:uppercase !important; letter-spacing:0.1em !important; color:#aaa !important; margin:0 0 0.2rem !important; }',
'.bps-name { font-size:0.85rem !important; font-weight:700 !important; color:#111 !important; margin:0 0 0.3rem !important; line-height:1.3 !important; }',
'.bps-feat { font-size:0.75rem !important; color:#888 !important; margin:0 0 1rem !important; }',
'.bps-atc { display:block !important; width:100% !important; text-align:center !important; padding:0.625rem !important; background:#FFD814 !important; border:1px solid #FCD200 !important; border-radius:100px !important; font-size:0.8rem !important; font-weight:600 !important; color:#111 !important; text-decoration:none !important; transition:background 0.2s !important; }',
'.bps-atc:hover { background:#F7CA00 !important; }',
'.bps-details { display:block !important; width:100% !important; text-align:center !important; padding:0.4rem !important; font-size:0.75rem !important; color:#007185 !important; text-decoration:none !important; margin-top:0.5rem !important; }',
'.bps-details:hover { color:#c7511f !important; text-decoration:underline !important; }',

// Mobile
'@media(max-width:640px) {',
'  .bps-gender-split { flex-direction:column !important; }',
'  .bps-gender-divider { width:100% !important; height:1px !important; margin:0.5rem 0 !important; }',
'  .bps-reveal-headline { font-size:1.75rem !important; }',
'  .bps-product-grid { grid-template-columns:1fr !important; }',
'}',
].join('\n');
(ownerDoc.head || ownerDoc.documentElement).appendChild(styleEl);

// ============================================================
// RENDER
// ============================================================
function render() {
  // Remove reveal overlay if present
  var existingReveal = ownerDoc.querySelector('.bps-reveal');
  if (existingReveal && state.step !== 'reveal') existingReveal.remove();

  if (state.step === 'reveal') {
    renderReveal();
    return;
  }

  container.innerHTML = '';
  var app = ownerDoc.createElement('div');
  app.className = 'bps-app';

  switch(state.step) {
    case 'hero': app.innerHTML = heroHTML(); break;
    case 'gender': app.innerHTML = genderHTML(); break;
    case 'breathing': app.innerHTML = breathingHTML(); break;
    case 'categories': app.innerHTML = categoriesHTML(); break;
    case 'precision': app.innerHTML = precisionHTML(); break;
    case 'results': app.innerHTML = resultsHTML(); break;
  }

  container.appendChild(app);
  bindEvents(app);
}

// ============================================================
// MATCH REVEAL (full-screen overlay with staged animation)
// ============================================================
function renderReveal() {
  var existing = ownerDoc.querySelector('.bps-reveal');
  if (existing) existing.remove();

  var msg = getRevealMessage(state.matchedTier, state.category);
  var overlay = ownerDoc.createElement('div');
  overlay.className = 'bps-reveal';

  // Stage 1: Finding
  overlay.innerHTML = '<div class="bps-reveal-bg">' +
    '<div class="bps-reveal-ring bps-reveal-ring-1"></div>' +
    '<div class="bps-reveal-ring bps-reveal-ring-2"></div>' +
  '</div>' +
  '<div class="bps-reveal-content">' +
    '<div class="bps-dots">' +
      '<div class="bps-dot"></div>' +
      '<div class="bps-dot bps-dot-2"></div>' +
      '<div class="bps-dot bps-dot-3"></div>' +
    '</div>' +
    '<p class="bps-finding-text">Finding your match...</p>' +
  '</div>';

  ownerDoc.body.appendChild(overlay);

  // Stage 2: Reveal the match (after 1.8s)
  setTimeout(function() {
    var ring1 = overlay.querySelector('.bps-reveal-ring-1');
    var ring2 = overlay.querySelector('.bps-reveal-ring-2');
    if (ring1) ring1.className += ' bps-expanded';
    if (ring2) ring2.className += ' bps-expanded';

    var content = overlay.querySelector('.bps-reveal-content');
    if (content) {
      content.innerHTML = '<p class="bps-reveal-tag">Precision tailored to you</p>' +
        '<h2 class="bps-reveal-headline">' + msg.headline + '</h2>' +
        '<p class="bps-reveal-subline">' + msg.subline + '</p>' +
        '<div class="bps-reveal-check"><svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#fff" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></div>' +
        '<p class="bps-reveal-proof">100+ years of German engineering</p>';
      content.style.animation = 'bpsFadeIn 0.7s ease-out forwards';
    }
  }, 1800);

  // Stage 3: Fade out and show results (after 4.3s)
  setTimeout(function() {
    overlay.style.transition = 'opacity 0.7s ease-out';
    overlay.style.opacity = '0';
  }, 4300);

  // Stage 4: Remove overlay, show results (after 5.1s)
  setTimeout(function() {
    overlay.remove();
    state.step = 'results';
    render();
  }, 5100);
}

// ============================================================
// HTML GENERATORS
// ============================================================
function heroHTML() {
  return '<section class="bps-hero">' +
    '<div class="bps-hero-bg">' +
      '<div class="bps-shape bps-shape-1"></div>' +
      '<div class="bps-shape bps-shape-2"></div>' +
    '</div>' +
    '<div class="bps-hero-content bps-fade-in">' +
      '<div class="bps-badge"><span>BRAUN</span></div>' +
      '<p class="bps-campaign">Quest for Precision</p>' +
      '<h1 class="bps-title">Let\'s find your<br><span>perfect match.</span></h1>' +
      '<p class="bps-subtitle">Tell us what matters.<br>We\'ll do the rest.</p>' +
      '<button class="bps-cta" data-action="start">' +
        '<span>Find my match</span>' +
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>' +
      '</button>' +
    '</div>' +
  '</section>';
}

function genderHTML() {
  return '<section class="bps-gender bps-fade-in">' +
    '<div class="bps-gender-question">' +
      '<div style="text-align:center;padding:0 1rem">' +
        '<p>Start here</p><h2>I\'m looking for...</h2>' +
      '</div>' +
    '</div>' +
    '<div class="bps-gender-split">' +
      '<button class="bps-gender-panel bps-gender-panel-men" data-gender="Men" style="width:50%">' +
        '<div class="bps-gender-circle bps-gender-circle-1"></div>' +
        '<div class="bps-gender-circle bps-gender-circle-2"></div>' +
        '<div class="bps-gender-content">' +
          '<div class="bps-gender-icon">' +
            '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>' +
          '</div>' +
          '<h3 class="bps-gender-label">Men\'s Grooming</h3>' +
          '<p class="bps-gender-desc">Shavers, trimmers &amp; groomers</p>' +
          '<p class="bps-gender-count">16 products</p>' +
          '<div class="bps-gender-select-pill"><span>Select</span></div>' +
        '</div>' +
      '</button>' +
      '<div class="bps-gender-divider"></div>' +
      '<button class="bps-gender-panel bps-gender-panel-women" data-gender="Women" style="width:50%">' +
        '<div class="bps-gender-circle bps-gender-circle-3"></div>' +
        '<div class="bps-gender-circle bps-gender-circle-4"></div>' +
        '<div class="bps-gender-content">' +
          '<div class="bps-gender-icon">' +
            '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>' +
          '</div>' +
          '<h3 class="bps-gender-label">Women\'s Care</h3>' +
          '<p class="bps-gender-desc">IPL hair removal &amp; facial care</p>' +
          '<p class="bps-gender-count">5 products</p>' +
          '<div class="bps-gender-select-pill"><span>Select</span></div>' +
        '</div>' +
      '</button>' +
    '</div>' +
  '</section>';
}

function breathingHTML() {
  var isMen = state.gender === 'Men';
  return '<section class="bps-breathing bps-fade-in">' +
    '<div class="bps-breathing-bg">' +
      '<div class="bps-breathing-ring bps-breathing-ring-1"></div>' +
      '<div class="bps-breathing-ring bps-breathing-ring-2"></div>' +
    '</div>' +
    '<div class="bps-breathing-content">' +
      '<div class="bps-stat">' + (isMen ? '100+ years' : '#1 IPL brand') + '</div>' +
      '<p class="bps-stat-label">' + (isMen ? 'of German engineering' : 'dermatologist recommended') + '</p>' +
      '<h3 class="bps-headline">' + (isMen ? 'Engineered for precision.' : 'Beauty meets technology.') + '</h3>' +
      '<p class="bps-body">' + (isMen ? 'Every Braun product is designed with one goal: effortless results. From the first stroke to the last detail.' : 'Clinically proven results with technology that adapts to your skin. Professional-grade care, at home.') + '</p>' +
    '</div>' +
  '</section>';
}

function categoriesHTML() {
  var goals = state.gender === 'Men' ? MEN_GOALS : WOMEN_GOALS;
  var cards = '';
  for (var i = 0; i < goals.length; i++) {
    cards += '<button class="bps-goal-card bps-fade-in" data-category="' + goals[i].category + '" style="animation-delay:' + (i * 80 + 200) + 'ms">' +
      '<div><h3>' + goals[i].goal + '</h3><p>' + goals[i].description + '</p></div>' +
      '<div class="bps-arrow"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></div>' +
    '</button>';
  }
  return '<section class="bps-categories">' +
    '<div class="bps-categories-inner">' +
      '<h2>What are you looking for?</h2>' +
      cards +
    '</div>' +
  '</section>';
}

function precisionHTML() {
  var options = getPrecisionOptions(state.category);
  var cards = '';
  for (var i = 0; i < options.length; i++) {
    cards += '<button class="bps-priority-btn bps-fade-in" data-priority="' + options[i].id + '" style="animation-delay:' + (i * 100 + 300) + 'ms">' +
      '<div><p class="bps-pri-label">' + options[i].label + '</p><p class="bps-pri-desc">' + options[i].desc + '</p></div>' +
      '<div class="bps-pri-arrow"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="18" height="18"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></div>' +
    '</button>';
  }
  return '<section class="bps-precision bps-fade-in">' +
    '<div class="bps-precision-inner">' +
      '<p class="bps-precision-step">Step 3 of 4</p>' +
      '<h2>What matters most to you?</h2>' +
      '<p class="bps-precision-sub">This helps us match you to the right level.</p>' +
      cards +
    '</div>' +
  '</section>';
}

function resultsHTML() {
  var catProducts = [];
  for (var i = 0; i < products.length; i++) {
    if (products[i].category === state.category) catProducts.push(products[i]);
  }
  var tiers = [];
  var tierOrder = ['Premium','Mid-Range','Entry'];
  for (var t = 0; t < tierOrder.length; t++) {
    var tp = [];
    for (var j = 0; j < catProducts.length; j++) {
      if (catProducts[j].tier === tierOrder[t]) tp.push(catProducts[j]);
    }
    if (tp.length > 0) tiers.push({tier:tierOrder[t],products:tp});
  }

  // Default to matched tier tab
  var activeIndex = state.tierIndex;
  if (state.matchedTier) {
    for (var k = 0; k < tiers.length; k++) {
      if (tiers[k].tier === state.matchedTier) { activeIndex = k; break; }
    }
  }
  var activeTier = tiers[activeIndex] || tiers[0];

  var tierLabel = state.matchedTier === 'Premium' ? 'The best we make' : state.matchedTier === 'Mid-Range' ? 'Smart performance' : 'Reliable daily use';

  var nav = '<div class="bps-results-nav">' +
    '<button data-action="back"><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg> Back</button>' +
    '<span style="font-size:0.7rem;font-weight:500;color:#aaa">' + state.category + '</span>' +
    '<button data-action="reset">Start over</button>' +
  '</div>';

  var header = '<div class="bps-results-header">' +
    '<p class="bps-results-tag">Matched to your routine</p>' +
    '<h2 class="bps-results-title">' + tierLabel + '</h2>' +
  '</div>';

  var tabs = '';
  if (tiers.length > 1) {
    tabs = '<div class="bps-tier-tabs">';
    for (var m = 0; m < tiers.length; m++) {
      tabs += '<button class="bps-tier-tab' + (m === activeIndex ? ' bps-active' : '') + '" data-tier-index="' + m + '">' + tiers[m].tier + '</button>';
    }
    tabs += '</div>';
  }

  var grid = '<div class="bps-product-grid">';
  for (var n = 0; n < activeTier.products.length; n++) {
    var p = activeTier.products[n];
    var premBadge = p.tier === 'Premium' ? '<div class="bps-pbadge">Built to last \u00B7 Engineered for 7+ years of daily use</div>' : '';
    grid += '<div class="bps-product-card bps-fade-in" style="animation-delay:' + (n * 100) + 'ms">' +
      premBadge +
      '<div class="bps-img-area"><div class="bps-img-ph"><span>' + p.series + '</span></div></div>' +
      '<div class="bps-info">' +
        '<p class="bps-series">' + p.series + '</p>' +
        '<p class="bps-name">' + p.name + '</p>' +
        '<p class="bps-feat">' + p.features[0] + '</p>' +
        '<a href="https://www.amazon.com.au/dp/' + p.asin + '" target="_blank" rel="noopener" class="bps-atc">Add to Cart</a>' +
        '<a href="https://www.amazon.com.au/dp/' + p.asin + '" target="_blank" rel="noopener" class="bps-details">See full details</a>' +
      '</div>' +
    '</div>';
  }
  grid += '</div>';

  return '<section class="bps-results bps-fade-in">' + nav + header + tabs + grid + '</section>';
}

// ============================================================
// EVENT BINDING
// ============================================================
function bindEvents(app) {
  if (!app) return;
  app.addEventListener('click', function(e) {
    var el = e.target;
    while (el && el !== app) {
      if (el.getAttribute) {
        var action = el.getAttribute('data-action');
        var gender = el.getAttribute('data-gender');
        var category = el.getAttribute('data-category');
        var priority = el.getAttribute('data-priority');
        var tierIdx = el.getAttribute('data-tier-index');

        if (action === 'start') {
          e.preventDefault();
          state.step = 'gender';
          render();
          return;
        }
        if (gender) {
          e.preventDefault();
          state.gender = gender;
          state.step = 'breathing';
          render();
          setTimeout(function() {
            if (state.step === 'breathing') {
              state.step = 'categories';
              render();
            }
          }, 2500);
          return;
        }
        if (category) {
          e.preventDefault();
          state.category = category;
          state.step = 'precision';
          render();
          return;
        }
        if (priority) {
          e.preventDefault();
          state.priority = priority;
          state.matchedTier = priorityToTier(priority);
          state.step = 'reveal';
          render();
          return;
        }
        if (tierIdx !== null && tierIdx !== undefined && tierIdx !== '') {
          e.preventDefault();
          state.tierIndex = parseInt(tierIdx);
          state.matchedTier = null; // Clear so it uses tierIndex
          render();
          return;
        }
        if (action === 'back') {
          e.preventDefault();
          if (state.step === 'results') {
            state.step = 'precision';
          } else if (state.step === 'precision') {
            state.step = 'categories';
          }
          render();
          return;
        }
        if (action === 'reset') {
          e.preventDefault();
          state = {step:'hero',gender:null,category:null,priority:null,matchedTier:null,tierIndex:0,revealStage:'finding'};
          render();
          return;
        }
      }
      el = el.parentElement;
    }
  });
}

// ============================================================
// INIT
// ============================================================
render();

})();
