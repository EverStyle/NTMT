
import { ToastContainer } from "react-toastify";
import './style/FileScreen.css';
import MyFileBlock from "../components/GradeForm/MyFileBlock";
import StudentsFilesLessons from "../components/GradeForm/StudentsFilesLessons";
import { CSSTransition } from 'react-transition-group';
import React, { useEffect, useState } from "react";
function FileScreen() {
    
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
                        <StudentsFilesLessons></StudentsFilesLessons>
                    </div>


                    <div className="file_container">
                        <div className='title'>Мои файлы</div>
                        <MyFileBlock></MyFileBlock>
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

export default FileScreen;
