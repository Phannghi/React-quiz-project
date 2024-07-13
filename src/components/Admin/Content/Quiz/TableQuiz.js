import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

const TableQuiz = (props) => {
    const { fetchAllQuiz, listQuiz } = props;
    //console.log('listQuiz', listQuiz);
    const [showUpdateQuiz, setShowUpdateQuiz] = useState(false);
    const [showDeleteQuiz, setShowDeleteQuiz] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const handleClickBtnUpdate = (quiz) => {
        setShowUpdateQuiz(true);
        setDataUpdate(quiz);
        //console.log(quiz);
    }

    const handleClickBtnDelete = (quiz) => {
        setShowDeleteQuiz(true);
        setDataDelete(quiz);
    }

    return (
        <>
            <table className="table table-bordered table-primary table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td>
                                    <div className="d-flex align-items-center gap-1">
                                        <button
                                            className="btn-action"
                                            onClick={() => handleClickBtnUpdate(item)}>
                                            <MdEdit />
                                        </button>
                                        <button className="btn-action"
                                            onClick={() => handleClickBtnDelete(item)}>
                                            <MdDelete color="red" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    {listQuiz && listQuiz.length === 0 &&
                        <tr>
                            <td colSpan={5}>Not found data</td>
                        </tr>}
                </tbody>
            </table>
            <ModalUpdateQuiz
                show={showUpdateQuiz}
                setShow={setShowUpdateQuiz}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchAllQuiz={fetchAllQuiz}
            />
            <ModalDeleteQuiz
                show={showDeleteQuiz}
                setShow={setShowDeleteQuiz}
                dataDelete={dataDelete}
                setDataDelete={setDataDelete}
                fetchAllQuiz={fetchAllQuiz}
            />
        </>
    )
}
export default TableQuiz;