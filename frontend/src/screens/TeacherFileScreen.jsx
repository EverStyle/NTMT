import { CSSTransition } from 'react-transition-group';
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import LessonBlock from "../components/GradeForm/LessonBlock";
import './style/FileScreen.css';
import AllFiles from "../components/GradeForm/AllFiles";

function TeacherFileScreen() {
    const [subblockMount, showSubblockMount] = useState(false);
    useEffect(() => {
        async function fetchData() {
          await new Promise((resolve) => setTimeout(resolve, 50));
          showSubblockMount(true);
        }
        fetchData();
      }, []);
    return (
        <div>
            <CSSTransition
                in={subblockMount}
                timeout={300}
                classNames="subblock_mount"
                mountOnEnter
                unmountOnExit
            >
                <div className="two_blocks">
                    <div className="file_container">
                        <div className='title'>Задания</div>
                        <LessonBlock></LessonBlock>
                    </div>
                    <div className="file_container">
                        <div className='title'>Все файлы</div>
                        <AllFiles></AllFiles>
                    </div>
                </div>
            </CSSTransition>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                style={{ width: '500px' }}
            />
        </div>
    );
}

export default TeacherFileScreen;