import { createStore } from 'vuex'

export default createStore({
    state: {
        user: null,
        isStudent: true,
        courseObjects: [],
        courseTitles: [],
        username: '',
        selectedAssessment: null,
        courseMap: null,
        selectedCourse: null,
        students: [],
        setQuestions: [],
        visible: true
    },
    mutations: {

    },
    actions: {

    },
    getters: {

    }
})