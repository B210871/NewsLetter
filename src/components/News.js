import React ,{useEffect,useState}from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>  {
    const  [articles, setArticles] = useState([])
    const  [loading, setLoading] = useState(true)
    const  [page, setPage] = useState(1)
    const  [totalResults, setTotalResults] = useState(0)
    
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b597bc7617894052854e4a8eb6d6caf7&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    console.log(parseData);
    // console.log(data);

    
      setArticles(parseData.articles) ;
      setTotalResults(parseData.totalResults);
      setLoading( false);

    props.setProgress(100);
  }

   useEffect(() => {
        document.title = `NewsLetter-${capitalizeFirstLetter(props.category)}`;
       // eslint-disable-next-line
    updateNews();

  }, [])
  

  // handleprevClick = async ()=>{
  //     console.log("prev");
  //     let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d5e57d32368a41ffa6f7ea2000b38cec&page=${state.page - 1}&pageSize=${props.pageSize}`;
  //     setState({loading:true});
  //     let data =  await fetch(url);
  //     let parseData = await data.json();
  //     console.log(parseData);
  //     // console.log(data);

  //     setState({
  //         articles: parseData.articles,
  //         page: state.page - 1,
  //         loading:false
  //     })

  // }

  // handlenextClick = async ()=>{
  //     console.log("next");
  //     if(!(state.page +1 > Math.ceil(state.totalResults/props.pageSize))){

  //         let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d5e57d32368a41ffa6f7ea2000b38cec&page=${state.page +1}&pageSize=${props.pageSize}`;
  //         setState({loading:true});
  //         let data =  await fetch(url);
  //         let parseData = await data.json();
  //         console.log(parseData);
  //         // console.log(data);

  //         setState({
  //             articles: parseData.articles,
  //             page: state.page +1,
  //             loading:false
  //         })
  //     }

  // }

  const fetchMoreData = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b597bc7617894052854e4a8eb6d6caf7&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1)
    let data = await fetch(url);
    let parseData = await data.json();
    // console.log(parseData);
    // console.log(data);
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
  };

    console.log("render");
    return (
      <>
        <h1 className="text-center " style={{ margin: '35px 0px',marginTop:'90px' }}>
          Newsletter - Top {capitalizeFirstLetter(props.category)}
          Headlines
        </h1>
        {loading && <Spinner />} 

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="conatiner">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.title}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  
}


News.defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };




export default News;

// newsapi
//d5e57d32368a41ffa6f7ea2000b38cec
//d5e57d32368a41ffa6f7ea2000b38cec
