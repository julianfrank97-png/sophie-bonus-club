export const categories = [
  { key: 'Radsport', icon: 'bike', label: 'Radsport' },
  { key: 'Kino', icon: 'film', label: 'Kino & Popcorn' },
  { key: 'Laufsport', icon: 'run', label: 'Laufsport' },
  { key: 'Magie', icon: 'moon', label: 'Magische Angelegenheiten' },
  { key: 'Kulinarik', icon: 'coffee', label: 'Kulinarik & Matcha' },
  { key: 'Aufmerksamkeiten', icon: 'flower', label: 'Kleine Aufmerksamkeiten' },
  { key: 'Sonstiges', icon: 'sparkles', label: 'Sonstiges' },
];

const item = (category,title,reason,amount) => ({ id: crypto.randomUUID(), category,title,reason,amount,is_active:true });
export function seedTemplates() { return [
  item('Radsport','Café-Stopp von herausragender Qualität','Die Strecke wurde sorgfältig auf ihre kulinarische Eignung geprüft.',15),
  item('Radsport','Freiwilliger Windschattendienst','Vorbildlicher Einsatz zum Schutz der Geschäftsführung vor Gegenwind.',10),
  item('Radsport','Höhenmeter unzureichend kommuniziert','Eine angeblich flache Strecke enthielt mehrere verdächtige Anstiege.',-12),
  item('Radsport','Café-Quote unterschritten','85 Kilometer gefahren. Null Matcha. Die Behörde ist fassungslos.',-15),
  item('Radsport','Königsetappe als Feierabendrunde verkauft','Die Formulierung „nur eine kleine Runde“ war irreführend.',-20),
  item('Radsport','Premium-Routenplanung','Schöne Strecke, wenig Verkehr, gute Aussicht und passender Zwischenstopp.',20),
  item('Radsport','Unangemeldetes Intervalltraining','Die Geschäftsführung hatte einen anderen Trainingsbereich genehmigt.',-8),
  item('Kino','Strategisch überlegene Sitzplatzwahl','Optimale Sicht, akzeptable Beinfreiheit. Die Geschäftsführung lobt die logistische Kompetenz.',12),
  item('Kino','Vorzeitige Popcorn-Vernichtung','Vorräte bereits vor Beginn des Hauptfilms aufgebraucht. Schwerwiegender Planungsfehler.',-8),
  item('Kino','Filmwahl mit Genehmigungspotenzial','Die ausgewählte Vorstellung erfüllt überraschend viele Qualitätskriterien.',10),
  item('Kino','Unangemeldete Filmkritik','Während des Films wurde ohne schriftliche Genehmigung eine Rezension begonnen.',-15),
  item('Kino','Überdurchschnittliche Snackversorgung','Getränke und Snacks wurden rechtzeitig und in angemessener Menge bereitgestellt.',10),
  item('Kino','Abspannflucht','Das Kino wurde verlassen, bevor eine etwaige Post-Credit-Szene geprüft werden konnte.',-7),
  item('Kino','Akute Nacho-Belästigung','Überdurchschnittliche Knusperaktivität während einer emotionalen Filmszene festgestellt.',-5),
  item('Laufsport','Locker-Lauf-Täuschung','„Wir laufen ganz entspannt“ stellte sich als Tempodauerlauf heraus.',-15),
  item('Laufsport','Vorbildliche Pace-Anpassung','Die Geschäftsführung bestätigt die Einhaltung des vereinbarten Wohlfühltempos.',12),
  item('Laufsport','Unangekündigte Zusatzkilometer','„Nur noch bis zur nächsten Kreuzung“ wurde mehrfach wiederholt.',-10),
  item('Laufsport','Vorbildliche Streckenwahl','Eine landschaftlich schöne Route ohne unnötige topografische Überraschungen.',10),
  item('Laufsport','GPS-bedingte Startverzögerung','Die sportliche Betätigung wurde wegen mangelnder Satellitenbereitschaft verspätet aufgenommen.',-5),
  item('Laufsport','Garmin-Eskalation','Trotz offiziell lockerem Lauf wurden verdächtig viele Leistungsdaten kommentiert.',-8),
  item('Magie','Magischer Filmabend','Angemessene Verpflegung und störungsfreie Harry-Potter-Vorführung sichergestellt.',15),
  item('Magie','Muggelhafte Wissenslücke','Erhebliche Unsicherheiten bezüglich grundlegender Zaubererwelt-Sachverhalte festgestellt.',-8),
  item('Magie','Verstoß gegen die Geheimhaltungsverordnung','Ungefragter Spoiler zu einer magischen Angelegenheit.',-20),
  item('Magie','Verdienst um die magische Gemeinschaft','Die Geschäftsführung erkennt außergewöhnliches Potter-Fachwissen an.',10),
  item('Magie','Unzulässige Gandalf-Verwechslung','Wiederholte Vermischung verschiedener magischer Zuständigkeitsbereiche.',-12),
  item('Kulinarik','Matcha von bemerkenswerter Qualität','Die Versorgung mit hochwertigem Matcha konnte zweifelsfrei nachgewiesen werden.',10),
  item('Kulinarik','Vegetarisches Abendessen','Überraschend hohe Genussquote ohne fleischhaltige Nebendarsteller.',15),
  item('Kulinarik','After-Eight-Vorräte dezimiert','Die Bestandsaufnahme ergab unerklärliche Fehlmengen.',-6),
  item('Aufmerksamkeiten','Wildblumenüberraschung','Die Geschäftsführung würdigt die florale Eigeninitiative.',12),
  item('Aufmerksamkeiten','Kleine Aufmerksamkeit','Unerwartete und ausgesprochen gut durchdachte Geste.',10),
  item('Sonstiges','Außergewöhnlich schlechte Wortwitzqualität','Der Tatbestand erfüllt alle Kriterien schwerer Kalauerkriminalität.',-5),
  item('Sonstiges','Unangekündigt gute Idee','Nach sorgfältiger Prüfung: ein erstaunlich vernünftiger Einfall.',15),
  item('Sonstiges','Begründung geheim','Entscheidung unterliegt der Geheimhaltung. Einspruch ausdrücklich möglich.',-7),
]; }

export const oneLiners = {
  add: ['Die Geschäftsführung zeigt sich ausnahmsweise beeindruckt.','Eine seltene Anerkennung wurde aktenkundig.','Die Bonusbehörde gratuliert widerwillig.','Sorgfältig geprüft. Überraschend positiv entschieden.'],
  subtract: ['Die zuständige Stelle ist wenig begeistert.','Ein bedauerlicher, aber verwaltungstechnisch interessanter Vorfall.','Die Akte wird unter „ausbaufähig“ geführt.','Die Geschäftsführung sieht Gesprächsbedarf.'],
  accept: ['Die Geschäftsführung nimmt Ihre überraschende Einsicht wohlwollend zur Kenntnis.','Ihre Kapitulation wurde ordnungsgemäß dokumentiert.','Das Verfahren wurde geschlossen. Die Behörde bedankt sich für die Kooperation.','Akzeptiert. Das Formular zur Selbstreflexion entfällt.'],
  appeal: ['Der Einspruch ist eingegangen. Die Erfolgsaussichten bleiben Gegenstand streng geheimer Beratungen.','Ihr Widerspruch wird dem zuständigen Ausschuss zur Kenntnis gebracht.','Die Rechtsabteilung wurde alarmiert. Sie bestand bis eben aus einer Person.','Das Ministerium hat Ihre Ausführungen mit hochgezogener Augenbraue registriert.'],
  ruling: ['Der Antrag wurde mit größtmöglicher Förmlichkeit bearbeitet.','Die Geschäftsführung hat gesprochen. Die Aktenlage war erschütternd.','Dieser Bescheid bedarf keiner weiteren dramatischen Musik.']
};

export function escapeHTML(v) {return String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function randomLine(category) { const arr=oneLiners[category]??oneLiners.ruling;return arr[Math.floor(Math.random()*arr.length)]; }
export function formatPts(n) {let val=Number(n)||0;return `${val>0?'+':val<0?'−':''}${Math.abs(val).toLocaleString('de-DE')}`;}
export function validAmount(v) {return Number.isInteger(Number(v))&&Number(v)!==0&&Math.abs(Number(v))<=100000;}
export function formatDate(iso) {return new Intl.DateTimeFormat('de-DE',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(iso));}
export function sumEntries(entries) {return entries.reduce((a,e)=>a+Number(e.amount),0);}
export function id() {return crypto.randomUUID();}
export function now() {return new Date().toISOString();}

// Context-aware, deterministic sequencing with rotating variations. No LLM or personal data transfer.
const combos = {
  noCoffee:[
    'Auf {k} Kilometern mit {h} Höhenmetern wurde kein einziger Café-Stopp dokumentiert. Die gastronomische Versorgung existierte damit offenbar ausschließlich auf dem Papier.',
    '{k} Kilometer, {h} Höhenmeter und exakt null Café-Stopps. Die zuständige Stelle fragt sich, ob hier eine Rennradausfahrt oder eine kulinarische Sparmaßnahme durchgeführt wurde.',
    'Die Strecke umfasste {k} Kilometer. Trotz {h} Höhenmetern wurde keine Gelegenheit zur geregelten Kuchenaufnahme eingeräumt.',
    'Bei einer Streckenlänge von {k} Kilometern wurde eine Café-Quote von null festgestellt. Selbst der Prüfalgorithmus hält dies für mutig.',
    '{h} Höhenmeter wurden absolviert, doch der Matcha-Anteil blieb bei null. Die Behörde erwägt eine gastronomische Notstandserklärung.',
  ],
  climb:[
    '{h} Höhenmeter auf {k} Kilometern lassen erhebliche Zweifel an der Einstufung als entspannte Ausfahrt aufkommen.',
    'Die topografische Auswertung ergab {h} Höhenmeter. Eine Genehmigung für diese Bergdichte konnte nicht gefunden werden.',
    'Auf {k} Kilometern wurden {h} Höhenmeter versteckt. Die Rennleitung spricht von einem Geländeprofil mit Täuschungsabsicht.',
    'Trotz {c} Café-Stopps kann die ungewöhnliche Konzentration von Höhenmetern nicht vollständig entschuldigt werden.',
    'Die untersuchte Strecke weist {h} Höhenmeter auf. Die Formulierung „leicht wellig“ wird aus den Akten gestrichen.',
  ],
  coffee:[
    '{c} Café-Stopps auf {k} Kilometern wurden registriert. Die gastronomische Streckenplanung erfüllt die Erwartungen der Behörde.',
    'Die Ausfahrt über {k} Kilometer und {h} Höhenmeter enthielt {c} ordnungsgemäße Café-Unterbrechungen. Eine erfreuliche Prioritätensetzung.',
    'Bei {c} Café-Stopps auf {k} Kilometern erkennt die Geschäftsführung eine ausgeprägte Versorgungskompetenz.',
    'Die Route weist {h} Höhenmeter und {c} Café-Besuche auf. Die Behörde erwägt eine lobende Erwähnung.',
  ],
  ordinary:[
    'Die Route umfasste {k} Kilometer, {h} Höhenmeter und {c} Café-Stopps. Die Gesamtbewertung bleibt der Geschäftsführung vorbehalten.',
    '{k} Kilometer wurden zurückgelegt. {c} gastronomische Unterbrechungen sind aktenkundig. Der weitere Sachverhalt wird geprüft.',
    'Im Streckenprotokoll finden sich {h} Höhenmeter und {c} Café-Stopps. Die Behörde ist sich über die angemessene Reaktion noch uneinig.',
    'Die Ausfahrt über {k} Kilometer ist erfasst. Der vorliegende Café- und Höhenmeterbestand bietet Anlass für eine Ermessensentscheidung.',
  ]
};
const intros={
  amt:['Nach eingehender Prüfung der eingereichten Routendaten:','Die zuständige Fachabteilung stellt nach Aktenlage fest:','Im Rahmen einer unangekündigten Qualitätskontrolle ergab sich:','Die Geschäftsführung nimmt folgenden Sachverhalt zu Protokoll:'],
  renn:['Die Rennkommissare haben das Streckenprotokoll ausgewertet:','Nach eingehender Analyse der Etappendaten meldet die Rennleitung:','Der sportliche Untersuchungsausschuss kommt zu folgendem Ergebnis:','Das unabhängige Kontrollgremium stellt fest:'],
  magie:['Die Außenstelle für magische Radsportangelegenheiten teilt mit:','Ein Blick in die verzauberten Prüfunterlagen offenbart:','Nach Anhörung des Rates für ungewöhnliche Radtouren steht fest:','Ein behördlicher Aufdeckungszauber hat Folgendes ergeben:']
};
const endings={
  amt:['Die Höhe einer möglichen Bonuskorrektur bestimmt allein die Geschäftsführung.','Ein Anspruch auf wohlwollende Bearbeitung besteht nicht.','Die Akte wird zur abschließenden Ermessensentscheidung vorgelegt.','Das Recht auf einen aussichtslosen Einspruch bleibt unberührt.'],
  renn:['Die Entscheidung über eine Bonusstrafe liegt bei der Rennleitung.','Ein Protest des Fahrers wird vorsorglich erwartet.','Die Rennkommissare behalten sich weitere Maßnahmen vor.','Eine nachträgliche Disqualifikation von der Café-Wertung bleibt vorbehalten.'],
  magie:['Eine magische Nachprüfung ist jederzeit möglich.','Über die passende Punktestrafe entscheidet die oberste Zauberbehörde.','Ein geeigneter Gegenzauber wurde bislang nicht gefunden.','Die endgültige Entscheidung liegt bei der zuständigen Hexe.']
};
export function routeReport(km,hm,cafes,style='amt',revision=0) {
  const k=Number(km),h=Number(hm),c=Number(cafes);
  if(!Number.isFinite(k)||!Number.isFinite(h)||!Number.isFinite(c)||k<=0||k>2000||h<0||h>30000||c<0||c>100||!Number.isInteger(c)) throw Error('Bitte gültige Kilometer, Höhenmeter und Café-Stopps eingeben.');
  const kind=k>=25&&c===0?'noCoffee':k>=20&&h/k>12?'climb':c>0&&k/c<=45?'coffee':'ordinary';
  const s=intros[style]?style:'amt', a=combos[kind],idx=Math.abs(Math.trunc(revision));
  const interpolate=(str)=>str.replace(/\{(k|h|c)\}/g,(_a,key)=>({k:k.toLocaleString('de-DE',{maximumFractionDigits:1}),h:h.toLocaleString('de-DE'),c:String(c)}[key]));
  const statement=interpolate(a[idx%a.length]);
  return {kind, text:`${intros[s][(idx+Math.floor(idx/2))%intros[s].length]} ${statement} ${endings[s][(idx+Math.floor(idx/3))%endings[s].length]}`};
}
