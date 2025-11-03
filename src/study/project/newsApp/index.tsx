import { useState } from "react";
import { DateFilter, useNewsSearch } from "@/hooks";
import { Input } from "@/components/ui";

function NewApp() {
    const [ searchQuery, setSearchQuery ] = useState<string>('이주환');
    const [ inputValue, setInputValue ] = useState<string>(searchQuery);

    const { data, loading, error } = useNewsSearch(searchQuery)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleSearch = () => {
        setSearchQuery(inputValue);
    }

    if (error) return <div>오류가 발생했습니다: {error}</div>;

    return (
        <div>
            <div className="flex items-center">
                <Input 
                    type="text" 
                    placeholder="뉴스 키워드를 검색하세요." 
                    value={inputValue} 
                    onChange={handleInputChange} 
                    onKeyDown={event => { if(event.key === 'Enter') handleSearch(); }} />
            </div>

            {loading ? (
                <div className="p-2.5">로딩 중입니다...</div>
            ) : (
                <div className="search p-2.5">
                {data.length > 0 ? (
                    data.map((item) => (
                    <div
                        key={item.originallink || item.link}
                        className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition mb-4"
                    >
                        <h2
                        className="text-lg font-semibold text-blue-300 hover:underline"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        <p
                        className="mt-2 text-gray-200 text-sm"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                        <p className="mt-3 text-xs text-gray-400">
                        🕒 {DateFilter(item.pubDate)}
                        </p>
                    </div>
                    ))
                ) : (
                    <div>검색 결과가 없습니다.</div>
                )}
                </div>
            )}
        </div>
    );
}

export default NewApp;