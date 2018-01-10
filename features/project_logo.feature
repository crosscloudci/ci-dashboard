Feature: Clicking on the Project Logo/Name component opens a new page for the Project's Github project URL 

  @project
  Scenario: CNCF Project logo/name url 
    Given that a user is on the CNCF CI Status Dashboard with a desktop view
    When the user clicks on the project logo/name
    Then a new tab will open for the first project url

  Scenario: CNCF Project logo url on tablet
    Given that a user is on the CNCF CI Status Dashboard from a tablet device
    When the user is on a tablet and clicks on the project logo/name
    Then a tab will open for the first project on a tablet device 
