import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Cell, PieChart, Pie
} from 'recharts';
import {
  TrendingUp, TrendingDown, Database,
  ArrowUpRight, ArrowDownRight, Info
} from "lucide-react";
import { Link } from "wouter";

// =============================================
// ДАННЫЕ — НЕДЕЛЯ 11: 9–15 марта 2026
// Дедупликация по БИН
// Согласие = заполнена «Дата согласия» в CRM Excel
// =============================================

// Исторические данные недель 7–11 для сравнения по заявкам
// Примечание: согласия/одобрения за прошлые недели не показываем —
// методология изменилась (теперь по Дате согласия из CRM, а не has_consent из UTM)
const weeklyComparison = [
  {
    week: 'Нед. 7', period: '9-15 фев',
    google_leads: 109, meta_leads: 136, kolesa_leads: 323,
    dealers_leads: 72, other_leads: 44,
    total_leads: 927,
  },
  {
    week: 'Нед. 8', period: '16-22 фев',
    google_leads: 89, meta_leads: 250, kolesa_leads: 366,
    dealers_leads: 89, other_leads: 44,
    total_leads: 1024,
  },
  {
    week: 'Нед. 9', period: '23 фев-1 мар',
    google_leads: 99, meta_leads: 311, kolesa_leads: 415,
    dealers_leads: 78, other_leads: 98,
    total_leads: 1057,
  },
  {
    week: 'Нед. 10', period: '2-8 мар',
    google_leads: 73, meta_leads: 124, kolesa_leads: 362,
    dealers_leads: 191, other_leads: 7,
    total_leads: 860,
  },
  {
    week: 'Нед. 11', period: '9-15 мар',
    google_leads: 118, meta_leads: 308, kolesa_leads: 16,
    dealers_leads: 81, other_leads: 470,
    total_leads: 993,
  },
];

const leadsChartData = weeklyComparison.map(w => ({
  week: w.week,
  'Google Ads': w.google_leads,
  'Meta Ads': w.meta_leads,
  'Kolesa DM': w.kolesa_leads,
  'Дилеры': w.dealers_leads,
  'Остальные': w.other_leads,
}));

const totalLeadsChartData = weeklyComparison.map(w => ({
  week: w.week,
  period: w.period,
  'Всего заявок': w.total_leads,
}));

// ===== НЕДЕЛЯ 11 — основные данные =====

// Воронка по каналам
const channelTotals = [
  { channel: 'Google Ads', impressions: 11038, clicks: 1908, leads: 118, consents: 56, approved: 7, cost: 768.83, ctr: 17.29 },
  { channel: 'Meta Ads', impressions: 59351, clicks: 1635, leads: 308, consents: 151, approved: 11, cost: 297.20, ctr: 2.75 },
  { channel: 'Kolesa DM', impressions: null, clicks: null, leads: 16, consents: 8, approved: 0, cost: null, ctr: null },
  { channel: 'Дилеры', impressions: null, clicks: null, leads: 81, consents: null, approved: null, cost: null, ctr: null },
  { channel: 'Остальные', impressions: null, clicks: null, leads: 470, consents: 220, approved: 38, cost: null, ctr: null },
];

// Google Ads — кампании неделя 11
const googleAdsCampaigns = [
  { campaign: 'Общие ключевые слова', impressions: 7162, clicks: 1392, conversions: 122.77, cost: 558.21, ctr: 19.44, cr: 8.82 },
  { campaign: 'Строительство', impressions: 1635, clicks: 216, conversions: 12.33, cost: 83.63, ctr: 13.21, cr: 5.71 },
  { campaign: 'Такси / Автобусы', impressions: 903, clicks: 97, conversions: 5.16, cost: 43.13, ctr: 10.74, cr: 5.32 },
  { campaign: 'Сельское хозяйство', impressions: 505, clicks: 82, conversions: 5.00, cost: 32.82, ctr: 16.24, cr: 6.10 },
  { campaign: 'Дистрибуция и ритейл', impressions: 428, clicks: 55, conversions: 4.65, cost: 26.04, ctr: 12.85, cr: 8.45 },
  { campaign: 'Грузоперевозки', impressions: 273, clicks: 47, conversions: 5.00, cost: 19.00, ctr: 17.22, cr: 10.64 },
  { campaign: 'ГМК и нефтедобыча', impressions: 132, clicks: 19, conversions: 3.00, cost: 6.00, ctr: 14.39, cr: 15.79 },
];

// Google Ads — динамика нед. 8–11
const googleAdsWeekly = [
  { week: 'Нед. 8', period: '16-22 фев', impressions: 8498, clicks: 1738, leads: 89, cost: 726.61, ctr: 20.45 },
  { week: 'Нед. 9', period: '23 фев-1 мар', impressions: 10299, clicks: 1855, leads: 99, cost: 745.55, ctr: 18.01 },
  { week: 'Нед. 10', period: '2-8 мар', impressions: 7651, clicks: 1561, leads: 73, cost: 664.16, ctr: 20.40 },
  { week: 'Нед. 11', period: '9-15 мар', impressions: 11038, clicks: 1908, leads: 118, cost: 768.83, ctr: 17.29 },
];

// Meta Ads — динамика нед. 8–11
const metaAdsWeekly = [
  { week: 'Нед. 8', period: '16-22 фев', impressions: 63498, reach: 30842, leads: 250, cost: 256.65 },
  { week: 'Нед. 9', period: '23 фев-1 мар', impressions: 69107, reach: 34961, leads: 311, cost: 301.25 },
  { week: 'Нед. 10', period: '2-8 мар', impressions: 61034, reach: 31689, leads: 124, cost: 294.38 },
  { week: 'Нед. 11', period: '9-15 мар', impressions: 59351, reach: 31365, leads: 308, cost: 297.20 },
];

// Дилеры — скриншот дилерской системы (10–13 марта)
const dealerSources = [
  { source: 'ТОО «BAIKONUR MACHINERY COMPANY»', w11: 18 },
  { source: 'Халык-Банк, органика', w11: 16 },
  { source: 'ТОО «ZOOMLION Central Asia»', w11: 13 },
  { source: 'ТОО «Компания Ас-Ай ЛТД»', w11: 6 },
  { source: 'ТОО «КАЗПРОФИГРУПП»', w11: 3 },
  { source: 'ТОО «NKB GROUP KAZAKHSTAN»', w11: 3 },
  { source: 'ТОО «СиноТехМаш»', w11: 2 },
  { source: 'ТОО «HYUNDAI» Коммерческий Центр', w11: 2 },
  { source: 'ТОО «NKB Group Spectehnika»', w11: 1 },
  { source: 'АО «Халык-Лизинг»', w11: 1 },
  { source: 'ТОО «TRUCK AUTO SERVICE»', w11: 1 },
];

// Pie chart — структура заявок нед. 11
const leadsPieData = [
  { name: 'Meta Ads', value: 308, color: '#0668E1' },
  { name: 'Остальные', value: 470, color: '#94a3b8' },
  { name: 'Google Ads', value: 118, color: '#4285f4' },
  { name: 'Дилеры', value: 81, color: '#f59e0b' },
  { name: 'Kolesa DM', value: 16, color: '#ff6b35' },
];

// Итоги нед. 11
const totalLeads = 993;
const totalConsents = 435; // Google 56 + Meta 151 + Kolesa 8 + Дилеры (UTM dealer 11) + Остальные 220 = 446 (по UTM dealer части)
const totalApproved = 56; // Google 7 + Meta 11 + Остальные 38
const totalSpend = 768.83 + 297.20;
const paidLeads = 118 + 308; // Google + Meta

// Цвета
const COLORS: Record<string, string> = {
  'Google Ads': '#4285f4',
  'Meta Ads': '#0668E1',
  'Kolesa DM': '#ff6b35',
  'Дилеры': '#f59e0b',
  'Остальные': '#94a3b8',
};

// Дельта vs неделя 10
const w10_total = 860;
const w10_consents = 614; // по старой методологии — не сравниваем
const deltaLeads = totalLeads - w10_total;
const deltaSpend = totalSpend - (664.16 + 294.38);

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
            <Link href="/analytics" className="hover:text-foreground transition-colors">Аналитика (Дек)</Link>
            <Link href="/analytics-january" className="hover:text-foreground transition-colors">Аналитика (Янв)</Link>
            <Link href="/analytics-february" className="hover:text-foreground transition-colors">Аналитика (Фев)</Link>
            <Link href="/analytics-february-w9" className="hover:text-foreground transition-colors">Неделя 9</Link>
            <Link href="/analytics-march-w10" className="hover:text-foreground transition-colors">Неделя 10</Link>
            <span className="text-foreground font-semibold">Неделя 11</span>
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
              <p className="text-muted-foreground mt-1">9 – 15 марта 2026 | Дедупликация по БИН | Согласие по «Дате согласия» в CRM</p>
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
                <CardTitle className="text-sm font-medium text-muted-foreground">Всего заявок</CardTitle>
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
                <div className="text-3xl font-bold">446</div>
                <p className="text-xs text-muted-foreground mt-1">
                  CR {(446 / (totalLeads - 81) * 100).toFixed(1)}% (без дилеров скриншот)
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
                  CR {(totalApproved / 446 * 100).toFixed(1)}% от согласий
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
                  {deltaSpend >= 0 ? '+' : ''}${deltaSpend.toFixed(2)} vs нед. 10
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
          <h2 className="text-xl font-semibold mb-4">Полная воронка по каналам — Неделя 11</h2>
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
                      <th className="text-right py-3 px-2 font-medium">CR Клик→Заявка</th>
                      <th className="text-right py-3 px-2 font-medium">Согласия</th>
                      <th className="text-right py-3 px-2 font-medium">CR Заявка→Согласие</th>
                      <th className="text-right py-3 px-2 font-medium">Одобрено</th>
                      <th className="text-right py-3 px-2 font-medium">CR Согласие→Одобрение</th>
                      <th className="text-right py-3 px-2 font-medium">Расход</th>
                      <th className="text-right py-3 px-2 font-medium">CPL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelTotals.map((ch, i) => {
                      const hasImpr = ch.impressions !== null && ch.impressions !== undefined;
                      const hasClicks = ch.clicks !== null && ch.clicks !== undefined;
                      const ctr = hasImpr && hasClicks ? (ch.clicks! / ch.impressions! * 100).toFixed(2) : null;
                      const crLead = hasClicks ? (ch.leads / ch.clicks! * 100).toFixed(2) : null;
                      const crConsent = ch.consents !== null && ch.leads > 0 ? (ch.consents! / ch.leads * 100).toFixed(1) : null;
                      const crApproved = ch.approved !== null && ch.consents !== null && ch.consents! > 0 ? (ch.approved! / ch.consents! * 100).toFixed(1) : null;
                      const cpl = ch.cost ? (ch.cost / ch.leads).toFixed(2) : null;
                      return (
                        <tr key={i} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[ch.channel] || '#94a3b8' }}></div>
                              {ch.channel}
                            </div>
                          </td>
                          <td className="text-right py-3 px-2 font-mono">{hasImpr ? ch.impressions!.toLocaleString() : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono">{hasClicks ? ch.clicks!.toLocaleString() : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono text-blue-600">{ctr ? `${ctr}%` : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono font-semibold">{ch.leads.toLocaleString()}</td>
                          <td className="text-right py-3 px-2 font-mono text-blue-600">{crLead ? `${crLead}%` : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono">{ch.consents !== null ? ch.consents : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">{crConsent ? `${crConsent}%` : '—'}</td>
                          <td className="text-right py-3 px-2 font-mono">{ch.approved !== null ? ch.approved : '—'}</td>
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
                      <td className="text-right py-3 px-2 font-mono text-blue-600">—</td>
                      <td className="text-right py-3 px-2 font-mono">{totalLeads.toLocaleString()}</td>
                      <td className="text-right py-3 px-2 font-mono text-blue-600">—</td>
                      <td className="text-right py-3 px-2 font-mono">446*</td>
                      <td className="text-right py-3 px-2 font-mono text-emerald-600">—</td>
                      <td className="text-right py-3 px-2 font-mono">{totalApproved}</td>
                      <td className="text-right py-3 px-2 font-mono text-emerald-600">—</td>
                      <td className="text-right py-3 px-2 font-mono">${totalSpend.toFixed(2)}</td>
                      <td className="text-right py-3 px-2 font-mono">${(totalSpend / paidLeads).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-muted-foreground mt-2 px-2">* Согласия по каналу «Дилеры» (скриншот) не отслеживаются — данные недоступны</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Структура заявок — Pie + Bar */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Структура заявок — Неделя 11</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-base">Доля каналов в заявках</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
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
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={leadsChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Google Ads" stackId="a" fill={COLORS['Google Ads']} />
                    <Bar dataKey="Meta Ads" stackId="a" fill={COLORS['Meta Ads']} />
                    <Bar dataKey="Kolesa DM" stackId="a" fill={COLORS['Kolesa DM']} />
                    <Bar dataKey="Дилеры" stackId="a" fill={COLORS['Дилеры']} />
                    <Bar dataKey="Остальные" stackId="a" fill={COLORS['Остальные']} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Динамика всего заявок */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Динамика заявок (нед. 7–11)</h2>
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={totalLeadsChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[700, 1200]} />
                  <Tooltip formatter={(value: number) => [`${value} заявок`, 'Всего']} />
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
                <div className="text-3xl font-bold">81</div>
                <p className="text-xs text-muted-foreground mt-1">ИП через квиз: 15 + скриншот: 66</p>
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
                <div className="text-3xl font-bold">15</div>
                <p className="text-xs text-muted-foreground mt-1">Согласий: 11 | CR 73.3%</p>
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
                        <td className="py-2 px-3 font-medium">{d.source}</td>
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
                <p className="text-xs text-emerald-600 mt-1">+3,387 vs нед. 10</p>
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
                <p className="text-xs text-muted-foreground mt-1">CPL $6.52</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Конверсии (GA)</CardTitle></CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">157.9</div>
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
                        <th className="text-left py-3 px-3 font-medium">Кампания</th>
                        <th className="text-right py-3 px-3 font-medium">Показы</th>
                        <th className="text-right py-3 px-3 font-medium">Клики</th>
                        <th className="text-right py-3 px-3 font-medium">CTR</th>
                        <th className="text-right py-3 px-3 font-medium">Конв.</th>
                        <th className="text-right py-3 px-3 font-medium">CR</th>
                        <th className="text-right py-3 px-3 font-medium">Расход</th>
                      </tr>
                    </thead>
                    <tbody>
                      {googleAdsCampaigns.map((c, i) => (
                        <tr key={i} className="border-b hover:bg-muted/50">
                          <td className="py-2 px-3">{c.campaign}</td>
                          <td className="text-right py-2 px-3 font-mono">{c.impressions.toLocaleString()}</td>
                          <td className="text-right py-2 px-3 font-mono">{c.clicks.toLocaleString()}</td>
                          <td className="text-right py-2 px-3 font-mono text-blue-600">{c.ctr}%</td>
                          <td className="text-right py-2 px-3 font-mono">{c.conversions.toFixed(2)}</td>
                          <td className="text-right py-2 px-3 font-mono text-emerald-600">{c.cr}%</td>
                          <td className="text-right py-2 px-3 font-mono">${c.cost.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="font-bold bg-muted/30">
                        <td className="py-2 px-3">ИТОГО</td>
                        <td className="text-right py-2 px-3 font-mono">11,038</td>
                        <td className="text-right py-2 px-3 font-mono">1,908</td>
                        <td className="text-right py-2 px-3 font-mono text-blue-600">17.29%</td>
                        <td className="text-right py-2 px-3 font-mono">157.91</td>
                        <td className="text-right py-2 px-3 font-mono text-emerald-600">8.27%</td>
                        <td className="text-right py-2 px-3 font-mono">$768.83</td>
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
                    <Bar dataKey="leads" name="Заявки (CRM)" fill={COLORS['Google Ads']} />
                    <Bar dataKey="clicks" name="Клики" fill="#93c5fd" />
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
                <p className="text-xs text-muted-foreground mt-1">CPL $0.96</p>
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
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={metaAdsWeekly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" name="Заявки (CRM)" fill={COLORS['Meta Ads']} />
                  <Bar dataKey="reach" name="Охват / 100" fill="#93c5fd"
                    // Нормализуем охват для визуализации
                  />
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
                Примечания к данным
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Период: Неделя 11 — 9–15 марта 2026</p>
              <p>• <strong>Дедупликация по БИН</strong> — учитываются уникальные компании (993 уникальных из 1,315 исходных)</p>
              <p>• <strong>Согласие</strong> — определяется по наличию заполненной «Даты согласия» в CRM Excel (новая методология). Поле has_consent в UTM не используется.</p>
              <p>• <strong>Google Ads:</strong> 7 активных кампаний. Показы +44% vs нед. 10. Расход $768.83. CTR 17.29%.</p>
              <p>• <strong>Meta Ads:</strong> Охват 31,365 | Показы 59,351 | Клики по ссылке 1,635 | Расход $297.20</p>
              <p>• <strong>Kolesa DM:</strong> 16 заявок через UTM (kolesa-page). Основной поток Kolesa приходит без UTM меток — не отслеживается.</p>
              <p>• <strong>Дилеры:</strong> 15 заявок через квиз (utm_source=dealer) + 66 заявок из дилерской системы (скриншот, 10–13 марта). Итого 81.</p>
              <p>• <strong>Остальные:</strong> 470 заявок — преимущественно без UTM меток (444 из 470). Требует настройки сквозной аналитики.</p>
              <p>• <strong>Одобрение:</strong> approval_status = APPROVED в UTM таблице.</p>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}
