<?php>
	$order_cost=$_POST["co"];
	$hold_cost=$_POST["ch"];
	$demand=$_POST["d"];
	
	//check whether all values are numerical
	$sum=$order_cost+$hold_cost+$demand;
	
	echo "<html><body>";
	//check whether all values are coming from HTML form
	echo "<p>CO: $order_cost, CH: $hold_cost, D: $demand, SUM: &sum</p>"
	
	$eoq=sqrt((2*$order_cost*$demand)/$hold_cost);
	
	echo "<p><h4>Economic Order Quantity= $eoq</h4></p>"
?>