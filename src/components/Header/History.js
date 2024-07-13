import moment from 'moment';
import { getHistoryQuizUser } from '../../services/apiService';
import { useEffect, useState } from 'react';

const History = (props) => {
    const [listHistory, setListHistory] = useState([]);

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
                    name: item?.quizHistory?.name ?? '',
                    total_questions: item?.total_questions,
                    total_correct: item?.total_correct,
                    date: moment(item.createdAt).utc().format('DD-MM-YYYY hh:mm:ss A')
                }
            })
            setListHistory(data);
        }
    }
    //console.log('list history: ', listHistory);
    return (<>
        <div className="history-container table-responsive">
            <table className="table table-bordered table-hover table-primary">
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Quiz name</th>
                        <th scope='col'>Total questions</th>
                        <th scope='col'>Total correct</th>
                        <th scope='col'>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory.length > 0 &&
                        listHistory.map((item, index) => {
                            return (
                                <tr key={`table-history-${index}`}>
                                    <td>{item.id}</td>
                                    <td className='col-3'>
                                        <p className='text-truncate mb-0'
                                            style={{ maxWidth: '256px' }}>
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