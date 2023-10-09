$(document).ready(function () {
    const $techBtn = $(".tech");
    const $card = $(".card");
    const $filters = $(".filters");
    const $filterDiv = $(".filter__div");
    const $clearBtn = $(".clear");
    const filtersTracker = [];
  
    let filterData;
  
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => {
        filterData = data;
      });
  
    $techBtn.each(function () {
      $(this).on("click", async function (event) {
        const $eventButton = $("<button>")
          .text(event.currentTarget.innerText)
          .addClass("filter")
          .attr("id", event.currentTarget.innerText);
  
        let res = [];
        filterData.forEach((data) => {
          if (
            data[event.currentTarget.classList[1]].includes(
              event.currentTarget.innerText
            )
          ) {
            res.push(data.id);
          }
        });
  
        $card.each(function () {
          if (!res.includes(parseInt($(this).attr("id")))) {
            $(this).addClass("hidden");
          }
        });
  
        if (!filtersTracker.includes(event.currentTarget.innerText)) {
          $filters.append($eventButton);
          $filterDiv.removeClass("not__show");
          filtersTracker.push(event.currentTarget.innerText);
  
          $eventButton.on("click", function () {
            let perRes = res.slice(0, res.length);
  
            $card.each(function () {
              if (!perRes.includes(parseInt($(this).attr("id")))) {
                $(this).removeClass("hidden");
              }
            });
  
            const index = filtersTracker.indexOf($(this).attr("id"));
            filtersTracker.splice(index, 1);
  
            if (filtersTracker.length == 0) {
              $filterDiv.addClass("not__show");
            }
  
            $(this).remove();
          });
        }
      });
    });
  
    $clearBtn.on("click", function () {
      $card.removeClass("hidden");
      $filterDiv.addClass("not__show");
      filtersTracker.length = 0;
      $filters.html("");
    });

    $(".occupation").click(function () {
        // Get job details from the list items
        const jobTitle = $(this).text();
        const jobType = $(this).next().find("li:nth-child(2)").text();
        const jobLocation = $(this).next().find("li:nth-child(3)").text();

        // Set the job details in the popup
        $("#jobTitle").text(jobTitle);
        $("#jobType").text(jobType);
        $("#jobLocation").text(jobLocation);

        // Show the popup
        $("#jobDetailsPopup").show();
    });

    // Close the popup when the Close button is clicked
    $("#closePopup").click(function () {
        $("#jobDetailsPopup").hide();
    });

    $("#addJobButton").click(function () {
        $("#addJobPopup").show();
    });

    // Close the "Add Job" popup when the "Close" button is clicked
    $("#closeAddJobPopup").click(function () {
        $("#addJobPopup").hide();
    });

    function deleteJobCard(cardId) {
        $(`#${cardId}`).remove();
    }

    // Event listener for deleting job cards
    $(".delete-button").click(function () {
        const cardId = $(this).closest(".card").attr("id");
        deleteJobCard(cardId);
    });

    $("#jobForm").submit(function (e) {
        e.preventDefault();
    
        // Regular expression to check for alphanumeric characters (letters and numbers)
        const alphanumericRegex = /^[a-zA-Z0-9\s]*[a-zA-Z]+[a-zA-Z0-9\s]*$/;
    
        // Get user input values
        const companyName = $("#companyName").val();
        const Titlejob = $("#Titlejob").val();
        const experienceLevel = $("#experienceLevel").val();
        const programmingLanguages = $("#programmingLanguages").val();
        const tools = $("#tools").val();
        const Typejob = $("#Typejob").val();
        const location = $("#location").val();
    
        // Check if inputs contain only alphanumeric characters
        if (
            !alphanumericRegex.test(companyName) ||
            !alphanumericRegex.test(Titlejob) ||
            !alphanumericRegex.test(experienceLevel) ||
            !alphanumericRegex.test(programmingLanguages) ||
            !alphanumericRegex.test(tools) ||
            !alphanumericRegex.test(Typejob) ||
            !alphanumericRegex.test(location)
        ) {
            alert("Input should contain alphanumeric characters only and must include at least one letter.");
            return;
        }
    
        // Create a new job card HTML with user input values
        const newJobCard = `
            <div class="card">
                <img class="logo" src="./images/the-air-filter-company.svg" alt="${companyName} logo" />
                <div class="card__info">
                    <h1 class="card__title">${companyName}</h1>
                    <h2 class="occupation">${Titlejob}</h2>
                    <div class="job__info">
                        <ul class="info">
                            <li>recently</li>
                            <li>${Typejob}</li>
                            <li>${location}</li>
                        </ul>
                    </div>
                </div>
                <div class="card__tech">
                    <button class="tech role">${experienceLevel}</button>
                    <button class="tech languages">${programmingLanguages}</button>
                    <button class="tech tools">${tools}</button>
                    <button class="delete-button">Delete</button>
                </div>
            </div>
        `;
    
        // Append the new job card to the main content
        $("main").append(newJobCard);
    
        // Clear the form inputs
        $("#companyName").val("");
        $("#Titlejob").val("");
        $("#experienceLevel").val("");
        $("#programmingLanguages").val("");
        $("#tools").val("");
        $("#Typejob").val("");
        $("#location").val("");
    
        // Close the "Add Job" popup
        $("#addJobPopup").hide();
    });
    
   
});