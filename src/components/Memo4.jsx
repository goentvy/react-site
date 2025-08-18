import { useState, useMemo } from 'react';

function Child({ config }) {
    console.log('child 렌더링');
    return <div>Theme: {config.theme}</div>;
}

const Memo4 = () => {
    const [ theme, setTheme ] = useState('light');
    const [ count, setCount ] = useState(0);

    const config = useMemo(
        () => ({ theme }), [theme]
    )
    return (
        <div>
            <Child config={config} />
            <button
                onClick={() => setTheme(
                    (theme) => (theme === 'light' ? 'dark' : 'light')
                )}>
                테마 변경
            </button>
            <button onClick={() => setCount(count + 1)}>
                Count: {count}
            </button>
        </div>
    );
};

export default Memo4;