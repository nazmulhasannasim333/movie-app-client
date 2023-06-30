import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';
import MovieCard from '../../components/MovieCard/MovieCard';
import Spinner from '../../components/Spinner/Spinner';
import { fetchDataFromApi } from '../../utils/api';
import './style.scss';

const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
        .then(res => {
            setData(res)
            setPageNum(prev => prev + 1)
            setLoading(false)
        })
    }
    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };
    

    useEffect(() => {
        setPageNum(1)
        fetchInitialData()
    }, [query])






    return (
        <div className="searchResultsPage">
        {loading && <Spinner initial={true} />}
        {!loading && (
            <ContentWrapper>
                {data?.results?.length > 0 ? (
                    <>
                        <div className="pageTitle">
                            {`Search ${
                                data?.total_results > 1
                                    ? "results"
                                    : "result"
                            } of '${query}'`}
                        </div>
                        <InfiniteScroll
                            className="content"
                            dataLength={data?.results?.length || []}
                            next={fetchNextPageData}
                            hasMore={pageNum <= data?.total_pages}
                            loader={<Spinner />}
                        >
                            {data?.results.map((item, index) => {
                                if (item.name === "person" || item.name === "sex" || item.name === "adult" || item.name === "18" ) return;
                                return (
                                    <MovieCard
                                        key={index}
                                        data={item}
                                        fromSearch={true}
                                    />
                                );
                            })}
                        </InfiniteScroll>
                    </>
                ) : (
                    <span className="resultNotFound">
                        Sorry, `${query}` Results not found!
                    </span>
                )}
            </ContentWrapper>
        )}
    </div>
    );
};

export default SearchResult;