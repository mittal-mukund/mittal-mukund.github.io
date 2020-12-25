<html>
	<head>
		<title>Mukund Mittal, IIT Kanpur</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="" />
		<meta name="keywords" content="Mukund Mittal, IIT Kanpur" />
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/bootstrap-theme.min.css">
		<script src="js/bootstrap.min.js"></script>
		<script src="js/npm.js"></script>
		<style type="text/css">
			body{
			min-width: 1024px;
			}
			#cover {
   			background-image: url('images/cover.jpg');
  			background-repeat:no-repeat;
			background-size: 100%;
			height:650px;
			width:100%;
			display: table;
			}
			/*#profile {
			display: table;
			text-align: center;
			vertical-align: middle;
			width: 50%;
        	height: 35vh;
        	position:absolute;
        	margin-left: 25%;
			margin-top: 17.5vh;
        	max-width:100%;
        	max-height:100%;
        	overflow:auto;
			}*/
			#cover h2,p{
			display: table-cell;
			color: white;
			vertical-align: middle;
			text-align: center;
			font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
			opacity: 0.5;
			font-size: 4vh;
			}
			h1{
				text-align: center;
				color: black;
				font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
			}
			h3{
				text-align: center;
				vertical-align: middle;
				line-height: 120%;
			}
			#edu h4{
			text-align: center;
			color: white;
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
			}
			#edu h2{
			text-align: center;
			color: white;
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
			}
			.row {
  			display: flex; /* equal height of the children */
			}
			.col-md-6 {
 			flex: 1; /* additionally, equal width */
			}
		</style>
	</head>
	<body>
		<?php
		$name=$email=$message=$to=$subject=$body=$errName=$errEmail=$errMessage=$result="";
	if (isset($_POST["submit"])) {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$message = $_POST['message'];
		$to = 'mukundmittal2@gmail.com'; 
		$subject = 'Message from my Contact Form';
		
		$body = "From: $name\n E-Mail: $email\n Message:\n $message";
 
		// Check if name has been entered
		if (!$_POST['name']) {
			$errName = 'Please enter your name';
		}
		
		// Check if email has been entered and is valid
		if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$errEmail = 'Please enter a valid email address';
		}
		
		//Check if message has been entered
		if (!$_POST['message']) {
			$errMessage = 'Please enter your message';
		}
 
// If there are no errors, send the email
if (!$errName && !$errEmail && !$errMessage) {
	if (mail ($to, $subject, $body)) {
		$result='<div class="alert alert-success">Thank You! I will be in touch</div>';
		$name='';
		$email='';
		$message='';
	} else {
		$result='<div class="alert alert-danger">Sorry there was an error sending your message. Please try again later</div>';
	}
}
	}
?>
		<div class="container-fluid" style="width:100%; padding:0px;">
			<div class="container-fluid" id="cover">
				<!--<div class="container-fluid" id="profile">-->
					<h2>If you think you can do a thing or think you can't do a thing, you're right<br/>-Henry Ford</h2>
					<!--<img src="images/profile.jpg"/>-->
				<!--</div>-->
			</div>
			<div class="col-md-3 col-md-offset-1">
				<img src="images/profile.jpg" class="img-circle" alt="Cinque Terre" style="width: 100%; display: block; margin-top: 5%;"/>
				<br/>
				<h1>Mukund Mittal</h1>
				<h3> 3rd Year Undergradute<br/>Department of Mechanical Engineering<br/>IIT Kanpur</h3>
			</div>
			<div class="col-md-7" style="background-color: #dee2e0; margin-top: 1%; padding: 1%; opacity: 0.8;">
				<div class="container" style="width: 100%;">
				<div class="row" style="width: 100%; background-color: yellow; padding: 0px; margin: 0px;">
				<div class="col-md-6" id="edu" style="background-color: #3ed67d; padding: 2%;">
					<h2>Educational Qualification</h2>
					<br/>
					<h4>Current UG CPI:<br/>7.3/10
					<br/>
					<br/>
					12th CBSE Board percentage: 94.2%
					<br/>
					<br/>
					12th ICSE Board percentage: 95%</h4>
				</div>
				<div class="col-md-6" id="edu" style="background-color: #4d50f2; padding: 2%;">
					<h2>Extracurricular Hobbies</h2>
					<br/>
					<h4>Cultural:<br/>Guitar Playing, Vocals
					<br/>
					<br/>
					Sports:<br/>Wall Climbing
					<br/>
					<br/>
					Technical:<br/>CAD Design</h4>
				</div>
				</div>
				</div>
				<div class="col-md-12" id="edu" style="background-color: #f48b44; padding: 2%;">
				<h2>Technical Skills</h2>
				<br/>
				<h4>Languages:<br/>C, HTML, CSS, Java, JavaScript, SQL, PHP
				<br/>
				<br/>
				Utilities:<br/>Matlab, Solidworks, Microsoft Office (Word, Excel, PowerPoint), Magento CE, Ansys
				<br/>
				<br/>
				Other Softwares :<br/>Audacity, Adobe Audition, Google Sketchup</h4>
				</div>
		</div>
		<div class="col-md-10 col-md-offset-1" style="background-color: #dee2e0; margin-top: 2%;">
			<div class="col-md-12" style="text-align: center; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">
				<h2><strong>Send a Message</strong></h2>
			</div>
			<div class="col-md-12">
				<form method="post" role="form" class="col-md-12" style="width:60%; margin-left:20%;">
						<div class="form-group">
							<div style="width:80%; margin-left:10%;">
								<?php echo $result; ?>	
							</div>
						</div>
						<div class="form-group">
							<input type="text" name="name" class="form-control" placeholder="Your Name" value="<?php echo htmlspecialchars($name); ?>"/>
							<?php echo "<p class='text-danger'>$errName</p>";?>
						</div>
						<div class="form-group">
							<input type="email" name="email" class="form-control" placeholder="Your E-mail ID" value="<?php echo htmlspecialchars($email); ?>"/>
							<?php echo "<p class='text-danger'>$errEmail</p>";?>
						</div>
						<div class="form-group">
							<textarea name="message" rows="5" class="form-control" placeholder="Your Message..."><?php echo htmlspecialchars($message);?></textarea>
							<?php echo "<p class='text-danger'>$errMessage</p>";?>
						</div>
						<div align="center">
							<input type="submit" name="submit" class="btn" value="Send" style="width:70px;background-color:#59677c;color:white;"/>
						</div>
					<form>
			</div>
		</div>
	</body>
</html>
