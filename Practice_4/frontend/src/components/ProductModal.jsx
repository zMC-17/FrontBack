import React, { useEffect, useState } from "react";

function ProductModal({ open, mode, initialProduct, onClose, onSubmit }) {
    // Состояния для всех полей товара
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    // Заполняем форму при открытии/изменении initialProduct
    useEffect(() => {
        if (!open) return;

        setName(initialProduct?.name ?? "");
        setCategory(initialProduct?.category ?? "");
        setDescription(initialProduct?.description ?? "");
        setPrice(initialProduct?.price != null ? String(initialProduct.price) : "");
        setStock(initialProduct?.stock != null ? String(initialProduct.stock) : "");
    }, [open, initialProduct]);

    if (!open) return null;

    const title = mode === "edit" ? "Редактирование товара" : "Создание товара";

    const handleSubmit = (e) => {
        e.preventDefault();

        // Валидация
        const trimmedName = name.trim();
        const trimmedCategory = category.trim();
        const trimmedDescription = description.trim();
        const parsedPrice = Number(price);
        const parsedStock = Number(stock);

        if (!trimmedName) {
            alert("Введите название товара");
            return;
        }

        if (!trimmedCategory) {
            alert("Введите категорию товара");
            return;
        }

        if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
            alert("Введите корректную цену (больше 0)");
            return;
        }

        if (!Number.isInteger(parsedStock) || parsedStock < 0) {
            alert("Введите корректное количество на складе (целое число >= 0)");
            return;
        }

        onSubmit({
            id: initialProduct?.id,
            name: trimmedName,
            category: trimmedCategory,
            description: trimmedDescription,
            price: parsedPrice,
            stock: parsedStock,
        });
    };

    return (
        <div className="backdrop" onMouseDown={onClose}>
            <div
                className="modal"
                onMouseDown={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <div className="modal__header">
                    <div className="modal__title">{title}</div>
                    <button
                        className="iconBtn"
                        onClick={onClose}
                        aria-label="Закрыть"
                    >
                        ✕
                    </button>
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    {/* Название товара */}
                    <label className="label">
                        Название товара *
                        <input
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Например, Vans Old Skool"
                            autoFocus
                        />
                    </label>

                    {/* Категория */}
                    <label className="label">
                        Категория *
                        <input
                            className="input"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Например, Кеды"
                        />
                    </label>

                    {/* Описание (textarea для многострочного текста) */}
                    <label className="label">
                        Описание
                        <textarea
                            className="input textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Описание товара..."
                            rows="4"
                        />
                    </label>

                    {/* Цена */}
                    <label className="label">
                        Цена (₽) *
                        <input
                            className="input"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Например, 6999.90"
                            min="0.01"
                            step="0.01"
                        />
                    </label>

                    {/* Количество на складе */}
                    <label className="label">
                        Количество на складе *
                        <input
                            className="input"
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            placeholder="Например, 10"
                            min="0"
                            step="1"
                        />
                    </label>

                    <div className="modal__footer">
                        <button type="button" className="btn" onClick={onClose}>
                            Отмена
                        </button>
                        <button type="submit" className="btn btn--primary">
                            {mode === "edit" ? "Сохранить" : "Создать"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductModal;