$(document).ready(function(){
    // Add employee details when "Add Employee" button is clicked
    $("#addEmployee").click(function(){
      $("#employeeModal .modal-title").text("Add Employee Details");
      $("#employeeForm")[0].reset();
      $("#saveEmployee").show();
      $("#updateEmployee").hide();
      $("#employeeModal").modal();
    });
  
    // Edit employee details when "Edit" button is clicked
    $(document).on("click", ".editEmployee", function(){
      $("#employeeModal .modal-title").text("Edit Employee Details");
      var index = $(this).data("index");
      var employeeList = JSON.parse(localStorage.getItem("employeeList"));
      var employee = employeeList[index];
      $("#employeeIndex").val(index);
      $("#name").val(employee.name);
      $("#email").val(employee.email);
      $("#mobile").val(employee.mobile);
      $("#company").val(employee.company);
      $("#saveEmployee").hide();
      $("#updateEmployee").show();
      $("#employeeModal").modal();
    });
  
    // Save or update employee details when "Save" or "Update" button is clicked
    $("#saveEmployee, #updateEmployee").click(function(){
      var name = $("#name").val().trim();
      var email = $("#email").val().trim();
      var mobile = $("#mobile").val().trim();
      var company = $("#company").val().trim();
  
      // Validate name
      if(name == ""){
        alert("Please enter name");
        $("#name").focus();
        return false;
      }
  
      // Validate email
      if(email == ""){
        alert("Please enter email");
        $("#email").focus();
        return false;
      }
      else{
        var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if(!regex.test(email)){
          alert("Please enter valid email address");
          $("#email").focus();
          return false;
        }
      }
  
      // Validate mobile
      if(mobile == ""){
        alert("Please enter mobile number");
        $("#mobile").focus();
        return false;
      }
      else{
        var regex = /^[0-9]{10}$/;
        if(!regex.test(mobile)){
          alert("Please enter valid mobile number");
          $("#mobile").focus();
          return false;
        }
      }
  
      // Validate company
      if(company == ""){
        alert("Please enter company name");
        $("#company").focus();
        return false;
      }
  
      var employeeList = JSON.parse(localStorage.getItem("employeeList")) || [];
      var employee = {
        name: name,
        email: email,
        mobile: mobile,
        company: company
      };
  
      if($(this).attr("id") == "saveEmployee"){
        employeeList.push(employee);
      }
      else{
        var index = $("#employeeIndex").val();
        employeeList[index] = employee;
      }
  
      localStorage.setItem("employeeList", JSON.stringify(employeeList));
      location.reload();
    });
  
    // Delete employee details when "Delete" button is clicked
    $(document).on("click", ".deleteEmployee", function(){
      if(confirm("Are you sure you want to delete this employee?")){
        var index = $(this).data("index");
        var employeeList = JSON.parse(localStorage.getItem("employeeList"));
        employeeList.splice(index, 1);
        localStorage.setItem("employeeList", JSON.stringify(employeeList));
        location.reload();
      }
    });
  });
sss  