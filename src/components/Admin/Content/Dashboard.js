import './Dashboard.scss';
import { useSelector } from 'react-redux';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { RiSurveyFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { getOverview } from '../../../services/apiService';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Dashboard = (props) => {
    const account = useSelector(state => state.user.account)
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchdataOverview();
    }, [])
    const fetchdataOverview = async () => {
        let res = await getOverview();
        //console.log('check res: ', res);
        if (res && res.EC === 0) {
            setDataOverview(res.DT);
            //chart data
            let user = 0, quiz = 0, quest = 0, ans = 0;
            user = res?.DT?.users?.total ?? 0;
            quiz = res?.DT?.others?.countQuiz ?? 0;
            quest = res?.DT?.others?.countQuestions ?? 0;
            ans = res?.DT?.others?.countAnswers ?? 0;
            const data = [
                {
                    "name": "Users",
                    "user": user,
                },
                {
                    "name": "Quizzes",
                    "quiz": quiz,
                },
                {
                    "name": "Questions",
                    "quest": quest,
                },
                {
                    "name": "Anwsers",
                    "ans": ans,
                }
            ]
            setDataChart(data);
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="dashboard-container">
            <div className="mb-3">
                <h3 className='title'>Analytics Dashboard</h3>
                <span>{`Welcome back, ${account.username}! We've missed you. 👋`}</span>
            </div>
            <hr />
            <div className="content pt-2">
                <div className="col-lg-6">
                    <div className="left h-100">
                        <div className="col-6">
                            <div className="child active">
                                <span className='title1'>Total Users <FaUser /></span>
                                <h4 className='title2'>
                                    {dataOverview && dataOverview.users
                                        && dataOverview.users.total ?
                                        <>{dataOverview.users.total}</> : <>0</>}
                                </h4>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="child">
                                <span className='title1'>Total Quizzes <RiSurveyFill /></span>
                                <h4 className='title2'>
                                    {dataOverview && dataOverview.others
                                        && dataOverview.others.countQuiz ?
                                        <>{dataOverview.others.countQuiz}</> : <>0</>}
                                </h4>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="child">
                                <span className='title1'>Total Questions <BsFillQuestionCircleFill /></span>
                                <h4 className='title2'>
                                    {dataOverview && dataOverview.others
                                        && dataOverview.others.countQuestions ?
                                        <>{dataOverview.others.countQuestions}</> : <>0</>}
                                </h4>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="child">
                                <span className='title1'>Total Answers <RiQuestionAnswerFill /></span>
                                <h4 className='title2'>
                                    {dataOverview && dataOverview.others
                                        && dataOverview.others.countAnswers ?
                                        <>{dataOverview.others.countAnswers}</> : <>0</>}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="right h-100">
                        <ResponsiveContainer width="95%" height="100%">
                            <BarChart data={dataChart}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="user" fill="#0D6EFD" />
                                <Bar dataKey="quiz" fill="#8884d8" />
                                <Bar dataKey="quest" fill="#82ca9d" />
                                <Bar dataKey="ans" fill="#20C997" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;