/*resumeBuilder takes each JSON object for each section (bio,education,work,projects, contacts) and builds the sections from the 
  information provided. A modal is added to each project so the user can click and watch a video.
*/

/* start of JSON objects */
/*bio object used to store profile information and displayed in the header of the resume.*/
var bio = {
	"name": "Gandalf Jr.",
	"role": "Web Developer",
	"contacts": {
		"mobile": "555-949-2737",
		"email": "hobbitsrcool@gmail.com",
		"github": "gandalf",
		"twitter": "@ISavedTheWorld",
		"location": "Pewaukee, WI"
	},
	"welcomeMessage": "Ready to settle down and become the best front end web developer in 'Middle Earth'",
	// Bars were added to each skill to help differentiate between skills especially when the screen gets smaller. I thought it looked better but I could be wrong.
	"skills": [
				"| JavaScript |",
				"| JQuery |",
				"| HTML |",
				"| CSS |",
				"| Wizarding Stuff |",
				"| Fluent in Elvish |",
				"| Horse Riding |",
				"| Combat Skills |",
				"| Beard Growing |"
			],
	"bioPic": "images/gandalf-profile.jpg",
	//Alt description text was added for bio pic
	"bioPicAlt": "Picture of me, Gandalf",
	//Caption message used to display above collision div.
	"collisionMessage": "Look! Magic!",
	"display": displayBio
};

/*
  work object stores jobs array. The jobs array stores each position as a object.
  Please do not grade me on the accuracy of Gandalf's past because I'm pretty sure there may be
  some discrepancies.
  I added the skills section to add a bulleted list to the work area because I think it highlights specific accomplishments.
  I added middleEarthLocation so I could add this to the resume to show the Lord of the Rings location name.
*/
var work = {
	"jobs": [
		{
		"employer": "Frodo & Friends",
		"title": "White Wizard",
		"location": "Venice, Italy",
		"middleEarthLocation": "Gondor",
		"dates": "2003-present",
		"url": "http://en.wikipedia.org/wiki/The_Lord_of_the_Rings:_The_Return_of_the_King",
		"description": "CEO of Gondor Division. Resolved a number of difficult employee situations, dealt with numerous difficult customers, " +
		"and resolved tough situations to companies satisfaction. Avoided the end of the world by making positive changes "+
		"and correct decisions under immense pressure.",
		"highlightedSkills": [
								"Returned from the dead",
								"Was able to fly on an eagle",
								"Rode on a horse really fast",
								"Saved the world from evil"
							]
		},
		{
		"employer": "Saruman Industries",
		"title": "Grey Wizard",
		"location": "Paris, France",
		"middleEarthLocation": "Rohan",
		"dates": "2001-2003",
		"url": "http://en.wikipedia.org/wiki/The_Lord_of_the_Rings:_The_Fellowship_of_the_Ring",
		"description": "Head Manager of the Rohan Plant. Led diverse team of individuals "+
		"across many multi-faceted missions. Handled all matters of betrayals from supervisors. Dealt with a "+
		"range of HR issues.",
		"highlightedSkills": [
								"Provided excellent fireworks shows",
								"Kept a ring secret and safe",
								"Solved complicated riddles"
							]
		},
		{
		"employer": "Hobbits",	
		"title": "Tour Guide",
		"location": "Berlin, Germany",
		"middleEarthLocation": "The Shire",
		"dates": "1999-2001",
		"url": "http://en.wikipedia.org/wiki/The_Hobbit_%28film_series%29",
		"description": "Lead Tour Guide for the entire Shire Organization. Was a very good listener and provided counsel to "+
		"individuals who needed it. In charge of managing fireworks sales for most of the time employed",
		"highlightedSkills": [
								"Reached things in high places",
								"Provided awesome advice",
								"Really good at walking long distances"
							]
		}
	],
	"display": displayWork
};

/*
  education section stores both school and online course information. No new information added.
*/
var education = {
	"schools": [
		{
		"name": "Wizard University",
		"location": "Los Angeles, California",
		"degree": "World Protection",
		"majors": "Hobbits",
		"dates": 2001,
		"url": "http://en.wikipedia.org/wiki/The_Wizarding_World_of_Harry_Potter_%28Universal_Studios_Hollywood%29"
		},
		{
		"name": "Hogwarts School of Witchcraft and Wizardry",
		"location": "Glasgow, Scottland",
		"degree": "Wizardry",
		"majors": "Defense Against the Dark Arts",
		"dates": 1998,
		"url": "http://www.hogwartsishere.com/about/"
		}
	],
	"onlineCourses": [
		{
		"title": "Nanodegree",
		"school": "Udacity",
		"date": 2015,
		"url": "https://www.udacity.com/"
		}
	],
	"display": displayEducation
};

/*
  added id and url to projects. Made images a multi-dimensional array so the alt text could be stored and retrieved.
  The url and id are added to create the modal for each project.
*/
var projects = {
	"project": [
		{
		"title": "You Shall Not Pass!",
		"id": "pass",
		"url": '<iframe width="560" height="315" src="https://www.youtube.com/embed/mJZZNHekEQw" frameborder="0" allowfullscreen></iframe>',
		"dates": "2003",
		"description": "I battled and beat a real evil thing called a balrog. I told him he could not pass and he did not. "+
		"This shows I finish what I start and do what I say. A good quality to have for web-developers.",
		"images": [
					["images/no-pass.jpg","I do not let the balrog pass!"],
					["images/no-pass-business.jpg","I still do not let the balrog pass"]
				]
		},
		{
		"title": "Flying with Eagles",
		"id": "flying",
		"url": '<iframe width="560" height="315" src="https://www.youtube.com/embed/HtEOjAx4JKA" frameborder="0" allowfullscreen></iframe>',
		"dates": "2005",
		"description": "After great length I was able to gain the trust of the eagles and they let "+
		"me fly whenever I need it. This is helpful for my new career because I have shown I have no limits. "+
		"Just look at me with sunglasses on. No limits.",
		"images": [
					["images/eagle.jpg","Big eagle picture"],
					["images/flying.jpg","Flying on an eagle"],
					["images/awesome-2.jpg","Me being cool and awesome"]
				]
		}
	],
	"display": displayProjects,
	"createModal": addModal
};
//end of JSON objects

/* start of functions area */

/*
  populates header section. Adds collision section and caption.
  Uses displayContacts to add contacts to header section
*/
function displayBio(){
	var formattedName = HTMLheaderName.replace('%data%',bio.name);
	var formattedRole = HTMLheaderRole.replace('%data%',bio.role);
	var formattedPic = HTMLbioPic.replace('%data%',bio.bioPic);
		formattedPic = formattedPic.replace('%content%',bio.bioPicAlt);
	var welcome = HTMLwelcomeMsg.replace('%data%',bio.welcomeMessage);
	var collision = HTMLcollision.replace('%data%',bio.collisionMessage);
	
	$('#header').prepend(collision);
	$('#header').prepend(formattedRole);
	$('#header').prepend(formattedName);
	$('#header').prepend(formattedPic);
	//displayContacts will append the contacts listed in the bio object to the id topContacts in the header section.
	displayContacts('#topContacts');
	$('#header').append(welcome);

	if (bio.skills.length > 0) {
		$('#header').append(HTMLskillsStart);
		for (skill in bio.skills){
			var formatSkills = HTMLskills.replace('%data%',bio.skills[skill]);
			$('#skills').append(formatSkills);
		};
	};
}

//populates contacts in the bio object to the id specified by the user.
function displayContacts(pageID){
	var contactMobile = HTMLmobile.replace('%data%',bio.contacts.mobile);
	var contactEmail = HTMLemail.replace('%data%',bio.contacts.email);
	var contactGit = HTMLgithub.replace('%data%',bio.contacts.github);
	var contactTwitter = HTMLtwitter.replace('%data%',bio.contacts.twitter);
	var contactLocation = HTMLlocation.replace('%data%',bio.contacts.location);
	var	contactIdentifier = pageID;
	
	$(contactIdentifier).append(contactMobile);
	$(contactIdentifier).append(contactEmail);
	$(contactIdentifier).append(contactGit);
	$(contactIdentifier).append(contactTwitter);
	$(contactIdentifier).append(contactLocation);
}

//iterates through the jobs located in the work object and displays each in the work section
//added workLocationLOTR so I could include the location used in the movie on the resume.
//added workSkill section so I could included a bulleted list highlighting accomplishments.
function displayWork(){
	for (job in work.jobs){
		$('#workExperience').append(HTMLworkStart);
		var workEmployer = HTMLworkEmployer.replace('%data%',work.jobs[job].employer);
		workEmployer = workEmployer.replace('#',work.jobs[job].url);
		var workTitle = HTMLworkTitle.replace('%data%',work.jobs[job].title);
		var workDates = HTMLworkDates.replace('%data%',work.jobs[job].dates);
		var workLocationLOTR = work.jobs[job].middleEarthLocation;
		var workLocation = HTMLworkLocation.replace('%data%',work.jobs[job].location + ' (' + workLocationLOTR + ')');
		var workDescription = HTMLworkDescription.replace('%data%',work.jobs[job].description);
		
		$('.work-entry:last').append(workEmployer + workTitle);
		$('.work-entry:last').append(workDates);
		$('.work-entry:last').append(workLocation);
		$('.work-entry:last').append(workDescription);
		$('.work-entry:last').append(HTMLworkSkillsStart);
		
		for (skill in work.jobs[job].highlightedSkills){
			var workSkill = HTMLworkSkillsItem.replace('%data%',work.jobs[job].highlightedSkills[skill]);
			$('.skillsForWork:last').append(workSkill);
		};
};
}

//iterates through the schools and online courses located in the education object and displays each in the education section
function displayEducation(){
	for (school in education.schools){
		$('#education').append(HTMLschoolStart);
		var schoolName = HTMLschoolName.replace('%data%',education.schools[school].name);
			schoolName = schoolName.replace('#',education.schools[school].url);
		var schoolDegree = HTMLschoolDegree.replace('%data%',education.schools[school].degree);
		var schoolDates = HTMLschoolDates.replace('%data%',education.schools[school].dates);
		var schoolLocation = HTMLschoolLocation.replace('%data%',education.schools[school].location);
		var schoolMajor = HTMLschoolMajor.replace('%data%',education.schools[school].majors);
		
		$('.education-entry:last').append(schoolName+schoolDegree);
		$('.education-entry:last').append(schoolLocation);
		$('.education-entry:last').append(schoolDates);
		$('.education-entry:last').append(schoolMajor);
	};
	if (education.onlineCourses.length > 0){
		$('#education').append(HTMLonlineClasses);
	};
	
	for (school in education.onlineCourses){
		$('#education').append(HTMLschoolStart);
		var onlineTitle = HTMLonlineTitle.replace('%data%',education.onlineCourses[school].title);
			onlineTitle = onlineTitle.replace('#',education.onlineCourses[school].url);
		var onlineSchool = HTMLonlineSchool.replace('%data%',education.onlineCourses[school].school);
		var onlineDate = HTMLonlineDates.replace('%data%',education.onlineCourses[school].date);
		var onlineURL = HTMLonlineURL.replace(/%data%/g,education.onlineCourses[school].url);
		
		$('.education-entry:last').append(onlineTitle+onlineSchool);
		$('.education-entry:last').append(onlineDate);
		$('.education-entry:last').append(onlineURL);
	};
}

/*
  iterates through the Projects section and displays each project in our resume.
  added image url and added alt text to the image using the multi-dimensional array.
  runs addModal to create script for each project(if one exists).
*/
function displayProjects() {
		for (project in projects.project){
			$('#projects').append(HTMLprojectStart);
			var projectTitle = HTMLprojectTitle.replace('%data%',projects.project[project].title);
				projectTitle = projectTitle.replace('%content%','#'+projects.project[project].id)
			var projectDates = HTMLprojectDates.replace('%data%',projects.project[project].dates);
			var projectDescription = HTMLprojectDescription.replace('%data%',projects.project[project].description);
		
			$('.project-entry:last').append(projectTitle);
			$('.project-entry:last').append(projectDates);
			$('.project-entry:last').append(projectDescription);
			//projectModal runs addModal function from projects object to create script for each project.
			var projectModal = projects.createModal(projects.project[project].id,projects.project[project].title,projects.project[project].url)
			$('.project-entry:last').append(projectModal)
			if(projects.project[project].images.length > 0){
				for (image in projects.project[project].images){
					var projectImage = HTMLprojectImage.replace('%data%',projects.project[project].images[image][0]);
					projectImage = projectImage.replace('%content%',projects.project[project].images[image][1])
					$('.project-entry:last').append(projectImage);
				};
			};
		};
}

/*
  used for internationalizeButton to change name to international style if desired
*/
function inName(name) {
	name = name.trim().split(' ');
	fName = name[0].toLowerCase();
	lName = name[1].toUpperCase();
	fName = fName.slice(0,1).toUpperCase() + fName.slice(1);
	name = fName + ' ' + lName;
	return name;
}

/*
  function adds modal to each project title so a video runs when the title is clicked.
  A script is added to index.html page so video will stop playing after closing modal.
  Uses bootstrap.js for modal content.
*/
function addModal(id,title,content){
	var modalProject =
	'<div class="modal fade" id='+id+'>'+
		'<div class="modal-dialog">'+
			'<div class="modal-content">'+
				'<div class="modal-header">'+
					'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
					'<h4 class="modal-title">'+title+'</h4>'+
				'</div>'+
				'<div class="modal-body">'+
					content+
				'</div>'+
				'<div class="modal-footer">'+
					'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
				'</div>'+
			'</div><!-- /.modal-content -->'+
		'</div><!-- /.modal-dialog -->'+
	'</div><!-- /.modal -->'+
	'<script>'+
		'$("#'+id+'").on("hidden.bs.modal", function (e) {'+
			'$("#'+id+' iframe").attr("src", $("#'+id+' iframe").attr("src"));'+
		'});'+
	'</script>'
	return modalProject;
}
//end of function section

/*
  call for functions to build resume on index.html
*/
bio.display();
work.display();
education.display();
projects.display();
$('#mapDiv').append(googleMapDescription);
$('#mapDiv').append(googleMap);
displayContacts('#footerContacts')
$('#footerContacts').append(internationalizeButton);