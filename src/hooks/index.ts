import { useEffect, useState } from "react";
import axios, { AxiosError } from 'axios';

/* News App Search Hook */
export function useNewsSearch(query: string) {
    interface NewData {
        title: string;
        description: string;
        pubDate: string;
        link?: string;
        originallink?: string;
    }
    // 커스텀 훅 내부에 세 가지 상태(data, loading, error)를 캡슐화
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
                const encodedquery = encodeURIComponent(query);
                const baseUrl = import.meta.env.DEV
                    ? 'https://react-site-eta-flax.vercel.app/api/news'
                    : 'https://react-site-eta-flax.vercel.app/api/news';

                const response = await axios.get(`${baseUrl}?q=${encodedquery}`, { 
                    headers: {
                        Accept: 'application/json',
                    }, signal });
                    
                if(response.data?.items && Array.isArray(response.data.items)) {
                    setData(response.data.items);
                } else {
                    setError('뉴스 데이터를 불러올 수 없습니다.');
                }
            } catch (err) {
                if(axios.isCancel(err)) {
                    console.log('Request canceled: ', err.message);
                } else if (axios.isAxiosError(err)) {
                    const errorMsg = err.response?.data?.errorMessage || err.message;
                    setError(errorMsg);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchNews();

        // Cleanup 함수: useEffect가 다시 실행되기 전에 이전 요청을 취소
        return () => {
            controller.abort();
        };
    }, [query]);

    // 컴포넌트에서 사용할 상태와 값들을 객체로 묶어 반환
    return { data, loading, error };
}

/* 날짜 포맷 필터링 - News App */
export function DateFilter(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }) + ' ' + d.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
}

/* "20250828" 형식의 날짜 필터링 - Movie App API Url 사용 */
export function formatDate(date: Date) {
  const d = new Date(date);
  d.setDate(d.getDate() - 1); // 하루 빼기

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return year + month + day;
}