import moment from 'moment';
import { getHistoryQuizUser } from '../../services/apiService';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import Select from 'react-select';
import { IoFilter } from "react-icons/io5";

const History = (props) => {
    const [listHistory, setListHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const quizTimes = 50;
    const { t } = useTranslation();
    const options = [
        { value: 'today', label: `${t('profile.history.filterOptions.today')}` },
        { value: 'last3Days', label: `${t('profile.history.filterOptions.last3Days')}` },
        { value: 'lastWeek', label: `${t('profile.history.filterOptions.lastWeek')}` },
        { value: 'lastMonth', label: `${t('profile.history.filterOptions.lastMonth')}` }
    ]
    const [filter, setFilter] = useState(options[0]);

    useEffect(() => {
        fetchHistory();
    }, [])

    useEffect(() => {
        filterHistory();
    }, [listHistory, filter]);

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
    const filterHistory = () => {
        let now = moment().utc();
        let filtered = listHistory.filter(item => {
            let itemDate = moment(item.date, 'DD-MM-YYYY hh:mm:ss A');
            switch (filter.value) {
                case 'today':
                    return itemDate.isSame(now, 'day');
                case 'last3Days':
                    return itemDate.isAfter(now.clone().subtract(3, 'days'));
                case 'lastWeek':
                    return itemDate.isAfter(now.clone().subtract(1, 'week'));
                case 'lastMonth':
                    return itemDate.isAfter(now.clone().subtract(1, 'month'));
                default:
                    return true;
            }
        });
        setFilteredHistory(filtered);
    }

    //console.log('list history: ', listHistory);
    return (<>
        <div className="ps-3 col-md-3">
            <label className="form-label d-inline-flex align-items-center gap-2">
                <IoFilter /> {t('profile.history.filter')}
            </label>
            <Select
                options={options}
                defaultValue={filter}
                onChange={setFilter}
                value={filter}
            />
        </div>
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
                    {filteredHistory && filteredHistory.length > 0 &&
                        filteredHistory.map((item, index) => {
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