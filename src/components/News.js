import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, List, ListItem, Button } from "@mui/material";

import { selectNewsError, selectNewsList, selectNewsLoading } from "../store/news/selectors";
import { getNews } from "../store/news/actions";

export const News = () => {
    const dispatch = useDispatch();
    const news = useSelector(selectNewsList);
    const isLoading = useSelector(selectNewsLoading);
    const error = useSelector(selectNewsError);

    const requestNews = async () => {
        dispatch(getNews());
    };

    useEffect(() => {
        requestNews();
    }, []);

    return (
        <div className="news">
            <h3>News</h3>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <div className="newsContainer">
                    {!!error && <h4>ERROR: {error}</h4>}
                    <List>
                        {news.map((news) => (
                            <ListItem key={news.id}>{news.title}</ListItem>
                        ))}
                    </List>
                    <Button variant="contained" type="submit" size="small" onClick={requestNews}>
                        Update news
                    </Button>
                </div>
            )}
        </div>
    );
};