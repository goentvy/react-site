# Project News App

해당 프로젝트는 네이버에서 제공하는 API를 이용하여 만들었습니다.

[뉴스검색 API](https://developers.naver.com/docs/serviceapi/search/news/news.md#%EB%89%B4%EC%8A%A4)


JSON 요청 URL - `https://openapi.naver.com/v1/search/news.json`

#### 파라미터

**필수** - query (type String)

선택 - display (type Integer)

선택 - start (type Integer)

선택 - sort (type String)

오류코드나 그외 응답 관련 예시는 해당 API 홈페이지에서 자세히 보시면 좋을것 같습니다.

## 개발환경

React + TypeScript + Vite를 기본 베이스로 그외 ShadCN UI, axios 등 추가해보았습니다.

## 구현 코드
```ts
Search.tsx

import { useEffect, useState } from "react";
import axios from 'axios';
import { DateFilter } from "@/hook";
import { Input } from "@/components/ui";

function Search() {
    interface NewData {
        title: string;
        description: string;
        pubDate: string;
        link?: string;
        originallink?: string;
    }
    const [ error, setError ] = useState<string | null>(null);
    const [ data, setData] = useState<Array<NewData>>([]);
    const [ search, setSearch ] = useState<string>('이주환');
    const [ inputValue, setInputValue ] = useState<string>(search);
    const [ loading, setLoading ] = useState<boolean>(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSearch = () => {
        setSearch(inputValue);
    }

    useEffect(() => {
        if(!search.trim()) return; // 빈문자열 API 호출제한

        const NewsCall = async () => {
            setLoading(true);
            try {
                const clientId = import.meta.env.VITE_CLIENT_ID;
                const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
                const query = encodeURIComponent(search);
                const url = `/v1/search/news.json?query=${query}`;
                
                const response = await axios.get(url, {
                    headers: {
                        'X-Naver-Client-Id': clientId,
                        'X-Naver-Client-Secret': clientSecret
                    }
                });

                if( response.status === 200) {
                    setData(response.data.items);
                } else {
                    console.log('response error');
                }
            } catch (er) {
                if(er instanceof Error) {
                    setError(er.message);
                    console.error('API 호출 중 오류 발생: ', er.message);
                } else {
                    setError('알 수 없는 오류가 발생했습니다.');
                    console.error('API 호출 중 오류 발생:', error);
                }
            } finally {
                setLoading(false);
            }
        };
        NewsCall();
    }, [search]);

    // 에러와 로딩상태를 UI에 표시할 수 있습니다.
    if (error) return <div>오류가 발생했습니다: {error}</div>;
    if (loading) return <div>로딩 중입니다...</div>;

    return (
        <div>
            <div className="flex items-center">
                <Input 
                    type="text" 
                    placeholder="뉴스 키워드를 검색하세요." 
                    onChange={handleInputChange} 
                    onKeyDown={event => { if(event.key === 'Enter') handleSearch(); }} />
            </div>
            <div className="search p-2.5">
                {
                    data.length > 0 ? data.map((item) => 
                        (
                            <ul key={item.originallink || item.link} className="mb-2">
                                <li dangerouslySetInnerHTML={{ __html: item.title }} />
                                <li dangerouslySetInnerHTML={{ __html: item.description }} />
                                <li>{DateFilter(item.pubDate)}</li>
                            </ul>
                        )) : <div>데이터 없음</div>
                }
            </div>
        </div>
    );
}

export default Search;
```

해당코드의 API호출하는 구현부를 조금 손보고 분리해보겠습니다.

```ts
src/hook/index.ts

import { useEffect, useState } from "react";
import axios from 'axios';

export function useNewsSearch(query: string) {
    interface NewData {
        title: string;
        description: string;
        pubDate: string;
        link?: string;
        originallink?: string;
    }
    // 1. 커스텀 훅 내부에 세 가지 상태(data, loading, error)를 캡슐화
    const [ data, setData] = useState<Array<NewData>>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        // 검색어가 비어있을경우 작업 X
        if(!query.trim()) {
            setData([]); // 빈 검색어일 경우 기존 데이터 비워줌.
            return;
        }

        const controller = new AbortController(); // AbortController 인스턴스 생성
        const { signal } = controller; // signal 객체 추출

        const fetchNews = async () => {
            setLoading(true);
            setError(null); // 새로운 검색 시작 시 에러 상태 초기화

            try {
                const clientId = import.meta.env.VITE_CLIENT_ID;
                const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
                const encodedquery = encodeURIComponent(query);
                const url = `/v1/search/news.json?query=${encodedquery}`;
                
                const response = await axios.get(url, {
                    headers: {
                        'X-Naver-Client-Id': clientId,
                        'X-Naver-Client-Secret': clientSecret
                    },
                    signal, // 요청에 signal 추가하여 취소가 가능하도록
                });

                if( response.status === 200) {
                    setData(response.data.items);
                } else {
                    console.log('response error');
                }
            } catch (err) {
                if(axios.isCancel(err)) {
                    console.log('Request canceled: ', err.message);
                } else if(err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchNews();

        // 3. Cleanup 함수: useEffect가 다시 실행되기 전에 이전 요청을 취소
        return () => {
            controller.abort();
        };
    }, [query]);

    // 4. 컴포넌트에서 사용할 상태와 값들을 객체로 묶어 반환
    return { data, loading, error };
}

src/pages/Search.tsx

import { useState } from "react";
import { DateFilter, useNewsSearch } from "@/hook";
import { Input } from "@/components/ui";

function Search() {
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
                            <ul key={item.originallink || item.link} className="mb-2">
                                <li dangerouslySetInnerHTML={{ __html: item.title }} />
                                <li dangerouslySetInnerHTML={{ __html: item.description }} />
                                <li>{DateFilter(item.pubDate)}</li>
                            </ul>
                        )) 
                    ) : (
                        <div>검색 결과가 없습니다.</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;