import { createSlice } from '@reduxjs/toolkit';

const ScheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        lessons: [],
    },
    reducers: {
    addLesson (){},
    deleteLesson (){},
    updateLesson (){},
    },
});