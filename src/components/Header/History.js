import moment from 'moment';
import { getHistoryQuizUser } from '../../services/apiService';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
const History = (props) => {
    const [listHistory, setListHistory] = useState([]);
    const quizTimes = 30;
    const { t } = useTranslation();

    useEffect(() => {
        fetchHistory();
    }, [])
    const fetchHistory = async () => {
        let res = await getHistoryQuizUser();
        //console.log(res);
        if (res && res.EC === 0) {
            let data = res?.DT?.data?.map(item => {
                return {
                    id: item?.id,
                    name: item?.quizHistory?.description ?? '',
                    total_questions: item?.total_questions,
                    total_correct: item?.total_correct,
                    date: moment(item.createdAt).utc().format('DD-MM-YYYY hh:mm:ss A')
                }
            })
            data.sort((a, b) => b.id - a.id);
            let newData = data.slice(0, quizTimes);
            setListHistory(newData);
        }
    }
    //console.log('list history: ', listHistory);
    return (<>
        <h5 className='ps-3'>{t('profile.history.lastTimes', { quizTimes })}</h5>
        <div className="history-container table-responsive">
            <table className="table table-bordered table-hover table-primary">
                <thead>
                    <tr>
                        <th scope='col'>{t('profile.history.table.id')}</th>
                        <th scope='col'>{t('profile.history.table.quizName')}</th>
                        <th scope='col'>{t('profile.history.table.totalQuestions')}</th>
                        <th scope='col'>{t('profile.history.table.totalCorrect')}</th>
                        <th scope='col'>{t('profile.history.table.date')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory.length > 0 &&
                        listHistory.map((item, index) => {
                            return (
                                <tr key={`table-history-${index}`}>
                                    <td>{item.id}</td>
                                    <td className='col-3'>
                                        <p className='text-truncate mb-0' style={{ maxWidth: '256px' }}>
                                            {item.name}
                                        </p>
                                    </td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{item.date}</td>
                                </tr>
                            )
                        })
                    }
                    {listHistory && listHistory.length === 0 &&
                        <tr>
                            <td colSpan={5}>Not found data</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    </>)
}
export default History;