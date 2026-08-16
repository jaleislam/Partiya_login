# Partiya

Dostlarınla yazışma üsulu ilə oynadığın şahmat partiyalarının jurnalı.
React + Context/`useReducer` ilə qlobal state, SCSS ilə stil.

## Quraşdırma və işə salma

```bash
npm install
npm run dev
```

Terminalda çıxan linki (adətən `http://localhost:5173`) brauzerdə aç.

```bash
npm run build     # production üçün /dist qovluğuna yığır
npm run preview   # build olunmuş versiyanı lokal yoxlamaq üçün
```

**Nümunə hesab:** `demo@partiya.app` / `partiya1`

## Qovluq quruluşu

```
partiya-app/
├── index.html              → Vite-in giriş HTML-i
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx             → React-i #root-a mount edir
    ├── PartiyaApp.jsx       → kök komponent: Provider qurur, Auth/Dashboard arasında keçid edir
    ├── partiya.scss         → bütün stil (dəyişənlər + nesting)
    ├── store/
    │   └── PartiyaStore.jsx → reducer, Context, useStore hook — bütün qlobal state burada
    └── components/
        ├── Board.jsx        → HeroBoard (giriş ekranındakı böyük lövhə) + MiniBoard (siyahıdakı kiçik ikon)
        ├── Field.jsx        → ikonlu input, təkrar istifadə üçün
        ├── AuthScreen.jsx   → Daxil ol / Qeydiyyat
        ├── GameRow.jsx      → tək partiya sətri (scoresheet, hərəkət əlavə etmə)
        └── Dashboard.jsx    → statistika + yeni partiya forması + GameRow siyahısı
```

## State necə işləyir

Hər şey (istifadəçilər, hazırkı giriş, partiyalar) `src/store/PartiyaStore.jsx`
daxilindəki tək `useReducer`-də saxlanılır və `Context` vasitəsilə bütün
komponentlərə ötürülür. UI komponentləri `useStore()` hook-u ilə `state`-ə
baxır və `dispatch()` ilə dəyişiklik göndərir:

```js
const { state, dispatch } = useStore();
dispatch({ type: "CREATE_GAME", opponent: "Elvin", myColor: "w" });
```

**Diqqət:** state yalnız brauzer yaddaşındadır (React state) — səhifə
yenilənəndə sıfırlanır. Heç bir `localStorage`/backend istifadə olunmayıb,
çünki bu, demo/nümunə məqsədlidir.

### Auth axını

1. **Qeydiyyat** — Ad, Soyad, E-poçt, Şifrə, Şifrənin təkrarı. Uğurlu olsa,
   istifadəçi **avtomatik daxil olmur** — "Daxil ol" tabına yönləndirilir,
   yaşıl bildiriş göstərilir.
2. **Daxil ol** — e-poçt + şifrə. Səhv olsa, qırmızı xəta mesajı çıxır.

## SCSS quruluşu

`partiya.scss` başında bütün rənglər və fontlar `$dəyişən` kimi təyin
olunub — dizaynı dəyişmək üçün yalnız faylın yuxarısını redaktə et:

```scss
$bg: #1c1a17;
$accent: #a24444;
// ...
```

Seçicilər `&` ilə iç-içə yazılıb (məs. `.tab { &.active { ... } }`), sinif
adları isə JSX-dəki ilə eynidir — komponentlərə toxunmadan stil dəyişə bilərsən.

**Layout:** `display: flex` əsas metoddur (CSS Grid yalnız şahmat lövhəsinin
8×8 xanə quruluşu üçün saxlanılıb, çünki grid buna daha təbii uyğun gəlir).
Ölçülər mümkün olan yerdə **faizlə** verilib (`width: 100%`, `flex: 1 1 auto`,
`piece-badge` 70% və s.) ki, komponentlər konteynerin ölçüsünə görə özü
uyğunlaşsın, sabit piksel az yerdə qalsın.

## Şahmat fiqurları (imza elementi)

Fiqurlar unicode simvol yox, öz çəkdiyimiz kiçik SVG ikonlardır
(`Board.jsx` içində `PIECE_ICON`). Ağ fiqur açıq fon + tünd ikon, qara fiqur
tünd fon + açıq ikon — beləliklə fon rənginin nə olduğundan asılı olmayaraq
həmişə aydın oxunur.

## Asılılıqlar

- `react`, `react-dom`
- `lucide-react` — interfeys ikonları (Crown, Mail, Lock və s.)
- `sass` (dev) — `.scss` faylını compile etmək üçün, Vite avtomatik istifadə edir
