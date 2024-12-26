const baseUrl='https://hip-lying-mongoose.glitch.me/questions';

//post
function addQuestion(questionData){
    fetch(baseUrl,{
        method:'POST',
        headers:{
        'content-Type':'application/json'
    },
    body: JSON.stringify(questionData)
})
.then(response=>{
    if(response.ok){
        alert("Question Created");
        fetchQuestions();
    }
    else{
        alert("Error adding questions.")
    }
})
    .catch(error=>{
        console.error("Error:",error);
        alert("An error occurred while addind the question.")
    });
}

//fetch question
function fetchQuestions(){
    fetch(baseUrl).then(response=>response.json())
    .then(questions=>{
        const questionGrid=document.getElementById('questionGrid');
        questionGrid.innerHTML='';
        questions.forEach(question=>{
            const card=createQuestionCard (question);
            questionGrid.appendChild(card);
        });
    })
    .catch(error=>{
        console.error("Error fetching questions:",error);
        alert("An error occurred while fetching quections.")
    });
}

//reviewed ques
function fetchReviewedQuestions(){
    fetch(baseUrl + '?reviewStatus=true')
    .then(response=>response.json())
    .then(questions=>{
        const questionGrid=document.getElementById('questionGrid');
        questionGrid.innerHTML='';
        questions.forEach(question=>{
            const card=createQuestionCard (question);
            questionGrid.appendChild(card);
        });
    })
    .catch(error=>{
        console.error("Error fetching reviewed questions:",error);
        alert("An error occurred while fetching reviewed quections.")
    });
}
// create
function createQuestionCard(quection){
    const card=document.createElement('div');
    card.classList.add('question-card');
    if(quection.reviewStatus){
        card.classList.add('reviewed')
    }

    card.innerHTML=`<h3>${question.question}</h3>
     <ul>
        <li>A: ${question.option[0]}</li>
        <li>B: ${question.option[1]}</li>
        <li>C: ${question.option[2]}</li>
        <li>D: ${question.option[3]}</li>
     </ul>
     <p>Correct Option: ${question.correctOption}</p>`;

     const reviewButton=document.createElement('button');
     reviewButton.textContent="Review Question";
     reviewButton.addEventListener('click',()=>reviewQuestion(quection.id));


     const deleteButton=document.createElement('button');
     deleteButton.textContent="Delete Question";
     deleteButton.addEventListener('click',()=>reviewQuestion(quection.id));
     card.appendChild(reviewButton);
     card.appendChild(deleteButton);
     return card;
}

//update
function reviewQuestion(questionId){
    if(confirm("Are you sure to review this question?")){
        fetch(baseUrl + questionId,{
            method:'PATCH',
            headers:{
                'content-Type':'application/json'
            },
            body: JSON.stringify({reviewStatus:true})
        })
        .then(response=>{
            if(response.ok){
                const questionCard=document.getElementById(`question-${questionId}`);
                questionCard.classList.add('reviewed');
            }
            else{
                alert("Error reviewing question.")
            }
        })
        .catch(error=>{
            console.error("Error reviewing question:", error);
            alert("An Error while reviewing question.")
        });
    }
}

//delete
function deleteQuestion(questionId){
    if(confirm("Are you sure to delete this question?")){
        fetch(baseUrl + questionId,{
            method:'DELETE',
        })
        .then(response=>{
            if(response.ok){
              fetchQuestions();
            }
            else{
                alert("Error deleting question.")
            }
        })
        .catch(error=>{
            console.error("Error deleting question:", error);
            alert("An Error while deleting question.")
        });
    }
} 

//add que
const addQuestionForm=document.getElementById('addQuestionForm');
if(addQuestionForm){
    addQuestionForm.addEventListener('submit', function(event){
        event.preventDefault();
        const questionData={
            question:document.getElementById('question').value, 
            options:[
                document.getElementById('optionA').value,
                document.getElementById('optionB').value,
                document.getElementById('optionC').value,
                document.getElementById('optionD').value,
            ],

            correctOption:document.getElementById('correctOption').value,
            reviewStatus:false
        };
        addQuestion(questionData);
    });
}


if(document.getElementById('questionGrid'))
{
    fetchQuestions();
}
else if(document.getElementById('questionGrid')&& window.location.href.includes('question.html'))
{
    fetchReviewedQuestions();
}