# Project Movie App

해당 프로젝트는 Kobis(영화진흥위원회), TMDB(The Movie Database)에서 제공하는 API를 이용하여 만들었습니다.

[영화진흥위원회](https://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do)

[The Movie Database](https://developer.themoviedb.org/reference/intro/getting-started)

API 관련 페이지 링크했으니 홈페이지에서 자세히 보시면 좋을것 같습니다.

## 개발환경

React + TypeScript + Vite를 기본 베이스로 그외 shadCN UI, axios 등 추가했습니다.

## 구현코드
```ts
import { Card } from '@/components/ui'; // ShadCN UI Card
import { formatDate } from '@/hooks';
import { useEffect, useState } from 'react';

// KOFIC 영화 타입
interface KobisMovie {
    movieCd: string;
    movieNm: string;
    openDt: string;
}

// TMDB 데이터 타입
interface TmdbInfo {
    movieCd: string;
    poster: string | null;
    overview: string;
}

function MovieApp() {
    const [movies, setMovies] = useState<KobisMovie[]>([]);
    const [tmdbData, setTmdbData] = useState<Record<string, TmdbInfo>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const kobisKey = import.meta.env.VITE_KOBIS_API_KEY;
    const tmdbKey = import.meta.env.VITE_TMDB_API_KEY;
    const today = new Date();
    const targetDate = formatDate(today);

    const kobisUrl = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${kobisKey}&targetDt=${targetDate}`;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(kobisUrl);
                const data = await res.json();
                const list: KobisMovie[] = data.boxOfficeResult.dailyBoxOfficeList;
                setMovies(list);

                const tmdbResults = await Promise.all(
                    list.map(async (movie) => {
                        const tmdbRes = await fetch(
                            `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=ko-KR&query=${encodeURIComponent(movie.movieNm)}`
                        );
                        const tmdb = await tmdbRes.json();
                        const result = tmdb.results?.[0];
                        return {
                            movieCd: movie.movieCd,
                            poster: result?.poster_path || null,
                            overview: result?.overview || "",
                        };
                    })
                );

                const mapped: Record<string, TmdbInfo> = {};
                tmdbResults.forEach((item) => {
                    mapped[item.movieCd] = item;
                });
                setTmdbData(mapped);
            } catch (err) {
                setError("영화 데이터를 불러오는데 실패했습니다.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p className="text-center py-10 text-muted-foreground">로딩 중...</p>;
    }

    if (error) {
        return <p className="text-center py-10 text-red-500">{error}</p>;
    }


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {movies.length === 0 ? (
                <p>영화 데이터가 없습니다.</p>
            ) : (
                movies.map((movie) => {
                    const tmdb = tmdbData[movie.movieCd];
                    return (
                        <Card key={movie.movieCd} className="p-4">
                            <h2 className="text-lg font-bold">{movie.movieNm}</h2>
                            <p className="text-sm text-muted-foreground">
                                개봉일: {movie.openDt}
                            </p>
                            {tmdb?.poster && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${tmdb.poster}`}
                                    alt={movie.movieNm}
                                    className="mt-2 rounded shadow"
                                />
                            )}
                            {tmdb?.overview && (
                                <p className="mt-2 text-sm">{tmdb.overview}</p>
                            )}
                        </Card>
                    );
                })
            )}
        </div>
    );
}

export default MovieApp;
```

부가적인 설명을 하자면

hooks 에서 불러온 formatDate 함수는 Kobis URL 파라미터 값으로 보내는 날짜가

전날을 기준으로 데이터가 들어오기때문에 전날로 설정하기 위함도 있으며

"20250828" 이런식으로 내용을 넣어줘야 하기에 getFullYear(), getMonth(), getDate() 함수를 사용했습니다.

```ts
/* "20250828" 형식의 날짜 필터링 - Movie App API Url 사용 */
export function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate() - 1).padStart(2, '0');
    return year + month + day;
}
```

외부 라이브러리인  moment.js, Day.js를 이용하면 간단하게 사용할순 있지만 

라이브러리를 얹기엔 그리 큰 프로젝트가 아니었기에 제외했습니다.

로딩에 대한 개선안으로 조금 더 UI/UX에 힘을 준다면 skeleton 이나 spiner , progress 등을 적용하면 좋을것 같네요.

대부분 ShadCN UI 에서 제공하니 얹어보는것도 좋습니다.