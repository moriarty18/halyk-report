import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CalendarDays, Rocket, Zap, Target, 
  MessageSquare, Smartphone, Globe, ArrowRight,
  CheckCircle2, Clock, AlertCircle, Mail, Video,
  Building2, Megaphone, Users, Monitor, Send,
  FileText, Palette, BarChart3, Handshake
} from "lucide-react";
import { Link } from "wouter";

interface TaskStep {
  text: string;
  status: 'done' | 'in-progress' | 'pending' | 'blocked';
  deadline?: string;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  badge: string;
  badgeVariant: 'default' | 'secondary' | 'destructive' | 'outline';
  steps: TaskStep[];
}

const StatusIcon = ({ status }: { status: TaskStep['status'] }) => {
  switch (status) {
    case 'done':
      return <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />;
    case 'in-progress':
      return <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0 animate-pulse" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />;
    case 'blocked':
      return <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />;
  }
};

const activities: Activity[] = [
  {
    id: 1,
    title: "Реактивация сегмента «Не подписали согласие»",
    description: "Email и WABA рассылка для клиентов, остановившихся на этапе биометрической верификации",
    icon: <Mail className="h-6 w-6" />,
    color: "bg-blue-100 text-blue-700",
    borderColor: "border-l-blue-500",
    badge: "CRM / Retention",
    badgeVariant: "secondary",
    steps: [
      { text: "Выгрузка заявок с платформы и фильтрация сегмента «остановились на подписании согласия»", status: "pending", deadline: "20 января" },
      { text: "Ожидание внедрения биометрической верификации в процесс подписания", status: "blocked", deadline: "Январь-Февраль" },
      { text: "Разработка шаблонов Email и WABA сообщений после ввода биометрии", status: "pending", deadline: "1 неделя после внедрения" },
      { text: "Адаптация существующего скрипта WABA под новый сегмент и текст", status: "pending", deadline: "3 дня после шаблонов" },
      { text: "Тестовая рассылка на малую выборку (100-200 контактов)", status: "pending", deadline: "Февраль" },
      { text: "Анализ результатов: Open Rate, CTR, конверсия в подписание", status: "pending", deadline: "1 неделя после теста" },
      { text: "Масштабирование рассылки на весь сегмент", status: "pending", deadline: "Март" },
    ]
  },
  {
    id: 2,
    title: "TikTok Ads: UGC-кампании",
    description: "Платные рекламные кампании через нативные UGC объявления с AI-аватарами",
    icon: <Video className="h-6 w-6" />,
    color: "bg-purple-100 text-purple-700",
    borderColor: "border-l-purple-500",
    badge: "Тест: $200",
    badgeVariant: "secondary",
    steps: [
      { text: "Согласование тестового креатива с AI-аватаром", status: "in-progress", deadline: "20 января" },
      { text: "Настройка рекламного кабинета TikTok Ads и пикселя", status: "pending", deadline: "25 января" },
      { text: "Запуск тестовой кампании на лид-формы (бюджет $100)", status: "pending", deadline: "1 февраля" },
      { text: "Мониторинг метрик: CPL, CTR, качество лидов (валидность номеров)", status: "pending", deadline: "1-15 февраля" },
      { text: "A/B тестирование 2-3 вариантов креативов", status: "pending", deadline: "15-28 февраля" },
      { text: "Анализ результатов и принятие решения о масштабировании", status: "pending", deadline: "1 марта" },
      { text: "При успехе: увеличение бюджета и производство новых креативов", status: "pending", deadline: "Март" },
    ]
  },
  {
    id: 3,
    title: "Интеграция с Halyk Bank Onlinebank (МСБ)",
    description: "Продвижение услуг лизинга в приложении Onlinebank: баннеры, пуши, отдельный раздел",
    icon: <Smartphone className="h-6 w-6" />,
    color: "bg-green-100 text-green-700",
    borderColor: "border-l-green-500",
    badge: "Партнерство",
    badgeVariant: "secondary",
    steps: [
      { text: "Установление контакта с ответственными менеджерами Onlinebank", status: "pending", deadline: "25 января" },
      { text: "Получение технических требований к баннерам и форматам размещения", status: "pending", deadline: "31 января" },
      { text: "Разработка плана пуш-уведомлений: частота, сегменты, тексты", status: "pending", deadline: "7 февраля" },
      { text: "Дизайн баннеров для размещения в приложении (3-5 вариантов)", status: "pending", deadline: "14 февраля" },
      { text: "Согласование и утверждение материалов с банком", status: "pending", deadline: "21 февраля" },
      { text: "Техническая интеграция и запуск первой волны пушей", status: "pending", deadline: "1 марта" },
      { text: "Проработка отдельного раздела «Лизинг» в приложении", status: "pending", deadline: "Март" },
      { text: "Настройка аналитики и отслеживания конверсий из приложения", status: "pending", deadline: "Март" },
    ]
  },
  {
    id: 4,
    title: "Наружная реклама и DOOH через Halyk Bank",
    description: "Использование digital экранов банка: в отделениях и наружные места размещения",
    icon: <Monitor className="h-6 w-6" />,
    color: "bg-orange-100 text-orange-700",
    borderColor: "border-l-orange-500",
    badge: "Брендинг",
    badgeVariant: "secondary",
    steps: [
      { text: "Запрос списка доступных мест размещения у Halyk Bank (экраны в отделениях, наружные)", status: "pending", deadline: "25 января" },
      { text: "Анализ локаций: охват, целевая аудитория, форматы экранов", status: "pending", deadline: "31 января" },
      { text: "Определение концепции креатива и ключевого сообщения", status: "pending", deadline: "7 февраля" },
      { text: "Постановка измеримых целей кампании (охват, узнаваемость, QR-переходы)", status: "pending", deadline: "7 февраля" },
      { text: "Разработка ТЗ на производство видео/статичных креативов", status: "pending", deadline: "14 февраля" },
      { text: "Производство креативов под разные форматы экранов", status: "pending", deadline: "28 февраля" },
      { text: "Согласование материалов с банком и запуск размещения", status: "pending", deadline: "7 марта" },
      { text: "Мониторинг и оценка эффективности (QR-коды, промокоды)", status: "pending", deadline: "Март" },
    ]
  },
  {
    id: 5,
    title: "Коллаборации с партнерами и дилерами",
    description: "Совместные программы лизинга с ключевыми партнерами: Geely, Globus Machinery, Yandex, Allure, Borusan Cat, CBC, Eurasia Group, JAC Trucks, NKB Group, Zoomlion",
    icon: <Handshake className="h-6 w-6" />,
    color: "bg-teal-100 text-teal-700",
    borderColor: "border-l-teal-500",
    badge: "B2B",
    badgeVariant: "secondary",
    steps: [
      { text: "Ожидание утвержденного списка программ от продуктолога Жандильды", status: "blocked", deadline: "Январь-Февраль" },
      { text: "Анализ утвержденных программ и определение приоритетных партнеров", status: "pending", deadline: "1 неделя после утверждения" },
      { text: "Разработка маркетинговой стратегии для каждого партнера", status: "pending", deadline: "Февраль" },
      { text: "Создание co-branded креативов и материалов (баннеры, лендинги)", status: "pending", deadline: "Февраль-Март" },
      { text: "Согласование материалов с партнерами", status: "pending", deadline: "По мере готовности" },
      { text: "Запуск совместных рекламных кампаний (таргет, контекст)", status: "pending", deadline: "Март" },
      { text: "Размещение информации о программах на сайтах партнеров", status: "pending", deadline: "Март" },
      { text: "Организация совместных мероприятий/вебинаров (при необходимости)", status: "pending", deadline: "Q2 2026" },
    ]
  }
];

export default function Roadmap() {
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
            <Link href="/analytics" className="hover:text-foreground transition-colors">CRM Analytics</Link>
            <span className="text-foreground">Планы (Roadmap)</span>
          </nav>
          <div className="text-sm text-muted-foreground">
            Q1 2026
          </div>
        </div>
      </header>

      <main className="container py-10 space-y-12">
        
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-primary border-primary">Q1 2026</Badge>
            <Badge variant="secondary">5 ключевых активностей</Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Дорожная карта продвижения</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Стратегический план маркетинговых активностей на первый квартал 2026 года: 
            от реактивации клиентской базы до масштабных партнерских коллабораций.
          </p>
        </div>

        {/* Timeline Overview */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Обзор квартала
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">Январь</div>
              <div className="font-medium text-sm">Подготовка и планирование</div>
              <div className="text-xs text-muted-foreground mt-2">Выгрузки данных, согласования, установление контактов</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">Февраль</div>
              <div className="font-medium text-sm">Разработка и тестирование</div>
              <div className="text-xs text-muted-foreground mt-2">Креативы, A/B тесты, техническая интеграция</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm text-muted-foreground mb-1">Март</div>
              <div className="font-medium text-sm">Запуск и масштабирование</div>
              <div className="text-xs text-muted-foreground mt-2">Полноценные кампании, аналитика, оптимизация</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>Выполнено</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>В процессе</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <span>Запланировано</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <span>Ожидает внешних факторов</span>
          </div>
        </div>

        <Separator />

        {/* Activities */}
        <div className="space-y-8">
          {activities.map((activity) => (
            <Card key={activity.id} className={`border-l-4 ${activity.borderColor}`}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${activity.color}`}>
                      {activity.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{activity.id}. {activity.title}</CardTitle>
                      <CardDescription className="mt-1">{activity.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={activity.badgeVariant} className="self-start whitespace-nowrap">
                    {activity.badge}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activity.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-2 min-w-[24px]">
                        <span className="text-xs text-muted-foreground font-medium">{index + 1}.</span>
                      </div>
                      <StatusIcon status={step.status} />
                      <div className="flex-1">
                        <span className="text-sm">{step.text}</span>
                      </div>
                      {step.deadline && (
                        <Badge variant="outline" className="text-xs whitespace-nowrap">
                          {step.deadline}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator />

        {/* Partners Section */}
        <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-teal-600" />
            Ключевые партнеры для коллабораций
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Geely', 'Globus Machinery', 'Yandex', 'Allure', 'Borusan Cat', 'CBC', 'Eurasia Group', 'JAC Trucks', 'NKB Group', 'Zoomlion'].map((partner) => (
              <Badge key={partner} variant="secondary" className="bg-white">
                {partner}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Совместные программы лизинга будут разработаны после утверждения продуктологом Жандильдой
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Ключевых активностей</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600">10</div>
              <div className="text-sm text-muted-foreground">Партнеров</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600">3</div>
              <div className="text-sm text-muted-foreground">Месяца</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600">$200</div>
              <div className="text-sm text-muted-foreground">Тест TikTok</div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-slate-50 rounded-xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold">Готовы обсудить детали?</h3>
          <p className="text-muted-foreground">
            Дорожная карта будет обновляться по мере выполнения задач и получения новой информации.
          </p>
          <Link href="/">
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer">
              Вернуться к отчету
            </div>
          </Link>
        </div>

      </main>
    </div>
  );
}
