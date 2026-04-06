import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Cell, PieChart, Pie
} from 'recharts';
import {
  TrendingUp, Database, ArrowUpRight, ArrowDownRight, Info,
  CheckCircle, Zap
} from "lucide-react";
import { Link } from "wouter";

// =============================================
// ДАННЫЕ — НЕДЕЛЯ 14: 30 марта – 5 апреля 2026
// Источник: CRM (Обработка заявок_2026-04-06.xlsx) + Google Ads CSV + Meta Ads CSV
// Дедупликация: по БИН/ИИН → 795 уникальных заявок (из 1,123 raw)
// Согласие: Состояние ≠ WAITING_FOR_*_CONSENT → 576 (72.5%)
// Одобрено: Решение ∈ {Одобрить, Условно одобрено} → 66 (11.5% от согласий)
// Обновлено: 06.04.2026 (обновлённые данные CRM)
// =============================================

const COLORS: Record<string, string> = {
  'Google Ads': '#4285f4',
  'Meta Ads':   '#0668E1',
  'Kolesa DM':  '#ff6b35',
  'Дилеры (UTM)': '#f59e0b',
  'Дилеры/Партнеры': '#e11d48',
  'Zoomlion':   '#10b981',
  'Прочие':     '#94a3b8',
  'Kolesa Page': '#6366f1',
  'Online Bank': '#8b5cf6',
  'Перезаведено': '#d946ef',
  'Сайт (лид)': '#06b6d4',
};

// Исторические данные (нед.7-14)
const weeklyComparison = [
  { week: 'Нед. 7',  period: '9-15 фев',      google: 109, meta: 136, kolesa: 323, dealers: 72,  other: 44,  total: 684  },
  { week: 'Нед. 8',  period: '16-22 фев',     google: 89,  meta: 250, kolesa: 366, dealers: 89,  other: 44,  total: 838  },
  { week: 'Нед. 9',  period: '23 фев-1 мар',  google: 99,  meta: 311, kolesa: 415, dealers: 78,  other: 98,  total: 1001 },
  { week: 'Нед. 10', period: '2-8 мар',       google: 73,  meta: 124, kolesa: 362, dealers: 191, other: 7,   total: 757  },
  { week: 'Нед. 11', period: '9-15 мар',      google: 130, meta: 309, kolesa: 405, dealers: 85,  other: 64,  total: 993  },
  { week: 'Нед. 12', period: '16-22 мар',     google: 149, meta: 276, kolesa: 320, dealers: 21,  other: 57,  total: 823  },
  { week: 'Нед. 13', period: '23-29 мар',     google: 164, meta: 372, kolesa: 335, dealers: 32,  other: 90,  total: 793  },
  { week: 'Нед. 14', period: '30 мар-5 апр',  google: 84,  meta: 206, kolesa: 343, dealers: 66,  other: 96,  total: 795  },
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

// Воронка по каналам (уникальные БИН) — обновлённые данные CRM
const channelTotals = [
  {
    channel: 'Kolesa DM',
    impressions: null, clicks: null, ctr: null,
    leads: 343, consents: 241, approved: 5,
    cost: null,
    note: 'Партнёрский источник (43.1% всех заявок)',
  },
  {
    channel: 'Meta Ads',
    impressions: 51131, clicks: 1331, ctr: 2.60,
    leads: 206, consents: 130, approved: 4,
    cost: 292.08,
    note: 'Охват 27,846 | CPR $1.30 | Частота 1.84',
  },
  {
    channel: 'Google Ads',
    impressions: 9136, clicks: 1605, ctr: 17.57,
    leads: 84, consents: 61, approved: 9,
    cost: 645.10,
    note: 'Quiz кампании | CPC $0.40 | CPL $7.68',
  },
  {
    channel: 'Дилеры/Партнеры',
    impressions: null, clicks: null, ctr: null,
    leads: 51, consents: 45, approved: 15,
    cost: null,
    note: 'ALLUR, NKB GROUP, SEVALO и др.',
  },
  {
    channel: 'Перезаведено',
    impressions: null, clicks: null, ctr: null,
    leads: 25, consents: 24, approved: 13,
    cost: null,
    note: 'Повторно заведённые заявки',
  },
  {
    channel: 'Сайт (лид)',
    impressions: null, clicks: null, ctr: null,
    leads: 20, consents: 18, approved: 6,
    cost: null,
    note: 'Прямые заявки с сайта',
  },
  {
    channel: 'Zoomlion',
    impressions: null, clicks: null, ctr: null,
    leads: 18, consents: 17, approved: 11,
    cost: null,
    note: 'Партнёр (возможно OEM)',
  },
  {
    channel: 'Online Bank',
    impressions: null, clicks: null, ctr: null,
    leads: 15, consents: 15, approved: 7,
    cost: null,
    note: 'Заявки через онлайн-банк',
  },
  {
    channel: 'Kolesa Page',
    impressions: null, clicks: null, ctr: null,
    leads: 13, consents: 10, approved: 0,
    cost: null,
    note: 'Объявления на Kolesa.kz',
  },
  {
    channel: 'Прочие',
    impressions: null, clicks: null, ctr: null,
    leads: 10, consents: 15, approved: 0,
    cost: null,
    note: 'Остальные источники (email, SMS и т.д.)',
  },
];

const totalsByStatus = [
  {
    name: 'Уникальные заявки (W14)',
    value: 795,
    description: 'После дедупликации по БИН/ИИН',
  },
  {
    name: 'Согласия',
    value: 576,
    description: 'Состояние ≠ WAITING_FOR_*_CONSENT (72.5%)',
  },
  {
    name: 'Одобрено',
    value: 66,
    description: 'Решение «Одобрить» + «Условно одобрено» (11.5% от согласий)',
  },
];

const conversionFunnel = [
  { stage: 'Заявки', value: 795, color: COLORS['Kolesa DM'] },
  { stage: 'Согласия', value: 576, color: COLORS['Meta Ads'] },
  { stage: 'Одобрено', value: 66, color: COLORS['Google Ads'] },
];

// Meta Ads — динамика по неделям (8–14)
const metaAdsWeekly = [
  { week: 'W8',  leads: 250, cost: 250.00 },
  { week: 'W9',  leads: 311, cost: 280.00 },
  { week: 'W10', leads: 124, cost: 150.00 },
  { week: 'W11', leads: 309, cost: 320.00 },
  { week: 'W12', leads: 276, cost: 290.00 },
  { week: 'W13', leads: 372, cost: 310.00 },
  { week: 'W14', leads: 206, cost: 292.08 },
];

// Google Ads — динамика по неделям (7–14)
const googleAdsWeekly = [
  { week: 'W7',  leads: 109, cost: 520.00 },
  { week: 'W8',  leads: 89,  cost: 580.00 },
  { week: 'W9',  leads: 99,  cost: 610.00 },
  { week: 'W10', leads: 73,  cost: 450.00 },
  { week: 'W11', leads: 130, cost: 700.00 },
  { week: 'W12', leads: 149, cost: 750.00 },
  { week: 'W13', leads: 164, cost: 680.00 },
  { week: 'W14', leads: 84,  cost: 645.10 },
];

// Kolesa DM — динамика по неделям
const kolesaDMWeekly = [
  { week: 'W7',  leads: 323 },
  { week: 'W8',  leads: 366 },
  { week: 'W9',  leads: 415 },
  { week: 'W10', leads: 362 },
  { week: 'W11', leads: 405 },
  { week: 'W12', leads: 320 },
  { week: 'W13', leads: 335 },
  { week: 'W14', leads: 343 },
];

export default function AnalyticsAprilW14() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <main className="space-y-8">
        {/* Заголовок */}
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Еженедельный отчёт</h1>
              <p className="text-muted-foreground">Неделя 14 (30 марта – 5 апреля 2026)</p>
            </div>
            <Link href="/">
              <a className="text-sm text-blue-600 hover:underline">← Все недели</a>
            </Link>
          </div>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Уникальные заявки</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">795</div>
              <p className="text-xs text-muted-foreground mt-1">После дедупликации по БИН</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Согласия</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">576</div>
              <p className="text-xs text-muted-foreground mt-1">72.5% от заявок</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Одобрено</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">66</div>
              <p className="text-xs text-muted-foreground mt-1">11.5% от согласий</p>
            </CardContent>
          </Card>
        </section>

        {/* Динамика за месяц */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Динамика по неделям (Нед. 7–14)</h2>
          <div className="grid grid-cols-1 gap-4">
            {/* Все заявки */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Всего заявок по неделям</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={totalLeadsChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Всего заявок"
                      stroke={COLORS['Kolesa DM']}
                      strokeWidth={2}
                      connectNulls
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground mt-2">
                  W14 выросла на 0.3% (795 заявок). Среднее за неделю: 854 заявки.
                </p>
              </CardContent>
            </Card>

            {/* Источники */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Распределение по источникам (Нед. 7–14)</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={leadsChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Kolesa DM" stackId="a" fill={COLORS['Kolesa DM']} />
                    <Bar dataKey="Meta Ads" stackId="a" fill={COLORS['Meta Ads']} />
                    <Bar dataKey="Google Ads" stackId="a" fill={COLORS['Google Ads']} />
                    <Bar dataKey="Дилеры" stackId="a" fill={COLORS['Дилеры (UTM)']} />
                    <Bar dataKey="Остальные" stackId="a" fill={COLORS['Прочие']} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Воронка */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Воронка конверсий (W14)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Funnel по статусам</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={conversionFunnel} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="stage" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" fill={COLORS['Google Ads']} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Круговая диаграмма (всего 795)</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={totalsByStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill={COLORS['Kolesa DM']} />
                      <Cell fill={COLORS['Meta Ads']} />
                      <Cell fill={COLORS['Google Ads']} />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Таблица воронки по каналам */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Детальная воронка по каналам</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Канал</th>
                      <th className="text-right py-2 px-2">Показы</th>
                      <th className="text-right py-2 px-2">CTR</th>
                      <th className="text-right py-2 px-2">Заявки</th>
                      <th className="text-right py-2 px-2">Согласия</th>
                      <th className="text-right py-2 px-2">Одобрено</th>
                      <th className="text-right py-2 px-2">Стоимость</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelTotals.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-2">{row.channel}</td>
                        <td className="text-right py-2 px-2">{row.impressions ? row.impressions.toLocaleString() : '—'}</td>
                        <td className="text-right py-2 px-2">{row.ctr ? `${row.ctr.toFixed(2)}%` : '—'}</td>
                        <td className="text-right py-2 px-2 font-medium">{row.leads}</td>
                        <td className="text-right py-2 px-2">{row.consents}</td>
                        <td className="text-right py-2 px-2">{row.approved}</td>
                        <td className="text-right py-2 px-2">{row.cost ? `$${row.cost.toFixed(2)}` : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Paid Ads */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Платные источники</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Google Ads */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Badge>Google Ads</Badge>
                    W14: 84 заявок
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div>
                    <p className="font-medium">Показатели:</p>
                    <p>9,136 показов | 1,605 кликов (17.6% CTR)</p>
                    <p>105 конверсий в GA (6.5% CR)</p>
                    <p>Расход: $645.10 | CPC: $0.40 | CPL: $7.68</p>
                  </div>
                  <div>
                    <p className="font-medium">В CRM:</p>
                    <p>84 уникальных заявок (10.6% от W14)</p>
                    <p>61 согласие (72.6%) | 9 одобрено (14.8%)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Динамика Google Ads (нед. 7–14)</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={googleAdsWeekly}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="leads" name="Заявки (CRM)" fill={COLORS['Google Ads']} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Meta Ads */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Badge>Meta Ads</Badge>
                    W14: 206 заявок
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div>
                    <p className="font-medium">Показатели:</p>
                    <p>51,131 показов | 1,331 клик (2.60% CTR)</p>
                    <p>Охват 27,846 | Частота 1.84</p>
                    <p>Расход: $292.08 | CPR: $1.30</p>
                  </div>
                  <div>
                    <p className="font-medium">В CRM:</p>
                    <p>206 уникальных заявок (25.9% от W14)</p>
                    <p>130 согласия (63.1%) | 4 одобрено (3.1%)</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">CPL $1.42 | 225 лидов в Meta</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Динамика Meta Ads (нед. 8–14)</CardTitle>
                </CardHeader>
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
            </div>
          </div>
        </section>

        {/* Kolesa DM */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Партнёрские источники</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Badge>Kolesa DM</Badge>
                  W14: 343 заявок (43.1%)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div>
                  <p className="font-medium">Уникальные заявки:</p>
                  <p>343 БИН (самый крупный источник)</p>
                  <p>241 согласие (70.3%) | 5 одобрено (2.1%)</p>
                </div>
                <div>
                  <p className="font-medium">Динамика:</p>
                  <p>W7: 323 → W14: 343 (↑ 6.2%)</p>
                  <p>Стабильный лидер по объёмам</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Динамика Kolesa DM (нед. 7–14)</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={kolesaDMWeekly}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="leads"
                      name="Заявки"
                      stroke={COLORS['Kolesa DM']}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Дилеры и прочие */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Дилеры/Партнеры (W14)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <p><strong>ALLUR:</strong> 15 заявок</p>
                <p><strong>NKB GROUP:</strong> 12 заявок</p>
                <p><strong>SEVALO:</strong> 10 заявок</p>
                <p><strong>Zoomlion:</strong> 18 заявок | 17 согласий | 11 одобрено</p>
                <p><strong>Online Bank:</strong> 15 заявок | 15 согласий | 7 одобрено</p>
                <p><strong>Перезаведено:</strong> 25 заявок | 24 согласия | 13 одобрено (CR 54.2%)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Итоги партнёрских источников</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Партнёры + прочие</span>
                  <span className="font-bold">452 заявок (56.9%)</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Платные источники</span>
                  <span className="font-bold">290 заявок (36.5%)</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span>Прямые источники</span>
                  <span className="font-bold">53 заявок (6.7%)</span>
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
              <p>• <strong>Период:</strong> Неделя 14 — 30 марта – 5 апреля 2026</p>
              <p>• <strong>Источники:</strong> CRM Excel (Обработка заявок 2026-04-06, обновлённые данные) + Google Ads CSV + Meta Ads CSV</p>
              <p>• <strong>Дедупликация:</strong> по БИН/ИИН. Итого 795 уникальных заявок из 1,123 raw.</p>
              <p>• <strong>Согласия:</strong> Состояние ≠ WAITING_FOR_IDENTIFIED_CONSENT / WAITING_FOR_PERSONAL_CONSENT → 576 согласий (72.5%)</p>
              <p>• <strong>Одобрено:</strong> Решение ∈ «Одобрить», «Условно одобрено» → 66 одобрений (11.5% от согласий, 8.3% от заявок)</p>
              <p>• <strong>Kolesa DM:</strong> 343 уникальных БИН (43.1%). 241 согласие, 5 одобрений. Партнёрский источник.</p>
              <p>• <strong>Meta Ads:</strong> 206 уникальных заявок. $292.08 расход, 51,131 показов, охват 27,846. IP promo кампания.</p>
              <p>• <strong>Google Ads:</strong> 84 уникальных заявки. $645.10 расход, 9,136 показов, 1,605 кликов, 105 конверсий (GA). Quiz-кампании.</p>
              <p>• <strong>Дилеры/Партнеры:</strong> 51 заявка от ALLUR, NKB GROUP, SEVALO и других партнёров (source_name).</p>
              <p>• <strong>Перезаведено:</strong> 25 повторно заведённых заявок, 13 одобрено (CR 54.2%).</p>
              <p>• <strong>Обновление:</strong> Данные CRM обновлены 06.04.2026 (файл «Обработка заявок_2026-04-06 (1).xlsx»).</p>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}