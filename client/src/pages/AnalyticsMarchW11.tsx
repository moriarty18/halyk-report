import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Cell, PieChart, Pie
} from 'recharts';
import {
  TrendingUp, Database, ArrowUpRight, ArrowDownRight, Info
} from "lucide-react";
import { Link } from "wouter";

// =============================================
// ДАННЫЕ — НЕДЕЛЯ 11: 9–15 марта 2026
// Источник: milan2_export_2026-03-09_2026-03-16 (1,315 строк)
// Дедупликация: по БИН (приоритет: google > meta > dealer > kolesa-page > остальные)
// Согласие: consent_date заполнена в CRM
// Итого уникальных заявок: 993 (927 уник. БИН из CRM + 66 скриншот дилеров)
// =============================================

// Исторические данные (заявки без дедупл. между неделями)
const weeklyComparison = [
  { week: 'Нед. 7',  period: '9-15 фев',      google: 109, meta: 136, kolesa: 323, dealers: 72,  other: 44,  total: 684  },
  { week: 'Нед. 8',  period: '16-22 фев',     google: 89,  meta: 250, kolesa: 366, dealers: 89,  other: 44,  total: 838  },
  { week: 'Нед. 9',  period: '23 фев-1 мар',  google: 99,  meta: 311, kolesa: 415, dealers: 78,  other: 98,  total: 1001 },
  { week: 'Нед. 10', period: '2-8 мар',       google: 73,  meta: 124, kolesa: 362, dealers: 191, other: 7,   total: 757  },
  { week: 'Нед. 11', period: '9-15 мар',      google: 130, meta: 309, kolesa: 405, dealers: 85,  other: 64,  total: 993  },
];

const leadsChartData = weeklyComparison.map(w => ({
  week: w.week,
  'Google Ads': w.google,
  'Meta Ads':   w.meta,
  'Kolesa DM':  w.kolesa,
  'Дилеры':     w.dealers,
  'Остальные':  w.other,
}));

const totalLeadsChartData = weeklyComparison.map(w => ({
  week: w.week,
  period: w.period,
  'Всего заявок': w.total,
}));

// ===== ВОРОНКА ПО КАНАЛАМ — НЕДЕЛЯ 11 (дедупл. по БИН) =====
const channelTotals = [
  {
    channel: 'Google Ads',
    impressions: 11038, clicks: 1908, ctr: 17.29,
    leads: 130, consents: 59, approved: 7,
    cost: 768.83,
    note: null,
  },
  {
    channel: 'Meta Ads',
    impressions: 59351, clicks: 1635, ctr: 2.75,
    leads: 309, consents: 144, approved: 10,
    cost: 297.20,
    note: 'meta (305) + ig (4)',
  },
  {
    channel: 'Kolesa DM',
    impressions: null, clicks: null, ctr: null,
    leads: 405, consents: 160, approved: null,
    cost: null,
    note: 'из CRM Excel, поле Источник=Kolesa DM',
  },
  {
    channel: 'Дилеры',
    impressions: null, clicks: null, ctr: null,
    leads: 85, consents: null, approved: null,
    cost: null,
    note: 'UTM dealer (19) + скриншот (66)',
  },
  {
    channel: 'Остальные',
    impressions: null, clicks: null, ctr: null,
    leads: 64, consents: 49, approved: 24,
    cost: null,
    note: '993 − 130 − 309 − 405 − 85',
  },
];

// Google Ads — кампании нед. 11
const googleAdsCampaigns = [
  { campaign: 'Общие ключевые слова',     impressions: 7162, clicks: 1392, conversions: 122.77, cost: 558.21, ctr: 19.44, cr: 8.82 },
  { campaign: 'Строительство',            impressions: 1635, clicks: 216,  conversions: 12.33,  cost: 83.63,  ctr: 13.21, cr: 5.71 },
  { campaign: 'Такси / Автобусы',         impressions: 903,  clicks: 97,   conversions: 5.16,   cost: 43.13,  ctr: 10.74, cr: 5.32 },
  { campaign: 'Сельское хозяйство',       impressions: 505,  clicks: 82,   conversions: 5.00,   cost: 32.82,  ctr: 16.24, cr: 6.10 },
  { campaign: 'Дистрибуция и ритейл',     impressions: 428,  clicks: 55,   conversions: 4.65,   cost: 26.04,  ctr: 12.85, cr: 8.45 },
  { campaign: 'Грузоперевозки',           impressions: 273,  clicks: 47,   conversions: 5.00,   cost: 19.00,  ctr: 17.22, cr: 10.64 },
  { campaign: 'ГМК и нефтедобыча',        impressions: 132,  clicks: 19,   conversions: 3.00,   cost: 6.00,   ctr: 14.39, cr: 15.79 },
];

// Google Ads — динамика нед. 8–11
const googleAdsWeekly = [
  { week: 'Нед. 8',  impressions: 8498,  clicks: 1738, leads: 89,  cost: 726.61 },
  { week: 'Нед. 9',  impressions: 10299, clicks: 1855, leads: 99,  cost: 745.55 },
  { week: 'Нед. 10', impressions: 7651,  clicks: 1561, leads: 73,  cost: 664.16 },
  { week: 'Нед. 11', impressions: 11038, clicks: 1908, leads: 130, cost: 768.83 },
];

// Meta Ads — динамика нед. 8–11
const metaAdsWeekly = [
  { week: 'Нед. 8',  impressions: 63498, reach: 30842, leads: 250, cost: 256.65 },
  { week: 'Нед. 9',  impressions: 69107, reach: 34961, leads: 311, cost: 301.25 },
  { week: 'Нед. 10', impressions: 61034, reach: 31689, leads: 124, cost: 294.38 },
  { week: 'Нед. 11', impressions: 59351, reach: 31365, leads: 309, cost: 297.20 },
];

// Дилеры — скриншот дилерской системы (10–13 марта)
const dealerSources = [
  { source: 'ТОО «BAIKONUR MACHINERY COMPANY»',    w11: 18 },
  { source: 'Халык-Банк, органика',                 w11: 16 },
  { source: 'ТОО «ZOOMLION Central Asia»',          w11: 13 },
  { source: 'ТОО «Компания Ас-Ай ЛТД»',            w11: 6  },
  { source: 'ТОО «КАЗПРОФИГРУПП»',                  w11: 3  },
  { source: 'ТОО «NKB GROUP KAZAKHSTAN»',           w11: 3  },
  { source: 'ТОО «СиноТехМаш»',                     w11: 2  },
  { source: 'ТОО «HYUNDAI» Коммерческий Центр',     w11: 2  },
  { source: 'ТОО «NKB Group Spectehnika»',          w11: 1  },
  { source: 'АО «Халык-Лизинг»',                    w11: 1  },
  { source: 'ТОО «TRUCK AUTO SERVICE»',             w11: 1  },
];

// Итоги нед. 11 (после дедупл. по БИН)
const totalLeads    = 993;   // 927 уник. БИН из CRM + 66 скриншот
const totalConsents = 416;   // Google(59)+Meta(144)+Kolesa(160)+DealerUTM(13)+Other(49) — дедупл. по БИН
const totalApproved = 51;    // из CRM экспорта (дедупл.)
const totalSpend    = 768.83 + 297.20;
const paidLeads     = 130 + 309; // Google + Meta (дедупл.)

// Дельта vs нед. 10
const w10_total  = 757;
const deltaLeads = totalLeads - w10_total;
const deltaSpend = totalSpend - (664.16 + 294.38);

const COLORS: Record<string, string> = {
  'Google Ads': '#4285f4',
  'Meta Ads':   '#0668E1',
  'Kolesa DM':  '#ff6b35',
  'Дилеры':     '#f59e0b',
  'Остальные':  '#94a3b8',
};

// Pie chart — структура заявок нед. 11
const leadsPieData = [
  { name: 'Остальные', value: 64,  color: '#94a3b8' },
  { name: 'Kolesa DM', value: 405, color: '#ff6b35' },
  { name: 'Meta Ads',  value: 309, color: '#0668E1' },
  { name: 'Google Ads', value: 130, color: '#4285f4' },
  { name: 'Дилеры',    value: 85,  color: '#f59e0b' },
];

export default function AnalyticsMarchW11() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">H</div>
                <span className="font-bold text-lg tracking-tight">Halyk Leasing</span>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Отчет</Link>
            <Link href="/analytics" className="hover:text-foreground transition-colors">Дек</Link>
            <Link href="/analytics-january" className="hover:text-foreground transition-colors">Янв</Link>
            <Link href="/analytics-february" className="hover:text-foreground transition-colors">Фев (нед. 6-8)</Link>
            <Link href="/analytics-february-w9" className="hover:text-foreground transition-colors">Нед. 9</Link>
            <Link href="/analytics-march-w10" className="hover:text-foreground transition-colors">Нед. 10</Link>
            <span className="text-foreground font-semibold border-b-2 border-primary pb-0.5">Нед. 11</span>
            <Link href="/roadmap" className="hover:text-foreground transition-colors">Планы</Link>
          </nav>
          <div className="text-sm text-muted-foreground">9 – 15 марта 2026</div>
        </div>
      </header>

      <main className="container py-10 space-y-12">

        {/* Hero */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Воронка продаж — Неделя 11</h1>
              <p className="text-muted-foreground mt-1">
                9 – 15 марта 2026 &nbsp;|&nbsp; Дедупликация по БИН &nbsp;|&nbsp; 993 уникальных заявки
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link href="/analytics"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Декабрь 2025</Badge></Link>
            <Link href="/analytics-january"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Январь 2026</Badge></Link>
            <Link href="/analytics-february"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Февраль (нед. 6-8)</Badge></Link>
            <Link href="/analytics-february-w9"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Неделя 9</Badge></Link>
            <Link href="/analytics-march-w10"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Неделя 10</Badge></Link>
            <Badge variant="default">Неделя 11</Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Ключевые показатели — Неделя 11</h2>
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Уникальных заявок</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalLeads.toLocaleString()}</div>
                <p className={`text-xs mt-1 flex items-center gap-1 ${deltaLeads >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {deltaLeads >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {deltaLeads >= 0 ? '+' : ''}{deltaLeads} vs нед. 10
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Согласий</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalConsents}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  CR {(totalConsents / totalLeads * 100).toFixed(1)}% от заявок
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Одобрено</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">{totalApproved}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  CR {(totalApproved / totalConsents * 100).toFixed(1)}% от согласий
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Расходы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalSpend.toFixed(2)}</div>
                <p className={`text-xs mt-1 flex items-center gap-1 ${deltaSpend >= 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                  {deltaSpend >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {deltaSpend >= 0 ? '+' : ''}${Math.abs(deltaSpend).toFixed(2)} vs нед. 10
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">CPL (платные)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${(totalSpend / paidLeads).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">Google + Meta ({paidLeads} лидов)</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Full Funnel Table */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Полная воронка по каналам — Неделя 11</h2>
          <p className="text-sm text-muted-foreground mb-4">Дедупликация по БИН. Один БИН = одна заявка. Приоритет: Google → Meta → Dealer → Kolesa → Остальные.</p>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Канал</th>
                      <th className="text-right py-3 px-2 font-medium">Показы</th>
                      <th className="text-right py-3 px-2 font-medium">Клики</th>
                      <th className="text-right py-3 px-2 font-medium">CTR</th>
                      <th className="text-right py-3 px-2 font-medium">Заявки (уник. БИН)</th>
                      <th className="text-right py-3 px-2 font-medium">CR Клик→Заявка</th>
                      <th className="text-right py-3 px-2 font-medium">Согласия</th>
                      <th className="text-right py-3 px-2 font-medium">CR Заявка→Согл.</th>
                      <th className="text-right py-3 px-2 font-medium">Одобрено</th>
                      <th className="text-right py-3 px-2 font-medium">CR Согл.→Одобр.</th>
                      <th className="text-right py-3 px-2 font-medium">Расход</th>
                      <th className="text-right py-3 px-2 font-medium">CPL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelTotals.map((ch, i) => {
                      const hasImpr  = ch.impressions != null;
                      const hasClicks = ch.clicks != null;
                      const ctr      = hasImpr && hasClicks ? (ch.clicks! / ch.impressions! * 100).toFixed(2) : null;
                      const crLead   = hasClicks ? (ch.leads / ch.clicks! * 100).toFixed(2) : null;
                      const crConsent = ch.consents != null ? (ch.consents / ch.leads * 100).toFixed(1) : null;
                      const crApproved = ch.approved != null && ch.consents != null
                        ? (ch.approved / ch.consents * 100).toFixed(1) : null;
                      const cpl = ch.cost ? (ch.cost / ch.leads).toFixed(2) : null;
                      return (
                        <tr key={i} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[ch.channel] || '#94a3b8' }}></div>
                              <div>
                                <span className="font-medium">{ch.channel}</span>
                                {ch.note && <div className="text-xs text-muted-foreground">{ch.note}</div>}
                              </div>
                            </div>
                          </td>
                          <td className="text-right py-3 px-2 font-mono">{hasImpr ? ch.impressions!.toLocaleString() : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono">{hasClicks ? ch.clicks!.toLocaleString() : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono text-blue-600">{ctr ? `${ctr}%` : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono font-semibold">{ch.leads.toLocaleString()}</td>
                          <td className="text-right py-3 px-2 font-mono text-blue-600">{crLead ? `${crLead}%` : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono">{ch.consents != null ? ch.consents : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">{crConsent ? `${crConsent}%` : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono">{ch.approved != null ? ch.approved : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">{crApproved ? `${crApproved}%` : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono">{ch.cost ? `$${ch.cost.toFixed(2)}` : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono">{cpl ? `$${cpl}` : '—'}</td>
                        </tr>
                      );
                    })}
                    <tr className="font-bold bg-muted/30">
                      <td className="py-3 px-2">ИТОГО</td>
                      <td className="text-right py-3 px-2 font-mono">70,389</td>
                      <td className="text-right py-3 px-2 font-mono">3,543</td>
                      <td className="text-right py-3 px-2 font-mono">—</td>
                      <td className="text-right py-3 px-2 font-mono">{totalLeads.toLocaleString()}</td>
                      <td className="text-right py-3 px-2 font-mono">—</td>
                      <td className="text-right py-3 px-2 font-mono">{totalConsents}</td>
                      <td className="text-right py-3 px-2 font-mono text-emerald-600">{(totalConsents / totalLeads * 100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-2 font-mono">{totalApproved}</td>
                      <td className="text-right py-3 px-2 font-mono text-emerald-600">{(totalApproved / totalConsents * 100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-2 font-mono">${totalSpend.toFixed(2)}</td>
                      <td className="text-right py-3 px-2 font-mono">${(totalSpend / paidLeads).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-muted-foreground mt-3 px-2">
                  * Согласия по «Дилерам» (скриншот) не отслеживаются. Одобрение по «Kolesa DM» недоступно в данном срезе.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Структура заявок */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Структура заявок — Неделя 11</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-base">Доля каналов (993 уник. заявки)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadsPieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      labelLine={true}
                    >
                      {leadsPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value} заявок`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Заявки по каналам (нед. 7–11)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={leadsChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Google Ads" stackId="a" fill={COLORS['Google Ads']} />
                    <Bar dataKey="Meta Ads"   stackId="a" fill={COLORS['Meta Ads']} />
                    <Bar dataKey="Kolesa DM"  stackId="a" fill={COLORS['Kolesa DM']} />
                    <Bar dataKey="Дилеры"     stackId="a" fill={COLORS['Дилеры']} />
                    <Bar dataKey="Остальные"  stackId="a" fill={COLORS['Остальные']} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Динамика всего заявок */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Динамика уникальных заявок (нед. 7–11)</h2>
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={totalLeadsChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[600, 1100]} />
                  <Tooltip
                    formatter={(value: number) => [`${value} заявок`, 'Всего']}
                    labelFormatter={(label) => {
                      const item = totalLeadsChartData.find(d => d.week === label);
                      return item ? `${label} (${item.period})` : label;
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Всего заявок"
                    stroke="#4285f4"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#4285f4' }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Dealers Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Дилеры — Неделя 11</h2>
          <div className="grid gap-4 md:grid-cols-3 mb-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Всего заявок от дилеров</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">85</div>
                <p className="text-xs text-muted-foreground mt-1">ИП через квиз: 19 + скриншот: 66</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Скриншот дилерской системы</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">66</div>
                <p className="text-xs text-muted-foreground mt-1">10–13 марта | 11 дилеров</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">ИП через квиз (utm=dealer)</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">19</div>
                <p className="text-xs text-muted-foreground mt-1">Согласий: 13 | CR 68.4%</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-base">Заявки по дилерам — скриншот системы (10–13 марта)</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-3 font-medium">Дилер</th>
                      <th className="text-right py-3 px-3 font-medium">Заявки (нед. 11)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dealerSources.map((d, i) => (
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-3">{d.source}</td>
                        <td className="text-right py-2 px-3 font-mono font-bold">{d.w11}</td>
                      </tr>
                    ))}
                    <tr className="font-bold bg-muted/30">
                      <td className="py-2 px-3">ИТОГО (скриншот)</td>
                      <td className="text-right py-2 px-3 font-mono">66</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Google Ads Detail */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Google Ads — Неделя 11</h2>
          <div className="grid gap-4 md:grid-cols-4 mb-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Показы</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">11,038</div>
                <p className="text-xs text-emerald-600 mt-1">+3,387 vs нед. 10 (+44%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Клики</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,908</div>
                <p className="text-xs text-muted-foreground mt-1">CTR 17.29%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Расход</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$768.83</div>
                <p className="text-xs text-muted-foreground mt-1">CPL $5.91 (130 лидов)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Конверсии (GA)</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">157.91</div>
                <p className="text-xs text-muted-foreground mt-1">CR 8.27%</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-base">Кампании Google Ads — Неделя 11</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium">Кампания</th>
                        <th className="text-right py-3 px-2 font-medium">Показы</th>
                        <th className="text-right py-3 px-2 font-medium">Клики</th>
                        <th className="text-right py-3 px-2 font-medium">CTR</th>
                        <th className="text-right py-3 px-2 font-medium">Конв.</th>
                        <th className="text-right py-3 px-2 font-medium">CR</th>
                        <th className="text-right py-3 px-2 font-medium">Расход</th>
                      </tr>
                    </thead>
                    <tbody>
                      {googleAdsCampaigns.map((c, i) => (
                        <tr key={i} className="border-b hover:bg-muted/50">
                          <td className="py-2 px-2 text-xs">{c.campaign}</td>
                          <td className="text-right py-2 px-2 font-mono text-xs">{c.impressions.toLocaleString()}</td>
                          <td className="text-right py-2 px-2 font-mono text-xs">{c.clicks.toLocaleString()}</td>
                          <td className="text-right py-2 px-2 font-mono text-xs text-blue-600">{c.ctr}%</td>
                          <td className="text-right py-2 px-2 font-mono text-xs">{c.conversions.toFixed(2)}</td>
                          <td className="text-right py-2 px-2 font-mono text-xs text-emerald-600">{c.cr}%</td>
                          <td className="text-right py-2 px-2 font-mono text-xs">${c.cost.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="font-bold bg-muted/30 text-xs">
                        <td className="py-2 px-2">ИТОГО</td>
                        <td className="text-right py-2 px-2 font-mono">11,038</td>
                        <td className="text-right py-2 px-2 font-mono">1,908</td>
                        <td className="text-right py-2 px-2 font-mono text-blue-600">17.29%</td>
                        <td className="text-right py-2 px-2 font-mono">157.91</td>
                        <td className="text-right py-2 px-2 font-mono text-emerald-600">8.27%</td>
                        <td className="text-right py-2 px-2 font-mono">$768.83</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Динамика Google Ads (нед. 8–11)</CardTitle></CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={googleAdsWeekly}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leads"  name="Заявки (CRM, дедупл.)" fill={COLORS['Google Ads']} />
                    <Bar dataKey="clicks" name="Клики"                  fill="#93c5fd" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Meta Ads Detail */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Meta Ads — Неделя 11</h2>
          <div className="grid gap-4 md:grid-cols-4 mb-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Охват</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">31,365</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Показы</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">59,351</div>
                <p className="text-xs text-muted-foreground mt-1">Frequency 1.89</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Расход</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$297.20</div>
                <p className="text-xs text-muted-foreground mt-1">CPL $0.96 (309 лидов)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Клики по ссылке</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,635</div>
                <p className="text-xs text-muted-foreground mt-1">CTR 2.75%</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-base">Динамика Meta Ads (нед. 8–11)</CardTitle></CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={metaAdsWeekly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" name="Заявки (CRM, дедупл.)" fill={COLORS['Meta Ads']} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Notes */}
        <section>
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Info className="h-4 w-4" />
                Методология и примечания
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• <strong>Период:</strong> Неделя 11 — 9–15 марта 2026</p>
              <p>• <strong>Источник:</strong> milan2_export_2026-03-09_2026-03-16 (1,315 строк, 927 уникальных БИН)</p>
              <p>• <strong>Дедупликация:</strong> по полю <code>bin</code>. Один БИН = одна заявка. Приоритет источника: Google → Meta → Dealer → Kolesa → Остальные. Итого 993 уникальных заявки (927 из CRM + 66 из скриншота дилеров).</p>
              <p>• <strong>Согласие:</strong> поле <code>consent_date</code> заполнено в CRM. Итого: 561 согласие (до дедупл.), 417 (после дедупл. по БИН).</p>
              <p>• <strong>Kolesa DM:</strong> 461 строк / 405 уникальных БИН из CRM Excel (поле Источник=Kolesa DM). После дедупл. — 405 заявок, 160 согласий.</p>
              <p>• <strong>Дилеры:</strong> utm_source=dealer (35 строк / 19 уник. БИН после дедупл.) + скриншот дилерской системы (66 заявок, 10–13 марта) = 85 итого.</p>
              <p>• <strong>Поле «Источник» в CRM Excel</strong> — предмет лизинга (от какого дилера техника), не маркетинговый канал. В статистику не включается.</p>
              <p>• <strong>Одобрение:</strong> approval_status = APPROVED | 61 (до дедупл.) / 51 (после дедупл. по БИН).</p>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}
