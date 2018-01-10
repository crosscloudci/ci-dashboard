require 'byebug'
Given /that a user is on the CNCF CI Status Dashboard on mobile phone view/ do
  visit ENV["TEST_URL"]
	expect(page).to have_current_path(ENV["TEST_URL"])
end

When /the user clicks on the CNCF logo url on mobile phone view/ do
  visit ENV["TEST_URL"]
  sleep 1
  #size for ipad screen
  page.driver.browser.manage.window.resize_to('375', '667')
	 @cncf_projects_window = window_opened_by do
		page.find("#dashboard-logo").find(".cncf-logo").click
	 end
end

Then /a new tab will open on a mobile sized browser for https\:\/\/cncf\.io/ do
	within_window @cncf_projects_window do
		expect(page).to have_content('Cloud Native Computing Foundation')
	end 
end
