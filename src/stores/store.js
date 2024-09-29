import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import axios from 'axios';

export const useStore = defineStore('counter', () => {
  const studentList = reactive([])
  const changesList = reactive([])
  const workbook = ref({});
  const fileUploaded = ref(false)
  const subjectCheckbox = ref(false)
  console.log('1')
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
      score: changeObj.score,
      id: changeObj.id
    })
  }
    console.log('update changeslist: ', changesList)
  
  }

  const pushChangesToStudentList = async () => {
    console.log('pushed change successfully')
    console.log("changesList: ", changesList)
    console.log('workbook:', workbook.value)
    const exists = ref();
    for (let x = 0; x < changesList.length; x++) {

      try {
        const response = await axios.get('http://localhost/scoresheet-backend/scoresheet_processing.php', {
          params: {  
            action: "exists",
            student_id: changesList[x].id, //specify the items in $data array
            student_name: changesList[x].name,
          }
        });

        console.log(response.data.exist)
        exists.value = response.data.exist

    } catch (error) {
        console.log(error)
}

if (exists.value == false) {
  try {
    const response = await axios.post('http://localhost/scoresheet-backend/scoresheet_processing.php', {
        
      action: "addNewStudent",
      student_id: changesList[x].id, 
      student_name: changesList[x].name,
      subject: changesList[x].subject,
      score: changesList[x].score
      
    });

    console.log(response.data)
    

  } catch (error) {
      console.log(error)
  }
}
/* 
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
    changesList.length = 0 */
  }
  return { studentList, changesList, workbook, fileUploaded, subjectCheckbox, updateStudents, updateChangesList, pushChangesToStudentList }
}})