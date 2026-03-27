# Party Menu

Одностраничное меню для вечеринки (Vue 3 + Vite).

## Локальная разработка

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:5173`. С телефона в той же Wi‑Fi — по адресу **Network** из консоли (например `http://192.168.x.x:5173`).

---

## Превью на GitHub Pages (без своего сервера)

Сайт будет доступен по ссылке **https://ТВОЙ_НИК.github.io/bar-catch-of-the-day/** — можно открывать с телефона, ноут не нужен.

### Шаги

1. **Создай репозиторий на GitHub** с именем `bar-catch-of-the-day`.

2. **Подключи проект к репо** (если ещё не подключён):
   ```bash
   git init
   git add .
   git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/ТВОЙ_НИК/bar-catch-of-the-day.git
   git push -u origin main
   ```

3. **Деплой на GitHub Pages:**
   ```bash
   npm run deploy
   ```
   Команда соберёт проект и отправит папку `dist` в ветку `gh-pages`.

4. **Включи Pages в настройках репо:**  
   GitHub → репо **bar-catch-of-the-day** → **Settings** → **Pages** →  
   **Source**: Deploy from a branch → **Branch**: `gh-pages` → **Save**.

Через 1–2 минуты сайт откроется по адресу:  
**https://ТВОЙ_НИК.github.io/bar-catch-of-the-day/**

После изменений в коде снова запусти `npm run deploy` — обновится превью.
