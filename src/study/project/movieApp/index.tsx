import { Card } from '@/components/ui';
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