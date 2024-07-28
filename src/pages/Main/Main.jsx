
import { useEffect, useState } from 'react'
import NewsBanner from '../../components/NewsBanner/NewsBanner'
import styles from './styles.module.css'
import { getNews } from '../../API/apiNews'
import NewsList from '../../components/NewsList/NewsList'
import Skeleton from '../../components/Skeleton/Skeleton'
import Pagination from '../../components/Pagination/Pagination'


const Main = () => {

    const [news,setNews] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
    const [currentPage,setCurrentPage] = useState(1);
    const totalPages = 10;
    const pageSize = 10;

    const fetchNews = async(currentPage) => {
        try {
            setIsLoading(true)
            const response = await getNews(currentPage,pageSize);
            setNews(response.news)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchNews(currentPage)
    },[currentPage]);

    const nextPageHandle = () => {
        if(currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    
    const previousPageHandle = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const pageClickHandle = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <main className={styles.main}>
            {news.length > 0 && !isLoading ? <NewsBanner item={news[0]}/> : <Skeleton type={'banner'} count={1} />}
            <Pagination
             currentPage={currentPage}
             nextPageHandle={nextPageHandle}
             previousPageHandle={previousPageHandle}
             pageClickHandle={pageClickHandle}
             totalPages={totalPages}
             />
            {!isLoading ? <NewsList news={news} /> : <Skeleton type={'item'} count={10} /> }

            <Pagination
             currentPage={currentPage}
             nextPageHandle={nextPageHandle}
             previousPageHandle={previousPageHandle}
             pageClickHandle={pageClickHandle}
             totalPages={totalPages}
             />
        </main>
    )
}

export default Main