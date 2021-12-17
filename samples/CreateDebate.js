function createForm() {   
  var item = "Identifying Personal Attacks in Comment Chains";  
  var form = FormApp.create(item).setTitle(item); 

  const datasetUrl = 'https://utkarsh512.github.io/pages/createdebate_5/CommentsForGoogleForm.txt'
  const descUrl = 'https://utkarsh512.github.io/pages/createdebate/description.txt'
  const trigramsUrl = 'https://utkarsh512.github.io/pages/createdebate_5/trigrams.txt'

  var response = UrlFetchApp.fetch(datasetUrl);
  console.log(response.getContentText());
  var comments = response.getContentText().split('@#@#@');

  response = UrlFetchApp.fetch(descUrl);
  var desc = response.getContentText();

  response = UrlFetchApp.fetch(trigramsUrl);
  var trigrams = response.getContentText().split('@#$$#@@#@@#')

  form.setDescription(desc);

  var choices = ['Yes', 'No'];

  form.addTextItem().setTitle('Enter your Prolific ID').setRequired(true);

  for (let i = 0; i < comments.length; i++) {
    console.log(i);
    var comment = comments[i].split('##$$##@@');
    var commentBody = comment[0];
    var commentUrl = 'Link to full conversation: ' + comment[1];
    var tgms = trigrams[i].split('$#$#$#$#$#$#@@@@');
    tgms.push('None');

    form.addPageBreakItem().setTitle('Comment ' + String(i + 1) + ' of ' + String(comments.length));
    form.addSectionHeaderItem().setTitle(commentBody).setHelpText(commentUrl);
    form.addMultipleChoiceItem().setTitle('Do you think this is an ad-hominem comment?').setChoiceValues(choices).setRequired(true);
    form.addCheckboxItem().setTitle('Select the phrases from the comments, which you think, makes it an ad hominem comment. If some other phrase makes it ad hominem, please enter that in \'Other\' option. Choose \'None\', if you think this is not an ad hominem comment').setChoiceValues(tgms).setRequired(true).showOtherOption(true);
  }

  form.addPageBreakItem().setTitle('Demographic Survey').setHelpText('Thank you for participating in the task. Please fill out this demographic survey and click submit. You will get the URL link to return to Prolific and complete the study after you click the "Submit Button"');
  form.addMultipleChoiceItem().setTitle('With what gender do you identify?').setChoiceValues(['Male', 'Female', 'Not-binary', 'Prefer not to answer']).setRequired(true).showOtherOption(true);
  form.addMultipleChoiceItem().setTitle('What is your age?').setChoiceValues(['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75 or older', 'Prefer not to answer']).setRequired(true);
  form.addCheckboxItem().setTitle('Please specify your ethnicity. (Choose all that apply)').setChoiceValues(['White', 'Hispanic or Latino', 'Black or African American', 'Native American or American Indian', 'Asian / Pacific Islander', 'Prefer not to answer']).setRequired(true).showOtherOption(true);
  form.addMultipleChoiceItem().setTitle('What is the highest level of degree or level of school you have completed?').setChoiceValues(['No high school no diploma', 'High school diploma', 'Some college credit no degree', 'Associate’s degree (AA / AS)', 'Bachelor’s degree (BA / BS)', 'Master’s degree (MA, MS, MEd, MBA)', 'Doctorate, Professional, or Terminal Degree (MD, PhD, DDS, DVM, JD, EdD)', 'Prefer not to answer']).setRequired(true);
  form.addMultipleChoiceItem().setTitle('What is your employment status? ').setChoiceValues(['Student', 'Full-time employed', 'Part-time employed ', 'Not employed ', 'Retired','Prefer not to answer']).setRequired(true);
  form.addParagraphTextItem().setTitle('Please state here if you have any feedback on how to improve this task, or if you faced any problems during the task (e.g., if any particular type of comment was difficult to understand, if the labels or instructions were not clear, etc.).');
} 
