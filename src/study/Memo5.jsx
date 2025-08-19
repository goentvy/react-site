import { useState, useMemo } from 'react';

const Memo5 = () => {
    const [ price, setPrice ] = useState('');
    const [ quantity, setQuantity ] = useState('');
    const [ discount, setDiscount ] = useState('');

    const total = useMemo(
        () => {return price * quantity * (1 - discount) }
            ,[ price, quantity, discount ])

    return (
        <div>
            <label>가격</label>
            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))}/>
            <label >수량 : </label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}/>
            <label >할인율 : </label>
            <input type="number" step="0.1" value={discount} onChange={(e) => setDiscount(Number(e.target.value))}/>

            <h2>총액 : {total}원 입니다.</h2>
        </div>
    );
};

export default Memo5;