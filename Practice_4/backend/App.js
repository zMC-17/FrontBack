const express = require('express');
const { nanoid } = require('nanoid');
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

let products = [
    { id: nanoid(6), name: 'Vans', category: 'Кеды', description: 'Скейтерская тема', price: 6999.90, stock: 10 },
    { id: nanoid(6), name: 'Addidas', category: 'Кроссовки', description: 'Уважемые на районе скороходы', price: 12999.90, stock: 7 },
    { id: nanoid(6), name: 'Martinz', category: 'Туфли', description: 'Фирменная желтая строчка, стиль - это всё', price: 10999.90, stock: 15 },
    {
        id: nanoid(6),
        name: "Nike Air Force 1",
        category: "Кроссовки",
        description: "Культовые кроссовки в стиле хип-хоп культуры. Кожаный верх, массивная подошва, классический дизайн.",
        price: 11999.90,
        stock: 15
    },
    {
        id: nanoid(6),
        name: "Timberland Premium",
        category: "Ботинки",
        description: "Легендарные желтые ботинки из водонепроницаемой кожи. Идеальны для осени и зимы.",
        price: 18999.90,
        stock: 8
    },
    {
        id: nanoid(6),
        name: "Converse Chuck Taylor",
        category: "Кеды",
        description: "Классические высокие кеды из парусины. Универсальная модель на все времена.",
        price: 5499.90,
        stock: 22
    },
    {
        id: nanoid(6),
        name: "Dr. Martens 1460",
        category: "Ботинки",
        description: "Ботинки с воздушной подушкой. Прочная кожа, контрастная желтая строчка, несгибаемый стиль.",
        price: 15999.90,
        stock: 12
    },
    {
        id: nanoid(6),
        name: "New Balance 574",
        category: "Кроссовки",
        description: "Треккинговые кроссовки с поддержкой свода стопы. Подходят для активного отдыха.",
        price: 8999.90,
        stock: 6
    },
    {
        id: nanoid(6),
        name: "Gucci Leather Loafers",
        category: "Туфли",
        description: "Итальянские лоферы из мягкой телячьей кожи. Золотая пряжка, кожаная подкладка.",
        price: 45999.90,
        stock: 3
    },
    {
        id: nanoid(6),
        name: "Reebok Classic Leather",
        category: "Кроссовки",
        description: "Тренировочные кроссовки в ретро-стиле. Мягкая замша и дышащая сетка.",
        price: 7499.90,
        stock: 18
    }
]

// Middleware для парсинга JSON
app.use(express.json());

// Middleware для логирования запросов
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`[${new Date().toISOString()}] [${req.method}]
${res.statusCode} ${req.path}`);
        if (req.method === 'POST' || req.method === 'PUT' || req.method ===
            'PATCH') {
            console.log('Body:', req.body);
        }
    });
    next();
});

// Функция-помощник для получения пользователя из списка
function findProductOr404(id, res) {
    const product = products.find(u => u.id == id);
    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return null;
    }
    return product;
}

// POST /api/products
app.post("/api/products", (req, res) => {
    const { name, category, description, price, stock } = req.body;
    const newProduct = {
        id: nanoid(6),
        name: name.trim(),
        category: category,
        description: description ?? "",
        price: price,
        stock: stock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// GET /api/products
app.get("/api/products", (req, res) => {
    res.json(products);
});

// GET /api/products/:id
app.get("/api/products/:id", (req, res) => {
    const id = req.params.id;
    const product = findProductOr404(id, res);
    if (!product) return;
    res.json(product);
});

// PATCH /api/products/:id
app.patch("/api/products/:id", (req, res) => {
    const id = req.params.id;
    const product = findProductOr404(id, res);
    if (!product) return;
    // Нельзя PATCH без полей
    if (req.body?.name === undefined &&
        req.body?.category === undefined &&
        req.body?.price === undefined &&
        req.body?.stock === undefined) {
        return res.status(400).json({
            error: "Nothing to update",
        });
    }
    const { name, category, description, price, stock } = req.body;
    if (name !== undefined) product.name = name.trim();
    if (category !== undefined) product.category = category.trim();
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = Number(price);
    if (stock !== undefined) product.stock = Number(stock)
    res.json(product);
});

// DELETE /api/products/:id
app.delete("/api/products/:id", (req, res) => {
    const id = req.params.id;
    const exists = products.some((u) => u.id === id);
    if (!exists) return res.status(404).json({ error: "Product not found" });
    products = products.filter((u) => u.id !== id);
    // Правильнее 204 без тела
    res.status(204).send();
});
// 404 для всех остальных маршрутов
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});
// Глобальный обработчик ошибок (чтобы сервер не падал)
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});