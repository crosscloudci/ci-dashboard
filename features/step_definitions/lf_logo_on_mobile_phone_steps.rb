require 'byebug'
Given /that a user is on any page of the CNCF CI Status Dashboard on mobile phone/ do
  visit ENV["TEST_URL"]
  expect(page).to have_current_path(ENV["TEST_URL"])
end

Then /the user should not be able to see the Linux Foundation Projects logo/ do 
  visit ENV["TEST_URL"]

  #size for mobile phone screen
  page.driver.browser.manage.window.resize_to('375', '667')
  page.find("#top-banner", visible: false).has_content?  
end

After do
  page.driver.browser.manage.window.resize_to('1050', '1004')
end
