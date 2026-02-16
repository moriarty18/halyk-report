import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, ComposedChart, Area, Cell
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Database, AlertTriangle, 
  Calendar, DollarSign, Users, CheckCircle2, FileSignature,
  Info, ArrowUpRight, ArrowDownRight, Eye, MousePointer, FileText, UserCheck, MessageCircle
} from "lucide-react";
import { Link } from "wouter";

// =============================================
// ДАННЫЕ ИЗ РЕКЛАМНЫХ КАБИНЕТОВ (ФЕВРАЛЬ 2026)
// Неделя 6: 2-8 февраля 2026
// Неделя 7: 9-15 февраля 2026
// С ДЕДУПЛИКАЦИЕЙ ПО БИН
// =============================================================================

// Исторические данные за недели 1-7 для сравнения
const weeklyComparison = [
  {
    week: 'Нед. 1', period: '1-4 янв',
    google_leads: 54, google_consents: 7, google_approved: 2, google_cr_consent: 13.0, google_cr_approved: 28.6,
    meta_leads: 151, meta_consents: 16, meta_approved: 4, meta_cr_consent: 10.6, meta_cr_approved: 25.0,
    whatsapp_leads: 0, whatsapp_consents: 0, whatsapp_approved: 0, whatsapp_cr_consent: 0, whatsapp_cr_approved: 0,
    kolesa_leads: 153, kolesa_consents: 11, kolesa_approved: 1, kolesa_cr_consent: 7.2, kolesa_cr_approved: 9.1,
    managers_leads: 0, managers_consents: 0, managers_approved: 0, managers_cr_consent: 0, managers_cr_approved: 0,
    dealers_leads: 0, dealers_consents: 0, dealers_approved: 0, dealers_cr_consent: 0, dealers_cr_approved: 0,
    organic_leads: 13, organic_consents: 5, organic_approved: 0, organic_cr_consent: 38.5, organic_cr_approved: 0,
    total_leads: 371, total_consents: 39, total_approved: 7, total_cr_consent: 10.5, total_cr_approved: 17.9,
  },
  {
    week: 'Нед. 2', period: '5-11 янв',
    google_leads: 139, google_consents: 23, google_approved: 7, google_cr_consent: 16.5, google_cr_approved: 30.4,
    meta_leads: 241, meta_consents: 25, meta_approved: 7, meta_cr_consent: 10.4, meta_cr_approved: 28.0,
    whatsapp_leads: 0, whatsapp_consents: 0, whatsapp_approved: 0, whatsapp_cr_consent: 0, whatsapp_cr_approved: 0,
    kolesa_leads: 355, kolesa_consents: 50, kolesa_approved: 16, kolesa_cr_consent: 14.1, kolesa_cr_approved: 32.0,
    managers_leads: 29, managers_consents: 22, managers_approved: 6, managers_cr_consent: 75.9, managers_cr_approved: 27.3,
    dealers_leads: 0, dealers_consents: 0, dealers_approved: 0, dealers_cr_consent: 0, dealers_cr_approved: 0,
    organic_leads: 46, organic_consents: 29, organic_approved: 8, organic_cr_consent: 63.0, organic_cr_approved: 27.6,
    total_leads: 810, total_consents: 149, total_approved: 44, total_cr_consent: 18.4, total_cr_approved: 29.5,
  },
  {
    week: 'Нед. 3', period: '12-18 янв',
    google_leads: 116, google_consents: 25, google_approved: 3, google_cr_consent: 21.6, google_cr_approved: 12.0,
    meta_leads: 193, meta_consents: 35, meta_approved: 8, meta_cr_consent: 18.1, meta_cr_approved: 22.9,
    whatsapp_leads: 0, whatsapp_consents: 0, whatsapp_approved: 0, whatsapp_cr_consent: 0, whatsapp_cr_approved: 0,
    kolesa_leads: 394, kolesa_consents: 51, kolesa_approved: 12, kolesa_cr_consent: 12.9, kolesa_cr_approved: 23.5,
    managers_leads: 56, managers_consents: 46, managers_approved: 24, managers_cr_consent: 82.1, managers_cr_approved: 52.2,
    dealers_leads: 0, dealers_consents: 0, dealers_approved: 0, dealers_cr_consent: 0, dealers_cr_approved: 0,
    organic_leads: 66, organic_consents: 42, organic_approved: 12, organic_cr_consent: 63.6, organic_cr_approved: 28.6,
    total_leads: 825, total_consents: 199, total_approved: 59, total_cr_consent: 24.1, total_cr_approved: 29.6,
  },
  {
    week: 'Нед. 4', period: '19-25 янв',
    google_leads: 131, google_consents: 36, google_approved: 10, google_cr_consent: 27.5, google_cr_approved: 27.8,
    meta_leads: 186, meta_consents: 26, meta_approved: 9, meta_cr_consent: 14.0, meta_cr_approved: 34.6,
    whatsapp_leads: 0, whatsapp_consents: 0, whatsapp_approved: 0, whatsapp_cr_consent: 0, whatsapp_cr_approved: 0,
    kolesa_leads: 414, kolesa_consents: 63, kolesa_approved: 13, kolesa_cr_consent: 15.2, kolesa_cr_approved: 20.6,
    managers_leads: 59, managers_consents: 51, managers_approved: 20, managers_cr_consent: 86.4, managers_cr_approved: 39.2,
    dealers_leads: 0, dealers_consents: 0, dealers_approved: 0, dealers_cr_consent: 0, dealers_cr_approved: 0,
    organic_leads: 76, organic_consents: 44, organic_approved: 11, organic_cr_consent: 57.9, organic_cr_approved: 25.0,
    total_leads: 866, total_consents: 220, total_approved: 63, total_cr_consent: 25.4, total_cr_approved: 28.6,
  },
  {
    week: 'Нед. 5', period: '26 янв-1 фев',
    google_leads: 115, google_consents: 35, google_approved: 6, google_cr_consent: 30.4, google_cr_approved: 17.1,
    meta_leads: 174, meta_consents: 24, meta_approved: 5, meta_cr_consent: 13.8, meta_cr_approved: 20.8,
    whatsapp_leads: 0, whatsapp_consents: 0, whatsapp_approved: 0, whatsapp_cr_consent: 0, whatsapp_cr_approved: 0,
    kolesa_leads: 353, kolesa_consents: 36, kolesa_approved: 6, kolesa_cr_consent: 10.2, kolesa_cr_approved: 16.7,
    managers_leads: 49, managers_consents: 43, managers_approved: 13, managers_cr_consent: 87.8, managers_cr_approved: 30.2,
    dealers_leads: 0, dealers_consents: 0, dealers_approved: 0, dealers_cr_consent: 0, dealers_cr_approved: 0,
    organic_leads: 83, organic_consents: 36, organic_approved: 3, organic_cr_consent: 43.4, organic_cr_approved: 8.3,
    total_leads: 774, total_consents: 174, total_approved: 33, total_cr_consent: 22.5, total_cr_approved: 19.0,
  },
  {
    week: 'Нед. 6', period: '2-8 фев',
    google_leads: 158, google_consents: 67, google_approved: 15, google_cr_consent: 42.4, google_cr_approved: 22.4,
    meta_leads: 160, meta_consents: 45, meta_approved: 9, meta_cr_consent: 28.1, meta_cr_approved: 20.0,
    whatsapp_leads: 0, whatsapp_consents: 0, whatsapp_approved: 0, whatsapp_cr_consent: 0, whatsapp_cr_approved: 0,
    kolesa_leads: 372, kolesa_consents: 113, kolesa_approved: 12, kolesa_cr_consent: 30.4, kolesa_cr_approved: 10.6,
    managers_leads: 37, managers_consents: 32, managers_approved: 14, managers_cr_consent: 86.5, managers_cr_approved: 43.8,
    dealers_leads: 0, dealers_consents: 0, dealers_approved: 0, dealers_cr_consent: 0, dealers_cr_approved: 0,
    organic_leads: 30, organic_consents: 17, organic_approved: 2, organic_cr_consent: 56.7, organic_cr_approved: 11.8,
    total_leads: 757, total_consents: 274, total_approved: 52, total_cr_consent: 36.2, total_cr_approved: 19.0,
  },
  {
    week: 'Нед. 7', period: '9-15 фев',
    google_leads: 119, google_consents: 55, google_approved: 5, google_cr_consent: 46.2, google_cr_approved: 9.1,
    meta_leads: 137, meta_consents: 31, meta_approved: 2, meta_cr_consent: 22.6, meta_cr_approved: 6.5,
    whatsapp_leads: 194, whatsapp_consents: 103, whatsapp_approved: 4, whatsapp_cr_consent: 53.1, whatsapp_cr_approved: 3.9,
    kolesa_leads: 360, kolesa_consents: 122, kolesa_approved: 12, kolesa_cr_consent: 33.9, kolesa_cr_approved: 9.8,
    managers_leads: 55, managers_consents: 51, managers_approved: 32, managers_cr_consent: 92.7, managers_cr_approved: 62.7,
    dealers_leads: 18, dealers_consents: 17, dealers_approved: 0, dealers_cr_consent: 94.4, dealers_cr_approved: 0,
    organic_leads: 44, organic_consents: 31, organic_approved: 4, organic_cr_consent: 70.5, organic_cr_approved: 12.9,
    total_leads: 927, total_consents: 410, total_approved: 59, total_cr_consent: 44.2, total_cr_approved: 14.4,
  },
];

// Данные для графиков
const leadsChartData = weeklyComparison.map(w => ({
  week: w.week,
  'Google Ads': w.google_leads,
  'Meta Ads': w.meta_leads,
  'WhatsApp': w.whatsapp_leads,
  'Kolesa': w.kolesa_leads,
  'Менеджеры': w.managers_leads,
  'Дилеры': w.dealers_leads,
  'Органика': w.organic_leads,
  'Всего': w.total_leads,
}));

const approvedChartData = weeklyComparison.map(w => ({
  week: w.week,
  'Google Ads': w.google_approved,
  'Meta Ads': w.meta_approved,
  'WhatsApp': w.whatsapp_approved,
  'Kolesa': w.kolesa_approved,
  'Менеджеры': w.managers_approved,
  'Дилеры': w.dealers_approved,
  'Органика': w.organic_approved,
  'Всего': w.total_approved,
}));

const crConsentChartData = weeklyComparison.map(w => ({
  week: w.week,
  'Google Ads': w.google_cr_consent,
  'Meta Ads': w.meta_cr_consent,
  'WhatsApp': w.whatsapp_cr_consent,
  'Kolesa': w.kolesa_cr_consent,
  'Менеджеры': w.managers_cr_consent,
  'Органика': w.organic_cr_consent,
  'Среднее': w.total_cr_consent,
}));

const crApprovedChartData = weeklyComparison.map(w => ({
  week: w.week,
  'Google Ads': w.google_cr_approved,
  'Meta Ads': w.meta_cr_approved,
  'WhatsApp': w.whatsapp_cr_approved,
  'Kolesa': w.kolesa_cr_approved,
  'Менеджеры': w.managers_cr_approved,
  'Органика': w.organic_cr_approved,
  'Среднее': w.total_cr_approved,
}));

// ===== НЕДЕЛЯ 7 (текущая) — основные данные =====

// Google Ads — Неделя 7
const googleAdsWeekly = [
  { 
    week: 'Неделя 6', period: '2-8 фев',
    impressions: 8171, clicks: 1912, leads: 158, consents: 67, approved: 15,
    cost: 741.44, ctr: 23.40, cr_lead: 8.26, cr_consent: 42.4, cr_approved: 22.4
  },
  { 
    week: 'Неделя 7', period: '9-15 фев',
    impressions: 9081, clicks: 1831, leads: 119, consents: 55, approved: 5,
    cost: 773.34, ctr: 20.16, cr_lead: 6.50, cr_consent: 46.2, cr_approved: 9.1
  },
];

// Meta Ads — Неделя 7
const metaAdsWeekly = [
  { 
    week: 'Неделя 6', period: '2-8 фев',
    impressions: 51149, reach: 25763, leads: 160, consents: 45, approved: 9,
    cost: 173.92, cr_lead: 0.31, cr_consent: 28.1, cr_approved: 20.0
  },
  { 
    week: 'Неделя 7', period: '9-15 фев',
    impressions: 49394, reach: 24438, leads: 137, consents: 31, approved: 2,
    cost: 176.17, cr_lead: 0.28, cr_consent: 22.6, cr_approved: 6.5
  },
];

// WhatsApp Campaign — Неделя 7 (новый канал)
const whatsappWeekly = [
  { 
    week: 'Неделя 7', period: '9-15 фев',
    messages_sent: 2600, messages_delivered: 2600, messages_read: 2000,
    read_rate: 79, clicks: 516, click_rate: 20,
    leads: 194, consents: 103, approved: 4,
    cost: 154.89, cost_per_click: 0.30, cost_per_message: 0.06,
    cr_consent: 53.1, cr_approved: 3.9
  },
];

// Kolesa — Неделя 7
const kolesaWeekly = [
  { week: 'Неделя 6', period: '2-8 фев', leads: 372, consents: 113, approved: 12, cr_consent: 30.4, cr_approved: 10.6 },
  { week: 'Неделя 7', period: '9-15 фев', leads: 360, consents: 122, approved: 12, cr_consent: 33.9, cr_approved: 9.8 },
];

// Менеджеры — Неделя 7
const managersWeekly = [
  { week: 'Неделя 6', period: '2-8 фев', leads: 37, consents: 32, approved: 14, cr_consent: 86.5, cr_approved: 43.8 },
  { week: 'Неделя 7', period: '9-15 фев', leads: 55, consents: 51, approved: 32, cr_consent: 92.7, cr_approved: 62.7 },
];

// Дилеры — Неделя 7
const dealersWeekly = [
  { week: 'Неделя 7', period: '9-15 фев', leads: 18, consents: 17, approved: 0, cr_consent: 94.4, cr_approved: 0 },
];

// Органика — Неделя 7
const organicWeekly = [
  { week: 'Неделя 6', period: '2-8 фев', leads: 30, consents: 17, approved: 2, cr_consent: 56.7, cr_approved: 11.8 },
  { week: 'Неделя 7', period: '9-15 фев', leads: 44, consents: 31, approved: 4, cr_consent: 70.5, cr_approved: 12.9 },
];

// Данные по менеджерам — Неделя 7
const managersData = [
  { name: 'karashev.a', leads: 22, consents: 20, approved: 13, cr_consent: 90.9, cr_approved: 65.0 },
  { name: 'mamutbayeva.a', leads: 9, consents: 7, approved: 4, cr_consent: 77.8, cr_approved: 57.1 },
  { name: 'kamzina.z', leads: 8, consents: 8, approved: 6, cr_consent: 100.0, cr_approved: 75.0 },
  { name: 'ertargyn.e', leads: 6, consents: 6, approved: 4, cr_consent: 100.0, cr_approved: 66.7 },
  { name: 'elkin.p', leads: 5, consents: 5, approved: 2, cr_consent: 100.0, cr_approved: 40.0 },
  { name: 'satbergenov.n', leads: 5, consents: 5, approved: 3, cr_consent: 100.0, cr_approved: 60.0 },
];

// Google Ads кампании — Неделя 7
const googleAdsCampaigns = [
  { campaign: 'Общие ключевые слова', impressions: 5027, clicks: 1166, conversions: 100.5, cost: 480.50, ctr: 23.19, cr: 8.61 },
  { campaign: 'Такси / Автобусы', impressions: 1527, clicks: 268, conversions: 14.2, cost: 118.03, ctr: 17.55, cr: 5.32 },
  { campaign: 'Строительство', impressions: 1419, clicks: 210, conversions: 25.0, cost: 95.94, ctr: 14.80, cr: 11.90 },
  { campaign: 'Сельское хозяйство', impressions: 407, clicks: 64, conversions: 4.0, cost: 22.12, ctr: 15.72, cr: 6.25 },
  { campaign: 'Грузоперевозки', impressions: 313, clicks: 58, conversions: 2.0, cost: 25.97, ctr: 18.53, cr: 3.45 },
  { campaign: 'Дистрибуция и ритейл', impressions: 268, clicks: 43, conversions: 4.0, cost: 20.24, ctr: 16.04, cr: 9.29 },
  { campaign: 'ГМК и нефтедобыча', impressions: 120, clicks: 22, conversions: 2.5, cost: 10.54, ctr: 18.33, cr: 11.35 },
];

// Итоговые данные по каналам — Неделя 7 (текущая)
const channelTotals = [
  {
    channel: 'Google Ads',
    impressions: 9081, clicks: 1831, leads: 119, consents: 55, approved: 5,
    cost: 773.34, ctr: 20.16, cr_lead: 6.50, cr_consent: 46.2, cr_approved: 9.1, cpl: 6.50
  },
  {
    channel: 'Meta Ads',
    impressions: 49394, reach: 24438, leads: 137, consents: 31, approved: 2,
    cost: 176.17, cr_lead: 0.28, cr_consent: 22.6, cr_approved: 6.5, cpl: 1.29
  },
  {
    channel: 'WhatsApp',
    messages_sent: 2600, clicks: 516, leads: 194, consents: 103, approved: 4,
    cost: 154.89, cr_consent: 53.1, cr_approved: 3.9, cpl: 0.80
  },
  {
    channel: 'Kolesa',
    leads: 360, consents: 122, approved: 12, cr_consent: 33.9, cr_approved: 9.8
  },
  {
    channel: 'Менеджеры',
    leads: 55, consents: 51, approved: 32, cr_consent: 92.7, cr_approved: 62.7
  },
  {
    channel: 'Дилеры',
    leads: 18, consents: 17, approved: 0, cr_consent: 94.4, cr_approved: 0
  },
  {
    channel: 'Органика',
    leads: 44, consents: 31, approved: 4, cr_consent: 70.5, cr_approved: 12.9
  },
];

// Данные для графика воронки
const weeklyFunnelData = [
  { 
    week: 'Неделя 6',
    'Google Ads': 158, 'Meta Ads': 160, 'WhatsApp': 0,
    'Kolesa': 372, 'Менеджеры': 37, 'Дилеры': 0, 'Органика': 30
  },
  { 
    week: 'Неделя 7',
    'Google Ads': 119, 'Meta Ads': 137, 'WhatsApp': 194,
    'Kolesa': 360, 'Менеджеры': 55, 'Дилеры': 18, 'Органика': 44
  },
];

// Итоги — Неделя 7
const totalLeads = channelTotals.reduce((sum, c) => sum + c.leads, 0);
const totalConsents = channelTotals.reduce((sum, c) => sum + c.consents, 0);
const totalApproved = channelTotals.reduce((sum, c) => sum + c.approved, 0);
const totalSpend = channelTotals.filter(c => c.cost).reduce((sum, c) => sum + (c.cost || 0), 0);
const paidLeads = channelTotals.filter(c => c.cost).reduce((sum, c) => sum + c.leads, 0);

// Цвета для каналов
const COLORS: Record<string, string> = {
  'Google Ads': '#4285f4',
  'Meta Ads': '#0668E1',
  'WhatsApp': '#25D366',
  'Kolesa': '#ff6b35',
  'Менеджеры': '#8b5cf6',
  'Дилеры': '#f59e0b',
  'Органика': '#22c55e'
};

// Дельта между неделями
const w6 = weeklyComparison[5];
const w7 = weeklyComparison[6];
const deltaLeads = w7.total_leads - w6.total_leads;
const deltaConsents = w7.total_consents - w6.total_consents;
const deltaApproved = w7.total_approved - w6.total_approved;

export default function AnalyticsFebruary() {
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
            <span className="text-foreground">Аналитика (Фев)</span>
            <Link href="/roadmap" className="hover:text-foreground transition-colors">Планы</Link>
          </nav>
          <div className="text-sm text-muted-foreground">
            9 - 15 февраля 2026
          </div>
        </div>
      </header>

      <main className="container py-10 space-y-12">
        
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Воронка продаж — Февраль 2026</h1>
              <p className="text-muted-foreground mt-1">Неделя 7: 9-15 февраля 2026 | Данные с дедупликацией по БИН</p>
            </div>
          </div>
          
          {/* Period Tabs */}
          <div className="flex gap-2">
            <Link href="/analytics">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">Декабрь 2025</Badge>
            </Link>
            <Link href="/analytics-january">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">Январь 2026</Badge>
            </Link>
            <Badge variant="default">Февраль 2026</Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Ключевые показатели — Неделя 7</h2>
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Всего заявок</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalLeads.toLocaleString()}</div>
                <p className={`text-xs mt-1 flex items-center gap-1 ${deltaLeads >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {deltaLeads >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {deltaLeads >= 0 ? '+' : ''}{deltaLeads} vs нед. 6
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
                  {deltaConsents >= 0 ? '+' : ''}{deltaConsents} vs нед. 6 | CR {(totalConsents / totalLeads * 100).toFixed(1)}%
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
                  {deltaApproved >= 0 ? '+' : ''}{deltaApproved} vs нед. 6 | CR {(totalApproved / totalConsents * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Расходы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalSpend.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                <p className="text-xs text-muted-foreground mt-1">Google + Meta + WhatsApp</p>
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

        {/* Summary Table */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Сводная таблица по каналам — Неделя 7</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Канал</th>
                      <th className="text-right py-3 px-4 font-medium">Заявки</th>
                      <th className="text-right py-3 px-4 font-medium">Согласия</th>
                      <th className="text-right py-3 px-4 font-medium">CR</th>
                      <th className="text-right py-3 px-4 font-medium">Одобрено</th>
                      <th className="text-right py-3 px-4 font-medium">CR</th>
                      <th className="text-right py-3 px-4 font-medium">Расход</th>
                      <th className="text-right py-3 px-4 font-medium">CPL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelTotals.map((channel, i) => (
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[channel.channel] }}></div>
                            {channel.channel}
                            {channel.channel === 'WhatsApp' && <Badge variant="secondary" className="text-xs">NEW</Badge>}
                          </div>
                        </td>
                        <td className="text-right py-3 px-4 font-mono">{channel.leads.toLocaleString()}</td>
                        <td className="text-right py-3 px-4 font-mono">{channel.consents}</td>
                        <td className="text-right py-3 px-4 font-mono text-emerald-600">{channel.cr_consent}%</td>
                        <td className="text-right py-3 px-4 font-mono">{channel.approved}</td>
                        <td className="text-right py-3 px-4 font-mono text-emerald-600">{channel.cr_approved}%</td>
                        <td className="text-right py-3 px-4 font-mono">{channel.cost ? `$${channel.cost.toFixed(2)}` : '—'}</td>
                        <td className="text-right py-3 px-4 font-mono">{channel.cpl ? `$${channel.cpl.toFixed(2)}` : '—'}</td>
                      </tr>
                    ))}
                    <tr className="font-bold bg-muted/30">
                      <td className="py-3 px-4">ИТОГО</td>
                      <td className="text-right py-3 px-4 font-mono">{totalLeads.toLocaleString()}</td>
                      <td className="text-right py-3 px-4 font-mono">{totalConsents}</td>
                      <td className="text-right py-3 px-4 font-mono text-emerald-600">{(totalConsents / totalLeads * 100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-4 font-mono">{totalApproved}</td>
                      <td className="text-right py-3 px-4 font-mono text-emerald-600">{(totalApproved / totalConsents * 100).toFixed(1)}%</td>
                      <td className="text-right py-3 px-4 font-mono">${totalSpend.toFixed(2)}</td>
                      <td className="text-right py-3 px-4 font-mono">${(totalSpend / paidLeads).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Leads Distribution Chart */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Распределение заявок по каналам</h2>
          <Card>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={channelTotals} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="channel" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" name="Заявки" fill="#94a3b8" />
                  <Bar dataKey="consents" name="Согласия" fill="#3b82f6" />
                  <Bar dataKey="approved" name="Одобрено" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Channel Details Tabs */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Детализация по каналам</h2>
          <Tabs defaultValue="google" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="google">Google Ads</TabsTrigger>
              <TabsTrigger value="meta">Meta Ads</TabsTrigger>
              <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
              <TabsTrigger value="kolesa">Kolesa</TabsTrigger>
              <TabsTrigger value="managers">Менеджеры</TabsTrigger>
              <TabsTrigger value="dealers">Дилеры</TabsTrigger>
              <TabsTrigger value="organic">Органика</TabsTrigger>
            </TabsList>

            {/* Google Ads Tab */}
            <TabsContent value="google" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Google Ads'] }}></div>
                    Google Ads — Полная воронка
                  </CardTitle>
                  <CardDescription>Показы → Клики → Заявки → Согласия → Одобрено</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium">Неделя</th>
                          <th className="text-right py-3 px-2 font-medium">Показы</th>
                          <th className="text-right py-3 px-2 font-medium">Клики</th>
                          <th className="text-right py-3 px-2 font-medium">CTR</th>
                          <th className="text-right py-3 px-2 font-medium">Заявки</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Согласия</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Расход</th>
                        </tr>
                      </thead>
                      <tbody>
                        {googleAdsWeekly.map((week, i) => (
                          <tr key={i} className={`border-b hover:bg-muted/50 ${i === googleAdsWeekly.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
                            <td className="py-3 px-2">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-2 font-mono">{week.impressions.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.clicks.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono text-blue-600">{week.ctr}%</td>
                            <td className="text-right py-3 px-2 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.cr_lead}%</td>
                            <td className="text-right py-3 px-2 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-2 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.cr_approved}%</td>
                            <td className="text-right py-3 px-2 font-mono">${week.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Неделя 7: CPL: ${(773.34 / 119).toFixed(2)} | Cost per Consent: ${(773.34 / 55).toFixed(2)} | Cost per Approval: ${(773.34 / 5).toFixed(2)}</p>
                  </div>

                  <Separator className="my-6" />

                  <h4 className="font-semibold mb-4">Разбивка по кампаниям — Неделя 7</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium">Кампания</th>
                          <th className="text-right py-3 px-2 font-medium">Показы</th>
                          <th className="text-right py-3 px-2 font-medium">Клики</th>
                          <th className="text-right py-3 px-2 font-medium">CTR</th>
                          <th className="text-right py-3 px-2 font-medium">Конверсии</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Расход</th>
                          <th className="text-right py-3 px-2 font-medium">CPC</th>
                        </tr>
                      </thead>
                      <tbody>
                        {googleAdsCampaigns.map((c, i) => (
                          <tr key={i} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-2 text-xs">{c.campaign}</td>
                            <td className="text-right py-3 px-2 font-mono">{c.impressions.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono">{c.clicks.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono text-blue-600">{c.ctr}%</td>
                            <td className="text-right py-3 px-2 font-mono">{c.conversions.toFixed(1)}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{c.cr}%</td>
                            <td className="text-right py-3 px-2 font-mono">${c.cost.toFixed(2)}</td>
                            <td className="text-right py-3 px-2 font-mono">${(c.cost / c.clicks).toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="font-bold bg-muted/30">
                          <td className="py-3 px-2">ИТОГО</td>
                          <td className="text-right py-3 px-2 font-mono">{googleAdsCampaigns.reduce((s, c) => s + c.impressions, 0).toLocaleString()}</td>
                          <td className="text-right py-3 px-2 font-mono">{googleAdsCampaigns.reduce((s, c) => s + c.clicks, 0).toLocaleString()}</td>
                          <td className="text-right py-3 px-2 font-mono text-blue-600">20.16%</td>
                          <td className="text-right py-3 px-2 font-mono">{googleAdsCampaigns.reduce((s, c) => s + c.conversions, 0).toFixed(1)}</td>
                          <td className="text-right py-3 px-2 font-mono text-emerald-600">8.31%</td>
                          <td className="text-right py-3 px-2 font-mono">${googleAdsCampaigns.reduce((s, c) => s + c.cost, 0).toFixed(2)}</td>
                          <td className="text-right py-3 px-2 font-mono">${(773.34 / 1831).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Meta Ads Tab */}
            <TabsContent value="meta" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Meta Ads'] }}></div>
                    Meta Ads — Полная воронка
                  </CardTitle>
                  <CardDescription>Показы → Охват → Заявки → Согласия → Одобрено</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium">Неделя</th>
                          <th className="text-right py-3 px-2 font-medium">Показы</th>
                          <th className="text-right py-3 px-2 font-medium">Охват</th>
                          <th className="text-right py-3 px-2 font-medium">Заявки</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Согласия</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Расход</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metaAdsWeekly.map((week, i) => (
                          <tr key={i} className={`border-b hover:bg-muted/50 ${i === metaAdsWeekly.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
                            <td className="py-3 px-2">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-2 font-mono">{week.impressions.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.reach.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.cr_lead}%</td>
                            <td className="text-right py-3 px-2 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-2 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.cr_approved}%</td>
                            <td className="text-right py-3 px-2 font-mono">${week.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Неделя 7: CPL: ${(176.17 / 137).toFixed(2)} | Cost per Consent: ${(176.17 / 31).toFixed(2)} | Cost per Approval: ${(176.17 / 2).toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* WhatsApp Tab */}
            <TabsContent value="whatsapp" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['WhatsApp'] }}></div>
                    WhatsApp — Кампания реактивации
                    <Badge variant="secondary">NEW</Badge>
                  </CardTitle>
                  <CardDescription>ip_reactivation_biometry — Биометрическое согласие для ИП</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* WhatsApp Funnel Metrics */}
                  <div className="grid gap-4 md:grid-cols-4 mb-6">
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold">2,600</div>
                      <div className="text-xs text-muted-foreground">Сообщений отправлено</div>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold">2,000</div>
                      <div className="text-xs text-muted-foreground">Прочитано (79%)</div>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold">516</div>
                      <div className="text-xs text-muted-foreground">Клики (20%)</div>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-emerald-600">194</div>
                      <div className="text-xs text-muted-foreground">Заявки (CRM)</div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium">Неделя</th>
                          <th className="text-right py-3 px-2 font-medium">Отправлено</th>
                          <th className="text-right py-3 px-2 font-medium">Прочитано</th>
                          <th className="text-right py-3 px-2 font-medium">Клики</th>
                          <th className="text-right py-3 px-2 font-medium">Заявки</th>
                          <th className="text-right py-3 px-2 font-medium">Согласия</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-2 font-medium">CR</th>
                          <th className="text-right py-3 px-2 font-medium">Расход</th>
                        </tr>
                      </thead>
                      <tbody>
                        {whatsappWeekly.map((week, i) => (
                          <tr key={i} className="border-b hover:bg-muted/50 bg-blue-50 dark:bg-blue-950/30 font-semibold">
                            <td className="py-3 px-2">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-2 font-mono">{week.messages_sent.toLocaleString()}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.messages_read.toLocaleString()} ({week.read_rate}%)</td>
                            <td className="text-right py-3 px-2 font-mono">{week.clicks}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-2 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-2 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-2 font-mono text-emerald-600">{week.cr_approved}%</td>
                            <td className="text-right py-3 px-2 font-mono">${week.cost.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>CPL: ${(154.89 / 194).toFixed(2)} | Cost per Click: $0.30 | Cost per Message: $0.06 | Cost per Consent: ${(154.89 / 103).toFixed(2)} | Cost per Approval: ${(154.89 / 4).toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Kolesa Tab */}
            <TabsContent value="kolesa" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Kolesa'] }}></div>
                    Kolesa — Воронка
                  </CardTitle>
                  <CardDescription>Заявки → Согласия → Одобрено (включая автора kolesa)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Неделя</th>
                          <th className="text-right py-3 px-4 font-medium">Заявки</th>
                          <th className="text-right py-3 px-4 font-medium">Согласия</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                          <th className="text-right py-3 px-4 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kolesaWeekly.map((week, i) => (
                          <tr key={i} className={`border-b hover:bg-muted/50 ${i === kolesaWeekly.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
                            <td className="py-3 px-4">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-4 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-4 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{week.cr_approved}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Managers Tab */}
            <TabsContent value="managers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Менеджеры'] }}></div>
                    Менеджеры — Воронка
                  </CardTitle>
                  <CardDescription>Заявки добавленные менеджерами вручную</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Неделя</th>
                          <th className="text-right py-3 px-4 font-medium">Заявки</th>
                          <th className="text-right py-3 px-4 font-medium">Согласия</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                          <th className="text-right py-3 px-4 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {managersWeekly.map((week, i) => (
                          <tr key={i} className={`border-b hover:bg-muted/50 ${i === managersWeekly.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
                            <td className="py-3 px-4">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-4 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-4 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{week.cr_approved}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <Separator className="my-6" />

                  <h4 className="font-semibold mb-4">Разбивка по менеджерам — Неделя 7</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Менеджер</th>
                          <th className="text-right py-3 px-4 font-medium">Заявки</th>
                          <th className="text-right py-3 px-4 font-medium">Согласия</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                          <th className="text-right py-3 px-4 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {managersData.map((m, i) => (
                          <tr key={i} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">{m.name}</td>
                            <td className="text-right py-3 px-4 font-mono">{m.leads}</td>
                            <td className="text-right py-3 px-4 font-mono">{m.consents}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{m.cr_consent}%</td>
                            <td className="text-right py-3 px-4 font-mono">{m.approved}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{m.cr_approved}%</td>
                          </tr>
                        ))}
                        <tr className="font-bold bg-muted/30">
                          <td className="py-3 px-4">ИТОГО</td>
                          <td className="text-right py-3 px-4 font-mono">{managersData.reduce((s, m) => s + m.leads, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono">{managersData.reduce((s, m) => s + m.consents, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono text-emerald-600">92.7%</td>
                          <td className="text-right py-3 px-4 font-mono">{managersData.reduce((s, m) => s + m.approved, 0)}</td>
                          <td className="text-right py-3 px-4 font-mono text-emerald-600">62.7%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dealers Tab */}
            <TabsContent value="dealers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Дилеры'] }}></div>
                    Дилеры — Воронка
                  </CardTitle>
                  <CardDescription>Заявки от дилерских партнёров</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Неделя</th>
                          <th className="text-right py-3 px-4 font-medium">Заявки</th>
                          <th className="text-right py-3 px-4 font-medium">Согласия</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                          <th className="text-right py-3 px-4 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dealersWeekly.map((week, i) => (
                          <tr key={i} className="border-b hover:bg-muted/50 bg-blue-50 dark:bg-blue-950/30 font-semibold">
                            <td className="py-3 px-4">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-4 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-4 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{week.cr_approved}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Organic Tab */}
            <TabsContent value="organic" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS['Органика'] }}></div>
                    Органика — Воронка
                  </CardTitle>
                  <CardDescription>Self Service без UTM, API, online_bank</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Неделя</th>
                          <th className="text-right py-3 px-4 font-medium">Заявки</th>
                          <th className="text-right py-3 px-4 font-medium">Согласия</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                          <th className="text-right py-3 px-4 font-medium">Одобрено</th>
                          <th className="text-right py-3 px-4 font-medium">CR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {organicWeekly.map((week, i) => (
                          <tr key={i} className={`border-b hover:bg-muted/50 ${i === organicWeekly.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
                            <td className="py-3 px-4">
                              <div className="font-medium">{week.week}</div>
                              <div className="text-xs text-muted-foreground">{week.period}</div>
                            </td>
                            <td className="text-right py-3 px-4 font-mono">{week.leads}</td>
                            <td className="text-right py-3 px-4 font-mono">{week.consents}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{week.cr_consent}%</td>
                            <td className="text-right py-3 px-4 font-mono">{week.approved}</td>
                            <td className="text-right py-3 px-4 font-mono text-emerald-600">{week.cr_approved}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Weekly Comparison Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Сравнение по неделям — Динамика показателей</h2>
          
          {/* Leads Comparison Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Заявки по каналам (недели 1-7)</CardTitle>
              <CardDescription>Количество уникальных заявок (дедупликация по БИН) по каждому каналу</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Неделя</th>
                      <th className="text-right py-3 px-2 font-medium" style={{color: COLORS['Google Ads']}}>Google</th>
                      <th className="text-right py-3 px-2 font-medium" style={{color: COLORS['Meta Ads']}}>Meta</th>
                      <th className="text-right py-3 px-2 font-medium" style={{color: COLORS['WhatsApp']}}>WhatsApp</th>
                      <th className="text-right py-3 px-2 font-medium" style={{color: COLORS['Kolesa']}}>Kolesa</th>
                      <th className="text-right py-3 px-2 font-medium" style={{color: COLORS['Менеджеры']}}>Менедж.</th>
                      <th className="text-right py-3 px-2 font-medium" style={{color: COLORS['Дилеры']}}>Дилеры</th>
                      <th className="text-right py-3 px-2 font-medium" style={{color: COLORS['Органика']}}>Органика</th>
                      <th className="text-right py-3 px-2 font-medium font-bold">Всего</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyComparison.map((w, i) => (
                      <tr key={i} className={`border-b hover:bg-muted/50 ${i === weeklyComparison.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
                        <td className="py-2 px-2">
                          <div className="font-medium text-xs">{w.week}</div>
                          <div className="text-xs text-muted-foreground">{w.period}</div>
                        </td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.google_leads}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.meta_leads}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.whatsapp_leads || '—'}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.kolesa_leads}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.managers_leads || '—'}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.dealers_leads || '—'}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs">{w.organic_leads}</td>
                        <td className="text-right py-2 px-2 font-mono text-xs font-bold">{w.total_leads}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Leads Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Динамика заявок по неделям</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={leadsChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Google Ads" fill={COLORS['Google Ads']} stackId="a" />
                  <Bar dataKey="Meta Ads" fill={COLORS['Meta Ads']} stackId="a" />
                  <Bar dataKey="WhatsApp" fill={COLORS['WhatsApp']} stackId="a" />
                  <Bar dataKey="Kolesa" fill={COLORS['Kolesa']} stackId="a" />
                  <Bar dataKey="Менеджеры" fill={COLORS['Менеджеры']} stackId="a" />
                  <Bar dataKey="Дилеры" fill={COLORS['Дилеры']} stackId="a" />
                  <Bar dataKey="Органика" fill={COLORS['Органика']} stackId="a" />
                  <Line type="monotone" dataKey="Всего" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Consents Comparison Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Согласия по каналам (недели 1-7)</CardTitle>
              <CardDescription>Количество подписанных согласий и CR (Заявки → Согласия)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-1 font-medium text-xs">Неделя</th>
                      <th className="text-right py-3 px-1 font-medium text-xs" colSpan={2} style={{color: COLORS['Google Ads']}}>Google</th>
                      <th className="text-right py-3 px-1 font-medium text-xs" colSpan={2} style={{color: COLORS['Meta Ads']}}>Meta</th>
                      <th className="text-right py-3 px-1 font-medium text-xs" colSpan={2} style={{color: COLORS['WhatsApp']}}>WA</th>
                      <th className="text-right py-3 px-1 font-medium text-xs" colSpan={2} style={{color: COLORS['Kolesa']}}>Kolesa</th>
                      <th className="text-right py-3 px-1 font-medium text-xs" colSpan={2} style={{color: COLORS['Менеджеры']}}>Менедж.</th>
                      <th className="text-right py-3 px-1 font-medium text-xs" colSpan={2} style={{color: COLORS['Органика']}}>Органика</th>
                      <th className="text-right py-3 px-1 font-medium text-xs font-bold" colSpan={2}>Всего</th>
                    </tr>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th></th>
                      <th className="text-right py-1 px-1">#</th><th className="text-right py-1 px-1">CR</th>
                      <th className="text-right py-1 px-1">#</th><th className="text-right py-1 px-1">CR</th>
                      <th className="text-right py-1 px-1">#</th><th className="text-right py-1 px-1">CR</th>
                      <th className="text-right py-1 px-1">#</th><th className="text-right py-1 px-1">CR</th>
                      <th className="text-right py-1 px-1">#</th><th className="text-right py-1 px-1">CR</th>
                      <th className="text-right py-1 px-1">#</th><th className="text-right py-1 px-1">CR</th>
                      <th className="text-right py-1 px-1">#</th><th className="text-right py-1 px-1">CR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyComparison.map((w, i) => (
                      <tr key={i} className={`border-b hover:bg-muted/50 ${i === weeklyComparison.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
                        <td className="py-2 px-1">
                          <div className="font-medium text-xs">{w.week}</div>
                          <div className="text-xs text-muted-foreground">{w.period}</div>
                        </td>
                        <td className="text-right py-2 px-1 font-mono text-xs">{w.google_consents}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs text-emerald-600">{w.google_cr_consent}%</td>
                        <td className="text-right py-2 px-1 font-mono text-xs">{w.meta_consents}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs text-emerald-600">{w.meta_cr_consent}%</td>
                        <td className="text-right py-2 px-1 font-mono text-xs">{w.whatsapp_consents || '—'}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs text-emerald-600">{w.whatsapp_cr_consent ? `${w.whatsapp_cr_consent}%` : '—'}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs">{w.kolesa_consents}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs text-emerald-600">{w.kolesa_cr_consent}%</td>
                        <td className="text-right py-2 px-1 font-mono text-xs">{w.managers_consents || '—'}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs text-emerald-600">{w.managers_cr_consent ? `${w.managers_cr_consent}%` : '—'}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs">{w.organic_consents}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs text-emerald-600">{w.organic_cr_consent}%</td>
                        <td className="text-right py-2 px-1 font-mono text-xs font-bold">{w.total_consents}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs text-emerald-600 font-bold">{w.total_cr_consent}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* CR Consent Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Динамика CR Согласий по неделям (%)</CardTitle>
              <CardDescription>Конверсия из заявок в согласия по каждому каналу</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={crConsentChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis unit="%" />
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <Legend />
                  <Line type="monotone" dataKey="Google Ads" stroke={COLORS['Google Ads']} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Meta Ads" stroke={COLORS['Meta Ads']} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="WhatsApp" stroke={COLORS['WhatsApp']} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Kolesa" stroke={COLORS['Kolesa']} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Менеджеры" stroke={COLORS['Менеджеры']} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Органика" stroke={COLORS['Органика']} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Среднее" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Approved Comparison Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Одобрения по каналам (недели 1-7)</CardTitle>
              <CardDescription>Количество одобренных заявок и CR (Согласия → Одобрения)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-1 font-medium text-xs">Неделя</th>
                      <th className="text-right py-3 px-1 font-medium text-xs" colSpan={2} style={{color: COLORS['Google Ads']}}>Google</th>
                      <th className="text-right py-3 px-1 font-medium text-xs" colSpan={2} style={{color: COLORS['Meta Ads']}}>Meta</th>
                      <th className="text-right py-3 px-1 font-medium text-xs" colSpan={2} style={{color: COLORS['WhatsApp']}}>WA</th>
                      <th className="text-right py-3 px-1 font-medium text-xs" colSpan={2} style={{color: COLORS['Kolesa']}}>Kolesa</th>
                      <th className="text-right py-3 px-1 font-medium text-xs" colSpan={2} style={{color: COLORS['Менеджеры']}}>Менедж.</th>
                      <th className="text-right py-3 px-1 font-medium text-xs" colSpan={2} style={{color: COLORS['Органика']}}>Органика</th>
                      <th className="text-right py-3 px-1 font-medium text-xs font-bold" colSpan={2}>Всего</th>
                    </tr>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th></th>
                      <th className="text-right py-1 px-1">#</th><th className="text-right py-1 px-1">CR</th>
                      <th className="text-right py-1 px-1">#</th><th className="text-right py-1 px-1">CR</th>
                      <th className="text-right py-1 px-1">#</th><th className="text-right py-1 px-1">CR</th>
                      <th className="text-right py-1 px-1">#</th><th className="text-right py-1 px-1">CR</th>
                      <th className="text-right py-1 px-1">#</th><th className="text-right py-1 px-1">CR</th>
                      <th className="text-right py-1 px-1">#</th><th className="text-right py-1 px-1">CR</th>
                      <th className="text-right py-1 px-1">#</th><th className="text-right py-1 px-1">CR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyComparison.map((w, i) => (
                      <tr key={i} className={`border-b hover:bg-muted/50 ${i === weeklyComparison.length - 1 ? 'bg-blue-50 dark:bg-blue-950/30 font-semibold' : ''}`}>
                        <td className="py-2 px-1">
                          <div className="font-medium text-xs">{w.week}</div>
                          <div className="text-xs text-muted-foreground">{w.period}</div>
                        </td>
                        <td className="text-right py-2 px-1 font-mono text-xs">{w.google_approved}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs text-emerald-600">{w.google_cr_approved}%</td>
                        <td className="text-right py-2 px-1 font-mono text-xs">{w.meta_approved}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs text-emerald-600">{w.meta_cr_approved}%</td>
                        <td className="text-right py-2 px-1 font-mono text-xs">{w.whatsapp_approved || '—'}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs text-emerald-600">{w.whatsapp_cr_approved ? `${w.whatsapp_cr_approved}%` : '—'}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs">{w.kolesa_approved}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs text-emerald-600">{w.kolesa_cr_approved}%</td>
                        <td className="text-right py-2 px-1 font-mono text-xs">{w.managers_approved || '—'}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs text-emerald-600">{w.managers_cr_approved ? `${w.managers_cr_approved}%` : '—'}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs">{w.organic_approved}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs text-emerald-600">{w.organic_cr_approved}%</td>
                        <td className="text-right py-2 px-1 font-mono text-xs font-bold">{w.total_approved}</td>
                        <td className="text-right py-2 px-1 font-mono text-xs text-emerald-600 font-bold">{w.total_cr_approved}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Approved + CR Approved Charts */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Динамика одобрений по неделям</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={approvedChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Google Ads" fill={COLORS['Google Ads']} stackId="a" />
                    <Bar dataKey="Meta Ads" fill={COLORS['Meta Ads']} stackId="a" />
                    <Bar dataKey="WhatsApp" fill={COLORS['WhatsApp']} stackId="a" />
                    <Bar dataKey="Kolesa" fill={COLORS['Kolesa']} stackId="a" />
                    <Bar dataKey="Менеджеры" fill={COLORS['Менеджеры']} stackId="a" />
                    <Bar dataKey="Дилеры" fill={COLORS['Дилеры']} stackId="a" />
                    <Bar dataKey="Органика" fill={COLORS['Органика']} stackId="a" />
                    <Line type="monotone" dataKey="Всего" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Динамика CR Одобрений (%)</CardTitle>
                <CardDescription>Конверсия из согласий в одобрения</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={crApprovedChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis unit="%" />
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Legend />
                    <Line type="monotone" dataKey="Google Ads" stroke={COLORS['Google Ads']} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Meta Ads" stroke={COLORS['Meta Ads']} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="WhatsApp" stroke={COLORS['WhatsApp']} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Kolesa" stroke={COLORS['Kolesa']} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Менеджеры" stroke={COLORS['Менеджеры']} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Органика" stroke={COLORS['Органика']} strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Среднее" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Approved Summary */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Одобренные заявки — Сводка</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-3 font-medium">Неделя</th>
                      <th className="text-right py-3 px-3 font-medium">Google</th>
                      <th className="text-right py-3 px-3 font-medium">Meta</th>
                      <th className="text-right py-3 px-3 font-medium">WhatsApp</th>
                      <th className="text-right py-3 px-3 font-medium">Kolesa</th>
                      <th className="text-right py-3 px-3 font-medium">Менедж.</th>
                      <th className="text-right py-3 px-3 font-medium">Дилеры</th>
                      <th className="text-right py-3 px-3 font-medium">Органика</th>
                      <th className="text-right py-3 px-3 font-medium">Всего</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-3">Нед. 6 (2-8 фев)</td>
                      <td className="text-right py-3 px-3 font-mono">15</td>
                      <td className="text-right py-3 px-3 font-mono">9</td>
                      <td className="text-right py-3 px-3 font-mono">—</td>
                      <td className="text-right py-3 px-3 font-mono">12</td>
                      <td className="text-right py-3 px-3 font-mono">14</td>
                      <td className="text-right py-3 px-3 font-mono">—</td>
                      <td className="text-right py-3 px-3 font-mono">2</td>
                      <td className="text-right py-3 px-3 font-mono font-bold">52</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50 bg-blue-50 dark:bg-blue-950/30 font-semibold">
                      <td className="py-3 px-3">Нед. 7 (9-15 фев)</td>
                      <td className="text-right py-3 px-3 font-mono">5</td>
                      <td className="text-right py-3 px-3 font-mono">2</td>
                      <td className="text-right py-3 px-3 font-mono">4</td>
                      <td className="text-right py-3 px-3 font-mono">12</td>
                      <td className="text-right py-3 px-3 font-mono">32</td>
                      <td className="text-right py-3 px-3 font-mono">0</td>
                      <td className="text-right py-3 px-3 font-mono">4</td>
                      <td className="text-right py-3 px-3 font-mono font-bold">59</td>
                    </tr>
                    <tr className="font-bold bg-muted/30">
                      <td className="py-3 px-3">ИТОГО Февраль</td>
                      <td className="text-right py-3 px-3 font-mono">20</td>
                      <td className="text-right py-3 px-3 font-mono">11</td>
                      <td className="text-right py-3 px-3 font-mono">4</td>
                      <td className="text-right py-3 px-3 font-mono">24</td>
                      <td className="text-right py-3 px-3 font-mono">46</td>
                      <td className="text-right py-3 px-3 font-mono">0</td>
                      <td className="text-right py-3 px-3 font-mono">6</td>
                      <td className="text-right py-3 px-3 font-mono font-bold">111</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
              <p>• Период: Февраль 2026 — Неделя 6 (2-8 фев) + Неделя 7 (9-15 фев)</p>
              <p>• <strong>Данные с дедупликацией по БИН</strong> — учитываются уникальные компании, лучший статус для каждого БИН</p>
              <p>• <strong>Google Ads:</strong> Данные из рекламного кабинета Google Ads (Quiz | Halyk Leasing)</p>
              <p>• <strong>Meta Ads:</strong> Данные из рекламного кабинета Meta (Facebook/Instagram)</p>
              <p>• <strong>WhatsApp:</strong> Кампания ip_reactivation_biometry — реактивация ИП через биометрическое согласие. Новый канал с недели 7</p>
              <p>• <strong>Kolesa:</strong> Включает заявки с автором kolesa и каналом whatsapp+источник kolesa</p>
              <p>• <strong>Менеджеры:</strong> Заявки от karashev.a, ertargyn.e, elkin.p, mamutbayeva.a, kamzina.z, satbergenov.n</p>
              <p>• <strong>Дилеры:</strong> Заявки с каналом dealer (новый канал с недели 7)</p>
              <p>• <strong>Органика:</strong> Self Service без UTM, API, online_bank, tengri</p>
              <p>• <strong>Согласие:</strong> Определяется по столбцу «Методика» — M1, M2 или M3</p>
              <p>• <strong>Одобрение:</strong> Определяется по столбцу «approval_status» = APPROVED</p>
              <p>• <strong>CR (Conversion Rate):</strong> Рассчитывается от предыдущего этапа воронки</p>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}
