import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CalendarDays, Rocket, Zap, Target, 
  MessageSquare, Smartphone, Globe, ArrowRight,
  CheckCircle2, Clock, AlertCircle
} from "lucide-react";
import { Link } from "wouter";

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/halyk-report/#/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">H</div>
                <span className="font-bold text-lg tracking-tight">Halyk Leasing</span>
              </div>
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="/halyk-report/#/" className="hover:text-foreground transition-colors">Отчет</a>
            <a href="/halyk-report/#/analytics" className="hover:text-foreground transition-colors">CRM Analytics</a>
            <span className="text-foreground">Планы (Roadmap)</span>
          </nav>
          <div className="text-sm text-muted-foreground">
            Январь 2026
          </div>
        </div>
      </header>

      <main className="container py-10 space-y-12">
        
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Стратегический план развития</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Дорожная карта по масштабированию лидогенерации, автоматизации процессов и развитию экосистемы на Январь и 1 квартал 2026 года.
          </p>
        </div>

        {/* Short-term: January */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Январь 2026: Краткосрочные задачи</h2>
              <p className="text-muted-foreground">Фокус на автоматизации отчетности и масштабировании успешных гипотез</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Task 1 */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Автоматизация отчетности (Real-time)</CardTitle>
                  <Badge variant="secondary">Deadline: 5 Января</Badge>
                </div>
                <CardDescription>Интеграция внутренних данных без внешних API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Разработка микросервиса для сбора данных из EFM и CRM</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Настройка ежедневного обновления воронки (Лид → Подписание → Одобрение)</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                  <span>Требуется: Доступы к базе данных / выгрузкам</span>
                </div>
              </CardContent>
            </Card>

            {/* Task 2 */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Масштабирование Квиза</CardTitle>
                  <Badge variant="secondary">Маркетинг</Badge>
                </div>
                <CardDescription>Внедрение успешной механики во все каналы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Запуск квиз-лендингов для Google Ads (Поиск + КМС)</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Адаптация квиза под таргетинг в TikTok и Instagram Reels</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Сегментация вопросов для отсева нецелевых лидов</span>
                </div>
              </CardContent>
            </Card>

            {/* Task 3 */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Тест новых каналов: TikTok</CardTitle>
                  <Badge variant="secondary">Эксперимент</Badge>
                </div>
                <CardDescription>Бюджет на тест: ~$200</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Создание 3-5 UGC-креативов (вертикальное видео)</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Запуск кампании на лид-формы и квиз</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Clock className="h-4 w-4 text-slate-500 mt-0.5" />
                  <span>Оценка качества лидов (валидность номеров)</span>
                </div>
              </CardContent>
            </Card>

            {/* Task 4 */}
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Retention: WhatsApp Business</CardTitle>
                  <Badge variant="secondary">CRM</Badge>
                </div>
                <CardDescription>Реактивация базы отказников</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Сегментация базы (отказники, думающие, недозвон)</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Запуск регулярной рассылки (1 раз в месяц) с спецпредложениями</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>



        <div className="bg-slate-50 rounded-xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold">Готовы обсудить детали?</h3>
          <p className="text-muted-foreground">
            Следующая статус-встреча запланирована на 5 января, 10:00.
          </p>
          <a href="/halyk-report/#/">
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer">
              Вернуться к отчету
            </div>
          </a>
        </div>

      </main>
    </div>
  );
}
