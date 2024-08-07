import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useStore = defineStore('counter', () => {
  const studentList = reactive([])
  const changesList = reactive([])
  const workbook = ref({});
  const fileUploaded = ref(false)
  const subjectCheckbox = ref(false)
  
  const updateStudents = (row) => {
    try { 
      console.log(row)
      if (row.name == undefined) {

      } else {
      studentList.push({
      id: studentList.length + 1,
      name: row.name,
      subjects: [
        {
          subject: 'English', 
          score: row.English,
          subIsChecked: false
        },
        {
          subject: 'History', 
          score: row.History,
          subIsChecked: false
        },
        {
          subject: 'Math',
          score: row.Math,
          subIsChecked: false
        }
      ],
      isChecked: false
    })
    }} catch (error) {
      console.log('error in studentList pushing', error)
    }
  };

  const updateChangesList = (changeObj) => {
    if (changeObj.score > 100 || typeof changeObj.score === String) {
      console.log('invalid change')
    } else {
    changesList.push({
      //id: changeObj.id,
      name: changeObj.name,
      subject: changeObj.subject,
      score: changeObj.score
    })
  }
    console.log('update changeslist: ', changesList)
  
  }

  const pushChangesToStudentList = () => {
    console.log('pushed change successfully')
    console.log("changesList: ", changesList)
    console.log('workbook:', workbook.value)

    for (let x = 0; x < changesList.length; x++) {
      const stuName = changesList[x].name

      const exists = studentList.some(obj => obj.name === stuName)

      if (exists == false) {
        studentList.push({
          id: studentList.length + 1,
          name: stuName,
          subjects: [
          {
            subject: 'English', 
            score: '',
            subIsChecked: false
          },
          {
            subject: 'History', 
            score: '',
            subIsChecked: false
          },
          {
            subject: 'Math',
            score: '',
            subIsChecked: false
          }
          ],
          isChecked: false
        })
        const newStudentIndex = studentList.length - 1
        if (changesList[x].subject == "English") {
          studentList[newStudentIndex].subjects[0].score = changesList[x].score
        } else if (changesList[x].subject == "Math") {
          studentList[newStudentIndex].subjects[2].score = changesList[x].score
        } else if (changesList[x].subject == "History") {
          studentList[newStudentIndex].subjects[1].score = changesList[x].score
        } 

      } else {

        const dupeArray = studentList.findIndex(obj => obj.name === stuName); //iterates over the array and finds the array that includes 'henry'
        console.log(dupeArray)
        if (changesList[x].subject == "English") {
          studentList[dupeArray].subjects[0].score = changesList[x].score
        } else if (changesList[x].subject == "History") {
          studentList[dupeArray].subjects[1].score = changesList[x].score
        } else if (changesList[x].subject == "Math") {
          studentList[dupeArray].subjects[2].score = changesList[x].score
        }

      }


      }
      
    console.log("studentList: ", studentList)
    changesList.length = 0
  }
  return { studentList, changesList, workbook, fileUploaded, subjectCheckbox, updateStudents, updateChangesList, pushChangesToStudentList }
})