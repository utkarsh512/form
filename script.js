/*
Uploading texts from a corpus in the Google Form

@author Utkarsh Patel

Instructions
------------
1. Combine all the texts you want to upload as a single string using a unique delimiter
2. Write this string into a text file
3. Upload this file on your github website
4. This scripts will require that URL only
5. Customize the form using the following available formats.
*/

function createForm() {  
  var item = 'Sample Google Form';  
  var form = FormApp.create(item).setTitle(item); 

  const url = 'https://utkarsh512.github.io/docs/dataset/CommentsForGoogleForm.txt'

  var response = UrlFetchApp.fetch(url);
  // console.log(response.getContentText());
  comments = response.getContentText().split('@#@#@');

  var choices = ['Yes', 'No'];

  for (let i = 0; i < comments.length; i++) {
    form.addMultipleChoiceItem().setTitle(comments[i]).setChoiceValues(choices).setRequired(true);
  }
} 

/*
Available formats
-----------------------

// single line text field  
item = "Name, Title, Organization";  
form.addTextItem().setTitle(item).setRequired(true);  

// multi-line "text area"  
item = "Short biography (4-6 sentences)";  
form.addParagraphTextItem().setTitle(item).setRequired(true);  

// radiobuttons  
item = "Handout format";  
choices = ["1-Pager", "Stapled", "Soft copy (PDF)", "none"];  
form.addMultipleChoiceItem().setTitle(item).setChoiceValues(choices).setRequired(true);  

// (multiple choice) checkboxes  
item = "Microphone preference (if any)";  
choices = ["wireless/lapel", "handheld", "podium/stand"];  
form.addCheckboxItem().setTitle(item).setChoiceValues(choices);  
*/
