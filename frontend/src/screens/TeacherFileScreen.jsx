import React, { useState } from "react";
import File from "../components/FolderFile/File";
import file_downloader from "../scripts/file_downloader";
import { useEffect } from "react";
import apiFiles from "../api/files";
import { ToastContainer, toast } from "react-toastify";
import UploadIcon from '@mui/icons-material/Upload';
import LessonBlock from "../components/GradeForm/LessonBlock";
import './style/FileScreen.css';
import MyFileBlock from "../components/GradeForm/MyFileBlock";
import AllFiles from "../components/GradeForm/AllFiles";

function TeacherFileScreen() {
 
    return (
        <div>
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