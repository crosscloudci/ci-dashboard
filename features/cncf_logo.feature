Feature: Clicking on CNCF logo opens a new page for cncf.io 

  Scenario: CNCF logo url 
    Given that a user is on the CNCF CI Status Dashboard on desktop view
    When the user clicks on the CNCF logo
    Then a new tab will open for https://cncf.io 

  Scenario: CNCF logo url on tablet
    Given that a user is on the CNCF CI Status Dashboard on tablet view
    When the user clicks on the CNCF logo url on tablet
    Then a new tab will open on a tablet sized browser for https://cncf.io 

  Scenario: CNCF logo url on mobile phone
    Given that a user is on the CNCF CI Status Dashboard on mobile phone view
    When the user clicks on the CNCF logo url on a mobile phone
    Then a new tab will open on a mobile sized browser for https://cncf.io
