const hostUrl = `${import.meta.env.VITE_SERVER_URL}`;

export async function addCreatedForm(data) {
  return await fetch(`${hostUrl}/api/forms/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
    body: JSON.stringify(data),
  });
}

export async function getFormById(formId) {
  return await fetch(`${hostUrl}/api/forms/${formId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
  });
}

export async function getAllForms(
  pageNumber = 0,
  pageSize = 5,
  sortBy = "id",
  sortDir = "asc"
) {
  return await fetch(
    `${hostUrl}/api/forms/all?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
      },
    }
  );
}

export async function getAllFormsForReportingUser(
  pageNumber = 0,
  pageSize = 5,
  sortBy = "id",
  sortDir = "asc",
  userId
) {
  return await fetch(
    `${hostUrl}/api/fillform/all/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
      },
    }
  );
}

export async function deleteFormById(formId) {
  return await fetch(`${hostUrl}/api/forms/${formId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
  });
}

export async function editFormById(data, formId) {
  return await fetch(`${hostUrl}/api/forms/edit/${formId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
    body: JSON.stringify(data),
  });
}

export async function submitForm(data) {
  console.log(data);

  return await fetch(`${hostUrl}/api/fillform/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
    body: JSON.stringify(data),
  });
}

export async function getAllSubmittedForms(
  pageNumber = 0,
  pageSize = 5,
  sortBy = "id",
  sortDir = "asc"
) {
  // console.log(data);

  return await fetch(
    `${hostUrl}/api/fillform/all?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
      },
    }
  );
}

export async function getFilledFormById(formId) {
  return await fetch(`${hostUrl}/api/fillform/${formId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
  });
}

export function setQuestionAnswer(answerData, questionData) {
  const mergedResponse = {
    ...answerData,
    formId: questionData.id,
    title: questionData.title,
  };

  mergedResponse.answers = answerData.answers.map((answer) => {
    const matchedQuestion = questionData.questions.find(
      (question) => question.question_id === answer.answer_id
    );

    if (matchedQuestion) {
      return {
        question_id: matchedQuestion.question_id,
        question_text: matchedQuestion.question_text,
        answerType: matchedQuestion.answerType,
        answer: answer.answer,
        required: matchedQuestion.required,
        options: matchedQuestion.options,
      };
    }

    return answer;
  });

  console.log(mergedResponse);

  return mergedResponse;
}

export async function deleteFilledFormById(formId) {
  return await fetch(`${hostUrl}/api/fillform/remove/${formId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
  });
}

export async function assignForm(locationId, formId) {
  return await fetch(`${hostUrl}/api/fillform/assign/${locationId}/${formId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
    },
  });
}



//Form response for admin
export async function getAllSubmittedFormsByAdminId(
  pageNumber = 0,
  pageSize = 5,
  sortBy = "id",
  sortDir = "asc",
  adminId
) {
  return await fetch(
    `${hostUrl}/api/fillform/all/admin/${adminId}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + btoa(`${localStorage.username}:${localStorage.password}`),
      },
    }
  );
}