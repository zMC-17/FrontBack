const express = require('express')
const app = express()
const port = 3000


let products = [
    { id: 1, name: "Ноутбук", price: 51999 },
    { id: 2, name: "Планшет", price: 22999 },
    { id: 3, name: "Фен", price: 6999 }
]

app.use(express.json())

app.get('/', (req, res) =>{
    res.send("Сервер работает исправно")
})

app.get('/products', (req, res) => {
    res.json(products)
})

app.get('/products/:id', (req, res) => {
    let product_info = products.find((p) => p.id == req.params.id)
    if (!product_info) {
        res.status(404).json({message: 'Продукт не найден'})
    }
    res.json(product_info)

})

app.post('/products/', (req, res) => {
    let product_name = req.body.name
    let product_price = req.body.price
    let product_id = req.body.id
    products.push({id: product_id, name: product_name, price: product_price})

    res.status(201).json({
    message: 'Пользователь создан',
    user: req.body // Эхо: верни те же данные обратно
});
})

app.delete('/products/:id', (req, res) => {
    let request_id = req.params.id
    let index = products.findIndex(product => product.id == request_id)

    if (index === -1) {
        res.status(404).json({message: 'Элемент отсутствует'})
    } else {
        products.splice(index, 1)
        res.status(200).json({message: 'Успешно удалено'})
    }


})

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`)
})