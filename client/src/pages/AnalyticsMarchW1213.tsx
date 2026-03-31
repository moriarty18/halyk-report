import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Cell, PieChart, Pie
} from 'recharts';
import {
  TrendingUp, Database, ArrowUpRight, ArrowDownRight, Info,
  Megaphone, Bot, CheckCircle, Clock, Zap, MessageSquare, Globe, Bell, Monitor
} from "lucide-react";
import { Link } from "wouter";

// =============================================
// ДАННЫЕ — НЕДЕЛЯ 12-13: 16–29 марта 2026
// Источник: UTM (16.03-29.03.csv) + CRM (Обработка заявок.xlsx)
// Дедупликация: по БИН/ИИН
// Согласие: CRM МЕТОДИКА не пусто → 642 (41.3%)
// Одобрено: UTM approval_status = APPROVED → 100 (15.6% от согласий)
// Уникальных заявок: 1,555
// =============================================

const COLORS: Record<string, string> = {
  'Google Ads': '#4285f4',
  'Meta Ads':   '#0668E1',
  'Kolesa DM':  '#ff6b35',
  'Дилеры':     '#f59e0b',
  'Zoomlion':   '#10b981',
  'Органика/Пр.': '#94a3b8',
};

// Исторические данные (нед.7-13, разбивка 12-13 по UTM)
const weeklyComparison = [
  { week: 'Нед. 7',  period: '9-15 фев',      google: 109, meta: 136, kolesa: 323, dealers: 72,  other: 44,  total: 684  },
  { week: 'Нед. 8',  period: '16-22 фев',     google: 89,  meta: 250, kolesa: 366, dealers: 89,  other: 44,  total: 838  },
  { week: 'Нед. 9',  period: '23 фев-1 мар',  google: 99,  meta: 311, kolesa: 415, dealers: 78,  other: 98,  total: 1001 },
  { week: 'Нед. 10', period: '2-8 мар',       google: 73,  meta: 124, kolesa: 362, dealers: 191, other: 7,   total: 757  },
  { week: 'Нед. 11', period: '9-15 мар',      google: 130, meta: 309, kolesa: 405, dealers: 85,  other: 64,  total: 993  },
  { week: 'Нед. 12', period: '16-22 мар',     google: 149, meta: 276, kolesa: 320, dealers: 21,  other: 57,  total: 823  },
  { week: 'Нед. 13', period: '23-29 мар',     google: 164, meta: 372, kolesa: 335, dealers: 32,  other: 90,  total: 793  },
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

// Воронка по каналам (уникальные БИН)
const channelTotals = [
  {
    channel: 'Google Ads',
    impressions: 15275, clicks: 3087, ctr: 20.21,
    leads: 171, consents: 57, approved: 15,
    cost: 1313.36,
    note: 'Из CSV кабинета Google Ads',
  },
  {
    channel: 'Meta Ads',
    impressions: 103601, clicks: 2731, ctr: 2.64,
    leads: 472, consents: 201, approved: 14,
    cost: 592.60,
    note: 'Охват 46,141 | CPL $1.12 | Частота 2.25',
  },
  {
    channel: 'Kolesa DM',
    impressions: null, clicks: null, ctr: null,
    leads: 655, consents: 189, approved: 17,
    cost: null,
    note: 'Партнёрский источник (42.1% всех заявок)',
  },
  {
    channel: 'Zoomlion',
    impressions: 117946, clicks: 338, ctr: null,
    leads: 16, consents: 10, approved: 2,
    cost: null,
    note: 'Пуши (82,376 отпр.) + Баннеры (35,549 разм.)',
  },
  {
    channel: 'Дилеры',
    impressions: null, clicks: null, ctr: null,
    leads: 35, consents: 27, approved: 3,
    cost: null,
    note: 'UTM utm_source=dealer',
  },
  {
    channel: 'Органика/Пр.',
    impressions: null, clicks: null, ctr: null,
    leads: 206, consents: 158, approved: 49,
    cost: null,
    note: 'Прямые, Online Bank, Instagram, WhatsApp',
  },
];

// Google Ads кампании (из CSV)
const googleAdsCampaigns = [
  { campaign: 'Общие ключевые слова',  impressions: 8760,  clicks: 2083, conversions: 186.07, cost: 880.95, ctr: 23.8, cr: 8.93 },
  { campaign: 'Строительство',         impressions: 2608,  clicks: 391,  conversions: 17.2,   cost: 175.27, ctr: 15.0, cr: 4.40 },
  { campaign: 'Такси / Автобусы',      impressions: 1515,  clicks: 218,  conversions: 11.5,   cost: 92.27,  ctr: 14.4, cr: 5.28 },
  { campaign: 'Дистрибуция и ритейл',  impressions: 813,   clicks: 121,  conversions: 8.0,    cost: 51.19,  ctr: 14.9, cr: 6.61 },
  { campaign: 'Сельское хозяйство',    impressions: 845,   clicks: 130,  conversions: 6.9,    cost: 45.04,  ctr: 15.4, cr: 5.31 },
  { campaign: 'Грузоперевозки',        impressions: 477,   clicks: 88,   conversions: 7.0,    cost: 38.15,  ctr: 18.4, cr: 7.95 },
  { campaign: 'ГМК и нефтедобыча',     impressions: 257,   clicks: 56,   conversions: 3.5,    cost: 30.49,  ctr: 21.8, cr: 6.25 },
];

// Google Ads динамика нед.8-13
const googleAdsWeekly = [
  { week: 'Нед. 8',     impressions: 8498,  clicks: 1738, leads: 89,  cost: 726.61 },
  { week: 'Нед. 9',     impressions: 10299, clicks: 1855, leads: 99,  cost: 745.55 },
  { week: 'Нед. 10',    impressions: 7651,  clicks: 1561, leads: 73,  cost: 664.16 },
  { week: 'Нед. 11',    impressions: 11038, clicks: 1908, leads: 130, cost: 768.83 },
  { week: 'Нед. 12',    impressions: 7200,  clicks: 1450, leads: 149, cost: 630.00 },
  { week: 'Нед. 13',    impressions: 8075,  clicks: 1637, leads: 164, cost: 683.36 },
];

// Meta Ads динамика нед.8-13
const metaAdsWeekly = [
  { week: 'Нед. 8',  impressions: 63498,  reach: 30842, leads: 250, cost: 256.65 },
  { week: 'Нед. 9',  impressions: 69107,  reach: 34961, leads: 311, cost: 301.25 },
  { week: 'Нед. 10', impressions: 61034,  reach: 31689, leads: 124, cost: 294.38 },
  { week: 'Нед. 11', impressions: 59351,  reach: 31365, leads: 309, cost: 297.20 },
  { week: 'Нед. 12', impressions: 48000,  reach: 21000, leads: 276, cost: 278.00 },
  { week: 'Нед. 13', impressions: 55601,  reach: 25141, leads: 372, cost: 314.60 },
];

// Pie chart
const leadsPieData = [
  { name: 'Kolesa DM',    value: 655, color: '#ff6b35' },
  { name: 'Meta Ads',     value: 472, color: '#0668E1' },
  { name: 'Органика/Пр.', value: 206, color: '#94a3b8' },
  { name: 'Google Ads',   value: 171, color: '#4285f4' },
  { name: 'Дилеры',       value: 35,  color: '#f59e0b' },
  { name: 'Zoomlion',     value: 16,  color: '#10b981' },
];

// Итоги нед.12-13
const totalLeads    = 1555;
const totalConsents = 642;
const totalApproved = 100;
const totalSpend    = 1313.36 + 592.60;
const paidLeads     = 171 + 472;
const w11_total     = 993;
const deltaLeads    = totalLeads - w11_total;
const deltaSpend    = totalSpend - (768.83 + 297.20);


export default function AnalyticsMarchW1213() {
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
            <Link href="/analytics-march-w11" className="hover:text-foreground transition-colors">Нед. 11</Link>
            <span className="text-foreground font-semibold border-b-2 border-primary pb-0.5">Нед. 12-13</span>
            <Link href="/roadmap" className="hover:text-foreground transition-colors">Планы</Link>
          </nav>
          <div className="text-sm text-muted-foreground">16 – 29 марта 2026</div>
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
              <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Воронка продаж — Неделя 12-13</h1>
              <p className="text-muted-foreground mt-1">
                16 – 29 марта 2026 &nbsp;|&nbsp; Дедупликация по БИН &nbsp;|&nbsp; 1,555 уникальных заявки
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link href="/analytics"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Декабрь 2025</Badge></Link>
            <Link href="/analytics-january"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Январь 2026</Badge></Link>
            <Link href="/analytics-february"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Февраль (нед. 6-8)</Badge></Link>
            <Link href="/analytics-february-w9"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Неделя 9</Badge></Link>
            <Link href="/analytics-march-w10"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Неделя 10</Badge></Link>
            <Link href="/analytics-march-w11"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Неделя 11</Badge></Link>
            <Badge variant="default">Неделя 12-13</Badge>
          </div>
        </div>

        {/* KPI Cards */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Ключевые показатели — Неделя 12-13</h2>
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Уникальных заявок</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalLeads.toLocaleString()}</div>
                <p className="text-xs mt-1 flex items-center gap-1 text-emerald-600">
                  <ArrowUpRight className="h-3 w-3" />
                  +{deltaLeads} vs нед. 11 (+{((deltaLeads/w11_total)*100).toFixed(1)}%)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Согласий</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalConsents}</div>
                <p className="text-xs text-muted-foreground mt-1">CR {(totalConsents/totalLeads*100).toFixed(1)}% от заявок</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Одобрено</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">{totalApproved}</div>
                <p className="text-xs text-muted-foreground mt-1">CR {(totalApproved/totalConsents*100).toFixed(1)}% от согласий</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Расходы</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalSpend.toFixed(0)}</div>
                <p className="text-xs mt-1 flex items-center gap-1 text-red-500">
                  <ArrowUpRight className="h-3 w-3" />
                  +${deltaSpend.toFixed(0)} vs нед. 11
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">CPL (платные)</CardTitle></CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${(totalSpend/paidLeads).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">Google + Meta ({paidLeads} лидов)</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Full Funnel Table */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Полная воронка по каналам — Неделя 12-13</h2>
          <p className="text-sm text-muted-foreground mb-4">Дедупликация по БИН/ИИН. Показы→Клики→Заявка→Согласие→Одобрение.</p>
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
                      <th className="text-right py-3 px-2 font-medium">Заявки</th>
                      <th className="text-right py-3 px-2 font-medium">Согласия</th>
                      <th className="text-right py-3 px-2 font-medium">CR%</th>
                      <th className="text-right py-3 px-2 font-medium">Одобрено</th>
                      <th className="text-right py-3 px-2 font-medium">CR%</th>
                      <th className="text-right py-3 px-2 font-medium">Расход</th>
                      <th className="text-right py-3 px-2 font-medium">CPL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelTotals.map((ch, i) => {
                      const crConsent = (ch.consents / ch.leads * 100).toFixed(1);
                      const crApproved = (ch.approved / ch.consents * 100).toFixed(1);
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
                          <td className="text-right py-3 px-2 font-mono">{ch.impressions != null ? ch.impressions.toLocaleString() : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono">{ch.clicks != null ? ch.clicks.toLocaleString() : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono text-blue-600">{ch.ctr != null ? `${ch.ctr}%` : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono font-semibold">{ch.leads.toLocaleString()}</td>
                          <td className="text-right py-3 px-2 font-mono">{ch.consents}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">{crConsent}%</td>
                          <td className="text-right py-3 px-2 font-mono">{ch.approved}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">{crApproved}%</td>
                          <td className="text-right py-3 px-2 font-mono">{ch.cost ? `$${ch.cost.toFixed(2)}` : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono">{cpl ? `$${cpl}` : '—'}</td>
                        </tr>
                      );
                    })}
                    <tr className="font-bold bg-muted/30">
                      <td className="py-3 px-2">ИТОГО</td>
                      <td className="text-right py-3 px-2 font-mono">236,822</td>
                      <td className="text-right py-3 px-2 font-mono">6,156</td>
                      <td className="text-right py-3 px-2 font-mono">—</td>
                      <td className="text-right py-3 px-2 font-mono">{totalLeads.toLocaleString()}</td>
                      <td className="text-right py-3 px-2 font-mono">{totalConsents}</td>
                      <td className="text-right py-3 px-2 font-mono text-emerald-600">{(totalConsents/totalLeads*100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-2 font-mono">{totalApproved}</td>
                      <td className="text-right py-3 px-2 font-mono text-emerald-600">{(totalApproved/totalConsents*100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-2 font-mono">${totalSpend.toFixed(2)}</td>
                      <td className="text-right py-3 px-2 font-mono">${(totalSpend/paidLeads).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>


        {/* Структура заявок */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Структура заявок — Неделя 12-13</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-base">Доля каналов (1,555 уник. заявки)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={leadsPieData} cx="50%" cy="50%" outerRadius={100} dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`} labelLine>
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
              <CardHeader><CardTitle className="text-base">Заявки по каналам (нед. 7–13)</CardTitle></CardHeader>
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
                    <Bar dataKey="Остальные"  stackId="a" fill={COLORS['Органика/Пр.']} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Нед 12 vs Нед 13 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Нед. 12 vs Нед. 13</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-base">Нед. 12: 16–22 марта</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Уник. заявок (UTM)</span><span className="font-bold">823</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Google Ads</span><span>149</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Meta Ads</span><span>276</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Kolesa DM</span><span>~320</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Zoomlion</span><span>12</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Дилеры</span><span>21</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Прямые/органика</span><span>45</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Нед. 13: 23–29 марта</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Уник. заявок (UTM)</span><span className="font-bold">793</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Google Ads</span><span>164</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Meta Ads</span><span>372</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Kolesa DM</span><span>~335</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Zoomlion</span><span>33</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Дилеры</span><span>32</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Прямые/органика</span><span>57</span></div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Динамика */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Динамика уникальных заявок (нед. 7–13)</h2>
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={totalLeadsChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[600, 1700]} />
                  <Tooltip
                    formatter={(value: number) => [`${value} заявок`, 'Всего']}
                    labelFormatter={(label) => {
                      const item = totalLeadsChartData.find(d => d.week === label);
                      return item ? `${label} (${item.period})` : label;
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Всего заявок" stroke="#4285f4" strokeWidth={3}
                    dot={{ r: 5, fill: '#4285f4' }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Google Ads Detail */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Google Ads — Неделя 12-13</h2>
          <div className="grid gap-4 md:grid-cols-4 mb-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Показы</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15,275</div>
                <p className="text-xs text-emerald-600 mt-1">+4,237 vs нед.11 (+38%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Клики</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,087</div>
                <p className="text-xs text-muted-foreground mt-1">CTR 20.21% | CPC $0.43</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Расход</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,313.36</div>
                <p className="text-xs text-muted-foreground mt-1">CPL $7.68 (171 лидов)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Конверсии (GA)</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">240.2</div>
                <p className="text-xs text-muted-foreground mt-1">CR 7.78%</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-base">Кампании Google Ads</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2 font-medium">Кампания</th>
                        <th className="text-right py-2 px-2 font-medium">Показы</th>
                        <th className="text-right py-2 px-2 font-medium">Клики</th>
                        <th className="text-right py-2 px-2 font-medium">CTR</th>
                        <th className="text-right py-2 px-2 font-medium">Конв.</th>
                        <th className="text-right py-2 px-2 font-medium">Расход</th>
                      </tr>
                    </thead>
                    <tbody>
                      {googleAdsCampaigns.map((c, i) => (
                        <tr key={i} className="border-b hover:bg-muted/50">
                          <td className="py-2 px-2 text-xs">{c.campaign}</td>
                          <td className="text-right py-2 px-2 font-mono text-xs">{c.impressions.toLocaleString()}</td>
                          <td className="text-right py-2 px-2 font-mono text-xs">{c.clicks.toLocaleString()}</td>
                          <td className="text-right py-2 px-2 font-mono text-xs text-blue-600">{c.ctr}%</td>
                          <td className="text-right py-2 px-2 font-mono text-xs">{c.conversions.toFixed(1)}</td>
                          <td className="text-right py-2 px-2 font-mono text-xs">${c.cost.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="font-bold bg-muted/30 text-xs">
                        <td className="py-2 px-2">ИТОГО</td>
                        <td className="text-right py-2 px-2 font-mono">15,275</td>
                        <td className="text-right py-2 px-2 font-mono">3,087</td>
                        <td className="text-right py-2 px-2 font-mono text-blue-600">20.21%</td>
                        <td className="text-right py-2 px-2 font-mono">240.2</td>
                        <td className="text-right py-2 px-2 font-mono">$1,313.36</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Динамика Google Ads (нед. 8–13)</CardTitle></CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={googleAdsWeekly}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leads"  name="Заявки (CRM)" fill={COLORS['Google Ads']} />
                    <Bar dataKey="clicks" name="Клики" fill="#93c5fd" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Meta Ads Detail */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Meta Ads — Неделя 12-13</h2>
          <div className="grid gap-4 md:grid-cols-4 mb-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Охват</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">46,141</div>
                <p className="text-xs text-muted-foreground mt-1">Частота 2.25</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Показы</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">103,601</div>
                <p className="text-xs text-emerald-600 mt-1">+44,250 vs нед.11 (+75%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Расход</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$592.60</div>
                <p className="text-xs text-muted-foreground mt-1">CPL $1.26 | CPM $5.72</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Лиды (Meta)</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">530</div>
                <p className="text-xs text-muted-foreground mt-1">CTR 2.64%</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-base">Динамика Meta Ads (нед. 8–13)</CardTitle></CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={metaAdsWeekly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" name="Заявки (CRM)" fill={COLORS['Meta Ads']} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Zoomlion Detail */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Zoomlion — Спецпрограмма (onlinebank)</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-base">Пуш-уведомления</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Отправлено</span><span className="font-bold">82,376</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Показано</span><span className="font-bold">14,620 (17.8%)</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Клики</span><span className="font-bold">169 (1.2%)</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Баннеры</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Размещено</span><span className="font-bold">35,549</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Показано</span><span className="font-bold">14,345 (40.4%)</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Клики</span><span className="font-bold">169 (1.2%)</span></div>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-8 text-center justify-around text-sm">
                {[
                  { label: 'Всего кликов', value: '338', color: '#10b981' },
                  { label: 'Заявки', value: '16', color: '#10b981' },
                  { label: 'Согласия', value: '10', color: '#10b981' },
                  { label: 'Одобрено', value: '2', color: '#10b981' },
                  { label: 'CR Клик→Заявка', value: '4.7%', color: '#6366f1' },
                  { label: 'CR Заявка→Согл.', value: '62.5%', color: '#6366f1' },
                  { label: 'CR Согл.→Одобр.', value: '20.0%', color: '#6366f1' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>


        {/* Спецпрограмма Дamu / Байтерек */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Спецпрограмма Дamu / Фонд Байтерек</h2>
          <Card className="border-emerald-200 bg-emerald-50/40 dark:bg-emerald-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Megaphone className="h-5 w-5 text-emerald-600" />
                Маркетинговые активности — Спецпрограмма Damu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border bg-background p-4 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Пуши отправлено (моб + веб)</div>
                  <div className="text-2xl font-bold text-emerald-600">32,037</div>
                  <div className="text-xs text-muted-foreground mt-1">Моб: 27,499 | Веб: 4,538</div>
                </div>
                <div className="rounded-lg border bg-background p-4 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Заявки получено</div>
                  <div className="text-2xl font-bold text-emerald-600">~40</div>
                  <div className="text-xs text-muted-foreground mt-1">~19 предп. с WABA рассылки</div>
                </div>
                <div className="rounded-lg border bg-background p-4 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Аналитика пушей</div>
                  <div className="text-2xl font-bold text-amber-500">~7 дней</div>
                  <div className="text-xs text-muted-foreground mt-1">Ожидается</div>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <h3 className="font-semibold mb-3 text-sm">Условия спецпрограммы (WABA шаблон)</h3>
                <div className="grid gap-2 md:grid-cols-2 text-sm">
                  <div className="flex justify-between py-1 border-b"><span className="text-muted-foreground">Финансирование</span><span className="font-medium">До 300 млн тенге</span></div>
                  <div className="flex justify-between py-1 border-b"><span className="text-muted-foreground">Ставка</span><span className="font-medium text-emerald-600">12.6% годовых</span></div>
                  <div className="flex justify-between py-1 border-b"><span className="text-muted-foreground">Срок</span><span className="font-medium">3–5 лет</span></div>
                  <div className="flex justify-between py-1 border-b"><span className="text-muted-foreground">Аванс</span><span className="font-medium">10%</span></div>
                  <div className="flex justify-between py-1 border-b"><span className="text-muted-foreground">Целевая аудитория</span><span className="font-medium">МСБ от 1 года работы</span></div>
                  <div className="flex justify-between py-1 border-b"><span className="text-muted-foreground">Каналы рассылки</span><span className="font-medium">WABA + Пуши onlinebank</span></div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 dark:bg-amber-950/20 rounded-lg p-3">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>Детальная аналитика по пуш-уведомлениям ожидается в течение ~7 дней</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Дальнейшие планы */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Дальнейшие планы</h2>
          <p className="text-sm text-muted-foreground mb-6">Два ключевых проекта на ближайший период</p>

          {/* Проект 1: Сарыарка Автопром */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                <Megaphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Коллаборация: Сарыарка Автопром</h3>
                <p className="text-sm text-muted-foreground">Совместная маркетинговая кампания — запуск после согласования KV</p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { icon: <TrendingUp className="h-4 w-4" />, title: 'Key Visual', desc: 'Разработка визуальной концепции кампании', status: 'IN PROGRESS', statusColor: 'bg-amber-500' },
                { icon: <Bell className="h-4 w-4" />, title: 'Пуши и баннеры (onlinebank)', desc: 'Размещение после согласования KV с банком', status: 'PLANNED', statusColor: 'bg-slate-400' },
                { icon: <Monitor className="h-4 w-4" />, title: 'LED и дисплеи Halyk Bank', desc: 'Motion-креатив в отделениях банка (как Zoomlion)', status: 'PLANNED', statusColor: 'bg-slate-400' },
                { icon: <TrendingUp className="h-4 w-4" />, title: 'Соцсети', desc: 'Размещение в Halyk Leasing и onlinebank', status: 'PLANNED', statusColor: 'bg-slate-400' },
                { icon: <MessageSquare className="h-4 w-4" />, title: 'WABA рассылка', desc: 'Рассылка со спецпредложением Сарыарки', status: 'PLANNED', statusColor: 'bg-slate-400' },
                { icon: <Globe className="h-4 w-4" />, title: 'Landing Page', desc: 'Отдельная посадочная страница под кампанию', status: 'PLANNED', statusColor: 'bg-slate-400' },
              ].map((item, i) => (
                <Card key={i} className="relative">
                  <CardContent className="pt-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">{item.icon}</div>
                      <span className={`text-xs text-white px-2 py-0.5 rounded-full font-medium ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Проект 2: AI-агент WABA CRM */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Проект: AI-агент в CRM (WABA интеграция)</h3>
                <p className="text-sm text-muted-foreground">Персональный AI-менеджер для каждого клиента по всей воронке</p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { icon: <Zap className="h-4 w-4" />, title: 'Интеграция WABA в CRM', desc: 'Подключение WhatsApp Business API к CRM-системе', status: 'IN PROGRESS', statusColor: 'bg-amber-500' },
                { icon: <Bot className="h-4 w-4" />, title: 'AI-агент — персональный менеджер', desc: 'Каждый клиент получает персонального AI-помощника', status: 'IN PROGRESS', statusColor: 'bg-amber-500' },
                { icon: <CheckCircle className="h-4 w-4" />, title: 'Автоведение по воронке', desc: 'Заявка → Согласие → Одобрение → Получение финансирования', status: 'IN PROGRESS', statusColor: 'bg-amber-500' },
                { icon: <Bell className="h-4 w-4" />, title: 'Умные уведомления', desc: 'Агент видит статус клиента и пушит нужные действия на каждом этапе', status: 'IN PROGRESS', statusColor: 'bg-amber-500' },
              ].map((item, i) => (
                <Card key={i} className="border-purple-200 bg-purple-50/30 dark:bg-purple-950/10">
                  <CardContent className="pt-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-purple-100 rounded-lg text-purple-600">{item.icon}</div>
                      <span className={`text-xs text-white px-2 py-0.5 rounded-full font-medium ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-4 border-purple-200 bg-purple-50/30 dark:bg-purple-950/10">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3 text-sm">
                  <Bot className="h-8 w-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Концепция: персонализация на каждом этапе</p>
                    <p className="text-muted-foreground text-xs mt-1">AI-агент отслеживает статус каждого клиента в CRM и автоматически отправляет нужное сообщение в WhatsApp — от приветствия после заявки до уведомления об одобрении финансирования. Без участия менеджера.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Методология */}
        <section>
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Info className="h-4 w-4" />
                Методология и примечания
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• <strong>Период:</strong> Неделя 12-13 — 16–29 марта 2026</p>
              <p>• <strong>Источники:</strong> UTM файл (16.03-29.03.csv) + CRM Excel (Обработка заявок 2026-03-30)</p>
              <p>• <strong>Дедупликация:</strong> по БИН/ИИН. Итого 1,555 уникальных заявок.</p>
              <p>• <strong>Согласия:</strong> поле МЕТОДИКА не пусто в CRM → 642 согласия (41.3%)</p>
              <p>• <strong>Одобрено:</strong> approval_status = APPROVED в UTM → 100 одобрений (15.6% от согласий)</p>
              <p>• <strong>Kolesa DM:</strong> 655 уникальных БИН из CRM (поле Источник=Kolesa DM). N/A по показам и кликам — партнёрский источник.</p>
              <p>• <strong>Zoomlion:</strong> данные из onlinebank dashboard. Пуши: 82,376 отправлено, 14,620 показано, 169 кликов. Баннеры: 35,549 размещено, 14,345 показано, 169 кликов.</p>
              <p>• <strong>Нед.12 vs Нед.13:</strong> разбивка по датам из UTM файла (16-22 vs 23-29 марта).</p>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}
