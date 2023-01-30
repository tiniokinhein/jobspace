import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ArticleService from "../../services/article.service";
import { useDispatch } from "react-redux";
import { setProgress } from "../../store/slices/progress";
import ArticleCardList from "../../components/Common/ArticleCardList";

const NewsAndEvents = () => {
  const type = 2;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const [offset, setOffset] = useState(0);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalData, setTotalData] = useState(0);
  const [dataLimit, setDataLimit] = useState(20);

  useEffect(() => {
    dispatch(setProgress(50));

    (async () => {
      await ArticleService.all({
        limit: dataLimit,
        offset: offset,
        type: type,
      }).then((res) => {
        const metadata = res.metadata;
        setDataLimit(metadata.info.limit);
        setApiData(res.data);
        setTotalData(metadata.info.total);
      });
    })();

    setLoading(false);

    dispatch(setProgress(100));

    // eslint-disable-next-line
  }, [pageNo]);

  const pageCount = Math.ceil(totalData / dataLimit);

  const handleChange = (event, value) => {
    setPageNo(value);
    setOffset(value * 20 - 20);
  };

  return (
    <ArticleCardList
      title={t("news_and_events")}
      data={apiData}
      pageCnt={pageCount}
      handleChange={handleChange}
      totCnt={totalData}
      limit={dataLimit}
      loading={loading}
      pageTitle={t("news_and_events")}
      type={type}
    />
  );
};

export default NewsAndEvents;
