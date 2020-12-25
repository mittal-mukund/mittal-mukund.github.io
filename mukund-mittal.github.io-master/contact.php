<!DOCTYPE HTML>
<html>
	<head>
		<title>Prayas, IIT Kanpur</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/bootstrap.css">
		<link rel="stylesheet" href="css/bootstrap-theme.css">
		<link rel="stylesheet" href="css/bootstrap-theme.min.css">
		<script src="js/bootstrap.js"></script>
		<script src="js/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/npm.js"></script>
		<link href="css/fonts.css" rel='stylesheet' type='text/css'>
		<script src="js/sitejs.js"></script>
		<script src="js/skel.min.js"></script>
		<script src="js/skel-panels.min.js"></script>
		<script src="js/init.js"></script>
	</head>
	<body>
		<?php
		$name=$email=$message=$to=$subject=$body=$errName=$errEmail=$errMessage=$result="";
	if (isset($_POST["submit"])) {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$message = $_POST['message'];
		$to = 'mukundmittal2@gmail.com'; 
		$subject = 'Message from Prayas Contact Form';
		
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
		<!-- Header -->
		<div id="header">
			<div class="container"> 
				
				<!-- Logo -->
				<div id="logo">
					<h1><a href="#">Prayas</a></h1>
					<span>A simple effort can fill colours in many lives!</span>
				</div>
				
				<!-- Nav -->
				<nav id="nav">
					<ul>
						<li class="active"><a href="index.html">Homepage</a></li>
						<li><a href="gallery.html">Gallery</a></li>
						<li><a href="#">Our Team</a></li>
						<li><a href="#">Join Us</a></li>
						<li><a href="contact.php">Contact Us</a></li>
					</ul>
				</nav>
			</div>
		</div>
		<!-- Main -->
		<div class="container-fluid" id="main">
			<div class="container-fluid">
				<div class="row"> 
					<!-- Content -->
					<div style="padding-left:7.5%;">
						<section>
							<header>
								<h2 style="font-size:3em;">Contacts</h2>
							</header>
						</section>
					</div>
				</div>
				<br><br><br>
				<div class="container-fluid" style="background-color:#f2f2f2; padding:2.5% 0 2.5% 0;">
				<div class="row" style="width:95%; margin:auto;">
					<header class="col-md-12">
						<header style="text-align:center;">
							<h2 style="font-size:2em;">Coordinators</h2>
						</header>
					</header>
					<div class="col-md-3" style="padding-top:0;">
						<center>
							<br/>
							<a href="#" class="image full"><img src="images/h1.jpg" alt="" /></a>
							<h2 style="margin:0;">Mukund Mittal</h2>
							<p>14404<br>7755063467<br>Room No. 305, Hall 3<br>mukundm@iitk.ac.in</p>
						</center>
					</div>
					<div class="col-md-3" style="padding-top:0;">
						<center>
							<br/>
							<a href="#" class="image full"><img src="images/h1.jpg" alt="" /></a>
							<h2 style="margin:0;">Mukund Mittal</h2>
							<p>14404<br>7755063467<br>Room No. 305, Hall 3<br>mukundm@iitk.ac.in</p>
						</center>
					</div>
					<div class="col-md-3" style="padding-top:0;">
						<center>
							<br/>
							<a href="#" class="image full"><img src="images/h1.jpg" alt="" /></a>
							<h2 style="margin:0;">Mukund Mittal</h2>
							<p>14404<br>7755063467<br>Room No. 305, Hall 3<br>mukundm@iitk.ac.in</p>
						</center>
					</div>
					<div class="col-md-3" style="padding-top:0;">
						<center>
							<br/>
							<a href="#" class="image full"><img src="images/h1.jpg" alt="" /></a>
							<h2 style="margin:0;">Mukund Mittal</h2>
							<p>14404<br>7755063467<br>Room No. 305, Hall 3<br>mukundm@iitk.ac.in</p>
						</center>
					</div>
				</div>
				</div>
				<br><br>
				<div class="container" style="background-color:#f2f2f2; padding:2.5% 0 2.5% 0;">
				<div class="row" style="width:95%; margin:auto;">
					<header class="col-md-12">
						<header style="text-align:center;">
							<h2 style="font-size:2em;">Address</h2>
						</header>
					</header>
					<div class="col-md-12" style="padding-top:0; text-align:center;">
						<center>
							<br/>
							<h1><b>Prayas,<br>New SAC, Room No. 105-1<br>IIT Kanpur<br>Kanpur-208016<br>U.P., India</b></h1>
						</center>
					</div>
				</div>
				</div>
				<br><br>
				<div class="container-fluid" style="background-color:#f2f2f2; padding:2.5% 0 2.5% 0;">
				<div class="row" style="width:95%; margin:auto;">
					<header class="col-md-12">
						<header style="text-align:center;">
							<h2 style="font-size:2em;">Send us a message</h2>
						</header>
					</header>
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
			</div>
		</div>
		<!-- Footer -->
		<div id="footer">
			<div class="container">
				<div class="row">
					<div class="4u">
						<section>
							<h2>Latest Posts</h2>
							<ul class="default">
								<li><a href="#">Pellentesque lectus gravida blandit</a></li>
								<li><a href="#">Lorem ipsum consectetuer adipiscing</a></li>
							</ul>
						</section>
					</div>
					<div class="4u">
						<section>
							<h2>Ultrices fringilla</h2>
							<ul class="default">
								<li><a href="#">Pellentesque lectus gravida blandit</a></li>
								<li><a href="#">Lorem ipsum consectetuer adipiscing</a></li>
							</ul>
						</section>
					</div>
					<div class="4u">
						<section>
							<h2>Aenean elementum</h2>
							<ul class="default">
								<li><a href="#">Pellentesque lectus gravida blandit</a></li>
								<li><a href="#">Lorem ipsum consectetuer adipiscing</a></li>
							</ul>
						</section>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Copyright -->
		<div id="copyright">
			<div class="container">
				Prayas, IIT Kanpur
			</div>
		</div>
	</body>
</html>