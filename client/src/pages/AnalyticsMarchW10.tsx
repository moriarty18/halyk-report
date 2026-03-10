import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, Cell
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Database, 
  ArrowUpRight, ArrowDownRight, Info
} from "lucide-react";
import { Link } from "wouter";

// =============================================
// ДАННЫЕ — НЕДЕЛЯ 10: 2–8 марта 2026
// Дедупликация по БИН
// =============================================

// Исторические данные недели 6–10 для сравнения
const weeklyComparison = [
  {
    week: 'Нед. 6', period: '2-8 фев',
    google_leads: 132, google_consents: 56, google_approved: 12, google_cr_consent: 42.4, google_cr_approved: 21.4,
    meta_leads: 149, meta_consents: 36, meta_approved: 9, meta_cr_consent: 24.2, meta_cr_approved: 25.0,
    kolesa_leads: 347, kolesa_consents: 94, kolesa_approved: 11, kolesa_cr_consent: 27.1, kolesa_cr_approved: 11.7,
    managers_leads: 42, managers_consents: 36, managers_approved: 13, managers_cr_consent: 85.7, managers_cr_approved: 36.1,
    dealers_leads: 54, dealers_consents: 28, dealers_approved: 6, dealers_cr_consent: 51.9, dealers_cr_approved: 21.4,
    organic_leads: 33, organic_consents: 18, organic_approved: 1, organic_cr_consent: 54.5, organic_cr_approved: 5.6,
    total_leads: 757, total_consents: 258, total_approved: 52, total_cr_consent: 34.1, total_cr_approved: 20.2,
  },
  {
    week: 'Нед. 7', period: '9-15 фев',
    google_leads: 109, google_consents: 45, google_approved: 5, google_cr_consent: 41.3, google_cr_approved: 11.1,
    meta_leads: 136, meta_consents: 29, meta_approved: 2, meta_cr_consent: 21.3, meta_cr_approved: 6.9,
    kolesa_leads: 323, kolesa_consents: 93, kolesa_approved: 11, kolesa_cr_consent: 28.8, kolesa_cr_approved: 11.8,
    managers_leads: 55, managers_consents: 50, managers_approved: 32, managers_cr_consent: 90.9, managers_cr_approved: 64.0,
    dealers_leads: 72, dealers_consents: 50, dealers_approved: 5, dealers_cr_consent: 69.4, dealers_cr_approved: 10.0,
    organic_leads: 44, organic_consents: 30, organic_approved: 1, organic_cr_consent: 68.2, organic_cr_approved: 3.3,
    total_leads: 927, total_consents: 391, total_approved: 59, total_cr_consent: 42.2, total_cr_approved: 15.1,
  },
  {
    week: 'Нед. 8', period: '16-22 фев',
    google_leads: 89, google_consents: 22, google_approved: 3, google_cr_consent: 24.7, google_cr_approved: 13.6,
    meta_leads: 250, meta_consents: 84, meta_approved: 5, meta_cr_consent: 33.6, meta_cr_approved: 6.0,
    kolesa_leads: 366, kolesa_consents: 105, kolesa_approved: 10, kolesa_cr_consent: 28.7, kolesa_cr_approved: 9.5,
    managers_leads: 151, managers_consents: 142, managers_approved: 15, managers_cr_consent: 94.0, managers_cr_approved: 10.6,
    dealers_leads: 89, dealers_consents: 47, dealers_approved: 10, dealers_cr_consent: 52.8, dealers_cr_approved: 21.3,
    organic_leads: 44, organic_consents: 31, organic_approved: 4, organic_cr_consent: 70.5, organic_cr_approved: 12.9,
    total_leads: 1024, total_consents: 437, total_approved: 47, total_cr_consent: 42.7, total_cr_approved: 10.8,
  },
  {
    week: 'Нед. 9', period: '23 фев-1 мар',
    google_leads: 99, google_consents: 38, google_approved: 5, google_cr_consent: 38.4, google_cr_approved: 13.2,
    meta_leads: 311, meta_consents: 118, meta_approved: 7, meta_cr_consent: 37.9, meta_cr_approved: 5.9,
    kolesa_leads: 415, kolesa_consents: 107, kolesa_approved: 10, kolesa_cr_consent: 25.8, kolesa_cr_approved: 9.3,
    managers_leads: 68, managers_consents: 52, managers_approved: 29, managers_cr_consent: 76.5, managers_cr_approved: 55.8,
    dealers_leads: 78, dealers_consents: 60, dealers_approved: 10, dealers_cr_consent: 76.9, dealers_cr_approved: 16.7,
    organic_leads: 98, organic_consents: 68, organic_approved: 10, organic_cr_consent: 69.4, organic_cr_approved: 14.7,
    total_leads: 1057, total_consents: 429, total_approved: 52, total_cr_consent: 40.6, total_cr_approved: 12.1,
  },
  {
    week: 'Нед. 10', period: '2-8 мар',
    google_leads: 73, google_consents: 53, google_approved: 1, google_cr_consent: 72.6, google_cr_approved: 1.9,
    meta_leads: 124, meta_consents: 84, meta_approved: 2, meta_cr_consent: 67.7, meta_cr_approved: 2.4,
    kolesa_leads: 362, kolesa_consents: 235, kolesa_approved: 9, kolesa_cr_consent: 64.9, kolesa_cr_approved: 3.8,
    managers_leads: 58, managers_consents: 54, managers_approved: 26, managers_cr_consent: 93.1, managers_cr_approved: 48.1,
    dealers_leads: 191, dealers_consents: 142, dealers_approved: 7, dealers_cr_consent: 74.3, dealers_cr_approved: 4.9,
    organic_leads: 7, organic_consents: 6, organic_approved: 0, organic_cr_consent: 85.7, organic_cr_approved: 0,
    total_leads: 860, total_consents: 614, total_approved: 48, total_cr_consent: 71.4, total_cr_approved: 7.8,
  },
];

const leadsChartData = weeklyComparison.map(w => ({
  week: w.week,
  'Google Ads': w.google_leads,
  'Meta Ads': w.meta_leads,
  'Kolesa': w.kolesa_leads,
  'Мен./Дил.': (w.managers_leads || 0) + (w.dealers_leads || 0),
  'Органика': w.organic_leads,
  'Всего': w.total_leads,
}));

const crConsentChartData = weeklyComparison.map(w => {
  const mgr_dlr_leads = (w.managers_leads || 0) + (w.dealers_leads || 0);
  const mgr_dlr_consents = (w.managers_consents || 0) + (w.dealers_consents || 0);
  return {
    week: w.week,
    'Google Ads': w.google_cr_consent,
    'Meta Ads': w.meta_cr_consent,
    'Kolesa': w.kolesa_cr_consent,
    'Мен./Дил.': mgr_dlr_leads > 0 ? Math.round(mgr_dlr_consents / mgr_dlr_leads * 1000) / 10 : 0,
    'Органика': w.organic_cr_consent,
    'Среднее': w.total_cr_consent,
  };
});

const crApprovedChartData = weeklyComparison.map(w => {
  const mgr_dlr_consents = (w.managers_consents || 0) + (w.dealers_consents || 0);
  const mgr_dlr_approved = (w.managers_approved || 0) + (w.dealers_approved || 0);
  return {
    week: w.week,
    'Google Ads': w.google_cr_approved,
    'Meta Ads': w.meta_cr_approved,
    'Kolesa': w.kolesa_cr_approved,
    'Мен./Дил.': mgr_dlr_consents > 0 ? Math.round(mgr_dlr_approved / mgr_dlr_consents * 1000) / 10 : 0,
    'Органика': w.organic_cr_approved,
    'Среднее': w.total_cr_approved,
  };
});

// ===== НЕДЕЛЯ 10 — основные данные =====

const googleAdsWeekly = [
  { week: 'Нед. 7', period: '9-15 фев', impressions: 9081, clicks: 1831, leads: 109, consents: 45, approved: 5, cost: 773.34, ctr: 20.16, cr_lead: 5.95, cr_consent: 41.3, cr_approved: 11.1 },
  { week: 'Нед. 8', period: '16-22 фев', impressions: 8498, clicks: 1738, leads: 89, consents: 22, approved: 3, cost: 726.61, ctr: 20.45, cr_lead: 5.12, cr_consent: 24.7, cr_approved: 13.6 },
  { week: 'Нед. 9', period: '23 фев-1 мар', impressions: 10299, clicks: 1855, leads: 99, consents: 38, approved: 5, cost: 745.55, ctr: 18.01, cr_lead: 5.34, cr_consent: 38.4, cr_approved: 13.2 },
  { week: 'Нед. 10', period: '2-8 мар', impressions: 7651, clicks: 1561, leads: 73, consents: 53, approved: 1, cost: 664.16, ctr: 20.40, cr_lead: 4.68, cr_consent: 72.6, cr_approved: 1.9 },
];

const metaAdsWeekly = [
  { week: 'Нед. 7', period: '9-15 фев', impressions: 49394, reach: 24438, leads: 136, consents: 29, approved: 2, cost: 176.17, cr_lead: 0.28, cr_consent: 21.3, cr_approved: 6.9 },
  { week: 'Нед. 8', period: '16-22 фев', impressions: 63498, reach: 30842, leads: 250, consents: 84, approved: 5, cost: 256.65, cr_lead: 0.39, cr_consent: 33.6, cr_approved: 6.0 },
  { week: 'Нед. 9', period: '23 фев-1 мар', impressions: 69107, reach: 34961, leads: 311, consents: 118, approved: 7, cost: 301.25, cr_lead: 0.45, cr_consent: 37.9, cr_approved: 5.9 },
  { week: 'Нед. 10', period: '2-8 мар', impressions: 61034, reach: 31689, leads: 124, consents: 84, approved: 2, cost: 294.38, cr_lead: 0.20, cr_consent: 67.7, cr_approved: 2.4 },
];

const kolesaWeekly = [
  { week: 'Нед. 7', period: '9-15 фев', leads: 323, consents: 93, approved: 11, cr_consent: 28.8, cr_approved: 11.8 },
  { week: 'Нед. 8', period: '16-22 фев', leads: 366, consents: 105, approved: 10, cr_consent: 28.7, cr_approved: 9.5 },
  { week: 'Нед. 9', period: '23 фев-1 мар', leads: 415, consents: 107, approved: 10, cr_consent: 25.8, cr_approved: 9.3 },
  { week: 'Нед. 10', period: '2-8 мар', leads: 362, consents: 235, approved: 9, cr_consent: 64.9, cr_approved: 3.8 },
];

const managersWeekly = [
  { week: 'Нед. 7', period: '9-15 фев', leads: 55, consents: 50, approved: 32, cr_consent: 90.9, cr_approved: 64.0 },
  { week: 'Нед. 8', period: '16-22 фев', leads: 151, consents: 142, approved: 15, cr_consent: 94.0, cr_approved: 10.6 },
  { week: 'Нед. 9', period: '23 фев-1 мар', leads: 68, consents: 52, approved: 29, cr_consent: 76.5, cr_approved: 55.8 },
  { week: 'Нед. 10', period: '2-8 мар', leads: 58, consents: 54, approved: 26, cr_consent: 93.1, cr_approved: 48.1 },
];

const dealersWeekly = [
  { week: 'Нед. 7', period: '9-15 фев', leads: 72, consents: 50, approved: 5, cr_consent: 69.4, cr_approved: 10.0 },
  { week: 'Нед. 8', period: '16-22 фев', leads: 89, consents: 47, approved: 10, cr_consent: 52.8, cr_approved: 21.3 },
  { week: 'Нед. 9', period: '23 фев-1 мар', leads: 78, consents: 60, approved: 10, cr_consent: 76.9, cr_approved: 16.7 },
  { week: 'Нед. 10', period: '2-8 мар', leads: 191, consents: 142, approved: 7, cr_consent: 74.3, cr_approved: 4.9 },
];

// Дилеры по источникам — Неделя 10
const dealerSources = [
  { source: 'ANTO MOTORS', w7: 0, w8: 0, w9: 153, w10: 139, consents: 94, approved: 4 },
  { source: 'ИП Дилеры (квиз)', w7: 0, w8: 0, w9: 0, w10: 23, consents: 21, approved: 1 },
  { source: 'ASTANA MOTORS', w7: 3, w8: 5, w9: 6, w10: 9, consents: 8, approved: 2 },
  { source: 'ALLUR (Jac, Skoda, Kia, Hongqi)', w7: 5, w8: 11, w9: 16, w10: 6, consents: 5, approved: 0 },
  { source: 'ВИРАЖ', w7: 4, w8: 3, w9: 5, w10: 3, consents: 3, approved: 0 },
  { source: 'NKB GROUP', w7: 2, w8: 6, w9: 6, w10: 3, consents: 3, approved: 0 },
  { source: 'AS-AY', w7: 6, w8: 5, w9: 3, w10: 3, consents: 3, approved: 0 },
  { source: 'AB MACHINERY (ALMATY BRANDS)', w7: 8, w8: 5, w9: 6, w10: 2, consents: 2, approved: 0 },
  { source: 'GLOBUS MACHINERY', w7: 0, w8: 0, w9: 3, w10: 1, consents: 1, approved: 0 },
  { source: 'ZOOMLION', w7: 0, w8: 2, w9: 1, w10: 1, consents: 1, approved: 0 },
  { source: 'SEVALO', w7: 1, w8: 1, w9: 1, w10: 1, consents: 1, approved: 0 },
];

// Менеджеры — Неделя 10
const managersData = [
  { name: 'karashev.a', leads: 28, consents: 25, approved: 10, cr_consent: 89.3, cr_approved: 40.0 },
  { name: 'kamzina.z', leads: 13, consents: 13, approved: 6, cr_consent: 100.0, cr_approved: 46.2 },
  { name: 'ertargyn.e', leads: 6, consents: 5, approved: 4, cr_consent: 83.3, cr_approved: 80.0 },
  { name: 'elkin.p', leads: 5, consents: 5, approved: 3, cr_consent: 100.0, cr_approved: 60.0 },
  { name: 'zhumanova.k', leads: 2, consents: 2, approved: 1, cr_consent: 100.0, cr_approved: 50.0 },
  { name: 'balgozhina.f', leads: 1, consents: 1, approved: 1, cr_consent: 100.0, cr_approved: 100.0 },
  { name: 'mamutbayeva.a', leads: 1, consents: 1, approved: 0, cr_consent: 100.0, cr_approved: 0 },
  { name: 'almambetov.a', leads: 1, consents: 1, approved: 0, cr_consent: 100.0, cr_approved: 0 },
  { name: 'satbergenov.n', leads: 1, consents: 1, approved: 1, cr_consent: 100.0, cr_approved: 100.0 },
];

// Google Ads кампании — Неделя 10
const googleAdsCampaigns = [
  { campaign: 'Общие ключевые слова', impressions: 4653, clicks: 1096, conversions: 97.39, cost: 462.85, ctr: 23.55, cr: 8.89 },
  { campaign: 'Строительство', impressions: 1063, clicks: 165, conversions: 6.50, cost: 71.65, ctr: 15.52, cr: 3.94 },
  { campaign: 'Такси / Автобусы', impressions: 785, clicks: 123, conversions: 6.17, cost: 54.21, ctr: 15.67, cr: 5.02 },
  { campaign: 'Сельское хозяйство', impressions: 467, clicks: 62, conversions: 4.67, cost: 26.42, ctr: 13.28, cr: 7.53 },
  { campaign: 'Дистрибуция и ритейл', impressions: 317, clicks: 55, conversions: 4.67, cost: 24.45, ctr: 17.35, cr: 8.49 },
  { campaign: 'Грузоперевозки', impressions: 263, clicks: 46, conversions: 2.00, cost: 19.11, ctr: 17.49, cr: 4.35 },
  { campaign: 'ГМК и нефтедобыча', impressions: 103, clicks: 14, conversions: 0.99, cost: 5.47, ctr: 13.59, cr: 7.07 },
];

// Полная воронка по каналам — Неделя 10
const channelTotals = [
  { channel: 'Google Ads', impressions: 7651, clicks: 1561, leads: 73, consents: 53, approved: 1, cost: 664.16, ctr: 20.40 },
  { channel: 'Meta Ads', impressions: 61034, clicks: null, leads: 124, consents: 84, approved: 2, cost: 294.38, ctr: null },
  { channel: 'Kolesa', impressions: null, clicks: null, leads: 362, consents: 235, approved: 9, cost: null, ctr: null },
  { channel: 'Менеджеры', impressions: null, clicks: null, leads: 58, consents: 54, approved: 26, cost: null, ctr: null },
  { channel: 'Дилеры', impressions: null, clicks: null, leads: 191, consents: 142, approved: 7, cost: null, ctr: null },
  { channel: 'Органика', impressions: null, clicks: null, leads: 7, consents: 6, approved: 0, cost: null, ctr: null },
];

// Прочие каналы
const otherChannels = [
  { channel: 'Online Bank', leads: 4, consents: 2, approved: 1, cr_consent: 50.0, cr_approved: 50.0 },
  { channel: 'WhatsApp', leads: 1, consents: 1, approved: 0, cr_consent: 100.0, cr_approved: 0 },
  { channel: 'Instagram', leads: 1, consents: 1, approved: 0, cr_consent: 100.0, cr_approved: 0 },
  { channel: 'Неизвестный', leads: 39, consents: 36, approved: 2, cr_consent: 92.3, cr_approved: 5.6 },
];

// Итоги — Неделя 10
const totalLeads = 860;
const totalConsents = 614;
const totalApproved = 48;
const totalSpend = 664.16 + 294.38;
const paidLeads = 73 + 124;

// Цвета
const COLORS: Record<string, string> = {
  'Google Ads': '#4285f4',
  'Meta Ads': '#0668E1',
  'Kolesa': '#ff6b35',
  'Менеджеры/Дилеры': '#8b5cf6',
  'Менеджеры': '#a78bfa',
  'Дилеры': '#f59e0b',
  'Органика': '#22c55e',
};

// Дельта vs неделя 9
const w9 = weeklyComparison[3];
const w10 = weeklyComparison[4];
const deltaLeads = w10.total_leads - w9.total_leads;
const deltaConsents = w10.total_consents - w9.total_consents;
const deltaApproved = w10.total_approved - w9.total_approved;

export default function AnalyticsMarchW10() {
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
            <span className="text-foreground font-semibold">Неделя 10</span>
            <Link href="/roadmap" className="hover:text-foreground transition-colors">Планы</Link>
          </nav>
          <div className="text-sm text-muted-foreground">2 – 8 марта 2026</div>
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
              <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Воронка продаж — Неделя 10</h1>
              <p className="text-muted-foreground mt-1">2 – 8 марта 2026 | Данные с дедупликацией по БИН</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link href="/analytics"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Декабрь 2025</Badge></Link>
            <Link href="/analytics-january"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Январь 2026</Badge></Link>
            <Link href="/analytics-february"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Февраль (нед. 6-8)</Badge></Link>
            <Link href="/analytics-february-w9"><Badge variant="outline" className="cursor-pointer hover:bg-muted">Неделя 9</Badge></Link>
            <Badge variant="default">Неделя 10</Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Ключевые показатели — Неделя 10</h2>
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Всего заявок</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalLeads.toLocaleString()}</div>
                <p className={`text-xs mt-1 flex items-center gap-1 ${deltaLeads >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {deltaLeads >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {deltaLeads >= 0 ? '+' : ''}{deltaLeads} vs нед. 9
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Согласий</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalConsents}</div>
                <p className={`text-xs mt-1 flex items-center gap-1 ${deltaConsents >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {deltaConsents >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {deltaConsents >= 0 ? '+' : ''}{deltaConsents} vs нед. 9 | CR {(totalConsents / totalLeads * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Одобрено</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">{totalApproved}</div>
                <p className={`text-xs mt-1 flex items-center gap-1 ${deltaApproved >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {deltaApproved >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {deltaApproved >= 0 ? '+' : ''}{deltaApproved} vs нед. 9 | CR {(totalApproved / totalConsents * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Расходы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalSpend.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">Google + Meta</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Средний CPL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${(totalSpend / paidLeads).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">платные каналы ({paidLeads} лидов)</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Full Funnel Table */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Полная воронка по каналам — Неделя 10</h2>
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
                      const crConsent = ch.leads > 0 ? (ch.consents / ch.leads * 100).toFixed(1) : '0';
                      const crApproved = ch.consents > 0 ? (ch.approved / ch.consents * 100).toFixed(1) : '0';
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
                      <td className="py-3 px-2">ИТОГО (основные)</td>
                      <td className="text-right py-3 px-2 font-mono">68,685</td>
                      <td className="text-right py-3 px-2 font-mono">1,561</td>
                      <td className="text-right py-3 px-2 font-mono text-blue-600">—</td>
                      <td className="text-right py-3 px-2 font-mono">{totalLeads.toLocaleString()}</td>
                      <td className="text-right py-3 px-2 font-mono text-blue-600">—</td>
                      <td className="text-right py-3 px-2 font-mono">{totalConsents}</td>
                      <td className="text-right py-3 px-2 font-mono text-emerald-600">{(totalConsents / totalLeads * 100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-2 font-mono">{totalApproved}</td>
                      <td className="text-right py-3 px-2 font-mono text-emerald-600">{(totalApproved / totalConsents * 100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-2 font-mono">${totalSpend.toFixed(2)}</td>
                      <td className="text-right py-3 px-2 font-mono">${(totalSpend / paidLeads).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Other channels */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Прочие каналы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-3 font-medium">Канал</th>
                      <th className="text-right py-3 px-3 font-medium">Заявки</th>
                      <th className="text-right py-3 px-3 font-medium">Согласия</th>
                      <th className="text-right py-3 px-3 font-medium">CR</th>
                      <th className="text-right py-3 px-3 font-medium">Одобрено</th>
                      <th className="text-right py-3 px-3 font-medium">CR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otherChannels.map((ch, i) => (
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-3">{ch.channel}</td>
                        <td className="text-right py-2 px-3 font-mono">{ch.leads}</td>
                        <td className="text-right py-2 px-3 font-mono">{ch.consents}</td>
                        <td className="text-right py-2 px-3 font-mono text-emerald-600">{ch.cr_consent}%</td>
                        <td className="text-right py-2 px-3 font-mono">{ch.approved}</td>
                        <td className="text-right py-2 px-3 font-mono text-emerald-600">{ch.cr_approved}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dealers Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Дилеры — Неделя 10</h2>
          <div className="grid gap-4 md:grid-cols-3 mb-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Всего заявок от дилеров</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">191</div><p className="text-xs text-muted-foreground mt-1">+113 vs нед. 9 (78)</p></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Согласий от дилеров</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">142</div><p className="text-xs text-emerald-600 mt-1">CR 74.3%</p></CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Одобрено от дилеров</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold text-emerald-600">7</div><p className="text-xs text-muted-foreground mt-1">CR 4.9% от согласий</p></CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-base">Заявки по дилерам — Неделя 10</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-3 font-medium">Дилер</th>
                      <th className="text-right py-3 px-3 font-medium">Нед. 7</th>
                      <th className="text-right py-3 px-3 font-medium">Нед. 8</th>
                      <th className="text-right py-3 px-3 font-medium">Нед. 9</th>
                      <th className="text-right py-3 px-3 font-medium font-bold">Нед. 10</th>
                      <th className="text-right py-3 px-3 font-medium">Согласия</th>
                      <th className="text-right py-3 px-3 font-medium">Одобрено</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dealerSources.map((d, i) => (
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-3 font-medium">{d.source}</td>
                        <td className="text-right py-2 px-3 font-mono text-muted-foreground">{d.w7}</td>
                        <td className="text-right py-2 px-3 font-mono text-muted-foreground">{d.w8}</td>
                        <td className="text-right py-2 px-3 font-mono text-muted-foreground">{d.w9}</td>
                        <td className="text-right py-2 px-3 font-mono font-bold">{d.w10}</td>
                        <td className="text-right py-2 px-3 font-mono text-emerald-600">{d.consents}</td>
                        <td className="text-right py-2 px-3 font-mono">{d.approved}</td>
                      </tr>
                    ))}
                    <tr className="font-bold bg-muted/30">
                      <td className="py-2 px-3">ИТОГО</td>
                      <td className="text-right py-2 px-3 font-mono">—</td>
                      <td className="text-right py-2 px-3 font-mono">—</td>
                      <td className="text-right py-2 px-3 font-mono">—</td>
                      <td className="text-right py-2 px-3 font-mono">191</td>
                      <td className="text-right py-2 px-3 font-mono text-emerald-600">142</td>
                      <td className="text-right py-2 px-3 font-mono">7</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Managers Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Менеджеры — Неделя 10</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-3 font-medium">Менеджер</th>
                      <th className="text-right py-3 px-3 font-medium">Заявки</th>
                      <th className="text-right py-3 px-3 font-medium">Согласия</th>
                      <th className="text-right py-3 px-3 font-medium">CR Согласие</th>
                      <th className="text-right py-3 px-3 font-medium">Одобрено</th>
                      <th className="text-right py-3 px-3 font-medium">CR Одобрение</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managersData.map((m, i) => (
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-3 font-medium">{m.name}</td>
                        <td className="text-right py-2 px-3 font-mono">{m.leads}</td>
                        <td className="text-right py-2 px-3 font-mono">{m.consents}</td>
                        <td className="text-right py-2 px-3 font-mono text-emerald-600">{m.cr_consent}%</td>
                        <td className="text-right py-2 px-3 font-mono">{m.approved}</td>
                        <td className="text-right py-2 px-3 font-mono text-emerald-600">{m.cr_approved}%</td>
                      </tr>
                    ))}
                    <tr className="font-bold bg-muted/30">
                      <td className="py-2 px-3">ИТОГО</td>
                      <td className="text-right py-2 px-3 font-mono">58</td>
                      <td className="text-right py-2 px-3 font-mono">54</td>
                      <td className="text-right py-2 px-3 font-mono text-emerald-600">93.1%</td>
                      <td className="text-right py-2 px-3 font-mono">26</td>
                      <td className="text-right py-2 px-3 font-mono text-emerald-600">48.1%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Google Ads Detail */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Google Ads — Неделя 10</h2>
          <div className="grid gap-4 md:grid-cols-4 mb-4">
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Показы</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">7,651</div></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Клики</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">1,561</div><p className="text-xs text-muted-foreground mt-1">CTR 20.40%</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Расход</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$664.16</div><p className="text-xs text-muted-foreground mt-1">CPL $9.10</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Конверсии (GA)</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">122.4</div><p className="text-xs text-muted-foreground mt-1">CR 7.84%</p></CardContent></Card>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-base">Кампании Google Ads — Неделя 10</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-3 font-medium">Кампания</th>
                      <th className="text-right py-3 px-3 font-medium">Показы</th>
                      <th className="text-right py-3 px-3 font-medium">Клики</th>
                      <th className="text-right py-3 px-3 font-medium">CTR</th>
                      <th className="text-right py-3 px-3 font-medium">Конверсии</th>
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
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Meta Ads Detail */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Meta Ads — Неделя 10</h2>
          <div className="grid gap-4 md:grid-cols-4 mb-4">
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Охват</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">31,689</div></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Показы</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">61,034</div><p className="text-xs text-muted-foreground mt-1">Frequency 1.93</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Расход</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">$294.38</div><p className="text-xs text-muted-foreground mt-1">CPL $2.37</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Лиды (Website leads)</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">272</div><p className="text-xs text-muted-foreground mt-1">CTR 2.60% | CPR $1.08</p></CardContent></Card>
          </div>
          <Card>
            <CardHeader><CardTitle className="text-base">Динамика Meta Ads (нед. 7–10)</CardTitle></CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={metaAdsWeekly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" name="Заявки (CRM)" fill="#0668E1" />
                  <Bar dataKey="consents" name="Согласия" fill="#22c55e" />
                  <Bar dataKey="approved" name="Одобрено" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Tabs: Channel Dynamics */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Динамика каналов (нед. 6–10)</h2>
          <Tabs defaultValue="leads">
            <TabsList className="mb-4">
              <TabsTrigger value="leads">Заявки</TabsTrigger>
              <TabsTrigger value="cr_consent">CR Согласие</TabsTrigger>
              <TabsTrigger value="cr_approved">CR Одобрение</TabsTrigger>
            </TabsList>

            <TabsContent value="leads">
              <Card>
                <CardContent className="pt-6">
                  <ResponsiveContainer width="100%" height={360}>
                    <BarChart data={leadsChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Google Ads" stackId="a" fill={COLORS['Google Ads']} />
                      <Bar dataKey="Meta Ads" stackId="a" fill={COLORS['Meta Ads']} />
                      <Bar dataKey="Kolesa" stackId="a" fill={COLORS['Kolesa']} />
                      <Bar dataKey="Мен./Дил." stackId="a" fill={COLORS['Менеджеры/Дилеры']} />
                      <Bar dataKey="Органика" stackId="a" fill={COLORS['Органика']} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cr_consent">
              <Card>
                <CardContent className="pt-6">
                  <ResponsiveContainer width="100%" height={360}>
                    <LineChart data={crConsentChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis unit="%" />
                      <Tooltip formatter={(value: number) => `${value}%`} />
                      <Legend />
                      <Line type="monotone" dataKey="Google Ads" stroke={COLORS['Google Ads']} strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Meta Ads" stroke={COLORS['Meta Ads']} strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Kolesa" stroke={COLORS['Kolesa']} strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Мен./Дил." stroke={COLORS['Менеджеры/Дилеры']} strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Органика" stroke={COLORS['Органика']} strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Среднее" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cr_approved">
              <Card>
                <CardContent className="pt-6">
                  <ResponsiveContainer width="100%" height={360}>
                    <LineChart data={crApprovedChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis unit="%" />
                      <Tooltip formatter={(value: number) => `${value}%`} />
                      <Legend />
                      <Line type="monotone" dataKey="Google Ads" stroke={COLORS['Google Ads']} strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Meta Ads" stroke={COLORS['Meta Ads']} strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Kolesa" stroke={COLORS['Kolesa']} strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Мен./Дил." stroke={COLORS['Менеджеры/Дилеры']} strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Органика" stroke={COLORS['Органика']} strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="Среднее" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Google Ads weekly trend */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Google Ads — Динамика (нед. 7–10)</h2>
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={googleAdsWeekly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" name="Заявки" fill={COLORS['Google Ads']} />
                  <Bar dataKey="consents" name="Согласия" fill="#22c55e" />
                  <Bar dataKey="approved" name="Одобрено" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Kolesa weekly trend */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Kolesa — Динамика (нед. 7–10)</h2>
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={kolesaWeekly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" name="Заявки" fill={COLORS['Kolesa']} />
                  <Bar dataKey="consents" name="Согласия" fill="#22c55e" />
                  <Bar dataKey="approved" name="Одобрено" fill="#f59e0b" />
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
              <p>• Период: Неделя 10 — 2–8 марта 2026</p>
              <p>• <strong>Данные с дедупликацией по БИН</strong> — учитываются уникальные компании (860 уникальных из 1196 исходных)</p>
              <p>• <strong>Google Ads:</strong> Данные из рекламного кабинета Google Ads (Quiz | Halyk Leasing). 7 активных кампаний. Расход $664.16</p>
              <p>• <strong>Meta Ads:</strong> Кампания «Halyk Leasing IP promo - images». Охват 31,689 | Показы 61,034 | Website leads 272 | Расход $294.38</p>
              <p>• <strong>Kolesa:</strong> Включает Kolesa DM (339 заявок), Kolesa квиз (12), Kolesa таблица (11). Итого 362 заявки</p>
              <p>• <strong>Менеджеры:</strong> 9 менеджеров, 58 заявок. Лучший CR одобрения: satbergenov.n, balgozhina.f (100%)</p>
              <p>• <strong>Дилеры:</strong> 191 заявка. ANTO MOTORS доминирует (139 заявок, 72.8%). ИП Дилеры (квиз): 23 заявки</p>
              <p>• <strong>Согласие:</strong> has_consent = YES в UTM таблице</p>
              <p>• <strong>Одобрение:</strong> approval_status = APPROVED в UTM таблице</p>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}
