import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {setProgress} from "../../store/slices/progress";
import ArticleService from "../../services/article.service";
import ArticleCardList from "../../components/Common/ArticleCardList";
import {helper} from "../../helpers";

const CareerResourceList = () => {

    const type = 1;
    const params = useParams();
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
                category_id: params?.catId ?? null,
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
            title={`${t("career_programs")} (${helper.redoSlug(params?.catTitle) ?? null})`}
            data={apiData}
            pageCnt={pageCount}
            handleChange={handleChange}
            totCnt={totalData}
            limit={dataLimit}
            loading={loading}
            pageTitle={helper.redoSlug(params?.catTitle) ?? t("career_programs")}
            type={type}
        />
    );
}

export default CareerResourceList;