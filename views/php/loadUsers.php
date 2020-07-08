<?php
    header("Access-Control-Allow-Origin: *");
    $connection = mysqli_connect("localhost","root","password");
    mysqli_select_db("chatroom",$connection);
    $result = mysqli_query("select * from users",$connection);

    echo "<table border='1' >
    <tr>
    <td align=center> <b>ID</b></td>
    <td align=center><b>Username</b></td>
    <td align=center><b>Created At</b></td>";

    while($data = mysqli_fetch_row($result))
    {   
        echo "<tr>";
        echo "<td align=center>$data[0]</td>";
        echo "<td align=center>$data[1]</td>";
        echo "<td align=center>$data[2]</td>";
        echo "</tr>";
    }

    echo "</table>";
?>