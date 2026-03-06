import React from "react";

export default function ProductItem({ product, onEdit, onDelete }) {
    return (
        <div className="productCard">
            <div className="productMain">
                <div className="productName">{product.name}</div>
                <div className="productCategory">{product.category}</div>
                <div className="productPrice">{product.price} ₽</div>
                <div className="productStock">
                    {product.stock > 0 ? `В наличии: ${product.stock} шт.` : 'Нет в наличии'}
                </div>
            </div>
            <div className="productDescription">
                {product.description}
            </div>
            <div className="productActions">
                <button className="btn" onClick={() => onEdit(product)}>
                    Редактировать
                </button>
                <button className="btn btn--danger" onClick={() => onDelete(product.id)}>
                    Удалить
                </button>
            </div>
        </div>
    );
}